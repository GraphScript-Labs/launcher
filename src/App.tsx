import { AppWindow } from "./components/AppWindow";
import { Hero } from "./components/Hero";
import { Install } from "./components/Install";
import { NewProject } from "./components/NewProject";
import { Projects } from "./components/Projects";

export function App() {
  return (<>
    <div className="app">
      <AppWindow>
        <Hero />
        <Projects />
        <NewProject />
        <Install />
      </AppWindow>
    </div>
  </>);
}

