import { useState, FormEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useSkills } from '../../Hooks/useSkills';
import { SKILL_ICON_OPTIONS } from '../../lib/skillIcons';

export default function SkillsManager() {
  const { skills, loading, createSkill, deleteSkill, usingFallback } = useSkills();
  const [name, setName] = useState('');
  const [iconKey, setIconKey] = useState('react');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await createSkill({ name: name.trim(), icon_key: iconKey });
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await deleteSkill(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete skill');
    }
  };

  return (
    <div className="space-y-6">
      {usingFallback ? (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Showing local fallback skills. Run schema.sql + seed.sql in Supabase, then refresh.
        </p>
      ) : null}

      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 items-end">
        <label className="flex-1 w-full space-y-1">
          <span className="text-sm font-medium">Skill name</span>
          <input
            className="admin-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. TypeScript"
          />
        </label>
        <label className="w-full md:w-48 space-y-1">
          <span className="text-sm font-medium">Icon</span>
          <select
            className="admin-input"
            value={iconKey}
            onChange={(e) => setIconKey(e.target.value)}
          >
            {SKILL_ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-main-color text-white rounded-lg text-sm disabled:opacity-60"
        >
          <Plus size={16} />
          Add
        </button>
      </form>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading skills...</p>
      ) : (
        <ul className="divide-y border rounded-lg overflow-hidden">
          {skills.map((skill) => (
            <li key={skill.id} className="flex items-center justify-between px-4 py-3 bg-white">
              <div>
                <p className="font-medium text-secondary-color">{skill.name}</p>
                <p className="text-xs text-gray-500">icon: {skill.icon_key || 'default'}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(skill.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                aria-label={`Delete ${skill.name}`}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
