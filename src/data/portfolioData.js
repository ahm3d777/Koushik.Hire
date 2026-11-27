/**
 * Complete Structured Portfolio Content & Relational Architecture Data — Blueprint v2.0
 * Includes recruiter-proof honest framing, mobile (<480px) copy variants, and unified 4-step Scope Estimator.
 */

export const HERO_COPY = {
  eyebrowDesktop: '01 // KOUSHIK AHMED · DHAKA, BD (GMT+6) · AVAILABLE FOR WORK',
  eyebrowMobile: 'KOUSHIK AHMED · DHAKA · AVAILABLE',
  engineer: {
    headlinePrefix: 'Building web, mobile, and edge systems that feel ',
    headlineItalic: 'effortless',
    headlineSuffix: '.',
    subheadlineDesktop:
      'Final-year Computer Science student and full-stack developer building fast React interfaces, cross-platform React Native apps, and Cloudflare-deployed products, from architecture to deployment.',
    subheadlineMobile:
      'Full-stack developer building fast React interfaces, React Native apps, and Cloudflare-deployed products.',
    primaryCta: 'Explore Selected Work →',
    primaryTarget: '#work',
    secondaryCta: 'Download Résumé',
    secondaryAction: 'resume',
    tertiaryHint: 'Press X to inspect architecture',
  },
  client: {
    headlinePrefix: 'High-craft websites and apps that turn visitors into ',
    headlineItalic: 'clients',
    headlineSuffix: '.',
    subheadlineDesktop:
      'I design and launch custom websites, online stores, and mobile apps for businesses in Dhaka and worldwide. They load fast and are built to bring in real inquiries.',
    subheadlineMobile:
      'Custom websites, stores, and apps for businesses in Dhaka and worldwide, built to load fast and bring in inquiries.',
    primaryCta: 'Estimate Your Project · 60s →',
    primaryTarget: '#estimator',
    secondaryCta: 'Chat on WhatsApp',
    secondaryAction: 'whatsapp',
    tertiaryHint: '',
  },
  telemetryStrip: [
    {
      label: 'CORE STACK',
      value: 'React · React Native · Tailwind · Supabase · Cloudflare',
    },
    {
      label: 'DELIVERY',
      value: 'Web Apps · Cross-Platform Mobile · Interactive Prototypes',
    },
    {
      label: 'STATUS',
      value: 'Open to product engineering roles & select freelance builds',
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
    copy: "Deployed on Cloudflare's global edge, so pages load fast whether the visitor is in Dhaka, London, or San Francisco.",
  },
  {
    id: 'cross-platform',
    code: '02 · CROSS-PLATFORM CRAFT',
    xrayTag: 'PILLAR_02 · REACT + EXPO · UNIFIED UI',
    span: 'span-5',
    title: 'Web & Mobile Fluency',
    copy: 'Responsive web apps (React, Tailwind, Sass) and native-feeling mobile apps (React Native & Expo), designed first in Figma.',
  },
  {
    id: 'quality-systems',
    code: '03 · QUALITY & SYSTEMS',
    xrayTag: 'PILLAR_03 · PLAYWRIGHT + VITEST · CI',
    span: 'span-5',
    title: 'Engineered to Hold Up',
    copy: 'Structured component systems, automated tests (Playwright, Vitest), clean Git history, and Postgres/Supabase backends.',
  },
  {
    id: 'product-growth',
    code: '04 · PRODUCT & GROWTH',
    xrayTag: 'PILLAR_04 · FUNNELS + LOCAL AI MEDIA',
    span: 'span-7',
    title: 'Beyond Just Code',
    copy: 'Commercial instinct: UI engineering combined with AI-assisted workflows, short-form media, and conversion-focused lead funnels.',
  },
];

export const PROJECTS = [
  {
    id: 'fitness-factory',
    index: '01',
    title: 'Fitness Factory — Digital Front Desk',
    shortName: 'Fitness Factory',
    badge: 'CONCEPT PROTOTYPE · PITCHED', // Switch to 'CLIENT PROJECT · LIVE' once signed
    category: 'Web Product · Local Business Modernisation · Cloudflare',
    timeline: 'September 2026 · Dhanmondi, Dhaka',
    stageMode: 'desktop',
    imageWebp: '/images/fitness-factory.webp',
    imageWebpSm: '/images/fitness-factory-640.webp',
    image: '/images/fitness-factory.jpg',
    xrayTag: 'WORK_01 · CF_PAGES · ZERO_BLOAT_SPA',
    engineerSummary:
      'Built an edge-deployed digital front desk prototype for Fitness Factory (Dhanmondi) on Cloudflare. It is designed to replace scattered manual inquiries with a fast, mobile-first interface for pricing, schedules, and instant contact.',
    clientSummary:
      'A concept I built and pitched to a Dhanmondi gym, showing how a fast, modern website could turn social-media browsers into walk-ins and members.',
    stack: ['React', 'Tailwind CSS', 'Cloudflare', 'Responsive UI'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Live Prototype',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'A working Cloudflare-deployed concept prototype demonstrating how Dhanmondi gyms can convert mobile visitors into walk-in trial members.',
      metadata: {
        role: 'Product Design & Frontend Engineering (Concept Pitch)',
        timeline: 'September 2026',
        coreStack: 'React · Tailwind CSS · Figma',
        deployment: 'Cloudflare Global Edge',
      },
      problem: [
        'Local fitness centres in Dhaka often rely solely on social media DMs and static flyers to answer basic pricing, peak-hour schedule, and trial-pass questions. Visitors on mobile data face friction before ever stepping through the door.',
        'Rather than pitching a static slide deck, I designed and shipped a live Digital Front Desk concept tailored to Fitness Factory in Dhanmondi—putting schedules, membership clarity, and instant trial-pass requests within thumb reach.',
      ],
      architectureNodes: [
        { label: 'User Device', sub: '360px Android / Desktop' },
        { label: 'Cloudflare Edge', sub: 'Sub-second Static Cache' },
        { label: 'React Front Desk UI', sub: 'Schedule & Tier Modules' },
        { label: 'Lead Capture', sub: 'Trial Pass & WhatsApp CTA' },
      ],
      highlights: [
        {
          title: 'Thumb-Zone Mobile Hierarchy',
          detail:
            'Problem: Buried phone numbers on legacy pages → Choice: Sticky trial-pass & class filter flow → Result: Sub-30-second mobile path to inquiry.',
        },
        {
          title: 'Lean Edge Asset Budget',
          detail:
            'Problem: Patchy Dhaka 4G connections → Choice: Zero-bloat React bundle on Cloudflare Pages → Result: Sub-second interactive paint.',
        },
        {
          title: 'Live Product Pitch Strategy',
          detail:
            'Problem: Cold pitches rarely stand out → Choice: Built a real working URL customized to the gym → Result: Immediate tangible proof during outreach.',
        },
      ],
      outcomeNext:
        'Post-signoff production metrics to instrument: trial-pass form completion rate from Instagram bio traffic, WhatsApp tap-through ratio on 360px Android viewports, and front-desk staff check-in time saved.',
    },
  },
  {
    id: 'chikara',
    index: '02',
    title: 'Chikara — Cross-Platform Mobile App',
    shortName: 'Chikara App',
    badge: 'LEAD DEVELOPER',
    category: 'Mobile Engineering · React Native & Expo',
    timeline: 'October 2025',
    stageMode: 'mobile',
    imageWebp: '/images/chikara.webp',
    imageWebpSm: '/images/chikara-640.webp',
    image: '/images/chikara.jpg',
    xrayTag: 'WORK_02 · REACT_NATIVE · EXPO_RUNTIME',
    engineerSummary:
      'Architected and built a cross-platform app in React Native and Expo, focused on responsive touch interactions, modular navigation, and a single maintainable codebase.',
    clientSummary:
      'A smooth, native-feeling app from one modern codebase, so you get fast performance on iOS and Android without paying for two separate teams.',
    stack: ['React Native', 'Expo', 'JavaScript', 'Mobile UX'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'GitHub / Demo Video',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Delivering tactile native mobile UX across iOS and Android from a unified, cleanly structured React Native & Expo architecture.',
      metadata: {
        role: 'Lead Mobile Developer',
        timeline: 'October 2025',
        coreStack: 'React Native · Expo · JavaScript',
        deployment: 'Expo Cross-Platform Builds',
      },
      problem: [
        'Cross-platform apps frequently feel sluggish when navigation hierarchies, touch feedback, and screen transitions are treated like desktop web pages.',
        'Chikara was architected so a single React Native + Expo codebase feels native in hand—combining fluid gesture drawers, high-contrast progress rings, and modular screen routing.',
      ],
      architectureNodes: [
        { label: 'Touch & Gesture Layer', sub: '60fps Native Feel' },
        { label: 'Modular Router', sub: 'Tab + Stack Navigation' },
        { label: 'Shared State Hooks', sub: 'Predictable UI Updates' },
        { label: 'Expo Build & OTA', sub: 'iOS & Android Parity' },
      ],
      highlights: [
        {
          title: 'Tactile Screen Choreography',
          detail:
            'Problem: Janky transitions on mid-range phones → Choice: Lightweight native-driver animations → Result: Smooth bottom-sheet and tab switches.',
        },
        {
          title: 'Single Codebase Economics',
          detail:
            'Problem: Duplicate iOS/Android UI effort → Choice: Shared modular Expo component kit → Result: Unified parity with safe-area discipline.',
        },
        {
          title: 'Rapid OTA Iteration',
          detail:
            'Problem: Slow mobile QA feedback loops → Choice: Expo preview builds → Result: Fast physical-device testing.',
        },
      ],
      outcomeNext:
        'Next engineering iteration: migrate shared state modules to strict TypeScript schemas and add offline SQLite caching for zero-signal sessions.',
    },
  },
  {
    id: 'elevatecv',
    index: '03',
    title: 'ElevateCV — AI-Powered Résumé Builder',
    shortName: 'ElevateCV',
    badge: 'FULL-STACK WEB APP',
    category: 'Full-Stack Web App · Productivity & AI',
    timeline: '2025',
    stageMode: 'workspace',
    imageWebp: '/images/elevatecv.webp',
    imageWebpSm: '/images/elevatecv-640.webp',
    image: '/images/elevatecv.jpg',
    xrayTag: 'WORK_03 · SPLIT_RENDER · ATS_ENGINE',
    engineerSummary:
      'An AI-assisted résumé builder with real-time split-pane preview, ATS-friendly layout architecture, content suggestions, and multi-template state management.',
    clientSummary:
      'A fast web app that turns raw career history into clean, recruiter-ready résumés in minutes, with live preview and writing assistance.',
    stack: ['React', 'Tailwind CSS', 'Real-Time Preview', 'AI Integration'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Live App',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Synchronizing structured form state, AI bullet-point refinement, and real-time ATS document rendering in a distraction-free workspace.',
      metadata: {
        role: 'Full-Stack Web Developer',
        timeline: '2025',
        coreStack: 'React · Tailwind CSS · AI API',
        deployment: 'Modern Cloud Web Hosting',
      },
      problem: [
        'Job seekers lose hours fighting brittle document templates that break whenever a bullet is added—or use over-styled graphic templates that fail Applicant Tracking System (ATS) parsers.',
        'ElevateCV decouples structured career state from presentation: users edit clean form sections with optional AI rewrite suggestions on the left while an ATS-clean document updates live on the right.',
      ],
      architectureNodes: [
        { label: 'Editor Form State', sub: 'Controlled React Inputs' },
        { label: 'AI Rewrite Layer', sub: 'Impact & Verb Phrasing' },
        { label: 'Normalized Schema', sub: 'Multi-Template State' },
        { label: 'Print / PDF Canvas', sub: 'Deterministic ATS Output' },
      ],
      highlights: [
        {
          title: 'Zero-Lag Split Preview',
          detail:
            'Problem: Preview flicker during typing → Choice: Normalized state updates → Result: Instantaneous document reflow.',
        },
        {
          title: 'Grounded AI Assistance',
          detail:
            'Problem: Generic AI buzzwords → Choice: Action-verb & metric-focused rewrite prompts → Result: Stronger, honest bullet points.',
        },
        {
          title: 'Print-Exact ATS Layout',
          detail:
            'Problem: Broken page breaks on PDF export → Choice: Semantic print stylesheet rules → Result: Crisp, parser-friendly exports.',
        },
      ],
      outcomeNext:
        'Next engineering iteration: add side-by-side job-description keyword diffing and shareable read-only recruiter links backed by Supabase.',
    },
  },
  {
    id: 'jersey-store',
    index: '04',
    title: 'Bangladesh Premium Jersey Store',
    shortName: 'BD Jersey Store',
    badge: 'EDGE DEPLOYED · WRANGLER',
    category: 'E-Commerce · Retail UI/UX',
    timeline: 'December 2025',
    stageMode: 'commerce',
    imageWebp: '/images/jersey-store.webp',
    imageWebpSm: '/images/jersey-store-640.webp',
    image: '/images/jersey-store.jpg',
    xrayTag: 'WORK_04 · ECOMMERCE_UI · WRANGLER_EDGE',
    engineerSummary:
      'A mobile-first storefront for sports apparel with responsive catalogues, clean variant selection, and a streamlined checkout flow, deployed with Cloudflare Wrangler.',
    clientSummary:
      'An online store built for the Bangladeshi market that makes jerseys look premium on mobile while keeping browsing and ordering effortless.',
    stack: ['React', 'Tailwind CSS', 'E-Commerce UI', 'Mobile-First'],
    liveUrl: 'https://github.com/ahm3d777',
    liveLabel: 'Live Store',
    repoUrl: 'https://github.com/ahm3d777',
    caseStudy: {
      thesis:
        'Elevating Bangladeshi sports apparel retail with studio-dark product presentation, instant size selection, and frictionless mobile checkout.',
      metadata: {
        role: 'Frontend & E-Commerce UI Engineer',
        timeline: 'December 2025',
        coreStack: 'React · Tailwind CSS · Wrangler',
        deployment: 'Cloudflare Edge via Wrangler',
      },
      problem: [
        'Local apparel stores in Bangladesh frequently lose high-intent mobile shoppers from Facebook/Instagram links due to slow catalog grids and clunky multi-page checkouts.',
        'Bangladesh Premium Jersey Store frames vibrant national and club kits on deep obsidian surfaces with 44px+ size selector pills, clear BDT pricing, and a slide-over cart drawer.',
      ],
      architectureNodes: [
        { label: 'Mobile Storefront', sub: 'Club & National Catalogues' },
        { label: 'Variant State Matrix', sub: 'S / M / L / XL Selection' },
        { label: 'Slide-Over Cart', sub: 'Instant BDT Totals' },
        { label: 'Cloudflare Wrangler', sub: 'Global Edge Delivery' },
      ],
      highlights: [
        {
          title: 'Merchandising-First Dark UI',
          detail:
            'Problem: Flat template product cards → Choice: Studio-dark framing → Result: Kit crests and stitching pop on mobile OLED screens.',
        },
        {
          title: 'Zero-Reload Cart Drawer',
          detail:
            'Problem: Page reloads on size/quantity edits → Choice: Optimistic client cart drawer → Result: Faster path from landing to checkout.',
        },
        {
          title: 'Wrangler Edge Deployment',
          detail:
            'Problem: Slow regional TTFB → Choice: Deployed static assets via Cloudflare Wrangler → Result: Fast first paint across Bangladesh.',
        },
      ],
      outcomeNext:
        'Next engineering iteration: connect bKash/SSLCommerz payment webhook verification and real-time size inventory locking.',
    },
  },
];

export const SHOKTI_LAB = {
  namePrefix: 'Shokti (',
  nameBangla: 'শক্তি',
  nameSuffix: ')',
  badge: 'IN DEVELOPMENT',
  tagline:
    'A React Native progressive-overload training app built for Bangladeshi gym-goers.',
  narrative:
    'Born from training 4–5 days a week and finding global fitness apps bloated or disconnected from local gym routines. Shokti combines structured workout plans, AI-guided programming, and clean progressive-overload tracking in a distraction-free app.',
  roadmap: [
    {
      phase: 'Phase 01 · Core Set & Overload Engine',
      status: 'In Progress',
      items: [
        'Zero-clutter set/rep/weight logger tuned for one-handed gym floor input (KG & LB toggle)',
        'Automatic previous-session ghost targets (+2.5kg / +1 rep progressive overload nudges)',
        'Offline-first local persistence synced cleanly to Supabase Postgres when back online',
      ],
    },
    {
      phase: 'Phase 02 · Local Gym Context & AI Programming',
      status: 'Wireframed in Figma',
      items: [
        'Equipment-aware routines matched to real Dhaka gym setups (cables, dumbbells, Smith, barbell)',
        'Bilingual (English + Bangla) cue cards and AI-guided mesocycle adjustments',
        'Clean e1RM trend telemetry with zero paywalled social-feed clutter',
      ],
    },
    {
      phase: 'Phase 03 · Closed Beta & Gym Partnerships',
      status: 'Planned Milestone',
      items: [
        'Expo EAS closed beta with 50 Dhaka lifters',
        'Optional member bridge for modern gym front-desk portals',
      ],
    },
  ],
};

export const MEDIA_SYSTEMS = [
  {
    id: 'centria',
    client: 'Centria University of Applied Sciences',
    location: 'Kokkola, Finland · PlastLab / Chemical Eng. & Environmental Tech',
    tag: 'INTERNATIONAL · 4K → 9:16 AI PIPELINE',
    scope:
      '9:16 introduction video (4K source → 1080×1920 delivery), brand typography and safe-area caption checks, backed by a local AI workflow (faster-whisper + FFmpeg).',
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
      'Bilingual Bangla–English Reels strategy, content calendar, and AI-assisted production with Google Flow, aimed at non-follower reach and direct WhatsApp inquiries.',
    reelMeta: {
      ratio: 'Bilingual EN / BN',
      pipeline: 'Google Flow · AI Video',
      badge: 'WHATSAPP FUNNEL',
      captionSample: '“Certified document translation in Dhaka — tap to verify on WhatsApp.”',
    },
  },
];

export const SYSTEMS_MATRIX = [
  {
    id: 'interface',
    layerName: 'Interface & Design',
    filterKey: 'Frontend',
    role: 'Design-to-code fidelity, responsive layouts, accessible UI systems',
    tools: [
      { name: 'React', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'TypeScript', projects: ['elevatecv'] },
      { name: 'JavaScript (ES6+)', projects: ['fitness-factory', 'chikara', 'elevatecv', 'jersey-store'] },
      { name: 'Tailwind CSS', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'HTML5 & CSS3', projects: ['fitness-factory', 'elevatecv', 'jersey-store'] },
      { name: 'Sass', projects: ['fitness-factory'] },
      { name: 'Figma', projects: ['fitness-factory', 'chikara', 'elevatecv'] },
    ],
  },
  {
    id: 'mobile',
    layerName: 'Mobile',
    filterKey: 'Mobile',
    role: 'Cross-platform architecture, gesture navigation, OTA iteration',
    tools: [
      { name: 'React Native', projects: ['chikara'] },
      { name: 'Expo', projects: ['chikara'] },
    ],
  },
  {
    id: 'edge-cloud',
    layerName: 'Edge, Cloud & Backend',
    filterKey: 'Edge & Cloud',
    role: 'Edge deployment, Postgres/auth backends, CI/CD',
    tools: [
      { name: 'Cloudflare Workers/Pages & Wrangler', projects: ['fitness-factory', 'jersey-store'] },
      { name: 'Vercel', projects: ['elevatecv'] },
      { name: 'Supabase', projects: ['elevatecv'] },
      { name: 'Railway & Render', projects: ['elevatecv'] },
      { name: 'Node.js', projects: ['elevatecv'] },
      { name: 'Git / GitHub', projects: ['fitness-factory', 'chikara', 'elevatecv', 'jersey-store'] },
    ],
  },
  {
    id: 'quality-ai',
    layerName: 'Quality, Testing & AI',
    filterKey: 'AI & Media',
    role: 'E2E and unit tests, code quality, AI media and dev workflows',
    tools: [
      { name: 'Playwright', projects: ['fitness-factory', 'jersey-store'] },
      { name: 'Vitest', projects: ['fitness-factory', 'elevatecv'] },
      { name: 'ESLint', projects: ['fitness-factory', 'chikara', 'elevatecv', 'jersey-store'] },
      { name: 'Claude Code', projects: ['fitness-factory', 'elevatecv'] },
      { name: 'Google Flow', projects: [] },
      { name: 'FFmpeg & faster-whisper', projects: [] },
    ],
  },
];

export const ENGAGEMENT_TRACKS = [
  {
    id: 'business-web',
    code: 'TRACK 01',
    title: 'Business Website',
    description:
      'Lead-generation sites for law firms, clinics, gyms, and consultancies, edge-deployed and mobile-first.',
  },
  {
    id: 'web-mvp',
    code: 'TRACK 02',
    title: 'Web App & MVP',
    description:
      'Full-stack React + Supabase apps, interactive dashboards, storefronts, and AI tools.',
  },
  {
    id: 'mobile',
    code: 'TRACK 03',
    title: 'Cross-Platform Mobile App',
    description:
      'React Native & Expo applications for iOS and Android, built cleanly end to end.',
  },
  {
    id: 'engineering-role',
    code: 'TRACK 04',
    title: 'Full-Time / Contract Engineer',
    description:
      'Joining an engineering or product team to ship frontend, mobile, and full-stack features with ownership.',
  },
];

/**
 * Unified 4-Step 60-Second Scope Estimator (v2 §5 Section 06 Part C)
 */
export const ESTIMATOR_STEPS = {
  projectTypes: [
    {
      id: 'business-web',
      label: 'Business Website',
      hint: 'Lead-gen site for gyms, clinics, firms & brands',
      stack: 'React · Tailwind / Custom CSS · Cloudflare Pages Edge',
      phases: 'Discovery & Copy → Responsive Build → Edge Launch',
      deliverables: [
        'Mobile-first bespoke UI & conversion copy hierarchy',
        'Sub-second Cloudflare Edge deployment + SSL',
        'Direct WhatsApp & async inquiry capture',
      ],
    },
    {
      id: 'web-app',
      label: 'Web App / MVP',
      hint: 'Dashboards, SaaS tools & custom workflows',
      stack: 'React · Supabase (Postgres + Auth) · Cloudflare / Railway',
      phases: 'Architecture & Schema → Core MVP Sprint → QA & Deploy',
      deliverables: [
        'Application state architecture & Postgres schema',
        'Authentication, live data views & responsive UI',
        'Automated Vitest/Playwright smoke checks + CI/CD',
      ],
    },
    {
      id: 'mobile-app',
      label: 'Mobile App',
      hint: 'iOS & Android from one React Native codebase',
      stack: 'React Native · Expo · Supabase Backend',
      phases: 'Figma Flows → Cross-Platform Build → Device Beta & Release',
      deliverables: [
        'Unified iOS & Android codebase with native-feel navigation',
        'Expo preview builds testable directly on your phone',
        'Production build setup & backend API sync',
      ],
    },
    {
      id: 'online-store',
      label: 'Online Store',
      hint: 'Mobile-first e-commerce & retail catalogue',
      stack: 'React · Cloudflare Wrangler Edge · Streamlined Cart Flow',
      phases: 'Catalogue UX → Variant & Cart Engine → Checkout Launch',
      deliverables: [
        'High-contrast product showcase & size/variant matrix',
        'Zero-reload slide-over cart & mobile checkout UX',
        'Fast edge delivery tuned for social ad traffic',
      ],
    },
  ],
  stages: [
    { id: 'idea', label: 'Just an idea', phaseNote: 'Includes wireframe scoping' },
    { id: 'brand', label: 'Have content/brand', phaseNote: 'UI design + engineering' },
    { id: 'figma', label: 'Have Figma designs', phaseNote: 'Direct pixel-accurate build' },
    { id: 'redesign', label: 'Redesigning an existing site', phaseNote: 'UX audit + modernisation' },
  ],
  goals: [
    { id: 'leads', label: 'More leads & WhatsApp inquiries' },
    { id: 'product', label: 'Launch a product' },
    { id: 'sales', label: 'Sell online' },
  ],
  speeds: [
    { id: 'sprint', label: 'Rapid sprint (1–2 wks)', timelineRange: '1–2 Weeks (Focused Sprint)' },
    { id: 'standard', label: 'Standard (3–5 wks)', timelineRange: '3–5 Weeks (Phased Milestones)' },
    { id: 'flexible', label: 'Flexible', timelineRange: 'Flexible Iterative Roadmap' },
  ],
};
