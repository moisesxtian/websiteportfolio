import {
  FaJava,
  FaHashtag,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaReact,
  FaGitkraken,
  FaPhp,
} from 'react-icons/fa';
import { FaFlutter } from 'react-icons/fa6';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiJupyter, SiScikitlearn, SiKotlin } from 'react-icons/si';
import { DiMysql } from 'react-icons/di';
import { IoTerminal } from 'react-icons/io5';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
  java: FaJava,
  csharp: FaHashtag,
  python: FaPython,
  html: FaHtml5,
  css: FaCss3Alt,
  nodejs: FaNodeJs,
  react: FaReact,
  gitkraken: FaGitkraken,
  php: FaPhp,
  flutter: FaFlutter,
  tailwind: RiTailwindCssFill,
  jupyter: SiJupyter,
  scikitlearn: SiScikitlearn,
  kotlin: SiKotlin,
  mysql: DiMysql,
};

export function getSkillIcon(iconKey: string | null | undefined): IconType {
  if (!iconKey) return IoTerminal;
  return iconMap[iconKey.toLowerCase()] || IoTerminal;
}

export const SKILL_ICON_OPTIONS = [
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'nodejs', label: 'Node JS' },
  { value: 'react', label: 'React' },
  { value: 'gitkraken', label: 'GitKraken' },
  { value: 'php', label: 'PHP' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'jupyter', label: 'Jupyter' },
  { value: 'scikitlearn', label: 'ScikitLearn' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'mysql', label: 'MySQL' },
];
