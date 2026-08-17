import { type ReactNode } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Cake,
  Heart,
  Languages,
  MapPin,
  Puzzle,
  Sparkles,
  Star,
} from 'lucide-react';
import { PROFILE_AVATAR } from '../data/profile';
import { useChatProfile } from '../Hooks/useChatProfile';

type ChatProfileProps = {
  onBack: () => void;
};

function BentoCard({
  label,
  value,
  icon,
  className = '',
}: {
  label: string;
  value: string;
  icon: ReactNode;
  className?: string;
}) {
  const isPlaceholder = !value.trim() || value === 'Placeholder';

  return (
    <div className={`rounded-2xl bg-surface-muted p-2.5 dark:bg-neutral-800/70 ${className}`}>
      <div className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {icon}
        <span>{label}</span>
      </div>
      <p
        className={`mt-0.5 text-xs font-medium leading-snug ${
          isPlaceholder
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-secondary-color'
        }`}
      >
        {isPlaceholder ? '—' : value}
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <p className="col-span-2 px-0.5 pt-1 text-[9px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
      {children}
    </p>
  );
}

export default function ChatProfile({ onBack }: ChatProfileProps) {
  const { profile } = useChatProfile();

  return (
    <div className="chat-profile flex h-full min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-1 px-2 py-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-black/5 hover:text-secondary-color dark:hover:bg-white/10"
          aria-label="Back to chat"
        >
          <ArrowLeft size={16} />
        </button>
        <p className="text-xs font-medium text-secondary-color">About Chan</p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth scrollbar-hide px-3 pb-3">
        <div className="mb-3 flex items-center gap-3">
          <img
            src={PROFILE_AVATAR}
            alt=""
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover object-top"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-secondary-color">{profile.name}</p>
            <p className="truncate text-[10px] text-gray-400">{profile.nickname}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <SectionTitle>Personal</SectionTitle>
          <BentoCard label="Age" value={profile.age} icon={<Cake size={10} />} />
          <BentoCard
            label="Relationship"
            value={profile.relationship}
            icon={<Heart size={10} />}
          />
          <BentoCard
            label="Location"
            value={profile.location}
            icon={<MapPin size={10} />}
          />
          <BentoCard
            label="Interests"
            value={profile.interests}
            icon={<Star size={10} />}
          />
          <BentoCard
            label="Hobbies"
            value={profile.hobbies}
            icon={<Puzzle size={10} />}
            className="col-span-2"
          />
          <BentoCard
            label="About"
            value={profile.about}
            icon={<Sparkles size={10} />}
            className="col-span-2"
          />

          <SectionTitle>Technical</SectionTitle>
          <BentoCard
            label="Current work"
            value={profile.work}
            icon={<Briefcase size={10} />}
            className="col-span-2"
          />
          <BentoCard
            label="Languages"
            value={profile.languages}
            icon={<Languages size={10} />}
            className="col-span-2"
          />
        </div>
      </div>
    </div>
  );
}
