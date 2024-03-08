"use client";

import React, { useState, useEffect } from "react";
import { Appointment, Service } from "@/store";
import DeleteBtn from "@/components/AdminDeleteBtn";

export default function NameSearchAppointmentsTable() {
  const [appointments, setAppointments] = useState<null | Appointment[]>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [services, setServices] = useState<null | Service[]>(null);
  const [workers, setWorkers] = useState<any[]>([]);

  const getServiceNameById = (serviceIds: number[] | undefined) => {
    if (!serviceIds || serviceIds.length === 0) return "N/A";
    const serviceNames = serviceIds.map((serviceId) => {
      const service = services?.find((service) => service.id === serviceId);
      return service ? service.name : "N/A";
    });
    return serviceNames.join(", ");
  };

  const formatDate = (date: Date | number | undefined) => {
    if (!date) return "";
    const dateObj = date instanceof Date ? date : new Date(date);
    const isoStringWithoutTimezone =
      dateObj.toISOString().split("T")[0] +
      " " +
      dateObj.toTimeString().split(" ")[0];
    return isoStringWithoutTimezone;
  };

  const fetchAppointments = () => {
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => {
        data.sort((a: any, b: any) => {
          const timeA = new Date(a.date).getTime();
          const timeB = new Date(b.date).getTime();
          return timeA - timeB;
        });
        setAppointments(data);
      })
      .catch((error) =>
        console.error("Failed to fetch appointment data:", error)
      );
  };

  useEffect(() => {
    fetchAppointments();


    fetch("/api/services")
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Failed to fetch services data:", error));

    fetch("/api/workers")
      .then((response) => response.json())
      .then((data) => setWorkers(data))
      .catch((error) => console.error("Failed to fetch workers data:", error));
  }, []);

  const handleWorkerChange = async (
    appointmentId: number,
    newWorkerId: number
  ) => {
    try {
      const url = `/api/changeWorker?appointmentId=${appointmentId}&newWorkerId=${newWorkerId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchAppointments();
      } else {
        console.error("Failed to change worker");
      }
    } catch (error) {
      console.error("Error changing worker:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredAppointments =
    appointments?.filter((appointment) => {
      if (searchQuery) {
        const fullName =
          `${appointment.name} ${appointment.surname}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      }
      return true;
    }) || [];

  return (
    <div className="m-8 mx-auto text-center">
      <div className="m-8 mx-auto py-8 flex flex-col items-center">
  <h1 className="text-3xl font-semibold mb-4">İsim ve Soyisimle Randevu Arama</h1>
  <div className="overflow-x-auto">
    <input
      className="border-2 mb-4 p-2 w-full"
      type="text"
      placeholder="Ara"
      value={searchQuery}
      onChange={handleSearch}
    />
  </div>
</div>


      <div className="overflow-x-auto mx-2">
        {appointments === null ? (
          <p className="text-center font-semibold text-lg">Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-center font-semibold text-lg">
            No appointments found.
          </p>
        ) : (
          <table className="table table-xs">
            <thead>
            <th></th>
                    <th>ID</th>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th>Mail</th>
                    <th>Telefon</th>
                    <th>Tarih</th>
                    <th>Süre</th>
                    <th>Kategori</th>
                    <th>İşlem</th>
                    <th>Çalışan</th>
                    <th>İşlem</th>
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
                <td>{appointment.category}</td>
                <td>{getServiceNameById(appointment.services_id)}</td>
                <td>
                  <select
                    value={appointment.worker_id ?? -1}
                    onChange={(e) =>
                      handleWorkerChange(
                        appointment.id,
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value={-1}>Select Worker</option>
                    {workers.map((worker) =>
                      // Check if the worker's categories include the appointment's category
                      worker.categories.includes(appointment.category) ? (
                        <option key={worker.id} value={worker.id}>
                          {worker.name}
                        </option>
                      ) : null
                    )}
                  </select>
                </td>{" "}
                <td>
                  <DeleteBtn
                    AppointmentId={appointment.id}
                    onAppointmentDeleted={fetchAppointments}
                  />
                </td>
              </tr>
              ))}
            </tbody>
            <tfoot>
            <th></th>
                    <th>ID</th>
                    <th>İsim</th>
                    <th>Soyisim</th>
                    <th>Mail</th>
                    <th>Telefon</th>
                    <th>Tarih</th>
                    <th>Süre</th>
                    <th>Kategori</th>
                    <th>İşlem</th>
                    <th>Çalışan</th>
                    <th>İşlem</th>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}
