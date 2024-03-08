import { create } from "zustand";

export interface FormValues {
  name: string;
  surname: string;
  email: string;
  phone: string;
  selection: string;
  service_id: number[] | [];
  date: Date | null;
  cost: number | null;
  time: number | null;
  selectedWorker: number | null;
}

interface FormState {
  form: FormValues;
  setForm: (
    form: Partial<FormValues> & { selectedWorkerId?: number | null }
  ) => void;
  setServiceId: (ids: number[]) => void;
}

export const useFormStore = create<FormState>((set) => ({
  form: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    selection: "",
    service_id: [],
    date: null,
    cost: null,
    time: null,
    selectedWorker: null,
  },
  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
  setServiceId: (ids) =>
    set((state) => ({
      form: {
        ...state.form,
        service_id: ids,
      },
    })),
}));

{
  /* Hizmetler */
}
export interface Service {
  id: number;
  name: string;
  price: number;
  time: number;
  category: string;
}

interface ServicesState {
  services: Service[];
  fetchServices: () => Promise<void>;
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  fetchServices: async () => {
    try {
      const response = await fetch("/api/services", { next: { revalidate: 10 } });
      const services = await response.json();
      set({ services });
    } catch (error) {
      console.error(error);
    }
  },
}));

{
  /* İşçiler */
}
export interface Workers {
  id: number;
  name: string;
  categories: string[];
  src: string;
}

interface WorkersState {
  workers: Workers[];
  fetchWorkers: () => Promise<void>;
}

export const useWorkersStore = create<WorkersState>((set) => ({
  workers: [],
  fetchWorkers: async () => {
    try {
      const response = await fetch("/api/workers", { next: { revalidate: 10 } });
      const workers = await response.json();
      set({ workers });
    } catch (error) {
      console.error(error);
    }
  },
}));

{
  /*randevular */
}
export interface Appointment {
  id: number;
  name?: string;
  surname?: string;
  mail?: string;
  phone?: number;
  date?: Date;
  cost?: number;
  time?: number;
  services_id?: number[];
  worker_id?: number;
  category?: string;
}

interface AppointmentsState {
  appointments: Appointment[];
  fetchAppointments: () => Promise<void>;
}

export const useAppointmentsStore = create<AppointmentsState>((set) => ({
  appointments: [],
  fetchAppointments: async () => {
    try {
      const url = "/api/appointments";

      const response = await fetch(url, { next: { revalidate: 0 } });

      const appointments = await response.json();
    

      set({ appointments });
    } catch (error) {
      console.error(error);
    }
  },
}));
