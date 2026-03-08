"use client";

import { HorizontalProjectSlider } from "@/components/HorizontalProjectSlider";

interface Project {
    title: string;
    location: string;
    status: string;
    image: string;
    slug?: string;
}

interface ProjectsProps {
    projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
    const sliderProjects = projects.slice(0, 3); // Use max 3 projects for the slider

    return (
        <HorizontalProjectSlider slides={sliderProjects} />
    );
}
