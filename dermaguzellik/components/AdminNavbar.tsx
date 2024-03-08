"use client";
import React from "react";
import Link from "next/link";

export default function AdminNavbar() {
  return (
    <>
    
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-100">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <Link href={"/admin"}>
              <img className="w-20 mx-2" src="/favicon.ico" alt="" />
            </Link>
            <Link href={"/admin"} className="flex-1 px-2 mx-2 text-lg font-bold">
              Derma <br /> Admin
            </Link>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link href={"/admin/booking"} className="font-semibold">
                   Randevu Ekle
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/appointments"} className="font-semibold">
                    Aktif Randevular
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/search-name"} className="font-semibold">
                    İsim ile Randevu Arama
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/prices"} className="font-semibold">
                    Fiyatlar
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/promos"} className="font-semibold">
                    Kampanyalar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side" style={{ zIndex: 999 }}>
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 text-base w-80 h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
                  <Link href={"/admin/booking"} className="font-semibold">
                   Randevu Ekle
                  </Link>
                </li>
            <li>
                  <Link href={"/admin/appointments"} className="font-semibold">
                    Aktif Randevular
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/search-name"} className="font-semibold">
                    İsim ile Randevu Arama
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/prices"} className="font-semibold">
                    Fiyatlar
                  </Link>
                </li>
                <li>
                  <Link href={"/admin/promos"} className="font-semibold">
                    Kampanyalar
                  </Link>
                </li>
          </ul>
        </div>
      </div>
    </>
  );
}
