"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./date-picker.css";
import { tr } from "date-fns/locale";
import WorkerSelector from "@/components/WorkerSelector";
import { getAvailableTimes } from "@/components/AdminFilterBookedHours";
import { useFormStore, useAppointmentsStore } from "@/store";
import { useRouter } from "next/navigation";


//locale am pm ise patlıyorr

export default function DatePicker() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const { appointments, fetchAppointments } = useAppointmentsStore();
  const form = useFormStore((state) => state.form);
  const setForm = useFormStore((state) => state.setForm);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add disabled state variable

  const router = useRouter();

  const selectedService = useFormStore((state) => state.form.selection);
  const selectedAppointmentDuration = useFormStore((state) => state.form.time);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const footer = selectedDay ? (
    <div></div>
  ) : (
    <p className="border-t-2 border-teal-400 p-2 mt-2">
      Lütfen uygun bir tarih seçiniz.
    </p>
  );

  useEffect(() => {
    fetchAppointments();
  }, []);

  const selectedWorker = useFormStore((state) => state.form.selectedWorker);
  const selectedWorkerNumber = selectedWorker !== null ? selectedWorker : 8;


  const today = new Date();

  // Subtract one day from the current date to get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  
 
  const isSunday = (date: Date) => date.getDay() === 0; // 0 represents Sunday

 // Create the disabledDays array
//...

//...

//...

const disabledDays = [
  new Date(2024, 0, 1),
  { from: new Date(2000, 0, 1), to: yesterday },
  (date: Date) => {
    const isSunday = date.getDay() === 0;
    const isDecember17th = date.getDate() === 17 && date.getMonth() === 11 && date.getFullYear() === 2023;

    if ([8, 9].includes(selectedWorkerNumber)) {
      // If the selected worker is 8 or 9, disable all Sundays except the 17th
      return isSunday && !isDecember17th;
    } else {
      // If the selected worker is not 8 or 9, disable all Sundays
      return isSunday;
    }
  },
];

//...


//...

//...
  const [workerSelected, setWorkerSelected] = useState(false);

  const handleWorkerSelected = (selected: boolean) => {
    setWorkerSelected(selected);
  };

  const handleDaySelect: SelectSingleEventHandler = (day) => {
    setSelectedDay(day instanceof Date ? day : null);
  };

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        if (!selectedDay) {
          return; // Exit early if date is not selected
        }

        const times = await getAvailableTimes(
          appointments,
          selectedWorker,
          selectedDay,
          selectedService,
          selectedAppointmentDuration
        );
        setAvailableTimes(times);
      } catch (error) {
        // Handle any errors that occur during the asynchronous operation
        console.error("Error fetching available times:", error);
      }
    };

    fetchAvailableTimes();
  }, [
    appointments,
    selectedWorker,
    selectedDay,
    selectedService,
    selectedAppointmentDuration,
  ]);

  const handleTimeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    const [day, month, year] = selectedTime.split(".");
    const formattedDate = new Date(`${month}/${day}/${year}`);

    setForm({ ...form, date: selectedTime ? formattedDate : null });
    setSelectedTime(selectedTime);
  };


  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(1);

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    
    setSelectedTime("");
     router.push("/admin/booking/selection/date-picker/customer-info")
  }

  return (
    <div className="my-4 mx-4">
      <div className="flex justify-center">
        <WorkerSelector onWorkerSelected={handleWorkerSelected} />
      </div>

      <div>
        <div className="flex justify-center mt-12">
          <DayPicker
            mode="single"
            selected={selectedDay || undefined}
            onSelect={handleDaySelect}
            footer={footer}
            locale={tr}
            disabled={disabledDays}
            styles={{
              caption: { color: "#3fd5c6" },
            }}
            className="border-2 border-teal-400 rounded-xl border-solid p-4"
          />
        </div>

        {selectedDay && (
          <div className="form-control w-full max-w-xs mx-auto">
            <label className="label">
              <span className="label-text">Randevu Saati Seçiniz</span>
            </label>

            <select
              name="date"
              key={availableTimes.join(",")}
              value={selectedTime || ""}
              onChange={handleTimeSelect}
              className="select select-bordered select-accent"
              required
              disabled={availableTimes.length === 0} // Disable select if availableTimes is empty
            >
              <option disabled value="">
                {availableTimes.length === 0
                  ? "Tüm Saatler Dolu"
                  : "Saat Seçiniz"}
              </option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>

            <div className="flex justify-center pt-4 pb-24">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-accent text-slate-100 w-full mt-4"
                disabled={!selectedTime || isButtonDisabled} // Disable button if time is not selected or button is already disabled
              >
                Devam
              </button>
            </div>
          </div>
        )}
      </div>

      

















      
    </div>
  );
}
