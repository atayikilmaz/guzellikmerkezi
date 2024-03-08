"use client";

import React, { useEffect } from "react";
import { useWorkersStore, useFormStore } from "@/store";
import Image from "next/image";

interface Worker {
  id: number;
  name: string;
  categories: string[];
  src: string;
}

interface WorkerSelectionProps {
  onWorkerSelected: (workerSelected: boolean) => void;
}

export default function WorkerSelection({
  onWorkerSelected,
}: WorkerSelectionProps) {
  const { workers, fetchWorkers } = useWorkersStore();
  const form = useFormStore((state) => state.form);
  const selectedCategory = form.selection;

  useEffect(() => {

 // Reset the selected worker on component load
 useFormStore.setState((state) => ({
  form: {
    ...state.form,
    selectedWorker: null, // Reset the selected worker to null
  },
}));

    fetchWorkers();
  }, []);

  const handleWorkerSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    worker: Worker
  ) => {
    const selectedWorkerId = worker.id;
    const workerSelected = form.selectedWorker === worker.id;
    // Update the selected worker ID in the form state
    useFormStore.setState((state) => ({
      form: {
        ...state.form,
        selectedWorker: selectedWorkerId,
      },
    }));

    // Notify the parent component if a worker is selected
    onWorkerSelected(!workerSelected);
    console.log(workerSelected);
  };

  // Filter workers based on the selected category
  const filteredWorkers = workers.filter((worker) =>
    worker.categories.includes(selectedCategory)
  );

  return (
    <div className="border-2 border-teal-400 rounded-xl border-solid mt-8 mx-8 ">
      <h1 className="text-center text-xl font-bold my-4 mx-4 underline underline-offset-8 decoration-teal-400">
        Görevli Seçiniz
      </h1>
      <div className="flex justify-center  mx-2">
        {filteredWorkers.map((worker: Worker) => (
          <div key={worker.id}>
            <label className="label cursor-pointer">
              <div className="label-text text-lg font-semibold px-2">
                {worker.name}
              </div>
              <input
                type="radio"
                name="worker"
                className="radio radio-accent "
                value={worker.id}
                checked={form.selectedWorker === worker.id}
                onChange={(event) => handleWorkerSelection(event, worker)}
              />
              <div className="avatar p-2">
                <div className="w-12 md:w-24 rounded-full">
                  <Image
                    src={worker.src}
                    alt={worker.name}
                    width={250}
                    height={250}
                  />
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}