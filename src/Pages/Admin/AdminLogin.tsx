import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

export default function AdminLogin() {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex items-center justify-center p-4 font-poppins dark:from-neutral-950 dark:via-neutral-900 dark:to-black">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 dark:border-gray-700 dark:bg-neutral-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-100 text-main-color dark:bg-orange-950/60">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-secondary-color">Admin Login</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage portfolio content</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</span>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-lg bg-main-color text-white font-medium hover:bg-orange-400 transition disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link to="/" className="text-main-color hover:underline">
            Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
