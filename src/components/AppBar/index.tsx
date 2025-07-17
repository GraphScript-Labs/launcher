import { useCallback, useEffect, useState } from "react";
import { Tags } from "lucide-react";

import { closeWindow, getVersion } from "../../utils/desktopTools";

import "./style.css";

export function AppBar() {
  const [version, setVersion] = useState<{
    [key: string]: string;
  }>({});

  const showVersions = useCallback(() => {
    const convertVersion = (v: string): string => {
      const timestamp: string = v.split("v")[1];
      const date: Date = new Date(Number(timestamp));

      const year: string = (date.getFullYear()).toString().padStart(4, "0");
      const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
      const day: string = (date.getDate()).toString().padStart(2, "0");
      const hours: string = (date.getHours()).toString().padStart(2, "0");
      const minutes: string = (date.getMinutes()).toString().padStart(2, "0");
      const seconds: string = (date.getSeconds()).toString().padStart(2, "0");

      const dfVer = `v${year}.${month}.${day}.${hours}${minutes}${seconds}`;
      const tsVer = `v${timestamp}`;

      return `${dfVer} (${tsVer})`;
    };

    const versionMessage = Object.entries(version).map(
      v => `${v[0]}: ${convertVersion(v[1])}`
    ).join("\n");
    
    alert(versionMessage);
  }, [version]);

  useEffect(() => {
    (async () => {
      const appVersion = await getVersion();
      setVersion(appVersion);
    })();
  }, []);

  return (<>
    <div className="app-bar">
      <div className="window-actions">
        <button
          className="window-action-button"
          data-action="close"
          onClick={() => closeWindow()}
        />
      </div>

      <div className="version-info">
        <Tags className="version-button" onClick={showVersions} />
      </div>
    </div>
  </>);
}

