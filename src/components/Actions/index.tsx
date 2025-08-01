import { useCallback, useEffect, useState } from "react";
import { GitPullRequestArrow, Plus } from "lucide-react";

import {
  checkUpdates,
  updateTools,
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
      <button className="action" onClick={scrollNewProject}>
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

