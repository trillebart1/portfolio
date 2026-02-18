import fs from 'fs';
import path from 'path';
import { Project, ProjectInput } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const PUBLIC_PROJECTS_DIR = path.join(process.cwd(), 'public', 'projects');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_PROJECTS_DIR)) fs.mkdirSync(PUBLIC_PROJECTS_DIR, { recursive: true });
if (!fs.existsSync(PROJECTS_FILE)) fs.writeFileSync(PROJECTS_FILE, '[]', 'utf-8');

export async function getProjects(): Promise<Project[]> {
    try {
        const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
        const projects: Project[] = JSON.parse(data);

        // Sort by recent
        return projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
        console.error('Error reading projects:', error);
        return [];
    }
}

export async function getProject(slug: string): Promise<Project | null> {
    const projects = await getProjects();
    const project = projects.find((p) => p.slug === slug);

    if (project) {
        // Scan for images dynamically
        const projectDir = path.join(PUBLIC_PROJECTS_DIR, slug);
        if (fs.existsSync(projectDir)) {
            const files = fs.readdirSync(projectDir);
            const images = files
                .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
                .map((file) => `/projects/${slug}/${file}`);

            return { ...project, images };
        }
        return { ...project, images: [] };
    }

    return null;
}

export async function createProject(slug: string, data: ProjectInput): Promise<Project> {
    const projects = await getProjects();

    if (projects.some(p => p.slug === slug)) {
        throw new Error('Project with this slug already exists');
    }

    const newProject: Project = {
        ...data,
        slug,
        images: [],
        createdAt: new Date().toISOString(),
    };

    projects.push(newProject);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));

    // Create project folder
    const projectDir = path.join(PUBLIC_PROJECTS_DIR, slug);
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }

    return newProject;
}

export async function updateProject(slug: string, data: Partial<Project>): Promise<Project | null> {
    const projects = await getProjects();
    const index = projects.findIndex(p => p.slug === slug);

    if (index === -1) return null;

    const updatedProject = { ...projects[index], ...data };
    projects[index] = updatedProject;

    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));

    return updatedProject;
}

export async function deleteProject(slug: string): Promise<boolean> {
    const projects = await getProjects();
    const filteredProjects = projects.filter(p => p.slug !== slug);

    if (projects.length === filteredProjects.length) return false;

    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filteredProjects, null, 2));

    // Delete folder (optional, maybe keep for safety? No, delete it)
    const projectDir = path.join(PUBLIC_PROJECTS_DIR, slug);
    if (fs.existsSync(projectDir)) {
        fs.rmSync(projectDir, { recursive: true, force: true });
    }

    return true;
}
