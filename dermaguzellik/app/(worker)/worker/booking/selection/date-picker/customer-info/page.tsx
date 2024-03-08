"use client"



import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useFormStore, FormValues } from '@/store';

export default function Booking() {
  const form = useFormStore((state) => state.form);
  const setForm = useFormStore((state) => state.setForm);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add disabled state variable

  

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(1);

  const router = useRouter();


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

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

        // Reset form values
        setForm({
          selection: "",
          service_id: [],
          date: null,
          cost: null,
          time: null,
          selectedWorker: null,
        });
         // Clear the selectedTime

        setTimeout(() => {
          router.push("/worker/booking/selection/date-picker/customer-info/appointment-info");
        }, 3000);
      } else {
        setAlertMessage("Hata Randevunuz Alınamadı!");
        setAlertType(0);
        setTimeout(() => {
          router.push("/worker");
        }, 3000);
      }
    } catch (error) {
      setAlertMessage("Hata Randevunuz Alınamadı!");
      setAlertType(0);
      setTimeout(() => {
        router.push("/worker");
      }, 3000);
    }
  }




  return (
    <div className="mx-4">
      <h1 className='text-center p-4 text-xl font-semibold text-red-600'>Personel Randevu Sistemi</h1>
      <div className="max-w-xl mx-auto mt-12">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">İsim</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="İsim"
              className="input input-bordered"
              
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Soyisim</span>
            </label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
              placeholder="Soyisim"
              className="input input-bordered"
              
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mail</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Mail"
              className="input input-bordered"
              
            />
          </div>
          <div className="form-control">
  <label className="label">
    <span className="label-text">Telefon</span>
  </label>
  <input
    type="tel"
    name="phone"
    value={form.phone}
    onChange={(e) => {
      const phoneNumber = e.target.value;
      // Validate phone number length
      if (phoneNumber.length <= 11) {
        setForm({ ...form, phone: phoneNumber });
      }
    }}
    placeholder="05*********"
    className="input input-bordered"
    
    title="Phone number must be 11 digits" // Set a custom validation message

  />
</div>
        

          <div className="flex justify-center pt-4 pb-24">
            <button
              type="submit"
              className="btn btn-error text-slate-100 w-full mt-4"
              disabled={isButtonDisabled}
            >
              BİTİR
            </button>
          </div>
        </form>
      </div>



      {alertMessage && (
        <>
          <div className="fixed inset-0 flex items-center justify-center opacity-100">
            {alertType === 1 ? (
              <div className="alert alert-success mx-auto max-w-2xl">
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
              <div className="alert alert-error mx-auto max-w-2xl">
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
