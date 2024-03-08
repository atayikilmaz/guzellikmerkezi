import nodemailer from 'nodemailer';
import { useFormStore } from '@/store';

//bütün dosya silinebilir gereksiz

export async function sendAppointmentInfo() {
  try {
    // Get form data
    const form = useFormStore((state) => state.form);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    // Define email options
     const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: form.email,
      subject: 'Randevu Bilgileri',
      html: `
        <div class="p-4 bg-white rounded-lg shadow-md text-center mx-4 my-4">
          <h1 class="text-xl font-semibold mb-4">Randevu Bilgileri</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <p class="font-semibold">İsim:</p>
              <p>${form.name}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">Soyisim:</p>
              <p>${form.surname}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">Email:</p>
              <p>${form.email}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">Telefon:</p>
              <p>${form.phone}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">İşlem:</p>
              <p>${form.selection}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">Tarih:</p>
              <p>${form.date ? form.date.toLocaleString('default', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }) : ''}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">Tutar:</p>
              <p>${form.cost}</p>
            </div>
            <div class="md:col-span-2">
              <p class="font-semibold">Süre:</p>
              <p>${form.time}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(error);
  }
}

sendAppointmentInfo();