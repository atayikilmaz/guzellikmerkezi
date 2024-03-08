"use client";

import { useFormStore } from "@/store";
import { useEffect, useState } from "react";

export default function AppointmentInfo() {
  const form = useFormStore((state) => state.form);
  const setForm = useFormStore((state) => state.setForm);

  // Step 1: Use state to store the initial form values
  const [initialForm, setInitialForm] = useState(form);

  // Step 2: Reset the form after the first render
  useEffect(() => {
    if (Object.keys(form).length > 0) {
      setInitialForm(form);
      setForm({
        selection: "",
        service_id: [],
        date: null,
        cost: null,
        time: null,
        selectedWorker: null,
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center mx-4 my-4">
      <h1 className="text-xl font-semibold mb-4">Randevu Bilgileri</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {/* Modified CSS classes */}
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">İsim:</p>
          <p>{initialForm.name}</p>
        </div>
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">Soyisim:</p>
          <p>{initialForm.surname}</p>
        </div>
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">Email:</p>
          <p>{initialForm.email}</p>
        </div>
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">Telefon:</p>
          <p>{initialForm.phone}</p>
        </div>
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">İşlem:</p>
          <p>{initialForm.selection}</p>
        </div>
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">Tarih:</p>
          <p>
            {initialForm.date
              ? initialForm.date.toLocaleString("default", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
              : ""}
          </p>
        </div>
        {(form.selection === "Protez Tırnak" || form.selection === "Klasik Manikür/Pedikür" || form.selection === "Masaj" || form.selection === "Kaş/Kirpik Laminasyonu" ) && (<div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">Tutar:</p>
          <p>{initialForm.cost}</p>
        </div>)}
        <div className="md:col-span-2">
          {" "}
          {/* Modified CSS class */}
          <p className="font-semibold">Süre:</p>
          <p>{initialForm.time}</p>
        </div>
      </div>
    </div>
  );
}
