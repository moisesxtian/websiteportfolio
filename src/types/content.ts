export type Skill = {
  id: string;
  name: string;
  icon_key: string | null;
  sort_order: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  github_link: string;
  live_demo_link: string;
  image_url: string;
  hover_image_url: string;
  video_url: string | null;
  sort_order: number;
};

export type Certificate = {
  id: string;
  name: string;
  description: string;
  organization: string;
  image_url: string;
  certificate_link: string;
  sort_order: number;
};

export type Experience = {
  id: string;
  company: string;
  period: string;
  role: string;
  duties: string[];
  skills: string[];
  image_url: string;
  sort_order: number;
};

export type ProjectInput = Omit<Project, 'id' | 'sort_order'> & { sort_order?: number };
export type CertificateInput = Omit<Certificate, 'id' | 'sort_order'> & { sort_order?: number };
export type ExperienceInput = Omit<Experience, 'id' | 'sort_order'> & { sort_order?: number };
export type SkillInput = Omit<Skill, 'id' | 'sort_order'> & { sort_order?: number };

export type ChatProfileData = {
  name: string;
  nickname: string;
  relationship: string;
  age: string;
  work: string;
  location: string;
  languages: string;
  interests: string;
  hobbies: string;
  about: string;
};
