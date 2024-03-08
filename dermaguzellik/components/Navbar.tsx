"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  const scrollToElement = (id: string) => {
    if (pathName !== "/") {
      router.push("/");
    }
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight =
        (document.querySelector(".navbar") as HTMLElement)?.offsetHeight || 0;
      const offsetTop = element.offsetTop - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="drawer sticky top-0 z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-between">
          {/* Navbar */}
          <div className="w-full navbar bg-base-100 shadow-md flex justify-between ">
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
            <Link href={"/"} className="w-36 lg:w-44 mr-3">
              <Image
                src="/img/logo.webp" // Provide the correct path to the image
                alt="Atakent Derma Güzellik"
                className="w-auto h-auto max-w-full max-h-full mx-4 flex-1 "
                priority 
                width={400}
                height={400}
              />
            </Link>

            <div className="flex-1 hidden lg:block text-center">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <button
                    onClick={() => router.push("/")}
                    className="text-lg font-semibold py-4"
                  >
                    Ana Sayfa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToElement("services")}
                    className="text-lg font-semibold py-4"
                  >
                    Hizmetlerimiz
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToElement("prices")}
                    className="text-lg font-semibold py-4"
                  >
                    Fiyat Listesi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToElement("promos")}
                    className="text-lg font-semibold py-4"
                  >
                    Kampanyalar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToElement("contact")}
                    className="text-lg font-semibold py-4"
                  >
                    İletişim
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="pl-4 mr-2 ">
              <a href="https://www.instagram.com/atakentdermaguzellik/" aria-label="instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </a>
               <Link
                className="btn btn-accent px-2 md:px-4 mr-2 ml-4 md:ml-6 md:mr-6 text-slate-100 justify-end "
                href={"/booking"}
              >
                Randevu Al
              </Link> 
            </div>
          </div>
        </div>
        
        <div className="drawer-side" style={{ zIndex: 999 }}>
  <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
  <ul className="menu p-4 text-base w-80 h-full bg-base-200 flex justify-between">
    {/* Scroll to elements instead of routing */}
    
    <div className="flex flex-col justify-center items-center"> {/* Add flex classes */}
      <li className="w-full text-center"> {/* Add text-center class */}
        <button onClick={() => router.push("/")} className="font-semibold py-3 w-full mx-auto  ">
          Ana Sayfa
        </button>
      </li>
      <li className="w-full text-center"> {/* Add text-center class */}
        <button
          onClick={() => scrollToElement("services")}
          className="font-semibold py-3"
        >
          Hizmetlerimiz
        </button>
      </li>
      <li className="w-full text-center"> {/* Add text-center class */}
        <button
          onClick={() => scrollToElement("prices")}
          className="font-semibold py-3"
        >
          Fiyat Listesi
        </button>
      </li>
      <li className="w-full text-center"> {/* Add text-center class */}
        <button
          onClick={() => scrollToElement("promos")}
          className="font-semibold py-3"
        >
          Kampanyalar
        </button>
      </li>
      <li className="w-full text-center"> {/* Add text-center class */}
        <button
          onClick={() => scrollToElement("contact")}
          className="font-semibold py-3"
        >
          İletişim
        </button>
      </li>
    </div>

    <div className="w-full text-center"> {/* Add text-center class */}
      
        <button
          onClick={() => router.push("/worker")}
          className="btn btn-neutral btn-sm text-center w-full"
        >
          Personel Gİrİş
        </button>
      
    </div>
  </ul>
</div>


      </div>
    </>
  );
}
