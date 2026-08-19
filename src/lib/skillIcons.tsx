import { useContext, type CSSProperties } from 'react';
import { RiTailwindCssFill } from 'react-icons/ri';
import {
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobephotoshop,
  SiCanva,
  SiClickup,
  SiCss3,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiFigma,
  SiFlutter,
  SiGit,
  SiGithubactions,
  SiGitkraken,
  SiGoogle,
  SiGoogleappsscript,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKotlin,
  SiLangchain,
  SiLinux,
  SiMysql,
  SiN8N,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiShopify,
  SiSlack,
  SiSupabase,
  SiTypescript,
  SiVite,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { IoTerminal } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import type { IconType } from 'react-icons';

type IconProps = {
  size?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

// Official Cursor mark (Simple Icons). Single path, follows the theme color.
function CursorIcon(props: IconProps) {
  const ctx = useContext(IconContext);
  const size = props.size ?? ctx.size ?? 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={props.color ?? 'currentColor'}
      aria-hidden="true"
      className={props.className}
      style={props.style}
    >
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

// Official Automa logo (goautoma.com). Self-colored badge, so it ignores `color`.
function AutomaIcon(props: IconProps) {
  const ctx = useContext(IconContext);
  const size = props.size ?? ctx.size ?? 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={props.className}
      style={props.style}
    >
      <rect
        x="53"
        y="58"
        width="452"
        height="452"
        rx="80"
        fill="white"
        stroke="#181818"
        strokeWidth="30"
        strokeLinejoin="round"
      />
      <rect x="95" y="90" width="452" height="452" rx="80" fill="#18181B" />
      <path
        fill="white"
        d="M293.667 220.666C304.723 198.554 336.277 198.554 347.333 220.666L432.308 390.616C444.814 415.628 419.067 443.212 392.87 433.428C363.012 422.277 332.936 412.348 320.5 412.348C308.064 412.348 277.988 422.277 248.13 433.428C221.933 443.212 196.186 415.628 208.692 390.616L293.667 220.666Z"
      />
    </svg>
  );
}

// Official Playwright mark (Simple Icons). Single path, follows the theme color.
function PlaywrightIcon(props: IconProps) {
  const ctx = useContext(IconContext);
  const size = props.size ?? ctx.size ?? 20;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={props.color ?? 'currentColor'}
      aria-hidden="true"
      className={props.className}
      style={props.style}
    >
      <path d="M23.996 7.462c-.056.837-.257 2.135-.716 3.85-.995 3.715-4.27 10.874-10.42 9.227-6.15-1.65-5.407-9.487-4.412-13.201.46-1.716.934-2.94 1.305-3.694.42-.853.846-.289 1.815.523.684.573 2.41 1.791 5.011 2.488 2.601.697 4.706.506 5.583.352 1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61-.433 1.618-.827 4.055-.632 6.426-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z" />
    </svg>
  );
}

// Docker Compose has no standalone brand mark, so this is a stacked-container
// glyph that stays clearly distinct from the plain Docker whale.
function DockerComposeIcon(props: IconProps) {
  const ctx = useContext(IconContext);
  const size = props.size ?? ctx.size ?? 20;
  const color = props.color ?? 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
      style={props.style}
    >
      <rect x="3" y="3" width="18" height="7" rx="1.6" fill={color} opacity="0.55" />
      <rect x="3" y="14" width="18" height="7" rx="1.6" fill={color} />
    </svg>
  );
}

