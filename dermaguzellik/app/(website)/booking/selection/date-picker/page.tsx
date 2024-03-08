"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../date-picker/date-picker.css";
import { tr } from "date-fns/locale";
import WorkerSelector from "@/components/WorkerSelector";
import { getAvailableTimes } from "@/components/FilterBookedHours";
import { useFormStore, useAppointmentsStore } from "@/store";
import { useRouter } from "next/navigation";

//locale am pm ise patlıyor

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const selectedWorkerNumber = selectedWorker !== null ? selectedWorker : 0;


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
    event.preventDefault();

    setIsSubmitting(true); // Start the animation

    const form = useFormStore.getState().form;
    setIsButtonDisabled(true);
    try {
      const response = await fetch("/api/postform", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(form);

      await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setAlertMessage("Randevunuz Başarılı Bir Şekilde Alındı!");
        setAlertType(1);
        // Reset form values

        setSelectedTime("");

        setTimeout(() => {
          router.push("/booking/selection/date-picker/appointment-info");
        }, 3000);
      } else {
        setAlertMessage("Hata Randevunuz Alınamadı!");
        setAlertType(0);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      setAlertMessage("Hata Randevunuz Alınamadı!");
      setAlertType(0);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } finally {
      setIsSubmitting(false); // Stop the animation
    }
  }

  return (
    <div className="my-4 mx-4">
      <div className="flex justify-center">
        <WorkerSelector onWorkerSelected={handleWorkerSelected} />
      </div>

      {workerSelected && (
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

              <div className="flex justify-center pt-4 pb-8">
              
              <button
  onClick={handleSubmit}
  type="submit"
  className={`inline-flex items-center px-4 py-2 mt-4 w-full font-semibold leading-6 text-sm shadow rounded-md text-white btn btn-error ${isButtonDisabled ? "cursor-not-allowed" : ""}`}
  disabled={!selectedTime || isButtonDisabled}
>
  {isSubmitting && (
    <svg
      className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white ${
        isButtonDisabled ? "opacity-50" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )}
  {isSubmitting ? "Randevu Alınıyor..." : "BİTİR"}
</button>





              </div>
              <a
                href="/contact"
                className="text-center text-sm opacity-90 hover:text-teal-700 mb-4"
              >
                İstediğiniz Saatte Randevu Yoksa Lütfen Buradan İletişime Geçin
              </a>
            </div>
          )}
        </div>
      )}

      {alertMessage && (
        <>
          <div className="fixed inset-0 flex items-center justify-center opacity-100 z-50">
            {alertType === 1 ? (
              <div className="alert alert-success mx-auto max-w-2xl z-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{alertMessage}</span>
              </div>
            ) : (
              <div className="alert alert-error mx-auto max-w-2xl z-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{alertMessage}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
