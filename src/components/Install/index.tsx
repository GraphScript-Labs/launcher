import { useCallback, useState } from "react";
import { ChevronUp, Download } from "lucide-react";
import { updateTools } from "../../utils/desktopTools";

import "./style.css";

export function Install() {
  const [installing, setInstalling] = useState(false);

  const scrollUp = useCallback(() => {
    document.getElementById("hero")?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  const startInstall = useCallback(() => {
    setInstalling(true);
    updateTools();
  }, []);

  return (<>
    <div id="install" className="install">
      <button
        className="install-scroll scroll-up"
        onClick={scrollUp}
        disabled={installing}
      >
        <ChevronUp className="install-scroll-icon" />

        <span className="install-scroll-text">
          Welcome Screen
        </span>
        
        <ChevronUp className="install-scroll-icon" />
      </button>

      <div className="install-content">
        <button
          className="install-button"
          onClick={startInstall}
          disabled={installing}
        >
          <Download className="install-button-icon" />

          <span className="install-button-text">
            Update Tools
          </span>
        </button>
      </div>

      <div
        className={[
          "installing-text",
          installing ? "active" : "",
        ].join(" ")}
      >
        Updating
      </div>

      <span className={[
        "install-spinner",
        installing ? "active" : "",
      ].join(" ")} />
    </div>
  </>);
}

