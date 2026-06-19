/** Single source of truth for business + contact details. */
export const site = {
  name: "Al Safi Furniture",
  legalName: "Al Safi Furniture Manufacturing LLC",
  domain: "alsafifurniture.ae",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alsafifurniture.ae",
  email: "info@alsafifurniture.ae",
  phone: {
    whatsapp: "+971501138666",
    whatsappDisplay: "+971 50 113 8666",
    landline: "+97143400253",
    landlineDisplay: "+971 4 340 0253",
  },
  address: {
    line1: "Warehouse 20, Behind Gold & Diamond Park",
    line2: "Al Quoz Industrial Area 3, 6B Street",
    city: "Dubai",
    country: "United Arab Emirates",
    poBox: "P.O. Box 117129",
    mapsQuery: "Al Safi Furniture Manufacturing LLC, Al Quoz Industrial 3, Dubai",
  },
  social: {
    instagram: "https://www.instagram.com/alsafi_furniture",
    instagramHandle: "@alsafi_furniture",
    google: "https://share.google/JGbRT4g9vkgRiW2Gp",
  },
  hours: {
    weekdays: "Mon – Sat",
    morning: "08:00 – 13:00",
    afternoon: "14:00 – 17:00",
    closed: "Sunday closed",
  },
} as const;

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${site.phone.whatsapp.replace("+", "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
