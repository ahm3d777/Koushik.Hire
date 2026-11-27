/**
 * Centralized Site Configuration — Koushik Ahmed Portfolio (v2.0)
 * Edit this single file to update contact links, WhatsApp number, Resume PDF, and Turnstile key.
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
    'Hi Koushik! I explored your portfolio and would love to discuss a project.',

  // Social & Proof URLs
  githubUrl: 'https://github.com/ahm3d777',
  linkedinUrl: 'https://www.linkedin.com/in/koushik-ahmed',
  resumeUrl: '/resume.html', // Drop a PDF at public/resume.pdf and change this to '/resume.pdf' anytime

  // Optional Cloudflare Turnstile public sitekey for the Contact form (leave empty until enabled in Cloudflare Dashboard)
  turnstileSiteKey: '',

  // Portrait, 3D Mobile Poster & Hardware Workstation Easter Egg
  portraitWebp: '/images/portrait.webp',
  portraitWebpSm: '/images/portrait-640.webp',
  portraitFallback: '/images/portrait.jpg',
  monolithPoster: '/images/monolith-poster.webp',

  workstation: {
    cpu: 'Intel Core i7-14700',
    ram: '32GB DDR5-6000',
    gpu: 'Intel Arc B580',
    capability: 'Local AI & media ready',
  },
};

export function buildWhatsAppUrl(customMessage) {
  const trimmed = String(
    customMessage || SITE_CONFIG.whatsappDefaultMessage
  ).slice(0, 1450);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    trimmed
  )}`;
}
