import { BRAND_NAME } from './brand';

export const WHATSAPP_NUMBER = '18159051230';
export const INSTAGRAM = '@goldenafriqueevents';
export const PHONE = '(815) 905-1230';

export const buildCateringMessage = (cart) => {
  const lines = cart.map((i) => `- [${i.id}] ${i.name} x${i.qty}`).join('\n');
  return encodeURIComponent(
    `Hello ${BRAND_NAME}! 🍽️\n\nI'd like to place a catering order:\n\n${lines}\n\nPlease confirm availability and pricing. Thank you!`
  );
};

export const buildRentalMessage = (cart) => {
  const lines = cart.map((i) => `- [${i.id}] ${i.name} x${i.qty}`).join('\n');
  return encodeURIComponent(
    `Hello ${BRAND_NAME}! 🎪\n\nI'd like to inquire about renting the following:\n\n${lines}\n\nPlease share availability, pricing and delivery options. Thank you!`
  );
};

export const whatsappLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
export const instagramLink = 'https://www.instagram.com/goldenafriqueevents';