const iconMap: Record<string, IconType> = {
  java: SiOpenjdk,
  csharp: SiDotnet,
  python: SiPython,
  html: SiHtml5,
  css: SiCss3,
  nodejs: SiNodedotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  gitkraken: SiGitkraken,
  php: SiPhp,
  flutter: SiFlutter,
  tailwind: RiTailwindCssFill,
  jupyter: SiJupyter,
  scikitlearn: SiScikitlearn,
  kotlin: SiKotlin,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  n8n: SiN8N,
  git: SiGit,
  vscode: VscVscode,
  supabase: SiSupabase,
  fastapi: SiFastapi,
  docker: SiDocker,
  dockercompose: DockerComposeIcon as IconType,
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
  indesign: SiAdobeindesign,
  canva: SiCanva,
  googleappscript: SiGoogleappsscript,
  nginx: SiNginx,
  githubactions: SiGithubactions,
  slack: SiSlack,
  clickup: SiClickup,
  googleworkspace: SiGoogle,
  openai: SiOpenai,
  langchain: SiLangchain,
  langgraph: SiLangchain,
  langsmith: SiLangchain,
  vite: SiVite,
  linux: SiLinux,
  shopify: SiShopify,
  figma: SiFigma,
  cursor: CursorIcon as IconType,
  playwright: PlaywrightIcon as IconType,
  automa: AutomaIcon as IconType,
};

const nameMatchers: { match: string; key: string }[] = [
  { match: 'github action', key: 'githubactions' },
  { match: 'nginx', key: 'nginx' },
  { match: 'brightdata', key: 'brightdata' },
  { match: 'bright data', key: 'brightdata' },
  { match: 'keepa', key: 'keepa' },
  { match: 'slack', key: 'slack' },
  { match: 'clickup', key: 'clickup' },
  { match: 'click up', key: 'clickup' },
  { match: 'google workspace', key: 'googleworkspace' },
  { match: 'openai', key: 'openai' },
  { match: 'open ai', key: 'openai' },
  { match: 'langgraph', key: 'langgraph' },
  { match: 'langsmith', key: 'langsmith' },
  { match: 'langchain', key: 'langchain' },
  { match: 'shopify', key: 'shopify' },
  { match: 'linux', key: 'linux' },
  { match: 'vite', key: 'vite' },
  { match: 'javascript', key: 'javascript' },
  { match: 'typescript', key: 'typescript' },
  { match: 'docker compose', key: 'dockercompose' },
  { match: 'dockercompose', key: 'dockercompose' },
  { match: 'google app', key: 'googleappscript' },
  { match: 'apps script', key: 'googleappscript' },
  { match: 'app script', key: 'googleappscript' },
  { match: 'illustrator', key: 'illustrator' },
  { match: 'indesign', key: 'indesign' },
  { match: 'in design', key: 'indesign' },
  { match: 'canva', key: 'canva' },
  { match: 'photoshop', key: 'photoshop' },
  { match: 'playwright', key: 'playwright' },
  { match: 'postgresql', key: 'postgresql' },
  { match: 'postgres', key: 'postgresql' },
  { match: 'gitkraken', key: 'gitkraken' },
  { match: 'scikit', key: 'scikitlearn' },
  { match: 'tailwind', key: 'tailwind' },
  { match: 'figma', key: 'figma' },
  { match: 'jupyter', key: 'jupyter' },
  { match: 'fastapi', key: 'fastapi' },
  { match: 'flutter', key: 'flutter' },
  { match: 'supabase', key: 'supabase' },
  { match: 'kotlin', key: 'kotlin' },
  { match: 'python', key: 'python' },
  { match: 'node', key: 'nodejs' },
  { match: 'mysql', key: 'mysql' },
  { match: 'docker', key: 'docker' },
  { match: 'cursor', key: 'cursor' },
  { match: 'automa', key: 'automa' },
  { match: 'react', key: 'react' },
  { match: 'java', key: 'java' },
  { match: 'html', key: 'html' },
  { match: 'css', key: 'css' },
  { match: 'php', key: 'php' },
  { match: 'n8n', key: 'n8n' },
  { match: 'csharp', key: 'csharp' },
  { match: 'c#', key: 'csharp' },
  { match: 'vs code', key: 'vscode' },
  { match: 'vscode', key: 'vscode' },
  { match: 'git', key: 'git' },
];

