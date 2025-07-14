import { Plus } from "lucide-react";

import type { ProjectData } from "../../defs/ProjectData";

import { getData, openProject, storeData } from "../../utils/desktopTools";
import { generateId } from "../../utils/generatorTools";

import "./style.css";

export function Actions() {
  const openNewProject = () => {
    const projectId = generateId();

    const newProject: ProjectData = {
      id: projectId,
      name: `Project ${projectId.toUpperCase()}`,
    };

    (async () => {
      const launcherData = await getData();
      if (!launcherData) return;
      
      const newLauncherData = {
        ...launcherData,
        projects: [
          newProject,
          ...launcherData.projects,
        ]
      };
      
      await storeData(JSON.stringify(newLauncherData));
      await openProject(projectId);
      
      location.reload();
    })();
  };

  return (<>
    <div className="actions">
      <button className="action" onClick={openNewProject}>
        <Plus className="action-icon" />
        <span className="action-name">
          New Project
        </span>
      </button>
    </div>
  </>);
}

