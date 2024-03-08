"use client"

import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {

  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect (() => {
      const storedCookieConsent = getLocalStorage("cookie_consent", null)

      setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  
  useEffect(() => {
      const newValue = cookieConsent ? 'granted' : 'denied'

      window.gtag("consent", 'update', {
          'analytics_storage': newValue
      });

      setLocalStorage("cookie_consent", cookieConsent)

      //For Testing
      console.log("Cookie Consent: ", cookieConsent)

  }, [cookieConsent]);

  return (
    <div className={`z-50  drop-shadow-2xl rounded-xl my-4 mx-4 md:mx-60 fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg ${cookieConsent != null ? "hidden" : "flex"} justify-between items-center`}>
      <p className="text-sm">
        Sitemizde deneyiminizi iyileştirmek için çerezlerden faydalanıyoruz.
      </p>
      <div>
        
        <button
            className="btn-ghost rounded-md py-1 px-3 md:py-2 md:px-4 ml-2 whitespace-nowrap"
            onClick={() => setCookieConsent(false)}
        >
          Reddet
        </button>
        <button
            className="btn-neutral rounded-md py-1 px-3 md:py-2 md:px-4 ml-2 whitespace-nowrap"
            onClick={() => setCookieConsent(true)}
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;

