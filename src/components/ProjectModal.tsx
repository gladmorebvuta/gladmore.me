import { X, ZoomIn, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    description: string;
    role: string;
    year: string;
    imageUrl: string;
    tags: string[];
    audience?: string;
    objective?: string;
    decisions?: string;
    challenge?: string;
    solution?: string;
    specs?: Record<string, string>;
    gallery?: { thumbnail: string; full: string }[];
    features?: string[];
    status?: string;
    liveUrl?: string;
  } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, project]);

  // Navigation functions for lightbox
  const goToNextImage = () => {
    if (!project?.gallery || selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length);
  };

  const goToPreviousImage = () => {
    if (!project?.gallery || selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  // Keyboard navigation (ESC closes entire modal, arrows navigate lightbox)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else if (isOpen) {
          onClose();
        }
      } else if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') {
          goToNextImage();
        } else if (e.key === 'ArrowLeft') {
          goToPreviousImage();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex, isOpen, project, onClose]);

  // Touch swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextImage();
    } else if (isRightSwipe) {
      goToPreviousImage();
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto py-12"
          >
            {/* Modal Container - Constrained Width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Close Button - Fixed Top Right */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 bg-black/80 hover:bg-cyan-500/20 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300"
              >
                <X className="w-5 h-5 text-white/90" />
              </button>

              {/* A. THE HERO (Top) */}
              <div className="relative w-full aspect-video overflow-hidden">
                {project.liveUrl ? (
                  <iframe
                    src={project.liveUrl}
                    className="w-full h-full border-0 pointer-events-auto"
                    title={project.title}
                    loading="lazy"
                  />
                ) : (
                  <ImageWithFallback
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title Bar (Below Image) */}
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  {/* Left: Project Title */}
                  <div className="flex items-center gap-3">
                    <h2 className="font-sans font-extrabold tracking-tight text-white text-3xl">
                      {project.title}
                    </h2>
                    {/* Status Badge */}
                    {project.status && (
                      <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/30 rounded-full">
                        <span className="font-mono text-cyan-400 text-xs tracking-wider uppercase">
                          {project.status}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right: Metadata Pill */}
                  <div className="font-mono text-white/60 text-xs tracking-wider flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <span>{project.year}</span>
                    <span>//</span>
                    <span>{project.role}</span>
                  </div>
                </div>

                {/* Live site CTA — links to the real production domain */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 max-w-full px-5 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-400/70 rounded-full text-cyan-400 font-sans font-semibold tracking-wide transition-all duration-300 overflow-hidden"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap flex-shrink-0">Visit Live Site</span>
                    <span className="font-mono text-white/50 text-sm truncate">
                      {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </a>
                )}
              </div>

              {/* B. THE STRATEGY ENGINE (Middle) - 2 Column Grid */}
              <div className="px-8 py-12">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  {/* Col 1: Narrative (Audience + Objective) */}
                  <div className="space-y-8">
                    {/* Target Audience */}
                    {project.audience && (
                      <div>
                        <p className="font-mono text-cyan-400/80 mb-3 tracking-widest text-xs">
                          // TARGET AUDIENCE:
                        </p>
                        <p className="font-sans text-white/70 leading-relaxed">
                          "{project.audience}"
                        </p>
                      </div>
                    )}

                    {/* Core Objective */}
                    {project.objective && (
                      <div>
                        <p className="font-mono text-cyan-400/80 mb-3 tracking-widest text-xs">
                          // CORE OBJECTIVE:
                        </p>
                        <p className="font-sans text-white/70 leading-relaxed">
                          "{project.objective}"
                        </p>
                      </div>
                    )}

                    {/* Design Decisions */}
                    {project.decisions && (
                      <div>
                        <p className="font-mono text-cyan-400/80 mb-3 tracking-widest text-xs">
                          // DESIGN DECISIONS:
                        </p>
                        <p className="font-sans text-white/70 leading-relaxed">
                          "{project.decisions}"
                        </p>
                      </div>
                    )}

                    {/* Fallback: Legacy Challenge/Solution */}
                    {!project.audience && project.challenge && (
                      <div>
                        <p className="font-mono text-cyan-400/80 mb-4 tracking-widest text-xs uppercase">
                          THE CHALLENGE
                        </p>
                        <p className="font-sans text-white/70 leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                    )}

                    {!project.objective && project.solution && (
                      <div>
                        <p className="font-mono text-cyan-400/80 mb-4 tracking-widest text-xs uppercase">
                          THE SOLUTION
                        </p>
                        <p className="font-sans text-white/70 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Col 2: The Terminal (Specs) */}
                  {project.specs && (
                    <div className="bg-black border border-white/10 rounded-lg p-6 h-fit">
                      <p className="font-mono text-cyan-400/80 mb-6 tracking-widest text-xs">
                        {'>'} SYSTEM.SPECIFICATIONS
                      </p>
                      <div className="font-mono text-sm space-y-2">
                        {Object.entries(project.specs).map(([key, value], index) => (
                          <div key={key} className="flex items-start gap-3">
                            <span className={index % 2 === 0 ? 'text-green-400' : 'text-blue-400'}>
                              {'>'}
                            </span>
                            <span className="text-white/60 uppercase min-w-[120px]">
                              {key.replace(/([A-Z])/g, '_$1').toUpperCase()}:
                            </span>
                            <span className="text-cyan-400 flex-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* UNIQUE FEATURES & IMPACT Section */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-12 pt-8 border-t border-white/10">
                    <p className="font-mono text-cyan-400/80 mb-6 tracking-widest text-xs">
                      // UNIQUE FEATURES & IMPACT
                    </p>
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-cyan-400 font-bold mt-1 flex-shrink-0">→</span>
                          <p className="font-sans text-white/70 leading-relaxed text-sm">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-12">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-2 bg-white/5 border border-white/10 rounded text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* C. THE INTERACTIVE GALLERY (Bottom) */}
                {project.gallery && project.gallery.length > 0 && (
                  <div>
                    <p className="font-mono text-cyan-400/80 mb-6 tracking-widest text-xs">
                      {'>'} VISUAL EVIDENCE
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.gallery.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className="group relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                        >
                          <ImageWithFallback
                            src={image.thumbnail}
                            alt={`${project.title} - Gallery ${index + 1}`}
                            className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-300"
                          />
                          {/* Zoom Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/80 backdrop-blur-sm rounded-full p-3">
                              <ZoomIn className="w-6 h-6 text-cyan-400" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* LIGHTBOX - Full Screen Image Viewer */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImageIndex(null)}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] flex items-center justify-center p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-6 right-6 z-10 p-3 bg-black/80 hover:bg-cyan-500/20 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300"
                >
                  <X className="w-6 h-6 text-white/90" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={goToPreviousImage}
                  className="absolute top-1/2 left-6 z-10 p-3 bg-black/80 hover:bg-cyan-500/20 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300 -translate-y-1/2"
                >
                  <ChevronLeft className="w-6 h-6 text-white/90" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute top-1/2 right-6 z-10 p-3 bg-black/80 hover:bg-cyan-500/20 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-full transition-all duration-300 -translate-y-1/2"
                >
                  <ChevronRight className="w-6 h-6 text-white/90" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full">
                  <span className="font-mono text-xs text-white/60">
                    {selectedImageIndex + 1} / {project.gallery!.length}
                  </span>
                </div>

                {/* Full Size Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-screen max-w-screen-xl"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <ImageWithFallback
                    src={project.gallery![selectedImageIndex].full}
                    alt="Full size view"
                    className="max-h-screen w-auto object-contain rounded-lg border border-white/20"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}