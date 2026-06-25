// One-off seed for gladmore-7dac6 Firestore `projects` collection.
// Auth: owner OAuth access token via env FIRESTORE_TOKEN (no service-account key committed).
//   TOKEN=$(gcloud auth print-access-token mrbvuta@gmail.com) FIRESTORE_TOKEN=$TOKEN node scripts/seed-projects.mjs
// Replaces all existing project docs with the 4 featured case studies.

const PROJECT = "gladmore-7dac6";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/projects`;
const TOKEN = process.env.FIRESTORE_TOKEN;
if (!TOKEN) { console.error("Missing FIRESTORE_TOKEN env"); process.exit(1); }
const H = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };

// JS value -> Firestore typed value
function val(v) {
  if (Array.isArray(v)) return { arrayValue: { values: v.map(val) } };
  if (typeof v === "number" && Number.isInteger(v)) return { integerValue: String(v) };
  if (typeof v === "number") return { doubleValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (v && typeof v === "object") return { mapValue: { fields: fields(v) } };
  return { stringValue: String(v ?? "") };
}
function fields(obj) {
  const f = {};
  for (const [k, v] of Object.entries(obj)) f[k] = val(v);
  return f;
}

const projects = [
  {
    _id: "luminery-executive-services",
    title: "LUMINERY EXECUTIVE SERVICES",
    label: "LUXURY MOBILITY BRAND",
    category: "Executive Transport & Brand",
    tech: "React, Vite, TypeScript, Firebase",
    image: "/projects/luminary.png",
    size: "wide",
    description: "A premium digital presence for executive chauffeur, luxury vehicle hire, and close-protection transport across South Africa.",
    role: "Brand Architect & Full-Stack Developer",
    year: "2025",
    order: 1,
    liveUrl: "https://luminaryservices.co.za",
    tags: ["Luxury Mobility", "Branding", "Firebase", "South Africa", "Booking UX"],
    audience: "Corporate executives, VIPs, and high-net-worth clients across South Africa needing discreet, reliable premium transport.",
    objective: "Luminery needed a digital presence that signals premium positioning and converts high-value enquiries, while clients needed confidence in reliability, discretion, and safety before booking.",
    decisions: "Restrained, sophisticated design over flashiness — appropriate for an executive audience that values discretion. A lean React/Vite + Firebase stack keeps it fast and maintainable, prioritising speed-to-market and scalability without infrastructure overhead.",
    challenge: "",
    solution: "A bespoke, fast-loading marketing and enquiry platform that showcases the fleet, credentials and service areas, with a streamlined booking pathway — built to scale as the boutique service grows across SA.",
    features: [
      "Premium brand presence — communicates luxury positioning and builds trust before the first call",
      "Service & fleet showcase — chauffeur credentials, vehicles and coverage areas at a glance",
      "Streamlined enquiry/booking pathway — converts high-value leads without friction",
      "Responsive executive experience — fast and flawless on the phones VIPs actually use in transit",
      "Trust signals — discretion, safety and close-protection commitments surfaced for high-value clientele",
    ],
    specs: {
      primaryColor: "Onyx Black / Champagne Gold",
      typography: "Premium sans-serif with strong hierarchy",
      grid: "12-column responsive",
      deliverables: "Responsive web app, Firebase hosting, SEO pages, enquiry forms",
    },
    gallery: [],
  },
  {
    _id: "brandapt-os",
    title: "BRANDAPT OS",
    label: "VENTURE STUDIO PLATFORM",
    category: "Integrated Venture Operating System",
    tech: "React, TypeScript, Firebase, Tailwind, Framer Motion",
    image: "/projects/brandapt.png",
    size: "tall",
    description: "An operating system for a hybrid venture studio — unifying brand, technology and operations into one AI-assisted command centre.",
    role: "Full-Stack Architect & Brand Lead",
    year: "2025",
    order: 2,
    liveUrl: "https://brandapt.co",
    tags: ["Venture Studio", "Firebase", "AI Co-founder", "Real-time", "Operating System"],
    audience: "Founder-operators and internal teams building ventures, plus consulting clients needing integrated brand, tech and ops support.",
    objective: "Venture building fragments brand, technology and operations into silos, slowing scaling and breeding inconsistency. Brandapt OS unifies planning, venture management and AI-driven decisions into a single command centre — and turns consulting from advisory-only into co-operative venture building.",
    decisions: "Auth-gated collaboration over public features (venture work is sensitive); Firestore for real-time sync across multiple concurrent workspaces; a precise, modular UI that feels technical without being baroque — honouring a lean, fast-iteration philosophy.",
    challenge: "",
    solution: "A three-layer system: a Flight Deck for portfolio-wide KPIs, Venture Workspaces with AI co-founder chat and analytics, and a Knowledge Base that captures institutional IP so every interaction improves the methodology — all built and run by one person.",
    features: [
      "Flight Deck dashboard — unified real-time view of ventures, clients and operational metrics for instant decisions",
      "Venture Workspaces — mission-control depth per venture: AI co-founder chat, task tracking and analytics",
      "AI co-founder chat — conversational guidance for discovery and execution that learns from feedback",
      "Knowledge Base & feedback loop — institutional memory that continuously refines prompts and methodology",
      "Secure client workspaces — collaborative, access-controlled brand/tech/ops planning in one place",
    ],
    specs: {
      primaryColor: "Blue→Cyan gradient on dark",
      typography: "Space Mono + system sans",
      grid: "12-column, 8pt spacing",
      deliverables: "Public site, authenticated dashboard, Firestore backend, real-time sync",
    },
    gallery: [],
  },
  {
    _id: "zoranta-technologies",
    title: "ZORANTA TECHNOLOGIES",
    label: "E-COMMERCE PLATFORM",
    category: "Certified Tech Marketplace",
    tech: "React, TypeScript, Firebase",
    image: "/projects/zoranta.png",
    size: "wide",
    description: "An honest-pricing marketplace for certified used and new devices, built for trust in Zimbabwe's tech market.",
    role: "Full-Stack Developer & Platform Architect",
    year: "2025",
    order: 3,
    liveUrl: "https://zoranta.co.zw",
    tags: ["E-commerce", "Zimbabwe", "Trust", "Marketplace", "Mobile-first"],
    audience: "Zimbabwean buyers seeking certified used and new laptops, phones, tablets and accessories at honest prices.",
    objective: "Zimbabwe's used-device market runs on uncertainty and opaque pricing. Zoranta closes the trust gap with certified, condition-graded inventory and transparent pricing — removing risk for buyers and giving the business a scalable edge over gray-market dealers.",
    decisions: "Mobile-first React for price-conscious buyers on slower networks; a serverless Firebase stack to cut operational overhead in a limited-infrastructure market; condition grading and transparent pricing baked into the data model as the core differentiator.",
    challenge: "",
    solution: "A responsive storefront with certified-condition product data, transparent pricing and a clean checkout path — positioning 'honest prices' as a structural feature of the product, not a slogan.",
    features: [
      "Certified condition grading — verified device states with transparent refurbishment history",
      "Honest-pricing transparency — clear justification versus gray-market markups",
      "Multi-category catalog — laptops, phones, tablets and accessories in one trusted marketplace",
      "Zimbabwe-localised experience — local pricing, payment and delivery realities built in",
      "Mobile-first storefront — optimised for lower-bandwidth browsing where most buyers shop",
    ],
    specs: {
      primaryColor: "Tech blue on zinc",
      typography: "Modern sans-serif, mobile-legible",
      grid: "12-column responsive",
      deliverables: "React SPA, Firebase hosting, product catalog, checkout",
    },
    gallery: [],
  },
  {
    _id: "pamhepo",
    title: "PAMHEPO",
    status: "IN DEVELOPMENT · CLOSED BETA",
    label: "CONVERSATIONAL HOSTING",
    category: "Chat-first Hosting Platform",
    tech: "React, TypeScript, Firebase, Gemini, Capacitor",
    image: "/projects/pamhepo.png",
    size: "tall",
    description: "The world's first conversational hosting platform — register domains, deploy, and manage email and billing by chatting with an AI assistant. Currently in closed beta.",
    role: "Founder & Full-Stack Architect",
    year: "2025",
    order: 4,
    liveUrl: "https://pamhepo.africa",
    tags: ["Conversational UI", "AI Assistant", "Hosting", "Africa-first", "Gemini"],
    audience: "Non-technical founders and SMBs in Africa who need domains, hosting, email and billing without wrestling technical dashboards.",
    objective: "Hosting is fragmented, technical and opaque — setup takes hours across multiple vendors. Pamhepo is being built to consolidate domains, hosting, email, billing and support into a single conversation with an AI assistant, 'Pam', removing the need for specialist knowledge.",
    decisions: "Chat-first as the primary interface — with interactive cards and a fallback dashboard — trades higher AI-pipeline complexity for far lower cognitive load. That's especially relevant in Africa, where connectivity cost and English-only dashboards create real barriers.",
    challenge: "",
    solution: "A React + Firebase app with a Gemini-backed conversation engine that orchestrates provisioning, payments and support through resumable chat flows — being built toward domain registration, hosting, email, invoicing and an affiliate program.",
    features: [
      "Chat-driven onboarding (in build) — provision and configure services through conversation, no technical knowledge required",
      "Domain search & registration (planned) — browse and register in-chat with real-time availability and transparent pricing",
      "Hosting provisioning (in build) — automated deployment to cPanel-based hosting with failover retry logic",
      "Email management (planned) — create and manage accounts per domain without touching DNS",
      "Billing & invoicing (in build) — multi-currency invoicing with local payment rails and auto-provisioning on confirmation",
    ],
    specs: {
      primaryColor: "#3B82F6 / #6366F1 accents",
      typography: "Rinter + Space Mono",
      grid: "Mobile-first 4-col → 12-col",
      deliverables: "Web + mobile (Capacitor) + desktop (Electron), Cloud Functions, chat-card design system",
    },
    gallery: [],
  },
];

async function main() {
  // 1. delete existing
  const listRes = await fetch(`${BASE}?pageSize=100`, { headers: H });
  const list = await listRes.json();
  for (const doc of list.documents || []) {
    const r = await fetch(`https://firestore.googleapis.com/v1/${doc.name}`, { method: "DELETE", headers: H });
    console.log("deleted", doc.name.split("/").pop(), r.status);
  }
  // 2. create the 4 featured
  for (const p of projects) {
    const { _id, ...data } = p;
    const r = await fetch(`${BASE}?documentId=${_id}`, {
      method: "POST", headers: H, body: JSON.stringify({ fields: fields(data) }),
    });
    console.log("created", _id, r.status, r.ok ? "" : await r.text());
  }
  console.log("Done.");
}
main().catch((e) => { console.error(e); process.exit(1); });