export function resolveIconKey(
  name?: string | null,
  iconKey?: string | null
): string | null {
  const skillName = (name || '').toLowerCase();

  for (const item of nameMatchers) {
    if (skillName.includes(item.match)) return item.key;
  }

  if (iconKey) {
    const key = iconKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (iconMap[key]) return key;
  }

  return iconKey ? iconKey.toLowerCase() : null;
}

export function getSkillIcon(
  iconKey?: string | null,
  name?: string | null
): IconType {
  const resolved = resolveIconKey(name, iconKey);
  if (resolved && iconMap[resolved]) return iconMap[resolved];
  return IoTerminal;
}

export type ToolTheme = {
  background: string;
  border: string;
  icon: string;
  text: string;
};

const toolThemes: Record<string, ToolTheme> = {
  cursor: {
    background: '#171717',
    border: 'rgba(255,255,255,0.12)',
    icon: '#EEEEEE',
    text: '#F4F4F5',
  },
  n8n: {
    background: 'rgba(234, 75, 113, 0.16)',
    border: 'rgba(234, 75, 113, 0.32)',
    icon: '#EA4B71',
    text: '#9F1239',
  },
  git: {
    background: 'rgba(240, 80, 50, 0.14)',
    border: 'rgba(240, 80, 50, 0.3)',
    icon: '#F05032',
    text: '#9A3412',
  },
  postgresql: {
    background: 'rgba(51, 103, 145, 0.16)',
    border: 'rgba(51, 103, 145, 0.32)',
    icon: '#336791',
    text: '#1E3A5F',
  },
  playwright: {
    background: 'rgba(46, 173, 51, 0.14)',
    border: 'rgba(46, 173, 51, 0.32)',
    icon: '#2EAD33',
    text: '#14532D',
  },
  automa: {
    background: 'rgba(24, 24, 27, 0.08)',
    border: 'rgba(24, 24, 27, 0.22)',
    icon: '#18181B',
    text: '#18181B',
  },
  fastapi: {
    background: 'rgba(0, 150, 136, 0.14)',
    border: 'rgba(0, 150, 136, 0.3)',
    icon: '#009688',
    text: '#0F766E',
  },
  react: {
    background: '#20232A',
    border: 'rgba(97, 218, 251, 0.28)',
    icon: '#61DAFB',
    text: '#E6FAFF',
  },
  tailwind: {
    background: '#0F172A',
    border: 'rgba(56, 189, 248, 0.28)',
    icon: '#38BDF8',
    text: '#E0F2FE',
  },
  docker: {
    background: 'rgba(36, 150, 237, 0.14)',
    border: 'rgba(36, 150, 237, 0.32)',
    icon: '#2496ED',
    text: '#0C4A6E',
  },
  dockercompose: {
    background: 'rgba(13, 58, 92, 0.16)',
    border: 'rgba(36, 150, 237, 0.35)',
    icon: '#2496ED',
    text: '#075985',
  },
  photoshop: {
    background: '#001E36',
    border: 'rgba(49, 168, 255, 0.3)',
    icon: '#31A8FF',
    text: '#D6EEFF',
  },
  illustrator: {
    background: '#330000',
    border: 'rgba(255, 154, 0, 0.35)',
    icon: '#FF9A00',
    text: '#FFE7C2',
  },
  indesign: {
    background: '#2C0016',
    border: 'rgba(255, 51, 102, 0.35)',
    icon: '#FF3366',
    text: '#FFD6E1',
  },
  canva: {
    background: 'rgba(0, 196, 204, 0.14)',
    border: 'rgba(0, 196, 204, 0.32)',
    icon: '#00C4CC',
    text: '#0E7490',
  },
  nginx: {
    background: 'rgba(0, 150, 57, 0.14)',
    border: 'rgba(0, 150, 57, 0.32)',
    icon: '#009639',
    text: '#14532D',
  },
  githubactions: {
    background: 'rgba(32, 136, 255, 0.14)',
    border: 'rgba(32, 136, 255, 0.32)',
    icon: '#2088FF',
    text: '#0C4A6E',
  },
  brightdata: {
    background: 'rgba(76, 110, 245, 0.14)',
    border: 'rgba(76, 110, 245, 0.32)',
    icon: '#4C6EF5',
    text: '#1E3A8A',
  },
  keepa: {
    background: 'rgba(255, 140, 0, 0.14)',
    border: 'rgba(255, 140, 0, 0.32)',
    icon: '#FF8C00',
    text: '#9A3412',
  },
  slack: {
    background: 'rgba(74, 21, 75, 0.14)',
    border: 'rgba(224, 30, 90, 0.32)',
    icon: '#E01E5A',
    text: '#4A154B',
  },
  clickup: {
    background: 'rgba(123, 104, 238, 0.14)',
    border: 'rgba(123, 104, 238, 0.32)',
    icon: '#7B68EE',
    text: '#5B21B6',
  },
  googleworkspace: {
    background: 'rgba(66, 133, 244, 0.14)',
    border: 'rgba(66, 133, 244, 0.32)',
    icon: '#4285F4',
    text: '#1E3A8A',
  },
  openai: {
    background: 'rgba(16, 163, 127, 0.14)',
    border: 'rgba(16, 163, 127, 0.32)',
    icon: '#10A37F',
    text: '#0F766E',
  },
  langchain: {
    background: 'rgba(26, 159, 122, 0.14)',
    border: 'rgba(26, 159, 122, 0.32)',
    icon: '#1C9F7A',
    text: '#14532D',
  },
  langgraph: {
    background: 'rgba(26, 159, 122, 0.14)',
    border: 'rgba(26, 159, 122, 0.32)',
    icon: '#1C9F7A',
    text: '#14532D',
  },
  langsmith: {
    background: 'rgba(26, 159, 122, 0.14)',
    border: 'rgba(26, 159, 122, 0.32)',
    icon: '#1C9F7A',
    text: '#14532D',
  },
  vite: {
    background: 'rgba(100, 108, 255, 0.14)',
    border: 'rgba(100, 108, 255, 0.32)',
    icon: '#646CFF',
    text: '#3730A3',
  },
  linux: {
    background: '#1A1A1A',
    border: 'rgba(252, 198, 36, 0.3)',
    icon: '#FCC624',
    text: '#FDE68A',
  },
  shopify: {
    background: 'rgba(149, 191, 71, 0.16)',
    border: 'rgba(149, 191, 71, 0.32)',
    icon: '#95BF47',
    text: '#3F6212',
  },
  googleappscript: {
    background: 'rgba(15, 157, 88, 0.14)',
    border: 'rgba(15, 157, 88, 0.3)',
    icon: '#0F9D58',
    text: '#14532D',
  },
  java: {
    background: 'rgba(83, 130, 161, 0.16)',
    border: 'rgba(83, 130, 161, 0.32)',
    icon: '#5382A1',
    text: '#1E3A5F',
  },
  csharp: {
    background: 'rgba(81, 43, 212, 0.14)',
    border: 'rgba(81, 43, 212, 0.3)',
    icon: '#512BD4',
    text: '#3B1FA8',
  },
  python: {
    background: 'rgba(55, 118, 171, 0.16)',
    border: 'rgba(55, 118, 171, 0.32)',
    icon: '#3776AB',
    text: '#1E3A5F',
  },
  html: {
    background: 'rgba(227, 79, 38, 0.14)',
    border: 'rgba(227, 79, 38, 0.3)',
    icon: '#E34F26',
    text: '#9A3412',
  },
  css: {
    background: 'rgba(21, 114, 182, 0.14)',
    border: 'rgba(21, 114, 182, 0.3)',
    icon: '#1572B6',
    text: '#1E3A8A',
  },
  nodejs: {
    background: 'rgba(95, 160, 78, 0.16)',
    border: 'rgba(95, 160, 78, 0.32)',
    icon: '#5FA04E',
    text: '#14532D',
  },
  javascript: {
    background: 'rgba(247, 223, 30, 0.22)',
    border: 'rgba(184, 163, 12, 0.35)',
    icon: '#F7DF1E',
    text: '#422006',
  },
  typescript: {
    background: 'rgba(49, 120, 198, 0.16)',
    border: 'rgba(49, 120, 198, 0.32)',
    icon: '#3178C6',
    text: '#1E3A8A',
  },
  php: {
    background: 'rgba(119, 123, 180, 0.16)',
    border: 'rgba(119, 123, 180, 0.32)',
    icon: '#777BB4',
    text: '#3730A3',
  },
  flutter: {
    background: 'rgba(2, 86, 155, 0.14)',
    border: 'rgba(2, 86, 155, 0.3)',
    icon: '#02569B',
    text: '#0C4A6E',
  },
  jupyter: {
    background: 'rgba(243, 118, 38, 0.16)',
    border: 'rgba(243, 118, 38, 0.32)',
    icon: '#F37626',
    text: '#9A3412',
  },
  scikitlearn: {
    background: 'rgba(247, 147, 30, 0.16)',
    border: 'rgba(247, 147, 30, 0.32)',
    icon: '#F7931E',
    text: '#9A3412',
  },
  kotlin: {
    background: 'rgba(127, 82, 255, 0.14)',
    border: 'rgba(127, 82, 255, 0.3)',
    icon: '#7F52FF',
    text: '#5B21B6',
  },
  mysql: {
    background: 'rgba(68, 121, 161, 0.16)',
    border: 'rgba(68, 121, 161, 0.32)',
    icon: '#4479A1',
    text: '#1E3A5F',
  },
  gitkraken: {
    background: 'rgba(23, 146, 135, 0.16)',
    border: 'rgba(23, 146, 135, 0.32)',
    icon: '#179287',
    text: '#115E59',
  },
  vscode: {
    background: 'rgba(0, 122, 204, 0.14)',
    border: 'rgba(0, 122, 204, 0.3)',
    icon: '#007ACC',
    text: '#0C4A6E',
  },
  supabase: {
    background: 'rgba(62, 207, 142, 0.16)',
    border: 'rgba(62, 207, 142, 0.32)',
    icon: '#3ECF8E',
    text: '#14532D',
  },
  figma: {
    background: 'rgba(242, 78, 30, 0.14)',
    border: 'rgba(242, 78, 30, 0.3)',
    icon: '#F24E1E',
    text: '#9A3412',
  },
};

