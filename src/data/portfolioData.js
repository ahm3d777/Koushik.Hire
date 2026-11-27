/**
 * Complete Structured Portfolio Content & Relational Architecture Data
 * Grounded strictly in Koushik Ahmed's End-to-End Portfolio Blueprint.
 */

export const HERO_COPY = {
  eyebrow: '01 // KOUSHIK AHMED · DHAKA, BD (GMT+6) · AVAILABLE FOR WORK',
  engineer: {
    headlinePrefix: 'Building web, mobile, and edge systems that feel ',
    headlineItalic: 'effortless',
    headlineSuffix: '.',
    subheadline:
      'Final-year Computer Science student and full-stack developer engineering fast React interfaces, cross-platform React Native apps, and Cloudflare-powered web products—from architecture to deployment.',
    primaryCta: 'Explore Selected Work →',
    primaryTarget: '#work',
    secondaryCta: 'Inspect Architecture (X-Ray)',
    secondaryAction: 'xray',
  },
  client: {
    headlinePrefix: 'High-craft websites and mobile apps built to turn visitors into ',
    headlineItalic: 'clients',
    headlineSuffix: '.',
    subheadline:
      'I partner with ambitious businesses, gyms, brands, and founders in Dhaka and worldwide to design and launch custom websites, e-commerce platforms, and mobile apps that load fast and drive real inquiries.',
    primaryCta: 'Estimate Your Project (60s) →',
    primaryTarget: '#estimator',
    secondaryCta: 'Chat on WhatsApp',
    secondaryAction: 'whatsapp',
  },
  telemetryStrip: [
    {
      label: 'CORE STACK',
      value: 'React · React Native · Tailwind · Supabase · Cloudflare Edge',
    },
    {
      label: 'DELIVERY',
      value: 'Web Apps · Cross-Platform Mobile · Interactive Prototypes',
    },
    {
      label: 'STATUS',
      value: 'Open for Product Engineering Roles & Select Freelance Builds',
    },
  ],
};

export const PILLARS = [
  {
    id: 'edge-speed',
    code: '01 · EDGE-FIRST SPEED',
    xrayTag: 'PILLAR_01 · CDN_EDGE · <50ms TTFB',
    span: 'span-7',
    title: 'Instant-Load Architecture',
    copy: 'Deployed globally on Cloudflare Pages, Vercel, and modern cloud infrastructure so every interaction feels instantaneous—whether a user is in Dhaka, London, or San Francisco.',
  },
  {
    id: 'cross-platform',
    code: '02 · CROSS-PLATFORM CRAFT',
    xrayTag: 'PILLAR_02 · REACT + EXPO · UNIFIED UI',
    span: 'span-5',
    title: 'Web & Mobile Fluency',
    copy: 'Seamless execution across responsive web applications (React, Tailwind, Sass) and native-feeling mobile experiences (React Native & Expo), designed first in Figma.',
  },
  {
    id: 'quality-systems',
    code: '03 · QUALITY & SYSTEMS',
    xrayTag: 'PILLAR_03 · PLAYWRIGHT + VITEST · CI',
    span: 'span-5',
    title: 'Engineered to Hold Up',
    copy: 'Structured component systems, automated testing practices (Playwright, Vitest), clean version control on GitHub, and scalable Postgres/Supabase backends.',
  },
  {
    id: 'product-growth',
    code: '04 · PRODUCT & GROWTH',
    xrayTag: 'PILLAR_04 · FUNNELS + LOCAL AI MEDIA',
    span: 'span-7',
    title: 'Beyond Just Code',
    copy: 'Real-world commercial instinct—combining UI engineering with AI-assisted workflows, short-form media production, and conversion-focused lead funnels.',
  },
];

