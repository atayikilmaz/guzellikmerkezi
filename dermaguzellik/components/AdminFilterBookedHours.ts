import { Appointment } from "@/store";

//normali ile fark protez tırnakta aralıklar yarım saat 


export async function getAvailableTimes(
  appointments: Appointment[],
  selectedWorker: number | null,
  selectedDate: Date | null,
  selectedService: string,
  selectedAppointmentDuration: number | null
)  {
  if (!Array.isArray(appointments)) {
    return [];
  }


 //tırnak ve kaş kirpikte makine limitlemesi olmadığı için işçiye göre diğerlerinde kategoriye göre filtreleniyor
 
  let filteredAppointments = appointments.filter((appointment: Appointment) => {
    
    
    if (
      (selectedService === "Protez Tırnak" || selectedService === "Kaş/Kirpik Laminasyonu") &&
      (selectedWorker !== null && appointment.worker_id !== selectedWorker)
    ) {
      return false;
    }

    //cilt bakımı ve masaj odaları aynı olduğu için aynı zamanda randevu vermemek içi birlikte filtreleniyor

    if (
      (selectedService === "Bölgesel İncelme" || selectedService === "Ems Kas Simülatörü") &&
      ((("Bölgesel İncelme" !== appointment.category && "Ems Kas Simülatörü" !== appointment.category)) && (selectedWorker !== appointment.worker_id))

  ) {
      return false;
  }


    if (
      (selectedService !== "Protez Tırnak" && selectedService !== "Kaş/Kirpik Laminasyonu" &&
       selectedService !== "Bölgesel İncelme" && selectedService !=="Ems Kas Simülatörü") &&
      ((selectedService !== appointment.category) && (selectedWorker !== appointment.worker_id))
    ) {
      return false; 
    }


    if (
      appointment.date &&
      selectedDate !== null &&
      new Date(appointment.date).toDateString() !==
        selectedDate.toDateString()
    ) {
      return false; // Skip appointments with different date
    }

    
    return true; // Include the appointment in the filtered results
  });

  // Retrieve the booked times
  const bookedTimes: { start: number; end: number }[] =
    filteredAppointments.map((appointment: Appointment) => {
      const { date, time } = appointment;
      const appointmentTime = date ? new Date(date).getTime() : 0; // Use 0 if date is undefined
      const appointmentDuration = time || 0; // Duration in minutes
      const appointmentEndTime = appointmentTime + appointmentDuration * 60000; // Convert minutes to milliseconds
      console.log(filteredAppointments);
      
      return { start: appointmentTime, end: appointmentEndTime };
    });

  const timeSlots = []; // Array to store the converted time slots

  if (selectedDate === null) {
    throw new Error("Tarih Seçilmedi")
  }

  // Define the start and end times for the time slots
  const startTime = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    10,
    0
  ); // Set the start time to 9:00 AM

  
 // Define the end time for the time slots
let endTime = new Date(
  selectedDate.getFullYear(),
  selectedDate.getMonth(),
  selectedDate.getDate(),
  19,
  0
);



  // Apply GMT+3 timezone offset
  const timeZoneOffset = 3 * 60; // Offset in minutes
  startTime.setMinutes(startTime.getMinutes());
  endTime.setMinutes(endTime.getMinutes());

  let currentTime = startTime;
// Generate the time slots with half-hour increments
while (currentTime <= endTime) {
    const timeSlot = currentTime.getTime(); // Convert the current time to Unix timestamp
  
    // Only include the time slot if it's in the future
    if (timeSlot > Date.now()) {
      timeSlots.push(timeSlot); // Add the Unix timestamp to the time slots array
    }
  
    currentTime = new Date(currentTime.getTime() + 30 * 60000); // Increment the current time by 30 minutes
  }




  // Filter the time slots that are not booked

  // Calculate the maximum end time based on the selected service
let maxEndTime = 19.5; // Default maximum end time (7:30 PM)

if (selectedService === "Protez Tırnak") {
  maxEndTime = 20.0; // Maximum end time for "Protez Tırnak" (8:00 PM)
}

const availableTimes = timeSlots.filter((timeSlot: number) => {
  // Calculate the end time of the appointment
  const endTime = selectedAppointmentDuration !== null ? timeSlot + selectedAppointmentDuration * 60000 : null;
  const endDateTime = endTime !== null ? new Date(endTime) : null;

  // Check if the current time slot overlaps with any booked time
  const overlap = bookedTimes.some(
    (bookedTime: { start: number; end: number }) =>
      (timeSlot >= bookedTime.start && timeSlot < bookedTime.end) ||
      (endTime !== null && endTime > bookedTime.start && endTime <= bookedTime.end) ||
      (endTime !== null && timeSlot < bookedTime.start && endTime > bookedTime.end)
  );

  const exceedsEndTime =
    endDateTime !== null && endDateTime.getHours() + endDateTime.getMinutes() / 60 > maxEndTime;

  return !overlap && !exceedsEndTime; // Return true if the time slot is not booked and doesn't exceed the maximum end time
});
  

  function convertToDates(unixTimestamps: number[]): string[] {
    const dateArray: string[] = unixTimestamps.map((timestamp: number) => {
      const date: Date = new Date(timestamp);
      const dateString: string = date.toLocaleDateString('tr-TR');
      const timeString: string = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });

      return `${dateString} ${timeString}`;
    });
    return dateArray;
  }

 
  

  return convertToDates(availableTimes) ;
}



