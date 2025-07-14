import { useEffect, useState } from "react";
import { closeWindow, getVersion } from "../../utils/desktopTools";

import "./style.css";

export function AppBar() {
  const [version, setVersion] = useState<string>("v0");

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
        Launcher {version}
      </div>
    </div>
  </>);
}

