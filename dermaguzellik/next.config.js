/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    compiler: {
      styledComponents: true,
    },
    images: {
      domains: ["akjlcwvnlerbhsgmjmks.supabase.co"],
      minimumCacheTTL: 10,


    },
    
      
    
  }
  // next.config.js

 
  module.exports = nextConfig