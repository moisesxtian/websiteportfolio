import { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadFile } from '../../lib/supabase';

type Bucket = 'project-media' | 'certificates' | 'resumes';

type MediaUploadProps = {
  label: string;
  bucket: Bucket;
  accept: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function MediaUpload({
  label,
  bucket,
  accept,
  value,
  onChange,
  folder = '',
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(bucket, file, folder);
      onChange(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const isVideo = value && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(value);
  const isImage = value && /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="relative rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
          {isVideo ? (
            <video src={value} controls className="w-full max-h-40 object-contain bg-black" />
          ) : isImage ? (
            <img src={value} alt={label} className="w-full max-h-40 object-contain" />
          ) : (
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="block p-3 text-sm text-main-color underline truncate"
            >
              {value}
            </a>
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 rounded-full bg-white border shadow hover:bg-gray-100"
            aria-label="Clear file"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg hover:border-main-color hover:text-main-color transition disabled:opacity-60"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? 'Uploading...' : value ? 'Replace file' : 'Upload file'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
