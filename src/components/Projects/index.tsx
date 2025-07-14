import { useCallback, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

import type { ProjectData } from "../../defs/ProjectData";
import { getData } from "../../utils/desktopTools";
import { ProjectCard } from "../ProjectCard";

import "./style.css";

export function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const scrollUp = useCallback(() => {
    document.getElementById("hero")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  const syncProjects = useCallback(async () => {
    const data = (await getData())?.projects;
    if (!data) return;
    setProjects(data);
  }, []);

  useEffect(() => {
    syncProjects();
  }, [syncProjects]);

  return (<>
    <div id="projects" className="projects">
      <button className="projects-scroll" onClick={scrollUp}>
        <ChevronUp className="projects-scroll-icon" />

        <span className="projects-scroll-text">
          Welcome Screen
        </span>
        
        <ChevronUp className="projects-scroll-icon" />
      </button>

      <div className="projects-list">
        {
          projects.map(project => <ProjectCard
            key={project.id}
            project={project}
            syncProjects={syncProjects}
          />)
        }
      </div>
    </div>
  </>);
}