export const PROJECTS = [
  {
    id: 'fitness-factory',
    index: '01',
    title: 'Fitness Factory — Digital Front Desk',
    shortName: 'Fitness Factory',
    category: 'Custom Web Product · Local Business Modernization · Cloudflare Pages',
    timeline: 'September 2026 · Dhanmondi, Dhaka',
    stageMode: 'desktop',
    image: '/images/fitness-factory.jpg',
    xrayTag: 'WORK_01 · CF_PAGES · ZERO_BLOAT_SPA',
    engineerSummary:
      'Engineered a custom, edge-deployed digital front desk web prototype for Fitness Factory (Dhanmondi, Dhaka) on Cloudflare Pages. Designed to replace friction-heavy manual inquiry handling with a fast, responsive, zero-bloat web interface built for instant mobile access.',
    clientSummary:
      'Transformed how a premier Dhaka gym presents itself online—replacing scattered social media inquiries with a sleek, instant-loading Digital Front Desk built to convert local visitors into walk-ins and members.',
    stack: ['React.js', 'Tailwind CSS', 'Cloudflare Pages', 'Responsive UI'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Live Prototype',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Replacing scattered Facebook/phone gym inquiries in Dhanmondi with a sub-second Cloudflare Edge Digital Front Desk.',
      metadata: {
        role: 'Lead Product Designer & Frontend Engineer',
        timeline: 'September 2026 (Rapid Prototype Sprint)',
        coreStack: 'React.js · Tailwind CSS · Figma',
        deployment: 'Cloudflare Pages Global Edge',
      },
      problem: [
        'Local fitness centers in Dhaka often rely solely on social media DMs and static image flyers to handle membership questions, class schedules, and trial requests. Prospective members on mobile data face friction finding basic pricing, peak-hour schedules, or how to claim a walk-in trial pass.',
        'Fitness Factory needed a modern, unmistakable digital front desk that works effortlessly on any smartphone in Dhanmondi—surfacing class schedules, floor readiness, membership clarity, and instant trial-pass registration in one cohesive experience.',
      ],
      architectureNodes: [
        { label: 'Mobile / Desktop Visitor', sub: 'Dhaka 4G / Broadband' },
        { label: 'Cloudflare Edge PoP', sub: 'Global Static & Edge Cache' },
        { label: 'React Digital Front Desk', sub: 'Schedule & Tier Modules' },
        { label: 'Instant Lead Handoff', sub: 'Trial Pass & WhatsApp CTA' },
      ],
      highlights: [
        {
          title: 'Zero-Friction Mobile Hierarchy',
          detail:
            'Prioritized thumb-reachable trial pass booking and class schedule inspection so prospective gym members convert in under 30 seconds.',
        },
        {
          title: 'Sub-Second Edge Delivery',
          detail:
            'Shipped via Cloudflare Pages with lean asset payloads to guarantee crisp first paint even on congested local cellular networks.',
        },
        {
          title: 'Commercial Pitch Prototype',
          detail:
            'Built proactively as a tangible, working commercial product showcase rather than a static slide deck—proving immediate business value.',
        },
      ],
    },
  },
  {
    id: 'chikara',
    index: '02',
    title: 'Chikara — Cross-Platform Mobile Application',
    shortName: 'Chikara App',
    category: 'Mobile Engineering · React Native & Expo',
    timeline: 'October 2025',
    stageMode: 'mobile',
    image: '/images/chikara.jpg',
    xrayTag: 'WORK_02 · REACT_NATIVE · EXPO_RUNTIME',
    engineerSummary:
      'Architected and built a cross-platform mobile application using React Native and Expo, prioritizing responsive touch physics, modular navigation, and unified codebase maintainability across mobile devices.',
    clientSummary:
      'A smooth, native-feeling mobile app built from a single modern codebase—delivering fast performance and clean user journeys without paying twice for separate iOS and Android teams.',
    stack: ['React Native', 'Expo', 'JavaScript (ES6+)', 'Mobile UX'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Demo & Repo',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Delivering tactile native mobile UX across iOS and Android from a unified, cleanly structured React Native & Expo architecture.',
      metadata: {
        role: 'Mobile Application Engineer',
        timeline: 'October 2025',
        coreStack: 'React Native · Expo · JavaScript',
        deployment: 'Expo OTA & Cross-Platform Builds',
      },
      problem: [
        'Cross-platform apps frequently suffer from web-like sluggishness when navigation hierarchies, touch feedback, and screen state transitions are treated as an afterthought.',
        'Chikara was engineered to prove that a single JavaScript/React Native codebase paired with Expo can feel unmistakably native—combining fluid gesture drawers, structured progress cards, and predictable component modularity.',
      ],
      architectureNodes: [
        { label: 'Touch & Gesture Layer', sub: '60fps Native Feel' },
        { label: 'Modular Screen Router', sub: 'Tab + Stack Navigation' },
        { label: 'Shared State & Hooks', sub: 'Predictable UI Updates' },
        { label: 'Expo Build & OTA', sub: 'iOS & Android Parity' },
      ],
      highlights: [
        {
          title: 'Tactile Screen Choreography',
          detail:
            'Designed bottom-sheet drawers, progress rings, and card interactions around natural thumb reach and crisp contrast.',
        },
        {
          title: 'Unified Codebase Economics',
          detail:
            'Shared 95%+ UI and business logic across mobile platforms while preserving platform-appropriate safe areas and typography.',
        },
        {
          title: 'Rapid Iteration via Expo',
          detail:
            'Leveraged Expo tooling for fast device testing, clean asset bundling, and friction-free iteration cycles.',
        },
      ],
    },
  },
  {
    id: 'elevatecv',
    index: '03',
    title: 'ElevateCV — AI-Powered Resume Builder',
    shortName: 'ElevateCV',
    category: 'Full-Stack Web App · Productivity & AI Utility',
    timeline: '2025',
    stageMode: 'workspace',
    image: '/images/elevatecv.jpg',
    xrayTag: 'WORK_03 · SPLIT_RENDER · ATS_ENGINE',
    engineerSummary:
      'Designed and developed an AI-assisted resume builder featuring real-time split-screen preview rendering, ATS-friendly layout architecture, intelligent content suggestions, and multi-template state management.',
    clientSummary:
      'A fast, intuitive web application that turns raw career history into clean, recruiter-ready résumés in minutes—complete with live instant previews and smart writing assistance.',
    stack: ['React.js', 'Tailwind CSS', 'Real-Time Preview', 'AI Integration'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Live App',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Synchronizing structured form state, AI bullet-point refinement, and real-time ATS document rendering in a distraction-free workspace.',
      metadata: {
        role: 'Full-Stack Web Developer',
        timeline: '2025',
        coreStack: 'React.js · Tailwind CSS · AI API',
        deployment: 'Modern Cloud Web Hosting',
      },
      problem: [
        'Job seekers waste hours fighting brittle Word templates that break formatting whenever a single line is added—or use flashy graphic builders that fail Applicant Tracking System (ATS) parsers.',
        'ElevateCV separates structured career data from typographic presentation: users edit clean form sections with optional AI phrasing enhancements on the left while watching an ATS-compliant document update instantaneously on the right.',
      ],
      architectureNodes: [
        { label: 'Structured Editor Pane', sub: 'Controlled React Forms' },
        { label: 'AI Rewrite Assistant', sub: 'Impact & Verb Refinement' },
        { label: 'Normalized Resume State', sub: 'Multi-Template Schema' },
        { label: 'Live Print/PDF Canvas', sub: 'Deterministic ATS Layout' },
      ],
      highlights: [
        {
          title: 'Zero-Latency Split Preview',
          detail:
            'Engineered reactive document state so every keystroke and template toggle reflects immediately without layout thrashing.',
        },
        {
          title: 'Action-Oriented AI Assistance',
          detail:
            'Integrated contextual phrasing suggestions that strengthen engineering and business impact bullets without inventing fake fluff.',
        },
        {
          title: 'Print-Exact ATS Typography',
          detail:
            'Crafted clean semantic hierarchy and print media rules so exported PDFs parse cleanly across enterprise recruiting tools.',
        },
      ],
    },
  },
  {
    id: 'jersey-store',
    index: '04',
    title: 'Bangladesh Premium Jersey Store',
    shortName: 'BD Jersey Store',
    category: 'E-Commerce Platform · Retail UI/UX',
    timeline: 'December 2025',
    stageMode: 'commerce',
    image: '/images/jersey-store.jpg',
    xrayTag: 'WORK_04 · ECOMMERCE_UI · VARIANT_STATE',
    engineerSummary:
      'Built a dedicated e-commerce storefront (bangladesh-premium-jersey-store) tailored to high-visual sports apparel, featuring responsive product catalogs, clean variant selection, and mobile-first checkout UX.',
    clientSummary:
      'A high-impact online storefront built for the Bangladeshi retail market—making jerseys look unmistakably premium on mobile screens while keeping browsing and ordering effortless.',
    stack: ['React.js', 'E-Commerce UI', 'Tailwind CSS', 'Mobile-First'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Live Storefront',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Elevating Bangladeshi sports apparel retail with studio-dark product presentation, instant size selection, and frictionless mobile cart flows.',
      metadata: {
        role: 'Frontend & E-Commerce UI Engineer',
        timeline: 'December 2025',
        coreStack: 'React.js · Tailwind CSS · JavaScript',
        deployment: 'Edge Web Deployment',
      },
      problem: [
        'Many local apparel shops in Bangladesh lose high-intent football fans to cluttered catalog grids, slow image carousels, and confusing multi-step checkout pages on mobile screens.',
        'Bangladesh Premium Jersey Store treats every kit drop like a flagship sportswear release—pairing high-contrast imagery with one-tap S/M/L/XL variant selection, BDT pricing clarity, and an instant slide-over cart drawer.',
      ],
      architectureNodes: [
        { label: 'Catalog & Kit Filter', sub: 'Club & National Collections' },
        { label: 'Variant State Matrix', sub: 'Size & Edition Selection' },
        { label: 'Slide-Over Cart Drawer', sub: 'Optimistic BDT Totals' },
        { label: 'Mobile Checkout Flow', sub: 'Fast Local Order Capture' },
      ],
      highlights: [
        {
          title: 'Merchandising-First Dark UI',
          detail:
            'Framed vibrant national and club jersey colors against deep obsidian surfaces so stitching and crest details pop on OLED phones.',
        },
        {
          title: 'Tactile Variant & Cart UX',
          detail:
            'Eliminated full-page reloads when switching sizes or updating quantities inside the slide-over shopping drawer.',
        },
        {
          title: 'Tailored for Local Retail',
          detail:
            'Structured pricing, sizing, and mobile navigation specifically around how Bangladeshi shoppers browse from social links.',
        },
      ],
    },
  },
];

