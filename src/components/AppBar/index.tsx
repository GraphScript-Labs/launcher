import { useCallback, useEffect, useState } from "react";
import { Tags } from "lucide-react";

import { closeWindow, getVersion } from "../../utils/desktopTools";

import "./style.css";

export function AppBar() {
  const [version, setVersion] = useState<{
    [key: string]: string;
  }>({});

  const showVersions = useCallback(() => {
    const versionMessage = Object.entries(version).map(
      v => `${v[0]}: ${v[1]}`
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

