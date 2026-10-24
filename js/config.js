/**
 * Comfort Aircon - Central Business Configuration
 * Carrier Authorized Dealer & AC Service Business in Pondicherry
 * 
 * All business details, services, locations, and mock products are configured here.
 * This can be easily replaced with an API response (e.g. Laravel API) in the future.
 */

const CONFIG = {
  // Business Contact Details (Placeholders ready to be replaced with real details)
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: "+91 98765 43210",
  whatsappRaw: "919876543210",
  email: "info@comfortaircon.com",
  address: "No. 45, Anna Salai, Near New Bus Stand, Pondicherry - 605001",
  workingHours: "Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 2:00 PM",
  googleMapsLink: "https://maps.google.com/?q=Pondicherry+Tamil+Nadu",

  // Social Media Links (Set empty string "" to hide the icon automatically)
  social: {
    facebook: "https://facebook.com/comfortaircon",
    instagram: "https://instagram.com/comfortaircon",
    twitter: "https://twitter.com/comfortaircon",
    youtube: "" // Empty string will hide YouTube icon
  },

  // WhatsApp Pre-filled message
  whatsappMessage: "Hi, I want to enquire about your AC products / services.",

  // Exactly these 8 services required by specification
  services: [
    {
      id: "ac-installation",
      name: "AC Installation",
      image: "assets/images/service-installation.jpg",
      shortDesc: "Professional installation for split and cassette ACs ensuring peak cooling efficiency.",
      icon: "installation"
    },
    {
      id: "repair",
      name: "AC Repair & Service",
      image: "assets/images/service-repair.jpg",
      shortDesc: "Fast diagnosis and precision repair for cooling issues, compressor faults, and electrical errors.",
      icon: "repair"
    },
    {
      id: "service-maintenance",
      name: "Maintenance",
      image: "assets/images/service-maintenance.jpg",
      shortDesc: "Comprehensive periodic maintenance to extend AC lifespan and lower electricity bills.",
      icon: "maintenance"
    },
    {
      id: "commercial-ac-services",
      name: "Refrigeration Solutions",
      image: "assets/images/service-refrigeration.jpg",
      shortDesc: "Commercial and industrial refrigeration, VRF centralized HVAC, and cold storage units.",
      icon: "commercial"
    },
    {
      id: "gas-filling",
      name: "Gas Filling",
      image: "assets/images/service-gas-filling.jpg",
      shortDesc: "Genuine R32 / R410A refrigerant leak testing, vacuuming, and precise gas top-up.",
      icon: "gas"
    },
    {
      id: "cleaning-troubleshooting",
      name: "Cleaning & Troubleshooting",
      image: "assets/images/service-cleaning.jpg",
      shortDesc: "Deep jet chemical wash for filters, indoor cooling coils, blower, and outdoor condenser.",
      icon: "cleaning"
    },
    {
      id: "replacement",
      name: "Replacement",
      image: "assets/images/service-replacement.jpg",
      shortDesc: "Hassle-free replacement of old, obsolete air conditioners with energy-efficient Carrier units.",
      icon: "replacement"
    },
    {
      id: "annual-maintenance",
      name: "Annual Maintenance",
      image: "assets/images/service-annual-maintenance.jpg",
      shortDesc: "Cost-effective AMC packages with scheduled preventive check-ups and priority breakdown support.",
      icon: "amc"
    }
  ],

  // Service Locations
  locations: [
    "Pondicherry",
    "Villupuram",
    "Cuddalore",
    "Other"
  ],

  // 4 Mock Products (Carrier Authorized AC Dealer)
  // Each has image, name, model, specifications, features
  mockProducts: [
    {
      id: "carrier-ester-neo-15-3s",
      name: "Carrier Ester Neo Inverter Split AC",
      model: "CAI18ER3R30F0",
      image: "assets/images/carrier-split.png",
      specifications: "1.5 Ton | 3 Star Energy Rating | 100% Copper Condenser | R32 Eco Refrigerant",
      features: "Dual Filtration with PM 2.5 filter, Hydrophilic Blue Fins, Insta-Cool Technology, Silent Sleep Mode"
    },
    {
      id: "carrier-emperia-neo-15-5s",
      name: "Carrier Emperia Neo Inverter Split AC",
      model: "CAI18EN5R30F0",
      image: "assets/images/toshiba-split.png",
      specifications: "1.5 Ton | 5 Star Super Energy Saver | 100% Copper | 5000W Cooling Capacity",
      features: "Flexicool 6-in-1 Hybrid Inverter, Auto Cleanser, High Ambient Cooling up to 55°C, Stabilizer Free Operation"
    },
    {
      id: "carrier-ductable-inverter",
      name: "Carrier Concealed Ductable Central AC",
      model: "CDU36IN5R30D0",
      image: "assets/images/carrier-ductable.png",
      specifications: "3.0 Ton | High Static Pressure Inverter | Hidden Architecture Ducting | R410A / R32",
      features: "Whisper-Silent Operation, Precision Multi-Zone Vents, Slimline Ceiling Profile, Commercial & Villa Grade"
    },
    {
      id: "carrier-c-series-cassette",
      name: "Carrier C-Series Commercial Cassette AC",
      model: "CAS24CS4R30C0",
      image: "assets/images/carrier-cassette.png",
      specifications: "2.0 Ton | Ceiling Mounted 4-Way Cassette | Inverter Compressor | High Efficiency Condenser",
      features: "360-Degree Uniform Air Distribution, Built-in High Lift Drain Pump, Ultra-Slim Profile, Wired/Wireless Remote"
    }
  ],

  // Helper getters
  get whatsappLink() {
    return `https://wa.me/${this.whatsappRaw}?text=${encodeURIComponent(this.whatsappMessage)}`;
  },

  get callLink() {
    return `tel:${this.phoneRaw}`;
  }
};

// Make available globally in browser window
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