export function getToolTheme(iconKey?: string | null, name?: string | null): ToolTheme {
  const resolved = resolveIconKey(name, iconKey);
  if (resolved && toolThemes[resolved]) return toolThemes[resolved];

  return {
    background: 'rgba(249, 115, 22, 0.1)',
    border: 'rgba(249, 115, 22, 0.22)',
    icon: '#f97316',
    text: 'var(--secondary-color)',
  };
}

export const SKILL_ICON_OPTIONS = [
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node JS' },
  { value: 'react', label: 'React' },
  { value: 'php', label: 'PHP' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'figma', label: 'Figma' },
  { value: 'fastapi', label: 'FastAPI' },
  { value: 'jupyter', label: 'Jupyter' },
  { value: 'scikitlearn', label: 'ScikitLearn' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'git', label: 'Git' },
  { value: 'gitkraken', label: 'GitKraken' },
  { value: 'vscode', label: 'VS Code' },
  { value: 'cursor', label: 'Cursor' },
  { value: 'n8n', label: 'n8n' },
  { value: 'supabase', label: 'Supabase' },
  { value: 'docker', label: 'Docker' },
  { value: 'dockercompose', label: 'Docker Compose' },
  { value: 'playwright', label: 'Playwright' },
  { value: 'automa', label: 'Automa' },
  { value: 'photoshop', label: 'Photoshop' },
  { value: 'illustrator', label: 'Illustrator' },
  { value: 'googleappscript', label: 'Google Apps Script' },
];
