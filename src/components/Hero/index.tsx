import { ChevronDown } from "lucide-react";
import { Actions } from "../Actions";

import Logo from "../../assets/GraphScript.png";
import "./style.css";

export function Hero() {
  const scrollDown = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (<>
    <div className="hero" id="hero">
      <div className="hero-wrapper">
        <div className="hero-logo">
          <img src={Logo} alt="GraphScript Logo" />
        </div>

        <h1 className="hero-title">
          GraphScript
        </h1>

        <h2 className="hero-subtitle">
          Engine
        </h2>

        <Actions />
      </div>

      <button className="hero-scroll" onClick={scrollDown}>
        <ChevronDown className="hero-scroll-icon" />

        <span className="hero-scroll-text">
          Show Projects
        </span>
        
        <ChevronDown className="hero-scroll-icon" />
      </button>
    </div>
  </>);
}

