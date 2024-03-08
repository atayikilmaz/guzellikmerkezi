"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppointmentsStore, Appointment } from '@/store';
import {decodeHash} from '@/components/Hash';

export default function Cancel({
  params,
}: {
  params: { appointmentId: string };
}) {
  const { fetchAppointments } = useAppointmentsStore();
  
  const appointmentId = Number(decodeHash(params.appointmentId));

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(0);

  useEffect(() => {
    console.log(params.appointmentId);
    console.log(decodeHash(params.appointmentId));
    
    console.log(appointmentId);
    
    fetchAppointments();
  }, []);

  const appointments = useAppointmentsStore<Appointment[]>(
    // Specify the type explicitly
    (state) => state.appointments.filter((appointment) => appointment.id === appointmentId)
  );

  const appointment = appointments[0];

  if (!appointment) {
    return <div className="text-center pt-8">Lütfen Bekleyiniz</div>;
  }

  const handleDeleteAppointment = async () => {
    try {
      setIsDeleting(true);

      // Make a DELETE request to the API endpoint
      const response = await fetch(`/api/delete-appointment?appointmentId=${appointmentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsDeleting(false);

        // Display success message
        setAlertMessage('Randevu Başarılı Bir Şekilde İptal Edildi');
        setAlertType(1);

        // Navigate to the desired page after successful deletion

        setTimeout(() => {
          router.push('/');

        }, 2000);

      } else {
        throw new Error('Failed to delete appointment.');
      }
    } catch (error) {
      setIsDeleting(false);
      // Handle error
      console.error('Failed to delete appointment:', error);
      // Display error message
      setAlertMessage('Hata! Randevu İptal Edilemedi Lütfen İletişime Geçiniz');
      setAlertType(2);
    }
  };

  const appointmentDate = appointment.date
          ? (() => {
              const date = new Date(appointment.date);
              date.setHours(date.getHours() + 0);

              const formattedDate = `${date.toLocaleDateString("tr-TR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`;
               

              const formattedTime = `${date.getHours()}:${(
                "0" + date.getMinutes()
              ).slice(-2)}`;

              return `${formattedDate} ${formattedTime}`;
            })()
          : "";

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md text-center mx-4 my-4">
        <h1 className="text-xl font-semibold mb-4">Randevu Bilgileri</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Modified CSS classes */}
          <div className="md:col-span-2">
            {/* Modified CSS class */}
            <p className="font-semibold">İsim:</p>
            <p>{appointment.name}</p>
          </div>
          <div className="md:col-span-2">
            {/* Modified CSS class */}
            <p className="font-semibold">Soyisim:</p>
            <p>{appointment.surname}</p>
          </div>
          <div className="md:col-span-2">
            {/* Modified CSS class */}
            <p className="font-semibold">Email:</p>
            <p>{appointment.mail}</p>
          </div>
          <div className="md:col-span-2">
            {/* Modified CSS class */}
            <p className="font-semibold">Telefon:</p>
            <p>{appointment.phone}</p>
          </div>
          <div className="md:col-span-2">
            {/* Modified CSS class */}
            <p className="font-semibold">Tarih:</p>
            <p>
              {appointmentDate}
            </p>
          </div>
          <div className="md:col-span-2">
            {/* Modified CSS class */}
            <p className="font-semibold">Süre:</p>
            <p>{appointment.time}</p>
          </div>
        </div>
      </div>



      <div className="text-center">






        <button
        className="btn btn-error "
        onClick={() => {
          if (document) {
            (document.getElementById('my_modal_2') as HTMLFormElement).showModal();
          }
        }}
      >
        İptal Et
      </button>
      <dialog id="my_modal_2" className="modal z-20">
        <form method="dialog" className="modal-box text-center">
          <h3 className="font-bold text-lg">
            İptal Etmek İstediğinize Emin Misiniz?
          </h3>
          <p className="py-4 text-sm">Çıkmak İçin Kutunun Dışına Tıklayın</p>
          <button
            className="btn  btn-error "
            onClick={handleDeleteAppointment}
            disabled={isDeleting}
          >
          {isDeleting ? 'Evet...' : 'Evet'}
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>Kapat</button>
        </form>
      </dialog>

        {alertMessage && (
          <div className="fixed inset-0 flex items-start mt-6 justify-center opacity-100 z-50">
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
        )}
      </div>
    </>
  );
}
