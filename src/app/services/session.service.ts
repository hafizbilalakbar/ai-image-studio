import { Injectable, signal } from '@angular/core';

export interface UserProject {
  id: string;
  tool: string;
  originalImage: string;
  resultImage: string;
  timestamp: Date;
  settings?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly STORAGE_KEY = 'ai-image-studio-projects';
  private readonly MAX_PROJECTS = 50;

  // Session state
  recentProjects = signal<UserProject[]>([]);
  currentProject = signal<UserProject | null>(null);

  constructor() {
    this.loadProjects();
  }

  /** Save a completed project */
  saveProject(project: Omit<UserProject, 'id' | 'timestamp'>): UserProject {
    const newProject: UserProject = {
      ...project,
      id: this.generateId(),
      timestamp: new Date()
    };

    const projects = [newProject, ...this.recentProjects()];
    
    // Keep only the most recent projects
    if (projects.length > this.MAX_PROJECTS) {
      projects.pop();
    }

    this.recentProjects.set(projects);
    this.currentProject.set(newProject);
    this.saveToStorage();

    return newProject;
  }

  /** Get a project by ID */
  getProject(id: string): UserProject | undefined {
    return this.recentProjects().find(p => p.id === id);
  }

  /** Delete a project */
  deleteProject(id: string): void {
    const projects = this.recentProjects().filter(p => p.id !== id);
    this.recentProjects.set(projects);
    this.saveToStorage();
  }

  /** Clear all projects */
  clearProjects(): void {
    this.recentProjects.set([]);
    this.currentProject.set(null);
    this.saveToStorage();
  }

  /** Set current project */
  setCurrentProject(project: UserProject): void {
    this.currentProject.set(project);
  }

  /** Get projects by tool */
  getProjectsByTool(tool: string): UserProject[] {
    return this.recentProjects().filter(p => p.tool === tool);
  }

  /** Export projects as JSON */
  exportProjects(): string {
    return JSON.stringify(this.recentProjects(), null, 2);
  }

  /** Import projects from JSON */
  importProjects(json: string): void {
    try {
      const projects = JSON.parse(json) as UserProject[];
      this.recentProjects.set(projects.slice(0, this.MAX_PROJECTS));
      this.saveToStorage();
    } catch (error) {
      console.error('Failed to import projects:', error);
    }
  }

  /** Load projects from local storage */
  private loadProjects(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const projects = JSON.parse(stored) as UserProject[];
        // Convert timestamp strings back to Date objects
        this.recentProjects.set(
          projects.map(p => ({
            ...p,
            timestamp: new Date(p.timestamp)
          }))
        );
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
      this.recentProjects.set([]);
    }
  }

  /** Save projects to local storage */
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.recentProjects()));
    } catch (error) {
      console.error('Failed to save projects:', error);
    }
  }

  /** Generate unique ID */
  private generateId(): string {
    return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /** Get storage usage */
  getStorageUsage(): { count: number; max: number; percentage: number } {
    const count = this.recentProjects().length;
    return {
      count,
      max: this.MAX_PROJECTS,
      percentage: (count / this.MAX_PROJECTS) * 100
    };
  }
}
