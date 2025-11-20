
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const projects = [
  {
    title: 'BLUEICON TECHNOLOGIES',
    label: 'VISUAL IDENTITY',
    category: 'Identity System',
    tech: 'Illustrator, Figma',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwZGVzaWduJTIwc3lzdGVtfGVufDF8fHx8MTc2MzQ4MzY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    size: 'wide',
    description: 'A comprehensive brand identity system for a technology hardware partner. Organizing complex technical specifications into a clean, authoritative visual language.',
    role: 'Lead Brand Architect',
    year: '2024',
    tags: ['Brand Identity', 'Identity System', 'Retail Collateral', 'Swiss-Style Grid'],
    audience: 'Corporate procurement officers, gamers, and value-conscious tech enthusiasts seeking high-performance hardware.',
    objective: 'To elevate the brand from a generic "hardware reseller" into a trusted "technology partner." The goal was to organize complex technical specs (RAM, SSD, CPU) into a visual language that feels clean, authoritative, and easy to scan.',
    decisions: 'We adopted a Swiss-Style Grid System to handle the data density. The color palette (Icon Blue & Deep Navy) signals corporate trust, while the Northlane typeface provides geometric rigidity, ensuring the brand feels engineered rather than decorated.',
    specs: {
      primaryColor: '#0077C8 (Icon Blue)',
      secondary: '#0A1E2F (Deep Navy)',
      typography: 'Northlane (Bold / Medium)',
      grid: '4-Column Modular Layout',
      output: '150gsm Gloss Art Paper',
    },
    gallery: [
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbiUyMGd1aWRlfGVufDF8fHx8MTc2MzQ4MzY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMG1vY2t1cHxlbnwxfHx8fDE3NjM0ODM2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    title: 'SCARS: NARRATIVE ARCHITECTURE',
    label: 'EDITORIAL & NARRATIVE',
    category: 'Book Design',
    tech: 'Adobe Creative Suite',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwZGVzaWduJTIwY292ZXJ8ZW58MXx8fHwxNzYzNTMxNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 'tall',
    description: 'Editorial design translating the non-linear journey of trauma and healing into a static visual format. A book cover and layout system representing fracture and repair.',
    role: 'Art Director & Illustrator',
    year: '2023',
    tags: ['Editorial Design', 'Book Cover', 'Illustration', 'Typography'],
    audience: 'Readers of contemporary literary fiction and memoirs; an audience sensitive to visual metaphors and emotional narrative structures.',
    objective: 'To translate the non-linear journey of trauma and healing into a static visual format. The challenge was to represent the concept of "Scars"—fracture and repair—without being gratuitous or overly literal.',
    decisions: 'The layout utilizes a "Disrupted Grid" where typography interacts directly with the figure study. The serif typeface (Playfair Display) interlocks with the illustration, creating a visual metaphor for how experiences become woven into identity. Earth tones were selected to evoke organic warmth.',
    specs: {
      typeface: 'Playfair Display (Serif)',
      palette: '#D9CAB3 (Beige) / #8B4513',
      composition: 'Center-Axis / Interlocking',
      style: 'Digital Illustration + Typography',
      mood: 'Melancholic / Resilient',
    },
    gallery: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGxheW91dHxlbnwxfHx8fDE3NjM0ODM2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBkZXNpZ258ZW58MXx8fHwxNzYzNDgzNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  {
    title: 'BRANDAPT DIGITAL SYSTEM',
    label: 'DIGITAL PLATFORM',
    category: 'Full-Stack Application',
    tech: 'React, TypeScript',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBsYXB0b3B8ZW58MXx8fHwxNzYzNTA5MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    size: 'wide',
    description: 'This portfolio—a living dossier demonstrating full-stack capability from visual identity architecture to deployed infrastructure, built without relying on templates.',
    role: 'Full-Stack Architect',
    year: '2025',
    tags: ['Full-Stack', 'React', 'Design System', 'Motion Design'],
    audience: 'Global creative agencies, venture capital firms, and technical recruiters seeking hybrid talent who bridge the gap between design and engineering.',
    objective: 'To dismantle the boundary between "Designer" and "Developer." The goal was to build a living dossier that demonstrates full-stack capability—from visual identity architecture to deployed serverless infrastructure—without relying on templates.',
    decisions: 'We implemented a "Chameleon Context Engine" (Zustand + Framer Motion) that morphs the interface physics based on scroll position. The typography strictly separates Brand Voice (Inter ExtraBold) from System Data (JetBrains Mono) to reinforce the "Technologist" persona.',
    specs: {
      framework: 'Next.js 14 (App Router)',
      styling: 'Tailwind CSS + Framer Motion',
      backend: 'Firebase v9 (Firestore)',
      state: 'Zustand (Context Aware)',
      deployment: 'Vercel Edge Network',
    },
    gallery: [
      'https://images.unsplash.com/photo-1547658719-da2b51169166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2MzQ4MzY5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NjM0ODM2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
];

const populate = async () => {
  const projectsCollection = db.collection('projects');
  for (const project of projects) {
    await projectsCollection.add(project);
  }
  console.log('Done!');
};

populate();
