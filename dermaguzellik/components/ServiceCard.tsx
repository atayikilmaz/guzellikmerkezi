"use client";

import Image from "next/image";
import { useState, useRef } from "react";

interface ServicesPageProps {
  title: string;
  content: string;
  imageSrc: string;
}

const ServicesPage: React.FC<ServicesPageProps> = ({
  title,
  content,
  imageSrc,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    
      <div className="mx-auto">
        <button onClick={openModal}>
          <div className=" mt-8 card w-64 h-64 bg-base-100 shadow-xl mx-auto transition cursor-pointer hover:cursor-pointer hover:shadow-2xl relative text-center">
            {/* Use next/image instead of img tag */}
            <figure>
              <Image src={imageSrc} alt={title} width={1000} height={1000} />
            </figure>
            <div className="card-body text-center mx-auto">
              <h2 className="card-title ">{title}</h2>
              <div className="card-actions justify-end">
                {/* Remove the button element */}
              </div>
            </div>
          </div>
        </button>
        <dialog ref={modalRef} className="modal">
          {/* Modal content goes here */}
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{content}</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Kapat</button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            {/* You can add a close button or other controls here */}
            <button onClick={closeModal}>Kapat</button>
          </form>
        </dialog>
      </div>
    
  );
};

export default ServicesPage;
