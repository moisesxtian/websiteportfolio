import { useEffect, useState, type FormEvent } from 'react';
import { useChatProfile } from '../../Hooks/useChatProfile';
import type { ChatProfileData } from '../../types/content';

export default function AboutChanForm() {
  const { profile, loading, saveProfile, usingFallback } = useChatProfile();
  const [form, setForm] = useState<ChatProfileData>(profile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const updateField = (key: keyof ChatProfileData, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await saveProfile({
        name: form.name.trim(),
        nickname: form.nickname.trim(),
        relationship: form.relationship.trim(),
        age: form.age.trim(),
        work: form.work.trim(),
        location: form.location.trim(),
        languages: form.languages.trim(),
        interests: form.interests.trim(),
        hobbies: form.hobbies.trim(),
        about: form.about.trim(),
      });
      setSuccess('About Chan saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save About Chan');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="text-lg font-semibold">About Chan</h2>
        <p className="mt-0.5 text-xs text-gray-500">
          These fields show up when someone taps the chatbot header photo.
        </p>
      </div>

      {usingFallback ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-600">
          Using local placeholders. Save once to store this in Supabase.
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Personal</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block space-y-1">
                <span className="text-sm font-medium">Name</span>
                <input
                  className="admin-input"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-medium">Nickname</span>
                <input
                  className="admin-input"
                  value={form.nickname}
                  onChange={(event) => updateField('nickname', event.target.value)}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-medium">Age</span>
                <input
                  className="admin-input"
                  value={form.age}
                  onChange={(event) => updateField('age', event.target.value)}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-medium">Relationship</span>
                <input
                  className="admin-input"
                  value={form.relationship}
                  onChange={(event) => updateField('relationship', event.target.value)}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-medium">Location</span>
                <input
                  className="admin-input"
                  value={form.location}
                  onChange={(event) => updateField('location', event.target.value)}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-sm font-medium">Interests</span>
                <input
                  className="admin-input"
                  value={form.interests}
                  onChange={(event) => updateField('interests', event.target.value)}
                />
              </label>
              <label className="block space-y-1 sm:col-span-2">
                <span className="text-sm font-medium">Hobbies</span>
                <input
                  className="admin-input"
                  value={form.hobbies}
                  onChange={(event) => updateField('hobbies', event.target.value)}
                />
              </label>
              <label className="block space-y-1 sm:col-span-2">
                <span className="text-sm font-medium">About</span>
                <textarea
                  className="admin-input min-h-24"
                  rows={4}
                  value={form.about}
                  onChange={(event) => updateField('about', event.target.value)}
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Technical</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block space-y-1 sm:col-span-2">
                <span className="text-sm font-medium">Current work</span>
                <input
                  className="admin-input"
                  value={form.work}
                  onChange={(event) => updateField('work', event.target.value)}
                />
              </label>
              <label className="block space-y-1 sm:col-span-2">
                <span className="text-sm font-medium">Languages</span>
                <input
                  className="admin-input"
                  value={form.languages}
                  onChange={(event) => updateField('languages', event.target.value)}
                />
              </label>
            </div>
          </fieldset>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          {success ? <p className="text-sm text-green-600">{success}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-main-color px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
}
