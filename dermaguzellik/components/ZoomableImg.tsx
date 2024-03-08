"use client"

import React, {useState, useEffect} from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import Image from "next/image";



const ZoomableImg = () => {

  const [validSrc, setValidSrc] = useState<string[]>([]);

  useEffect(() => {
    const fetchImage = async (index: number) => {
      try {
        const response = await fetch(`https://akjlcwvnlerbhsgmjmks.supabase.co/storage/v1/object/public/dermaPhoto/promos/kampanya${index}.webp`);
        if (response.ok) {
          // If the response is successful, add the image URL to the state.
          setValidSrc(prevValidSrc => [...prevValidSrc, response.url]);
        }
      } catch (error) {
        console.error(`Error fetching image ${index}:`, error);
      }
    };

    // Fetch images for indices 0 to 9.
    for (let i = 1; i < 6; i++) {
      fetchImage(i);
    }
  }, []);

  
 
  return (
    <div className="mb-64" id="promos">
            <h1 className="text-center text-4xl font-bold pt-16 my-24">Kampanyalar</h1>
        
      <div className="md:w-1/2 mx-auto w-11/12 my-2">
        <Flickity>
          {/* Map through imageSrc prop and render images */}
          {validSrc.map((validSrc, index) => (
            <div key={index} >
              {/* Use Next.js Image component */}
              <Image src={validSrc} alt={`Image ${index + 1}`} width={1000} height={1000} className="rounded" />
            </div>
          ))}
        </Flickity>
      </div>
    </div>
  );
};

export default ZoomableImg;
