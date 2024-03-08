import Image from "next/image";
import GetAppointment from "@/components/GetAppointment";

export default function Anasayfa() {
  return (
    <div>
      <div className="hero min-h-screen" style={{"background":"radial-gradient(circle, rgba(105,101,169,1) 0%, rgba(103,213,162,1) 0%, rgba(255,255,255,1) 100%)"}} id="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src="/img/facial.png" // Make sure the path is correct for your image
            alt="Derma Güzellik"
            width={1000} // Set the desired width of the image
            height={1000} // Set the desired height of the image
            className="max-w-xs w-full lg:max-w-xl rounded-lg shadow-2xl mb-6"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold text-black">
              Derma Güzellik Merkezine Hoşgeldiniz.
            </h1>
            <p className="py-6 text-md md:text-xl text-black">
              Atakent Derma Güzellik Merkezi olarak uzman ekibimiz ve son teknoloji
              cihazlarımız ile müşterilerimize bölgesel incelme, lazer
              epilasyon, kalıcı makyaj, cilt bakımı, protez tırnak gibi bir
              çok alanda hizmet vermekteyiz. 
            </p>

            <GetAppointment /> 
          </div>
        </div>
      </div>
    </div>
  );
}
