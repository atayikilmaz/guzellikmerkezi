"use client";

import { useState, useEffect } from "react";
import { Appointment, Service } from "@/store";
import DeleteBtn from "@/components/AdminDeleteBtn";

export default function AdminAppointmentTable() {
  const [appointments, setAppointments] = useState<null | Appointment[]>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [services, setServices] = useState<null | Service[]>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  

  const handleWorkerChange = async (appointmentId: number, newWorkerId: number) => {
    try {
      const url = `/api/changeWorker?appointmentId=${appointmentId}&newWorkerId=${newWorkerId}`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update appointments after worker change
        fetchAppointments();
      } else {
        console.error('Failed to change worker');
      }
    } catch (error) {
      console.error('Error changing worker:', error);
    }
  };
  
  

  const fetchAppointments = () => {
    fetch("/api/appointments")
      .then((response) => response.json())
      .then((data) => {
        // Sort appointments by time
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

      console.log(workers);
      
  }, []);

  const getWorkerNameById = (workerId: number | undefined) => {
    if (!workerId) return "N/A";
    const worker = workers.find((worker) => worker.id === workerId);
    return worker?.name || "N/A";
  };

  const getServiceNameById = (serviceIds: number[] | undefined) => {
    if (!serviceIds || serviceIds.length === 0) return "N/A";
    const serviceNames = serviceIds.map((serviceId) => {
      const service = services?.find((service) => service.id === serviceId);
      return service ? service.name : "N/A";
    });

    const formattedServiceNames = serviceNames.map((name) =>
      name.replace(/\([^)]*\)/g, "")
    );
    return formattedServiceNames.join(", ");
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleWorkerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const workerName = event.target.value.trim();
    setSelectedWorkerId(null); // Set to null initially

    
      const selectedWorker = workers.find(
        (worker) => worker.name === workerName
      );
      setSelectedWorkerId(selectedWorker ? selectedWorker.id : null);
    
  };

  const filteredAppointments: Appointment[] =
    appointments?.filter((appointment) => {
      if (!appointment.date) return false;

      const appointmentDate = new Date(appointment.date);
      const selectedDateObj = new Date(selectedDate);

      const isDateMatch =
        appointmentDate.getDate() === selectedDateObj.getDate() &&
        appointmentDate.getMonth() === selectedDateObj.getMonth() &&
        appointmentDate.getFullYear() === selectedDateObj.getFullYear();

      const isWorkerIdMatch =
        selectedWorkerId === null || appointment.worker_id === selectedWorkerId;

      return isDateMatch && isWorkerIdMatch;
    }) ?? [];

  return (
    <div className="m-8 mx-auto text-center">
      <div className="m-8 mx-auto py-8 ">
        <div className="overflow-x-auto">
          <label className="font-semibold" htmlFor="selectedDate">
            Tarih Seçiniz:{" "}
          </label>
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
          <label className="font-semibold">Çalışan İsmi:</label>
          <div>
            <button
              className={`border-2 px-2 py-1 mx-1 my-1 btn ${
                selectedWorkerId === null ? "bg-teal-300" : ""
              }`}
              onClick={() => setSelectedWorkerId(null)}
            >
              Tüm Çalışanlar
            </button>
            <button
              className={`border-2 px-2 py-1 mx-1 my-1 btn ${
                selectedWorkerId === 6 ? "bg-teal-300" : ""
              }`}
              onClick={() => setSelectedWorkerId(6)}
            >
              EMS
            </button>
            {workers.map((worker) => {
              if (worker.name !== "Devam Etmek İçin Tıklayınız") {
                return (
                  <button
                    key={worker.id}
                    className={`border-2 px-2 py-1 my-1 mx-1 btn ${
                      selectedWorkerId === worker.id ? "bg-teal-300" : ""
                    }`}
                    onClick={() => setSelectedWorkerId(worker.id)}
                  >
                    {worker.name}
                  </button>
                );
              }
              return null;  
            })}
          </div>
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
                <th>Kategori</th>
                <th>İşlem</th>
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
                  <td>{appointment.category}</td>
                  <td>{getServiceNameById(appointment.services_id)}</td>
                  <td>
                  <select
                      value={appointment.worker_id ?? -1}
                      onChange={(e) =>
                        handleWorkerChange(appointment.id, parseInt(e.target.value))
                      }
                    >
                      <option value={-1}>Select Worker</option>
                      {workers.map((worker) => (
                        // Check if the worker's categories include the appointment's category
                        worker.categories.includes(appointment.category) ? (
                          <option key={worker.id} value={worker.id}>
                            {worker.name}
                          </option>
                        ) : null
                      ))}
                    </select>
    </td>              <td>
                    <DeleteBtn
                      AppointmentId={appointment.id}
                      onAppointmentDeleted={fetchAppointments}
                    />
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
                <th>Kategori</th>
                <th>İşlem</th>
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
