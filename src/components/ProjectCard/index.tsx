import type { MouseEvent } from "react";
import { Trash, Waypoints } from "lucide-react";

import type { ProjectData } from "../../defs/ProjectData";
import { getData, openProject, storeData } from "../../utils/desktopTools";

import "./style.css";

export function ProjectCard({
  project,
  syncProjects,
}: {
  project: ProjectData;
  syncProjects: () => Promise<void>;
}) {
  const launchProject = () => {
    openProject(project.id);
  };

  const deleteProject = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    (async () => {
      const launcherData = await getData();
      if (!launcherData) return;

      const newLauncherData = {
        ...launcherData,
        projects: launcherData.projects.filter(p => p.id !== project.id),
      };

      await storeData(JSON.stringify(newLauncherData));
      await syncProjects();
    })();
  };

  return (<>
    <div className="project-card" onClick={launchProject}>
      <Waypoints className="project-card-icon" />

      <div className="project-card-details">
        <h3 className="project-card-title">{project.name}</h3>
        <span className="project-card-id">ID: {project.id}</span>
      </div>

      <div className="project-card-actions">
        <button className="project-card-action" onClick={deleteProject}>
          <Trash />
        </button>
      </div>
    </div>
  </>);
}

