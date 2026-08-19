import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Experience } from '../../types/content';
import MediaUpload from './MediaUpload';

type ExperienceFormProps = {
  initial?: Experience | null;
  onSubmit: (data: {
    company: string;
    period: string;
    role: string;
    duties: string[];
    skills: string[];
    image_url: string;
  }) => Promise<void>;
  onClose: () => void;
};

export default function ExperienceForm({ initial, onSubmit, onClose }: ExperienceFormProps) {
  const [company, setCompany] = useState(initial?.company ?? '');
  const [period, setPeriod] = useState(initial?.period ?? '');
  const [role, setRole] = useState(initial?.role ?? '');
  const [dutiesText, setDutiesText] = useState((initial?.duties ?? []).join('\n'));
  const [skillsText, setSkillsText] = useState((initial?.skills ?? []).join(', '));
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const duties = dutiesText
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean);

      const skills = skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await onSubmit({
        company: company.trim(),
        period: period.trim(),
        role: role.trim(),
        duties,
        skills,
        image_url: imageUrl,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl font-poppins">
        <div className="flex items-center justify-between border-b px-5 py-4 sticky top-0 bg-white">
          <h2 className="text-lg font-bold">{initial ? 'Edit Experience' : 'New Experience'}</h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Company *</span>
            <input
              className="admin-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="text-sm font-medium">Period</span>
              <input
                className="admin-input"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Jan 2024 - Present"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-medium">Role</span>
              <input className="admin-input" value={role} onChange={(e) => setRole(e.target.value)} />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Skills (comma separated)</span>
            <input
              className="admin-input"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Python, FastAPI, Tailwind CSS"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Duties (one per line)</span>
            <textarea
              className="admin-input min-h-[140px]"
              value={dutiesText}
              onChange={(e) => setDutiesText(e.target.value)}
            />
          </label>

          <MediaUpload
            label="Company logo"
            bucket="project-media"
            accept="image/*"
            value={imageUrl}
            onChange={setImageUrl}
            folder="experience"
          />

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm bg-main-color text-white rounded-lg disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
