import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Project } from '../../types/content';
import MediaUpload from './MediaUpload';

type ProjectFormProps = {
  initial?: Project | null;
  onSubmit: (data: {
    title: string;
    description: string;
    skills: string[];
    github_link: string;
    live_demo_link: string;
    image_url: string;
    hover_image_url: string;
    video_url: string | null;
  }) => Promise<void>;
  onClose: () => void;
};

export default function ProjectForm({ initial, onSubmit, onClose }: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [skillsText, setSkillsText] = useState((initial?.skills ?? []).join(', '));
  const [githubLink, setGithubLink] = useState(initial?.github_link ?? '');
  const [liveDemoLink, setLiveDemoLink] = useState(initial?.live_demo_link ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '');
  const [hoverImageUrl, setHoverImageUrl] = useState(initial?.hover_image_url ?? '');
  const [videoUrl, setVideoUrl] = useState(initial?.video_url ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const skills = skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        skills,
        github_link: githubLink.trim(),
        live_demo_link: liveDemoLink.trim(),
        image_url: imageUrl,
        hover_image_url: hoverImageUrl,
        video_url: videoUrl || null,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl font-poppins">
        <div className="flex items-center justify-between border-b px-5 py-4 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-secondary-color">
            {initial ? 'Edit Project' : 'New Project'}
          </h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Field label="Title" required>
            <input
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field label="Description">
            <textarea
              className="admin-input min-h-[90px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>

          <Field label="Skill tags (comma separated)">
            <input
              className="admin-input"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="React, Tailwind, FastAPI"
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Repo link">
              <input
                className="admin-input"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
            </Field>
            <Field label="Live link">
              <input
                className="admin-input"
                value={liveDemoLink}
                onChange={(e) => setLiveDemoLink(e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MediaUpload
              label="Cover image"
              bucket="project-media"
              accept="image/*"
              value={imageUrl}
              onChange={setImageUrl}
              folder="covers"
            />
            <MediaUpload
              label="Hover image"
              bucket="project-media"
              accept="image/*"
              value={hoverImageUrl}
              onChange={setHoverImageUrl}
              folder="hover"
            />
          </div>

          <MediaUpload
            label="Video (optional)"
            bucket="project-media"
            accept="video/*"
            value={videoUrl}
            onChange={setVideoUrl}
            folder="videos"
          />

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm bg-main-color text-white rounded-lg hover:bg-orange-400 disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}
