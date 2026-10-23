export const SITE = {
  name: 'Alma Dendera',
  personName: 'Magalí',
  city: 'CABA',
  title: 'Alma Dendera — Sound Healing · Reiki Usui',
  description:
    'Alma Dendera — sesiones de sound healing (terapia vibroacústica, masaje sonoro y armonización) y Reiki Usui en CABA. Un respiro para volver a vos, habitar tu cuerpo y serenar la mente. Acompaña, no reemplaza tratamiento médico.',
  whatsapp: '5491100000000',
  whatsappMessage: 'Hola Maga, quiero consultar por una sesión en Alma Dendera.',
  instagramHandle: 'almadendera',
} as const;

export const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const INSTAGRAM_HREF = `https://www.instagram.com/${SITE.instagramHandle}/`;