export const SHOKTI_LAB = {
  name: 'Shokti (শক্তি)',
  badge: 'IN DEVELOPMENT · LAB CONCEPT',
  tagline:
    'A React Native fitness & progressive overload app engineered specifically for Bangladeshi gym-goers.',
  narrative:
    'Born directly out of training 4–5 days a week and finding existing global fitness apps bloated or disconnected from local gym routines. Shokti combines custom workout architecture, AI-guided training plans, and clean progressive overload tracking into a distraction-free mobile experience.',
  roadmap: [
    {
      phase: 'Phase 01 · Core Set & Overload Engine',
      status: 'In Progress',
      items: [
        'Zero-clutter set/rep/weight logger optimized for sweaty one-handed gym floor input (KG & LB toggle)',
        'Automatic previous-session ghost targets (+2.5kg / +1 rep progressive overload nudges)',
        'Offline-first local persistence synced cleanly to Supabase Postgres when back on Wi-Fi/4G',
      ],
    },
    {
      phase: 'Phase 02 · Local Gym Context & AI Split Coach',
      status: 'Wireframed in Figma',
      items: [
        'Equipment-aware routines tailored to real Dhaka gym floor setups (cables, dumbbells, Smith, barbell)',
        'Bilingual (English + Bangla) cue cards and AI-assisted mesocycle adjustments',
        '1RM e1RM trend telemetry without paywalled social feed bloat',
      ],
    },
    {
      phase: 'Phase 03 · Closed Beta & Gym Partnerships',
      status: 'Planned Milestone',
      items: [
        'Expo EAS closed beta with 50 Dhaka lifters',
        'Integration bridge with gym front-desk systems like Fitness Factory',
      ],
    },
  ],
};

