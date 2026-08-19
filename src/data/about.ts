import {
  Bike,
  Bitcoin,
  Bot,
  Brain,
  Camera,
  Castle,
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  Handshake,
  Layers,
  Music,
  Network,
  Paintbrush,
  Palette,
  PenTool,
  Rocket,
  Search,
  Sparkles,
  Star,
  Target,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export const professionalRoles = [
  'Full Stack Developer',
  'Automation Engineer',
  'AI Developer',
];

/** Placeholder numbers — swap these for your real ones. */
export const professionalHighlights: { value: string; label: string; icon: LucideIcon }[] = [
  { value: '1+', label: 'Years of Experience', icon: Code2 },
  { value: '20+', label: 'Projects shipped', icon: Rocket },
  { value: '80+', label: 'Time Saved per Week', icon: Bot },
];

/** Placeholder copy — reword each step however you work. */
export const workflowSteps: { title: string; detail: string; icon: LucideIcon }[] = [
  { title: 'Understand', detail: 'Discuss how the manual process works', icon: Search },
  { title: 'Design', detail: 'Discuss ideas and create a plan', icon: PenTool },
  { title: 'Build', detail: 'Develop automation with core function', icon: Code2 },
  { title: 'Test', detail: 'Test the automation to ensure it works', icon: Workflow },
];

/** Placeholder copy — update with what you are focused on. */
export const professionalFocus: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Focused on', value: 'Building Internal Tools', icon: Target },
  { label: 'Open to', value: 'Consultation', icon: Handshake },
];

export const developmentSkills: { name: string; icon: LucideIcon }[] = [
  { name: 'AI/LLM Integration', icon: Brain },
  { name: 'Web Scraping', icon: Globe },
  { name: 'Full Stack Development', icon: Layers },
  { name: 'Systems & API Integration', icon: Network },
  { name: 'DevOps & Deployment', icon: Cloud },
  { name: 'Workflow Automation', icon: Workflow },
];

export const creativeSkills: { name: string; icon: LucideIcon }[] = [
  { name: 'Graphic Design', icon: Palette },
  { name: 'UI/UX', icon: PenTool },
  { name: 'Digital Art', icon: Paintbrush },
  { name: 'Visual Design', icon: Sparkles },
];

export const creativeTools = [
  { name: 'Photoshop', icon_key: 'photoshop' },
  { name: 'Adobe Illustrator', icon_key: 'illustrator' },
  { name: 'InDesign', icon_key: 'indesign' },
  { name: 'Canva', icon_key: 'canva' },
  { name: 'Figma', icon_key: 'figma' },
];

export const developmentTools = [
  { name: 'Python', icon_key: 'python' },
  { name: 'FastAPI', icon_key: 'fastapi' },
  { name: 'React', icon_key: 'react' },
  { name: 'Vite', icon_key: 'vite' },
  { name: 'TailwindCSS', icon_key: 'tailwind' },
  { name: 'Node.js', icon_key: 'nodejs' },
  { name: 'PostgreSQL', icon_key: 'postgresql' },
  { name: 'OpenAI API', icon_key: 'openai' },
  { name: 'LangChain', icon_key: 'langchain' },
  { name: 'LangGraph', icon_key: 'langgraph' },
  { name: 'LangSmith', icon_key: 'langsmith' },
  { name: 'n8n', icon_key: 'n8n' },
  { name: 'Automa', icon_key: 'automa' },
  { name: 'Playwright', icon_key: 'playwright' },
  { name: 'Bright Data', icon_key: 'brightdata' },
  { name: 'Keepa API', icon_key: 'keepa' },
  { name: 'Google Apps Script', icon_key: 'googleappscript' },
  { name: 'Google Workspace APIs', icon_key: 'googleworkspace' },
  { name: 'Slack API', icon_key: 'slack' },
  { name: 'ClickUp API', icon_key: 'clickup' },
  { name: 'Shopify', icon_key: 'shopify' },
  { name: 'Docker', icon_key: 'docker' },
  { name: 'Docker Compose', icon_key: 'dockercompose' },
  { name: 'Nginx', icon_key: 'nginx' },
  { name: 'Linux', icon_key: 'linux' },
  { name: 'Git', icon_key: 'git' },
  { name: 'GitHub Actions', icon_key: 'githubactions' },
  { name: 'Cursor', icon_key: 'cursor' },
];

/**
 * Which tools light up when a skill is hovered. Keys are skill names, values are
 * tool names (must match the `name` above). Edit these to match how you actually work.
 */
export const skillTools: Record<string, string[]> = {
  'AI/LLM Integration': [
    'OpenAI API',
    'LangChain',
    'LangGraph',
    'LangSmith',
    'Python',
    'FastAPI',
    'n8n',
  ],
  'Web Scraping': [
    'Playwright',
    'Bright Data',
    'Keepa API',
    'Automa',
    'Python',
    'Google Apps Script',
  ],
  'Full Stack Development': [
    'React',
    'Vite',
    'TailwindCSS',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'Node.js',
    'Git',
    'Cursor',
  ],
  'Systems & API Integration': [
    'Shopify',
    'Slack API',
    'ClickUp API',
    'Google Workspace APIs',
    'Keepa API',
    'FastAPI',
    'Python',
    'n8n',
    'Google Apps Script',
  ],
  'DevOps & Deployment': [
    'Docker',
    'Docker Compose',
    'Nginx',
    'Linux',
    'Git',
    'GitHub Actions',
    'PostgreSQL',
  ],
  'Workflow Automation': [
    'n8n',
    'Automa',
    'Google Apps Script',
    'Playwright',
    'Python',
    'Slack API',
    'Google Workspace APIs',
  ],
  'Graphic Design': ['Photoshop', 'Adobe Illustrator', 'InDesign', 'Canva'],
  'UI/UX': ['Figma', 'Tailwind'],
  'Digital Art': ['Photoshop', 'Adobe Illustrator'],
  'Visual Design': ['Photoshop', 'Figma', 'Canva', 'InDesign'],
};

export const aboutHobbies = [
  'Video Games',
  'Digital Art',
  'Chess',
  'Photography',
  'Cycling',
];

export const aboutInterests = [
  'Generative AI',
  'Machine Learning',
  'Crypto',
  'Gaming',
  'Automation',
];

export function getHobbyIcon(label: string): LucideIcon {
  const text = label.toLowerCase();

  if (text.includes('game')) return Gamepad2;
  if (text.includes('photo')) return Camera;
  if (text.includes('chess')) return Castle;
  if (text.includes('cycl') || text.includes('bike')) return Bike;
  if (text.includes('music') || text.includes('listen')) return Music;
  if (text.includes('design') || text.includes('art')) return Palette;
  if (text.includes('project') || text.includes('build') || text.includes('code')) return Code2;

  return Sparkles;
}

export function getInterestIcon(label: string): LucideIcon {
  const text = label.toLowerCase();

  if (text.includes('generat')) return WandSparkles;
  if (text.includes('machine') || text.includes('ml')) return Brain;
  if (text.includes('crypto') || text.includes('bitcoin')) return Bitcoin;
  if (text.includes('game')) return Gamepad2;
  if (text.includes('automation')) return Workflow;
  if (text.includes('ai')) return Brain;
  if (text.includes('design') || text.includes('product')) return Palette;
  if (text.includes('music')) return Music;
  if (text.includes('code') || text.includes('dev')) return Code2;

  return Star;
}
