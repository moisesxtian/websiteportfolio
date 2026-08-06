import { useRef, useState } from 'react';
import { FileText, ExternalLink, Upload, Loader2 } from 'lucide-react';
import { useResume } from '../../Hooks/useResume';

export default function ResumeUploader() {
  const { resumeUrl, loading, uploadResume, usingFallback } = useResume();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    setSuccess(null);
    try {
      await uploadResume(file);
      setSuccess('Resume updated successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload resume');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      {usingFallback ? (
        <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Using local fallback resume. Upload after running schema.sql to store it in Supabase.
        </p>
      ) : null}

      <div className="border rounded-lg p-4 bg-gray-50 flex items-start gap-3">
        <FileText className="text-main-color mt-0.5" size={20} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-secondary-color">Current resume</p>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-main-color underline truncate"
            >
              {resumeUrl}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Upload new PDF resume</label>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg hover:border-main-color hover:text-main-color transition disabled:opacity-60"
        >
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : 'Choose PDF'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">{success}</p> : null}
    </div>
  );
}
