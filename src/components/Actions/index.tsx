import { useCallback, useEffect, useState } from "react";
import { GitPullRequestArrow, Plus } from "lucide-react";

import type { ProjectData } from "../../defs/ProjectData";

import { generateId } from "../../utils/generatorTools";
import {
  checkUpdates,
  getData,
  openProject,
  storeData,
  updateTools,
} from "../../utils/desktopTools";

import "./style.css";

export function Actions() {
  const [updatesAvailable, setUpdatesAvailable] = useState(false);
  const openNewProject = useCallback(() => {
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
  }, []);

  const startUpdate = useCallback(() => {
    const message = [
      "Are you sure you want to update the tools?",
      "This will close the application.",
      "You will need to start it again manually.",
    ].join(" ");

    if (!confirm(message)) return;
    updateTools();
  }, []);

  useEffect(() => {
    const checkForUpdates = async () => {
      const canUpdate = await checkUpdates();
      if (canUpdate) {
        setUpdatesAvailable(true);
      } else {
        setTimeout(() => {
          checkForUpdates();
        }, 2000);
      }
    }
    
    checkForUpdates();
  }, []);

  return (<>
    <div className="actions">
      <button className="action" onClick={openNewProject}>
        <Plus className="action-icon" />
        <span className="action-name">
          New Project
        </span>
      </button>

      <button
        className="action"
        onClick={startUpdate}
        disabled={!updatesAvailable}
      >
        <GitPullRequestArrow className="action-icon" />
        <span className="action-name">
          Update Tools
        </span>
      </button>
    </div>
  </>);
}

