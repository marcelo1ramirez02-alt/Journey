export interface OnboardingData {
  fullName: string;
  email: string;
  career: string;
  stage: string; // 'estudiante' | 'egresado' | 'practicante' | 'junior'
  areaOfInterest: string;
  objective: string;
  industry?: string;
  currentPosition?: string;
}

export type StageType = 'Estudiante' | 'Egresado' | 'Practicante' | 'Junior';

export interface SkillNode {
  name: string;
  importance: 'básico' | 'medio' | 'avanzado';
  description?: string;
}

export interface CareerLineNode {
  title: string;
  salary: string;
  experienceNeeded: string;
  description: string;
}

export interface AreaNode {
  name: string;
  description: string;
  subareas: string[];
  skills: string[];
  demand: 'Alta' | 'Media' | 'Baja';
  salary: string;
}

export interface RoadmapData {
  careerId: string;
  careerName: string;
  description: string;
  commonBases: {
    title: string;
    description: string;
    skills: string[];
  }[];
  areas: AreaNode[];
  careerLine: CareerLineNode[];
}

export interface ComparisonCardData {
  areaName: string;
  careerName: string;
  demand: 'Alta' | 'Media' | 'Baja';
  dataUsage: number; // 1 to 5 scale
  creativity: number; // 1 to 5 scale
  socialContact: number; // 1 to 5 scale
  salaryRange: string;
  keySkills: string[];
  recommendedRoles: string[];
  description: string;
}

export interface BetaUserLead {
  fullName: string;
  email: string;
  career?: string;
  registeredAt: string;
}
