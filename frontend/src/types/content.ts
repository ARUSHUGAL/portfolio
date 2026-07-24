export interface About {
  name: string;
  title: string;
  location: string;
  summary: string;
  links: { github: string; linkedin: string; email: string };
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string; // "YYYY-MM"
  endDate: string | null;
  current: boolean;
  descriptionPoints: string[];
}

export interface Project {
  id: string;
  title: string;
  technologies: string[];
  descriptionPoints: string[];
  repositoryUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string; // "YYYY-MM"
  credentialId: string;
}

export interface EducationEntry {
  institution: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
  honors: string[];
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface EducationResponse {
  education: EducationEntry[];
  languages: Language[];
  leadership: string[];
}

export interface PortfolioContent {
  about: About;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  education: EducationResponse;
}