export const MEDIA_SYSTEMS = [
  {
    id: 'centria',
    client: 'Centria University of Applied Sciences',
    location: 'Kokkola, Finland · PlastLab (Chemical Eng. & Environmental Tech)',
    tag: 'INTERNATIONAL · 4K → 9:16 AI PIPELINE',
    scope:
      'High-precision 9:16 vertical introduction video production (4K source to broadcast-clean 1080×1920 Reels/TikTok delivery), strict brand typography & safe-area caption verification, backed by an automated local AI processing workflow (faster-whisper + FFmpeg).',
    reelMeta: {
      ratio: '1080×1920 · 60fps',
      pipeline: 'faster-whisper + FFmpeg',
      badge: 'SAFE-AREA VERIFIED',
      captionSample: '“Turning polymer research into sustainable industrial loops at PlastLab.”',
    },
  },
  {
    id: 'jtc',
    client: 'Jaharah Translation and Consultancy (JTC)',
    location: 'Hatirpool, Dhaka, Bangladesh',
    tag: 'DHAKA COMMERCIAL · GROWTH REELS + AI FLOW',
    scope:
      'Bilingual (Bangla-English & English) short-form vertical Reels strategy, content calendar architecture, and AI-assisted video production using Google Flow (Gemini Omni 1.2 Flash) engineered to drive non-follower reach and direct WhatsApp client inquiries.',
    reelMeta: {
      ratio: 'Bilingual EN / BN',
      pipeline: 'Google Flow · Gemini Omni',
      badge: 'WHATSAPP FUNNEL',
      captionSample: '“Certified document translation in Dhaka — tap to verify on WhatsApp.”',
    },
  },
];

