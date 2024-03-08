"use client"



import React, { useState } from "react";

interface AdminDeleteBtnProps {
  AppointmentId: number;
  onAppointmentDeleted: () => void;
}
//

export default function AdminDeleteBtn({
  AppointmentId,
  onAppointmentDeleted,
}: AdminDeleteBtnProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDeleteAppointment = async () => {
    try {
      setIsDeleting(true);
      setIsConfirmationOpen(false);


       // Call the email sending API here with just the ID
       const emailResponse = await fetch("/api/delete-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: AppointmentId }),
      });

      if (emailResponse.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
      // Make the DELETE request to the API endpoint
      const response = await fetch(`/api/delete-appointment?appointmentId=${AppointmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {


        
     

        setIsDeleting(false);
        setAlertMessage("Randevu Başarılı Bir Şekilde İptal Edildi");
        setAlertType(1);
        onAppointmentDeleted();
      } else {
        throw new Error("Failed to delete appointment.");
      }
    } catch (error) {
      setIsDeleting(false);
      console.error("Failed to delete appointment:", error);
      setAlertMessage("Hata! Randevu İptal Edilemedi");
      setAlertType(2);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-error w-20"
        onClick={() => setIsConfirmationOpen(true)}
      >
        Sil
      </button>
      {isConfirmationOpen && (
        <div className=" fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg">Silmek İstediğinize Emin Misiniz?</h3>
            <p className="py-4">Bu işlemi geri alamazsınız.</p>
            <button
              className="btn btn-sm btn-error mx-2"
              onClick={handleDeleteAppointment}
              disabled={isDeleting}
            >
              {isDeleting ? "Siliniyor..." : "Evet, Sil"}
            </button>
            <button
              className="btn btn-sm btn-outline mt-2 mx-2"
              onClick={() => setIsConfirmationOpen(false)}
            >
              İptal
            </button>
          </div>
        </div>
      )}
      {alertMessage && (
        <div className="fixed inset-0 flex items-start mt-4  justify-center opacity-100 z-50">
          <div className={`alert ${alertType === 1 ? "alert-success" : "alert-error"} mx-auto max-w-2xl z-50`}>
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
        </div>
      )}
    </div>
  );
}
