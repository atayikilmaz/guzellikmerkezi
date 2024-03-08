"use client";

import React, { useEffect, useState } from "react";
import { useServicesStore, useFormStore } from "@/store";

// Interface for the service object
interface Service {
  id: number;
  name: string;
  price: number;
  time: number;
  category: string;
}

// Interface for the props of Table component
interface TableProps {
  onTotalTimeUpdate: (newTotalTime: number) => void;
  onTotalCostUpdate: (newTotalCost: number) => void;
  selectedService: string;
}

// Table component
export default function Table({
  onTotalTimeUpdate,
  onTotalCostUpdate,
  selectedService,
}: TableProps) {
  const { services, fetchServices } = useServicesStore();

  const [checkedServices, setCheckedServices] = useState<Service[]>([]);

  const [totalTime, setTotalTime] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const form = useFormStore((state) => state.form);

  const setForm = useFormStore((state) => state.setForm);

  // Fetch services on component mount
  useEffect(() => {
    setForm({
      service_id: [], // Reset the selected service IDs
      cost: 0,        // Reset the total cost
      time: 0,        // Reset the total time
    });
    fetchServices();
    
  }, []);

  // Update total time and total cost when they change
  useEffect(() => {
    onTotalTimeUpdate(totalTime);
    onTotalCostUpdate(totalCost);
  }, [totalTime, totalCost, onTotalTimeUpdate, onTotalCostUpdate]);

  const handleServiceCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    service: Service
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the checked service to the list
      setCheckedServices((prevCheckedServices) => [
        ...prevCheckedServices,
        service,
      ]);

      // Update total time and total cost
      const newTotalTime = totalTime + service.time;
      const newTotalCost = totalCost + Number(service.price);
      setTotalTime(newTotalTime);
      setTotalCost(newTotalCost);

      // Update the service_id value in the form state
      setForm({
        ...form,
        service_id: [...form.service_id, service.id],
        cost: newTotalCost,
        time: newTotalTime,
      });
    } else {
      // Remove the unchecked service from the list
      setCheckedServices((prevCheckedServices) =>
        prevCheckedServices.filter(
          (checkedService) => checkedService.id !== service.id
        )
      );

      // Update total time and total cost
      const newTotalTime = totalTime - service.time;
      const newTotalCost = totalCost - Number(service.price);
      setTotalTime(newTotalTime);
      setTotalCost(newTotalCost);

      // Update the service_id value in the form state
      const updatedServiceIds = form.service_id.filter(
        (id) => id !== service.id
      );
      setForm({
        ...form,
        service_id: updatedServiceIds,
        cost: newTotalCost,
        time: newTotalTime,
      });
    }
  };

  // Filter services based on the selected service category
  const filteredServices = services.filter(
    (service) => service.category === selectedService
  );

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>İşlem</th>
            <th>Süre</th>
            {(form.selection === "Protez Tırnak" || form.selection === "Klasik Manikür/Pedikür" || form.selection === "Masaj" || form.selection === "Kaş/Kirpik Laminasyonu") &&    <th>Fiyat</th>}
          </tr>
        </thead>
        <tbody>
        {filteredServices.map((service: Service) => {


  return (
    <tr key={service.id}>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox checkbox-accent"
            onChange={(event) => handleServiceCheck(event, service)}
            key={service.id} // Add key prop here
          />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{service.name}</div>
          </div>
        </div>
      </td>
      <td>{service.time}dk</td>
      {(form.selection === "Protez Tırnak" || form.selection === "Klasik Manikür/Pedikür" || form.selection === "Masaj" || form.selection === "Kaş/Kirpik Laminasyonu") && (
        <td>
          {service.price === null
            ? "Fiyat Listesine Bakınız"
            : `${service.price}₺`}
        </td>
      )}
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  );
}
