import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload, X, Plus, Save, LogOut, Image as ImageIcon } from 'lucide-react';
import { navigate } from '../App';
import imageCompression from 'browser-image-compression';

interface ProjectData {
  id: string;
  title: string;
  label: string;
  category: string;
  tech: string;
  image: string;
  size: 'wide' | 'tall';
  description: string;
  role: string;
  year: string;
  order: number;
  tags: string[];
  audience: string;
  objective: string;
  decisions: string;
  challenge: string;
  solution: string;
  specs: {
    primaryColor: string;
    typography: string;
    grid: string;
    deliverables: string;
  };
  gallery: { thumbnail: string; full: string }[];
}

export default function AdminUpload() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectData>({
    id: '',
    title: '',
    label: '',
    category: '',
    tech: '',
    image: '',
    size: 'wide',
    description: '',
    role: '',
    year: new Date().getFullYear().toString(),
    order: 0,
    tags: [],
    audience: '',
    objective: '',
    decisions: '',
    challenge: '',
    solution: '',
    specs: {
      primaryColor: '',
      typography: '',
      grid: '',
      deliverables: '',
    },
    gallery: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          label: data.label || '',
          category: data.category || '',
          tech: data.tech || '',
          image: data.image || '',
          size: data.size || 'wide',
          description: data.description || '',
          role: data.role || '',
          year: data.year || new Date().getFullYear().toString(),
          order: data.order || 0,
          tags: data.tags || [],
          audience: data.audience || '',
          objective: data.objective || '',
          decisions: data.decisions || '',
          challenge: data.challenge || '',
          solution: data.solution || '',
          specs: {
            primaryColor: data.specs?.primaryColor || '',
            typography: data.specs?.typography || '',
            grid: data.specs?.grid || '',
            deliverables: data.specs?.deliverables || '',
          },
          gallery: data.gallery || [],
        };
      }) as ProjectData[];
      setProjects(projectsData);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleSaveProject = async () => {
    if (!currentProject.title || !currentProject.id) {
      alert('Please fill in at least Title and Project ID');
      return;
    }

    setIsSaving(true);

    try {
      const projectRef = doc(db, 'projects', currentProject.id);
      await setDoc(projectRef, currentProject, { merge: true });
      alert('Project saved successfully!');
      // Reset form
      setCurrentProject({
        id: '',
        title: '',
        label: '',
        category: '',
        tech: '',
        image: '',
        size: 'wide',
        description: '',
        role: '',
        year: new Date().getFullYear().toString(),
        order: 0,
        tags: [],
        audience: '',
        objective: '',
        decisions: '',
        challenge: '',
        solution: '',
        specs: {
          primaryColor: '',
          typography: '',
          grid: '',
          deliverables: '',
        },
        gallery: [],
      });
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving project: ', error);
      alert('Error saving project. Check the console for more information.');
      setIsSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !currentProject.tags.includes(tagInput.trim())) {
      setCurrentProject({
        ...currentProject,
        tags: [...currentProject.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setCurrentProject({
      ...currentProject,
      tags: currentProject.tags.filter(t => t !== tag),
    });
  };

  const removeGalleryImage = (imageUrl: string) => {
    setCurrentProject({
      ...currentProject,
      gallery: currentProject.gallery.filter(g => g.full !== imageUrl),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const storageRef = ref(storage, `projects/${currentProject.id}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setCurrentProject({ ...currentProject, image: downloadURL });
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        const galleryItems = await Promise.all(
            files.map(async (file) => {
                // Upload original image
                const fullStorageRef = ref(storage, `projects/${currentProject.id}/gallery/${file.name}`);
                await uploadBytes(fullStorageRef, file);
                const fullUrl = await getDownloadURL(fullStorageRef);

                // Create and upload thumbnail
                const thumbOptions = {
                    maxSizeMB: 0.1,
                    maxWidthOrHeight: 512,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, thumbOptions);
                const thumbStorageRef = ref(storage, `projects/${currentProject.id}/gallery/thumbnails/${file.name}`);
                await uploadBytes(thumbStorageRef, compressedFile);
                const thumbUrl = await getDownloadURL(thumbStorageRef);

                return { full: fullUrl, thumbnail: thumbUrl };
            })
        );
        setCurrentProject({ ...currentProject, gallery: [...currentProject.gallery, ...galleryItems] });
    }
  };

  const loadProjectForEditing = (project: ProjectData) => {
    setCurrentProject({
      ...{
        id: '',
        title: '',
        label: '',
        category: '',
        tech: '',
        image: '',
        size: 'wide',
        description: '',
        role: '',
        year: new Date().getFullYear().toString(),
        order: 0,
        tags: [],
        audience: '',
        objective: '',
        decisions: '',
        challenge: '',
        solution: '',
        specs: {
          primaryColor: '',
          typography: '',
          grid: '',
          deliverables: '',
        },
        gallery: [],
      },
      ...project,
      specs: {
        primaryColor: project.specs?.primaryColor || '',
        typography: project.specs?.typography || '',
        grid: project.specs?.grid || '',
        deliverables: project.specs?.deliverables || '',
      }
    });
    // Scroll to the top of the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createNewProject = () => {
    setCurrentProject({
      id: '',
      title: '',
      label: '',
      category: '',
      tech: '',
      image: '',
      size: 'wide',
      description: '',
      role: '',
      year: new Date().getFullYear().toString(),
      order: 0,
      tags: [],
      audience: '',
      objective: '',
      decisions: '',
      challenge: '',
      solution: '',
      specs: {
        primaryColor: '',
        typography: '',
        grid: '',
        deliverables: '',
      },
      gallery: [],
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-cyan-400/80 text-xs tracking-widest mb-1">
              {'>'} ADMIN.DASHBOARD
            </p>
            <h1 className="font-sans font-extrabold text-white tracking-tight uppercase text-xl">
              PROJECT MANAGER
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded font-mono text-white/70 hover:text-white text-sm transition-all"
            >
              VIEW SITE
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 hover:border-red-400/50 rounded font-mono text-red-400 text-sm transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* EXISTING PROJECTS LIBRARY */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-mono text-cyan-400/80 text-xs tracking-widest mb-1">
                {'>'} PROJECT.LIBRARY
              </p>
              <h2 className="font-sans font-extrabold text-white tracking-tight uppercase text-xl">
                Existing Projects ({projects.length})
              </h2>
            </div>
            <button
              onClick={createNewProject}
              className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-400/30 hover:border-green-400/50 rounded font-mono text-green-400 text-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              NEW PROJECT
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => loadProjectForEditing(project)}
                className="group bg-black/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 rounded-lg overflow-hidden transition-all text-left"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-mono text-cyan-400/60 text-xs mb-1">{project.label}</p>
                  <h3 className="font-sans font-extrabold text-white text-sm mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-white/40 text-xs">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span className="line-clamp-1">{project.category}</span>
                  </div>
                  {currentProject.id === project.id && (
                    <div className="mt-2 px-2 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded text-cyan-400 font-mono text-xs text-center">
                      EDITING
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-extrabold text-white mb-6 tracking-tight uppercase text-lg">
                PROJECT DETAILS
              </h2>

              {/* Project ID */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  PROJECT ID * (e.g., venture-brand-systems)
                </label>
                <input
                  type="text"
                  value={currentProject.id}
                  onChange={(e) => setCurrentProject({ ...currentProject, id: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="project-slug"
                />
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  TITLE *
                </label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="VENTURE BRAND SYSTEMS"
                />
              </div>

              {/* Label */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  LABEL
                </label>
                <input
                  type="text"
                  value={currentProject.label}
                  onChange={(e) => setCurrentProject({ ...currentProject, label: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="VISUAL IDENTITY"
                />
              </div>

              {/* Category & Year */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    CATEGORY
                  </label>
                  <input
                    type="text"
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors"
                    placeholder="Brand Systems"
                  />
                </div>
                <div>
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    YEAR
                  </label>
                  <input
                    type="text"
                    value={currentProject.year}
                    onChange={(e) => setCurrentProject({ ...currentProject, year: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  TECH STACK
                </label>
                <input
                  type="text"
                  value={currentProject.tech}
                  onChange={(e) => setCurrentProject({ ...currentProject, tech: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="Illustrator, Figma"
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  YOUR ROLE
                </label>
                <input
                  type="text"
                  value={currentProject.role}
                  onChange={(e) => setCurrentProject({ ...currentProject, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="Brand Architect & Creative Director"
                />
              </div>

              {/* Size */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  CARD SIZE
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentProject({ ...currentProject, size: 'wide' })}
                    className={`flex-1 px-4 py-3 rounded font-mono text-sm transition-all ${
                      currentProject.size === 'wide'
                        ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    } border`}
                  >
                    WIDE
                  </button>
                  <button
                    onClick={() => setCurrentProject({ ...currentProject, size: 'tall' })}
                    className={`flex-1 px-4 py-3 rounded font-mono text-sm transition-all ${
                      currentProject.size === 'tall'
                        ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                    } border`}
                  >
                    TALL
                  </button>
                </div>
              </div>

              {/* Main Image */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  MAIN IMAGE URL
                </label>
                <input
                  type="text"
                  value={currentProject.image}
                  onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono text-sm focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="https://images.unsplash.com/..."
                />
                <div className="mt-4">
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    UPLOAD MAIN IMAGE
                  </label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                  />
                </div>
                {currentProject.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                    <img src={currentProject.image} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                )}
              </div>

              {/* Order */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  ORDER
                </label>
                <input
                  type="number"
                  value={currentProject.order}
                  onChange={(e) => setCurrentProject({ ...currentProject, order: parseInt(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>

              {/* Audience */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  AUDIENCE
                </label>
                <textarea
                  value={currentProject.audience}
                  onChange={(e) => setCurrentProject({ ...currentProject, audience: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors h-24"
                  placeholder="Describe the target audience..."
                />
              </div>

              {/* Objective */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  OBJECTIVE
                </label>
                <textarea
                  value={currentProject.objective}
                  onChange={(e) => setCurrentProject({ ...currentProject, objective: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors h-24"
                  placeholder="Describe the project objective..."
                />
              </div>

              {/* Decisions */}
              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  DECISIONS
                </label>
                <textarea
                  value={currentProject.decisions}
                  onChange={(e) => setCurrentProject({ ...currentProject, decisions: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors h-24"
                  placeholder="Describe the key decisions made..."
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-extrabold text-white mb-6 tracking-tight uppercase text-lg">
                CONTENT
              </h2>

              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  DESCRIPTION
                </label>
                <textarea
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors h-24"
                  placeholder="A comprehensive brand identity system..."
                />
              </div>

              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  CHALLENGE
                </label>
                <textarea
                  value={currentProject.challenge}
                  onChange={(e) => setCurrentProject({ ...currentProject, challenge: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors h-24"
                  placeholder="Describe the challenge..."
                />
              </div>

              <div className="mb-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  SOLUTION
                </label>
                <textarea
                  value={currentProject.solution}
                  onChange={(e) => setCurrentProject({ ...currentProject, solution: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-sans focus:border-cyan-400/50 focus:outline-none transition-colors h-24"
                  placeholder="Describe the solution..."
                />
              </div>
            </div>
          </div>

          {/* Right Column - Additional Data */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-extrabold text-white mb-6 tracking-tight uppercase text-lg">
                TAGS
              </h2>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono text-sm focus:border-cyan-400/50 focus:outline-none transition-colors"
                  placeholder="Add tag..."
                />
                <button
                  onClick={addTag}
                  className="px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-400/50 rounded text-cyan-400 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 font-mono text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-extrabold text-white mb-6 tracking-tight uppercase text-lg">
                SPECIFICATIONS
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    PRIMARY COLOR
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={currentProject.specs.primaryColor || '#0077C8'}
                      onChange={(e) => setCurrentProject({
                        ...currentProject,
                        specs: { ...currentProject.specs, primaryColor: e.target.value }
                      })}
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentProject.specs.primaryColor}
                      onChange={(e) => setCurrentProject({
                        ...currentProject,
                        specs: { ...currentProject.specs, primaryColor: e.target.value }
                      })}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                      placeholder="#0077C8"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    TYPOGRAPHY
                  </label>
                  <input
                    type="text"
                    value={currentProject.specs.typography}
                    onChange={(e) => setCurrentProject({
                      ...currentProject,
                      specs: { ...currentProject.specs, typography: e.target.value }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                    placeholder="Inter + JetBrains Mono"
                  />
                </div>

                <div>
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    GRID SYSTEM
                  </label>
                  <input
                    type="text"
                    value={currentProject.specs.grid}
                    onChange={(e) => setCurrentProject({
                      ...currentProject,
                      specs: { ...currentProject.specs, grid: e.target.value }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                    placeholder="12-Column Flexbox"
                  />
                </div>

                <div>
                  <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                    DELIVERABLES
                  </label>
                  <input
                    type="text"
                    value={currentProject.specs.deliverables}
                    onChange={(e) => setCurrentProject({
                      ...currentProject,
                      specs: { ...currentProject.specs, deliverables: e.target.value }
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                    placeholder="React Component Library, Figma Design System"
                  />
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-extrabold text-white mb-6 tracking-tight uppercase text-lg">
                GALLERY IMAGES
              </h2>

              <div className="mt-4">
                <label className="font-mono text-white/60 text-xs tracking-wider mb-2 block">
                  UPLOAD GALLERY IMAGES
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryUpload}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white font-mono focus:border-cyan-400/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {currentProject.gallery.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.thumbnail}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-white/10"
                    />
                    <button
                      onClick={() => removeGalleryImage(image.full)}
                      className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProject}
              disabled={isSaving}
              className="w-full px-6 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 hover:border-cyan-400/50 rounded-2xl font-sans font-semibold text-cyan-400 uppercase tracking-wider transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'SAVING...' : 'SAVE PROJECT'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded font-mono text-white/70 text-sm"
        >
          VIEW SITE
        </button>
        <button
          onClick={handleSaveProject}
          disabled={isSaving}
          className="flex-1 px-4 py-3 bg-cyan-500/10 border border-cyan-400/30 rounded font-mono text-cyan-400 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
    </div>
  );
}