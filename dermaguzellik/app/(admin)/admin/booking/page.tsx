"use client"



import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useFormStore, FormValues } from '@/store';

export default function Booking() {
  const form = useFormStore((state) => state.form);
  const setForm = useFormStore((state) => state.setForm);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add disabled state variable

  
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);

    console.log(form);

    router.push('/admin/booking/selection');
  };


  return (
    <div className="mx-4">
      <h1 className='text-center p-4 text-xl font-semibold text-red-600'>Admin Randevu Sistemi</h1>
      <div className="max-w-xl mx-auto mt-12">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
           
          </div>

          <div className="form-control">
           
          </div>

          <div className="form-control">
           
          </div>

          <div className="form-control">

</div>

          <div className="pt-8 space-y-4"></div>

          <div className="form-control w-full max-w-xs mx-auto">
            <label className="label">
              <span className="label-text">İşlem Seçiniz</span>
            </label>
            <select
              name="selection"
              value={form.selection}
              onChange={(e) => setForm({ ...form, selection: e.target.value })}
              className="select select-bordered select-accent"
              required
            >
              <option disabled value="">
                İşlem Seçiniz
              </option>
              <option>Protez Tırnak</option>
              {/* <option>Kalıcı Makyaj</option> */}
              <option>Klasik Manikür/Pedikür</option>
              <option>Cilt Bakımı</option>
              <option>Bölgesel İncelme</option>
              <option>Ems Kas Simülatörü</option>
              <option>Çatlak Bakımı</option>
              <option>Ağda/Kaş/Bıyık</option>
              <option>Kaş/Kirpik Laminasyonu</option>
              <option>Masaj</option>
              <option>Lazer Epilasyon</option>
            </select>
            <label className="label">
              <span className="label-text-alt">
                Bir sonraki adımda detaylı işlem seçebilirsiniz
              </span>
            </label>
          </div>

          <div className="flex justify-center pt-4 pb-24">
            <button
              type="submit"
              className="btn btn-accent text-slate-100 w-full mt-4"
              disabled={isButtonDisabled}
            >
              Devam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