export const SYSTEMS_MATRIX = [
  {
    id: 'interface',
    layerName: 'Interface & Design',
    filterKey: 'Interface & Design',
    role: 'Design-to-code fidelity, responsive layouts, tactile micro-interactions, accessible UI systems',
    tools: [
      { name: 'React.js', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'JavaScript (ES6+)', projects: ['fitness-factory', 'chikara', 'elevatecv', 'jersey-store'] },
      { name: 'Tailwind CSS', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'HTML5', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'CSS3 & Sass', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'Figma', projects: ['fitness-factory', 'chikara', 'elevatecv'] },
    ],
  },
  {
    id: 'mobile',
    layerName: 'Mobile Engineering',
    filterKey: 'Mobile',
    role: 'Cross-platform mobile architecture, gesture-driven navigation, rapid OTA iteration',
    tools: [
      { name: 'React Native', projects: ['chikara'] },
      { name: 'Expo', projects: ['chikara'] },
    ],
  },
  {
    id: 'edge-cloud',
    layerName: 'Edge, Cloud & Backend',
    filterKey: 'Edge & Cloud',
    role: 'Global edge deployment, Postgres/auth backends, CI/CD pipelines, containerized hosting',
    tools: [
      { name: 'Cloudflare Pages & Wrangler', projects: ['fitness-factory'] },
      { name: 'Vercel', projects: ['elevatecv', 'jersey-store'] },
      { name: 'Supabase', projects: ['elevatecv'] },
      { name: 'Railway & Render', projects: ['elevatecv'] },
      { name: 'GitHub', projects: ['fitness-factory', 'chikara', 'elevatecv', 'jersey-store'] },
    ],
  },
  {
    id: 'quality-ai',
    layerName: 'Quality, Testing & AI',
    filterKey: 'Quality & AI',
    role: 'Automated end-to-end & unit testing, code quality enforcement, local AI media & dev workflows',
    tools: [
      { name: 'Playwright', projects: ['fitness-factory', 'jersey-store'] },
      { name: 'Vitest & ESLint', projects: ['fitness-factory', 'elevatecv'] },
      { name: 'Claude Code CLI', projects: ['fitness-factory', 'elevatecv'] },
      { name: 'Google Flow', projects: [] },
      { name: 'FFmpeg & faster-whisper', projects: [] },
    ],
  },
];

