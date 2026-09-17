export const SITE = {
  name: 'Alma Dendera',
  personName: 'Magalí',
  city: 'CABA',
  title: 'Alma Dendera — Soundhealing · Vibroacústica · Reiki',
  description:
    'Alma Dendera — sesiones de soundhealing, vibroacústica y reiki en CABA. Una hora para volver al cuerpo y encontrar calma. Acompaña, no reemplaza tratamiento médico.',
  whatsapp: '5491100000000',
  whatsappDisplay: '+54 9 11 0000-0000',
  whatsappMessage: 'Hola Magalí, quiero consultar por una sesión en Alma Dendera.',
  email: 'hola@almadendera.com.ar',
  instagramHandle: 'almadendera',
} as const;

export const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const INSTAGRAM_HREF = `https://www.instagram.com/${SITE.instagramHandle}/`;
