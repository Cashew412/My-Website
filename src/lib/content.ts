import data from "@/data/content.json";

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: string;
};

export type Stat = {
  label: string;
  value: string;
  suffix: string;
  detail: string;
};

export type SkillGroup = {
  name: string;
  icon: string;
  skills: string[];
};

export type Experience = {
  company: string;
  logo: string;
  logoColor: string;
  logoBg: string;
  img?: string;
  tile?: string;
  role: string;
  period: string;
  start: string;
  current: boolean;
  industry: string;
  summary: string;
  impact: string[];
  tools: string[];
};

export type ProjectMetric = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  role: string;
  featured: boolean;
  tagline: string;
  cover: string;
  stack: string[];
  metrics: ProjectMetric[];
  pdf: string;
  context: string;
  problem: string;
  approach: string[];
  solution: string;
  impact: string[];
  challenges: { title: string; body: string }[];
  learnings: string[];
  nextSteps: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  category: string;
  file: string;
  type: "pdf" | "image";
  featured: boolean;
};

export const content = data;
export const site = data.site;
export const person = data.person;
export const stats = data.stats as Stat[];
export const about = data.about;
export const skillGroups = data.skillGroups as SkillGroup[];
export const experience = data.experience as Experience[];
export const education = data.education;
export const projects = data.projects as Project[];
export const certifications = data.certifications as Certification[];
export const dashboardsMeta = data.dashboards;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
