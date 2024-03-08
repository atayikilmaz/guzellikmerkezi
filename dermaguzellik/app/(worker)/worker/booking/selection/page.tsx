"use client";
import React, { useState } from "react";
import Table from "@/components/Table";
import { useFormStore } from "@/store";
import { useRouter, usePathname } from "next/navigation";

export default function Cilt() {

    const selectedService = useFormStore((state) => state.form.selection);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add disabled state variable
    const pathName = usePathname();
    const handleTotalTimeUpdate = (newTotalTime: number) => {
      setTotalTime(newTotalTime);
    };
    const router = useRouter();
  
    const handleTotalCostUpdate = (newTotalCost: number) => {
      setTotalCost(newTotalCost);
    };
  
    const form = useFormStore((state) => state.form);
  
  
    async function handleSubmit(
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> {
      event.preventDefault();
    
      setIsButtonDisabled(true);
      
      
      
      if (form.service_id.length === 0) {
        // Display an error message or perform any necessary actions
        return;
      }
    
      try {
        
        if (pathName === "/worker/booking/selection") {
          router.push("/worker/booking/selection/date-picker")
  
        }else
        router.push("/worker/booking/selection/date-picker")
        
      } catch (error) {
        // Handle error
      }
    }


    return(
        <div className="mx-4 pt-16">
            

 



    <div className="max-w-7xl text-center mx-auto space-y-4">
      <div className="collapse collapse-arrow bg-base-200  ">
        <input type="radio" name="my-accordion-2" checked={true}  />
        <div className="collapse-title text-xl font-medium">
          {selectedService} Fiyat Listesi
        </div>
        <div className="collapse-content">
          <Table
            selectedService={selectedService}
            onTotalTimeUpdate={handleTotalTimeUpdate}
            onTotalCostUpdate={handleTotalCostUpdate}
          />
        </div>
      </div>
      <div className="badge badge-lg">Toplam Süre: {totalTime}dk</div>
      
      {(form.selection === "Protez Tırnak" || form.selection === "Klasik Manikür/Pedikür" || form.selection === "Masaj"  || form.selection === "Kaş/Kirpik Laminasyonu") && <div className="badge badge-lg">Toplam Fiyat: {totalCost}₺</div>}

      <div className="flex justify-center pt-4 pb-24">
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-accent text-slate-100 w-full mt-4"
          disabled={form.service_id.length === 0 || isButtonDisabled} // Disable the button if no services are checked
        >
          Devam
        </button>
      </div>
    </div>
  


        </div>
    )
}