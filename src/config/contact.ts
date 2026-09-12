/**
 * Centralized contact information
 * Single source of truth — all components import from here
 */

export const CONTACT = {
  phone: {
    display: "+40 767 110 439",
    href: "tel:+40767110439",
  },
  whatsapp: {
    display: "+43 650 953 6345",
    href: "https://wa.me/436509536345",
    label: "WhatsApp",
  },
  telegram: {
    display: "@capitalinvestcristianvaduva",
    href: "https://t.me/capitalinvestcristianvaduva",
    label: "Telegram",
  },
  email: {
    display: "cristianvaduva@duck.com",
    href: "mailto:cristianvaduva@duck.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/cristianv%C4%83duva",
    instagram: "https://instagram.com/cristian_vaduva_cristianv",
    facebook: "https://www.facebook.com/CristianVaduvaCV",
    youtube: "https://youtube.com/@CristianVaduvaCV",
    telegram: "https://t.me/capitalinvestcristianvaduva",
  },
  ecosystem: {
    aixmedia: "https://aixmedia.cristianvaduva.com",
    aixluxury: "https://aixluxury.com",
    aixos: "https://os.cristianvaduva.com",
    homefind: "https://homefind.cristianvaduva.com",
    generali: "https://www.generali.ro",
    website: "https://cristianvaduva.com",
    health: "https://health.cristianvaduva.com",
    subventii: "https://subventii.cristianvaduva.com",
    credite: "https://credite.cristianvaduva.com",
    os: "https://os.cristianvaduva.com",
    marketPulse: "https://cristianvaduva.com/market-pulse",
  },
} as const;
