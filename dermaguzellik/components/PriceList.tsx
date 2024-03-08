import Image from "next/image";

export default function PriceList({ imageSrc }: { imageSrc: { src: string; name: string }[] }) {
  return (
    <div className="bg-gray-100" id="prices">
      <h1 className=" text-center text-4xl font-bold pt-16 ">Fiyat Listesi</h1>

      <div className=" my-16 xl:w-2/3 xl:mx-auto md:mx-8 mx-2 pb-8">
        {imageSrc.map((src, index) => {
          return (
            <div key={index} className="text-center collapse collapse-arrow bg-teal-400 my-4">
              <input type="checkbox" name="my-accordion-2" />
              <div className="pl-10 collapse-title text-xl font-medium">
                {src.name}
              </div>
              <div className="collapse-content">
                <Image
                  src={src.src}
                  alt={src.name}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full md:w-1/2 h-auto mx-auto" // Use w-full for small devices and md:w-1/2 for medium devices and above
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
