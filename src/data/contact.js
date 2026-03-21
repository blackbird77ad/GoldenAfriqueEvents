export const WHATSAPP_NUMBER = '233501657205'; // replace with client number later
export const INSTAGRAM      = '@goldenafriqueevents'; // replace with client handle
export const PHONE          = '+233 50 1657 205'; // replace with client number

export const buildCateringMessage = (cart) => {
  const lines = cart.map(i => `• [${i.id}] ${i.name} x${i.qty}`).join('\n');
  return encodeURIComponent(
    `Hello Golden Afrique Events! 🍽️\n\nI'd like to place a catering order:\n\n${lines}\n\nPlease confirm availability and pricing. Thank you!`
  );
};

export const buildRentalMessage = (cart) => {
  const lines = cart.map(i => `• [${i.id}] ${i.name} x${i.qty}`).join('\n');
  return encodeURIComponent(
    `Hello Golden Afrique Events! 🎪\n\nI'd like to inquire about renting the following:\n\n${lines}\n\nPlease share availability, pricing and delivery options. Thank you!`
  );
};

export const whatsappLink  = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
export const instagramLink = `https://instagram.com/${INSTAGRAM.replace('@', '')}`;