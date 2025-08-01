import { useCallback, useState } from "react";
import { ChevronUp } from "lucide-react";

import type { ProjectData } from "../../defs/ProjectData";

import {
  getData,
  openProject,
  storeData,
} from "../../utils/desktopTools";

import { Input } from "../Input";

import "./style.css";

export function NewProject() {
  const [projectData, setProjectData] = useState<ProjectData>({
    id: "",
    name: "",
  });

  const scrollUp = useCallback(() => {
    document.getElementById("hero")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  const openNewProject = useCallback(() => {
      (async () => {
        const launcherData = await getData();
        if (!launcherData) return;
        
        const newLauncherData = {
          ...launcherData,
          projects: [
            projectData,
            ...launcherData.projects,
          ]
        };
        
        await storeData(JSON.stringify(newLauncherData));
        await openProject(projectData.id);

        scrollUp();
      })();
    }, [projectData, scrollUp]);

  const updateValueGenerator = useCallback((key: string) => {
    return (value: string) => {
      setProjectData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };
  }, []);

  return (<>
    <div id="new-project" className="new-project">
      <button className="new-project-scroll" onClick={scrollUp}>
        <ChevronUp className="new-project-scroll-icon" />

        <span className="new-project-scroll-text">
          Welcome Screen
        </span>
        
        <ChevronUp className="new-project-scroll-icon" />
      </button>

      <div className="new-project-inputs">
        <Input
          updateValue={updateValueGenerator("id")}
          placeholder="Project ID"
        />

        <Input
          updateValue={updateValueGenerator("name")}
          placeholder="Project Name"
        />

        <button
          className="input-button"
          onClick={openNewProject}
          disabled={!(!!projectData.id && !!projectData.name)}
        >
          Create Project
        </button>
      </div>
    </div>
  </>);
}

