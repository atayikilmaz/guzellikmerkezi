"use client"

import React from "react";
import Link from "next/link";

export default function GetAppointment() {
    return (
        <div>
              <Link
                className="btn btn-accent text-slate-100 "
                href={"/booking"}
              >
                Randevu Al
              </Link>
            </div>
    )
}