export const ENGAGEMENT_TRACKS = [
  {
    code: 'TRACK 01',
    title: 'High-Conversion Business Website',
    description:
      'Custom-designed informational or lead-generation sites (gyms, law firms, clinics, consultancies) deployed on Cloudflare Pages for sub-second speed and mobile-first inquiry capture.',
  },
  {
    code: 'TRACK 02',
    title: 'Custom Web Application & MVP',
    description:
      'Full-stack React + Supabase/Railway web apps, interactive dashboards, e-commerce storefronts, and AI-powered tools built to scale cleanly.',
  },
  {
    code: 'TRACK 03',
    title: 'Cross-Platform Mobile App',
    description:
      'End-to-end React Native & Expo applications for iOS and Android with smooth gesture UX, clean state architecture, and rapid iteration.',
  },
  {
    code: 'TRACK 04',
    title: 'Full-Time / Contract Engineer',
    description:
      'Joining an international or local product team to ship high-craft frontend, mobile, and full-stack features with strong ownership.',
  },
];

export const ESTIMATOR_STEPS = {
  projectTypes: [
    {
      id: 'business-web',
      label: 'Business Website',
      stack: 'React.js · Custom CSS / Tailwind · Cloudflare Pages Edge',
      deliverables: [
        'Mobile-first bespoke UI & conversion copy architecture',
        'Sub-second Cloudflare Edge deployment + custom domain SSL',
        'Direct WhatsApp & async inquiry lead capture integration',
      ],
    },
    {
      id: 'web-app',
      label: 'Web App / SaaS MVP',
      stack: 'React.js · Supabase (Postgres + Auth) · Cloudflare / Railway',
      deliverables: [
        'Interactive application architecture & database schema',
        'Authentication, live state sync & responsive dashboard UI',
        'Automated Vitest/Playwright smoke checks + production CI/CD',
      ],
    },
    {
      id: 'mobile-app',
      label: 'Mobile App (iOS & Android)',
      stack: 'React Native · Expo · Supabase Backend',
      deliverables: [
        'Unified iOS & Android codebase with native-feel navigation',
        'Figma screen flows + Expo preview builds on your phone',
        'Store-ready production build configuration & API sync',
      ],
    },
    {
      id: 'prototype',
      label: 'Interactive Prototype',
      stack: 'Figma + Live Edge-Deployed React Prototype',
      deliverables: [
        'Clickable, real-code live URL ready for investor or client demos',
        'High-impact visual polish & core user journey validation',
        'Clean handoff foundation ready to scale into full production',
      ],
    },
  ],
  stages: [
    { id: 'idea', label: 'Just an Idea', phaseNote: 'Includes Discovery & Figma Wireframing' },
    { id: 'brand', label: 'Have Content / Brand', phaseNote: 'UI Direction + Full Build' },
    { id: 'figma', label: 'Have Figma Designs', phaseNote: 'Direct Pixel-Accurate Engineering' },
    { id: 'redesign', label: 'Redesigning Existing Site', phaseNote: 'UX Audit + Edge Modernization' },
  ],
  speeds: [
    { id: 'sprint', label: 'Rapid 1–2 Week Sprint', cadence: '1–2 Weeks (Focused Sprint)' },
    { id: 'standard', label: 'Standard 3–5 Weeks', cadence: '3–5 Weeks (Milestone Releases)' },
    { id: 'flexible', label: 'Flexible Cadence', cadence: 'Iterative Phased Roadmap' },
  ],
  goals: [
    { id: 'leads', label: 'Generate Leads & WhatsApp Inquiries' },
    { id: 'product', label: 'Launch a New Digital Product' },
    { id: 'ecommerce', label: 'Drive E-Commerce & Retail Sales' },
  ],
};
