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
    display: "contact@cristianvaduva.com",
    href: "mailto:contact@cristianvaduva.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/cristianv%C4%83duva",
    instagram: "https://instagram.com/cristian_vaduva_cristianv",
    facebook: "https://www.facebook.com/CristianVaduvaCV",
    youtube: "https://youtube.com/@CristianVaduvaCV",
    telegram: "https://t.me/capitalinvestcristianvaduva",
  },
  ecosystem: {
    aixluxury: "https://aixluxury.com",
    aixos: "https://os.aixluxury.com",
    homefind: "https://homefind.cristianvaduva.com",
    generali: "https://www.generali.ro",
    website: "https://cristianvaduva.com",
  },
} as const;
