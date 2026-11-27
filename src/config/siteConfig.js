/**
 * Centralized Site Configuration — Koushik Ahmed Portfolio
 * Edit this single file to update contact links, WhatsApp number, Resume PDF, and live project URLs.
 */
export const SITE_CONFIG = {
  name: 'Koushik Ahmed',
  monogram: 'KA',
  role: 'Full-Stack Web & Mobile Developer',
  location: 'Mohammadpur, Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  gmtOffset: 'GMT+6',
  email: 'k.ahm3d777@gmail.com',

  // Replace with your active international format WhatsApp digits (no '+' or spaces, e.g. '88017XXXXXXXX')
  whatsappNumber: '8801700000000',
  whatsappDefaultMessage:
    "Hi Koushik! I explored your portfolio and would love to discuss a project.",

  // Social & Proof URLs
  githubUrl: 'https://github.com/ahm3d777',
  linkedinUrl: 'https://www.linkedin.com/in/koushik-ahmed',
  resumeUrl: '/resume.html', // Drop a PDF at public/resume.pdf and change this to '/resume.pdf' anytime

  // Portrait & Hardware Workstation Easter Egg
  portraitImage: '/images/portrait.jpg',
  workstation: {
    cpu: 'Intel Core i7-14700',
    ram: '32GB DDR5-6000',
    gpu: 'Intel Arc B580',
    capability: 'Local AI & Media Ready',
  },
};

export function buildWhatsAppUrl(customMessage) {
  const msg = encodeURIComponent(
    customMessage || SITE_CONFIG.whatsappDefaultMessage
  );
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${msg}`;
}
