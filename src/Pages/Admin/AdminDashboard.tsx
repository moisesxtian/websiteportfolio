import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Award,
  Building2,
  Code2,
  FileText,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Play,
  GripVertical,
  ArrowDownUp,
} from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { useProjects } from '../../Hooks/useProjects';
import { useCertificates } from '../../Hooks/useCertificates';
import { useExperiences } from '../../Hooks/useExperiences';
import ProjectForm from '../../components/Admin/ProjectForm';
import CertificateForm from '../../components/Admin/CertificateForm';
import ExperienceForm from '../../components/Admin/ExperienceForm';
import SkillsManager from '../../components/Admin/SkillsManager';
import ResumeUploader from '../../components/Admin/ResumeUploader';
import type { Project, Certificate, Experience } from '../../types/content';

type Tab = 'projects' | 'certificates' | 'experience' | 'skills' | 'resume';

const tabs: { id: Tab; label: string; icon: typeof Briefcase }[] = [
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'experience', label: 'Experience', icon: Building2 },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'resume', label: 'Resume', icon: FileText },
];

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-secondary-color">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold">Portfolio Admin</h1>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50"
              target="_blank"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <nav className="flex flex-wrap gap-2 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition ${
                tab === id
                  ? 'bg-main-color text-white border-main-color'
                  : 'bg-white text-gray-700 hover:border-main-color'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          {tab === 'projects' ? <ProjectsPanel /> : null}
          {tab === 'certificates' ? <CertificatesPanel /> : null}
          {tab === 'experience' ? <ExperiencePanel /> : null}
          {tab === 'skills' ? <SkillsManager /> : null}
          {tab === 'resume' ? <ResumeUploader /> : null}
        </div>
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const { projects, loading, createProject, updateProject, deleteProject, usingFallback } =
    useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-main-color text-white rounded-lg"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      {usingFallback ? (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Showing local fallback data. Run supabase/schema.sql and seed.sql, then refresh.
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <ul className="divide-y border rounded-lg overflow-hidden">
          {projects.map((project) => (
            <li key={project.id} className="flex items-start gap-3 p-4 bg-white">
              <img
                src={project.image_url || '/assets/Projects/vitae.png'}
                alt=""
                className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{project.title}</p>
                  {project.video_url ? (
                    <span className="inline-flex items-center gap-1 text-xs text-main-color">
                      <Play size={12} /> video
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{project.description}</p>
                <p className="text-xs text-gray-400 mt-1">{project.skills.join(', ')}</p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => {
                    setEditing(project);
                    setShowForm(true);
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  onClick={async () => {
                    if (!confirm(`Delete "${project.title}"?`)) return;
                    await deleteProject(project.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm ? (
        <ProjectForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={async (data) => {
            if (editing) {
              await updateProject(editing.id, data);
            } else {
              await createProject(data);
            }
          }}
        />
      ) : null}
    </div>
  );
}

function CertificatesPanel() {
  const {
    certificates,
    loading,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    usingFallback,
  } = useCertificates();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Certificates</h2>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-main-color text-white rounded-lg"
        >
          <Plus size={16} />
          New Certificate
        </button>
      </div>

      {usingFallback ? (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Showing local fallback data. Run supabase/schema.sql and seed.sql, then refresh.
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <ul className="divide-y border rounded-lg overflow-hidden">
          {certificates.map((cert) => (
            <li key={cert.id} className="flex items-start gap-3 p-4">
              <img
                src={cert.image_url}
                alt=""
                className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium">{cert.name}</p>
                <p className="text-xs text-gray-500">{cert.organization}</p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => {
                    setEditing(cert);
                    setShowForm(true);
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  onClick={async () => {
                    if (!confirm(`Delete "${cert.name}"?`)) return;
                    await deleteCertificate(cert.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm ? (
        <CertificateForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={async (data) => {
            if (editing) await updateCertificate(editing.id, data);
            else await createCertificate(data);
          }}
        />
      ) : null}
    </div>
  );
}

function ExperiencePanel() {
  const {
    experiences,
    loading,
    createExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences,
    usingFallback,
  } = useExperiences();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [reorderError, setReorderError] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const handleDrop = async (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }

    const next = [...experiences];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);

    setDragIndex(null);
    setOverIndex(null);
    setReorderError(null);
    setSavingOrder(true);

    try {
      await reorderExperiences(next);
    } catch (err) {
      setReorderError(err instanceof Error ? err.message : 'Failed to save order');
    } finally {
      setSavingOrder(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Experience</h2>
          <p className="text-xs text-gray-500 mt-0.5 inline-flex items-center gap-1">
            <ArrowDownUp size={12} />
            Drag to reorder · Top = Latest · Bottom = Oldest
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-main-color text-white rounded-lg"
        >
          <Plus size={16} />
          New Experience
        </button>
      </div>

      {usingFallback ? (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Showing local fallback data. Run supabase/schema.sql and seed.sql, then refresh. Reorder will
          not save until then.
        </p>
      ) : null}

      {reorderError ? (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {reorderError}
        </p>
      ) : null}

      {savingOrder ? (
        <p className="text-xs text-gray-500">Saving order...</p>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <ul className="border rounded-lg overflow-hidden divide-y">
          {experiences.map((exp, index) => {
            const isDragging = dragIndex === index;
            const isOver = overIndex === index && dragIndex !== index;

            return (
              <li
                key={exp.id}
                draggable
                onDragStart={() => {
                  setDragIndex(index);
                  setReorderError(null);
                }}
                onDragEnd={() => {
                  setDragIndex(null);
                  setOverIndex(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverIndex(index);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  void handleDrop(index);
                }}
                className={`flex items-start gap-2 p-3 sm:p-4 bg-white transition-all cursor-grab active:cursor-grabbing ${
                  isDragging ? 'opacity-40' : ''
                } ${isOver ? 'bg-orange-50 border-t-2 border-t-main-color' : ''}`}
              >
                <div
                  className="mt-1 flex flex-col items-center gap-1 text-gray-400 flex-shrink-0"
                  title="Drag to reorder"
                >
                  <GripVertical size={18} />
                  <span className="text-[10px] font-semibold text-gray-400 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index === 0 ? (
                    <span className="text-[9px] uppercase tracking-wide text-main-color font-semibold">
                      Latest
                    </span>
                  ) : index === experiences.length - 1 ? (
                    <span className="text-[9px] uppercase tracking-wide text-gray-400 font-semibold">
                      Oldest
                    </span>
                  ) : null}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium">{exp.company}</p>
                  <p className="text-xs text-gray-500">
                    {exp.role} · {exp.period}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{exp.duties.length} duties</p>
                </div>

                <div className="flex gap-1">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    onClick={() => {
                      setEditing(exp);
                      setShowForm(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    onClick={async () => {
                      if (!confirm(`Delete "${exp.company}"?`)) return;
                      await deleteExperience(exp.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showForm ? (
        <ExperienceForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={async (data) => {
            if (editing) await updateExperience(editing.id, data);
            else await createExperience(data);
          }}
        />
      ) : null}
    </div>
  );
}
