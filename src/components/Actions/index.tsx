import { useCallback, useEffect, useState } from "react";
import { GitPullRequestArrow, Plus } from "lucide-react";

import {
  checkUpdates,
} from "../../utils/desktopTools";

import "./style.css";

export function Actions() {
  const [updatesAvailable, setUpdatesAvailable] = useState(false);

  const scrollNewProject = useCallback(() => {
    document.getElementById("new-project")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  const scrollUpdate = useCallback(() => {
    document.getElementById("install")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
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
      <button className="action" onClick={scrollNewProject}>
        <Plus className="action-icon" />
        <span className="action-name">
          New Project
        </span>
      </button>

      <button
        className="action"
        onClick={scrollUpdate}
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

