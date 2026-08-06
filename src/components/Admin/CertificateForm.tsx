import { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Certificate } from '../../types/content';
import MediaUpload from './MediaUpload';

type CertificateFormProps = {
  initial?: Certificate | null;
  onSubmit: (data: {
    name: string;
    description: string;
    organization: string;
    image_url: string;
    certificate_link: string;
  }) => Promise<void>;
  onClose: () => void;
};

export default function CertificateForm({ initial, onSubmit, onClose }: CertificateFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [organization, setOrganization] = useState(initial?.organization ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '');
  const [certificateLink, setCertificateLink] = useState(initial?.certificate_link ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        organization: organization.trim(),
        image_url: imageUrl,
        certificate_link: certificateLink.trim(),
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save certificate');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl font-poppins">
        <div className="flex items-center justify-between border-b px-5 py-4 sticky top-0 bg-white">
          <h2 className="text-lg font-bold">{initial ? 'Edit Certificate' : 'New Certificate'}</h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Name *</span>
            <input className="admin-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Organization</span>
            <input
              className="admin-input"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Description</span>
            <textarea
              className="admin-input min-h-[70px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium">Certificate link</span>
            <input
              className="admin-input"
              value={certificateLink}
              onChange={(e) => setCertificateLink(e.target.value)}
            />
          </label>

          <MediaUpload
            label="Certificate image"
            bucket="certificates"
            accept="image/*"
            value={imageUrl}
            onChange={setImageUrl}
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
