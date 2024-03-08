"use client";

import { useState, useEffect } from "react";
import { Appointment, Service } from "@/store";
import DeleteBtn from "@/components/AdminDeleteBtn";

export default function AdminAppointmentTable() {

  const [appointments, setAppointments] = useState<null | Appointment[]>(null);
  const [workers, setWorkers] = useState<any[]>([]); // Define type as any[]
  const [services, setServices] = useState<null | Service[]>(null);
  const [selectedWorkerName, setSelectedWorkerName] = useState<string>(""); // Default to an empty string


  // Function to fetch appointments data
  const fetchAppointments = () => {
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) =>
        console.error("Failed to fetch appointment data:", error)
      );
  };

  useEffect(() => {
    // Fetch appointments data
    fetchAppointments();

    fetch("/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Failed to fetch services data:", error));

    // Fetch workers data
    fetch("/api/workers")
      .then((response) => response.json())
      .then((data) => setWorkers(data))
      .catch((error) => console.error("Failed to fetch workers data:", error));
  }, []);

  // Function to get worker name by ID
  const getWorkerNameById = (workerId: number | undefined) => {
    if (!workerId) return "N/A"; // Handle the case when workerId is undefined
    const worker = workers.find((worker) => worker.id === workerId);
    return worker ? `${worker.name}` : "N/A";
  };

  // Function to get service name by ID
  const getServiceNameById = (serviceIds: number[] | undefined) => {
    if (!serviceIds || serviceIds.length === 0) return "N/A";
    const serviceNames = serviceIds.map((serviceId) => {
      const service = services?.find((service) => service.id === serviceId);
      return service ? service.name : "N/A";
    });

    // Remove text inside parentheses and join the service names
    const formattedServiceNames = serviceNames.map((name) =>
      name.replace(/\([^)]*\)/g, "")
    );
    return formattedServiceNames.join(", ");
  };

  // Helper function to safely convert Date or timestamp to string
  const formatDate = (date: Date | number | undefined) => {
    if (!date) return ""; // Handle undefined or null case
    const dateObj = date instanceof Date ? date : new Date(date);

    // Convert date to ISO string without the timezone information
    const isoStringWithoutTimezone =
      dateObj.toISOString().split("T")[0] +
      " " +
      dateObj.toTimeString().split(" ")[0];
    return isoStringWithoutTimezone;
  };

  // Get the current date in ISO string format without the time
  const currentDateISO = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(currentDateISO);

  // Inside the component
const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedDate(event.target.value);
};
const handleWorkerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSelectedWorkerName(event.target.value);
};


  // Filter appointments to include only those with a date on or after the current day
  const filteredAppointments: Appointment[] =
  appointments?.filter((appointment) => {
    if (!appointment.date) return false; // Handle the case when appointment.date is undefined

    const appointmentDate = new Date(appointment.date);
    const selectedDateObj = new Date(selectedDate);

    // Compare the date, month, and year components of the appointmentDate and selectedDateObj
    const isDateMatch =
      appointmentDate.getDate() === selectedDateObj.getDate() &&
      appointmentDate.getMonth() === selectedDateObj.getMonth() &&
      appointmentDate.getFullYear() === selectedDateObj.getFullYear();

    // Compare the worker's name with the selected worker name
    const isWorkerNameMatch =
      selectedWorkerName === "" || // If no worker name is selected, skip this condition
      getWorkerNameById(appointment.worker_id)?.toLowerCase().includes(selectedWorkerName.toLowerCase());

    // Return true if both date and worker name conditions are met
    return isDateMatch && isWorkerNameMatch;
  }) ?? [];





  return (
    <div className="m-8 mx-auto text-center">
<div className="m-8 mx-auto py-8 ">
  <div className="overflow-x-auto">
    <label className="font-semibold" htmlFor="selectedDate">Tarih Seçiniz: </label>
    <input
    className="border-2"
      type="date"
      id="selectedDate"
      value={selectedDate}
      onChange={handleDateChange}
    />
    {/* ... the rest of the table and appointment rendering */}
  </div>

  <div className="p-4">
    <label className="font-semibold" htmlFor="selectedWorkerName">Çalışan İsmi: </label>
    <input
        className="border-2"

    type="text"
    id="selectedWorkerName"
    value={selectedWorkerName}
    onChange={handleWorkerNameChange}
    />
  </div>

</div>

      <div className="overflow-x-auto">
        {appointments === null ? (
          <p className="text-center font-semibold text-lg">Yükleniyor...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center font-semibold text-lg">
            Bugün için randevu yok.
          </p>
        ) : (
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>İsim</th>
                <th>Soyisim</th>
                <th>Mail</th>
                <th>Telefon</th>
                <th>Tarih</th>
                <th>Süre</th>
                <th>İşlemler</th>
                <th>Çalışan</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment: Appointment) => (
                <tr key={appointment.id}>
                  <th></th>
                  <th>{appointment.id}</th>
                  <td>{appointment.name}</td>
                  <td>{appointment.surname}</td>
                  <td>{appointment.mail}</td>
                  <td>{appointment.phone}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.time}</td>
                  <td>{getServiceNameById(appointment.services_id)}</td>
                  <td>{getWorkerNameById(appointment.worker_id)}</td>
                  <td>
                  <DeleteBtn AppointmentId={appointment.id} onAppointmentDeleted={fetchAppointments} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
              <th></th>
                <th>ID</th>
                <th>İsim</th>
                <th>Soyisim</th>
                <th>Mail</th>
                <th>Telefon</th>
                <th>Tarih</th>
                <th>Süre</th>
                <th>İşlemler</th>
                <th>Çalışan</th>
                <th>İşlem</th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}
