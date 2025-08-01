import { AppWindow } from "./components/AppWindow";
import { Hero } from "./components/Hero";
import { NewProject } from "./components/NewProject";
import { Projects } from "./components/Projects";

export function App() {
  return (<>
    <div className="app">
      <AppWindow>
        <Hero />
        <Projects />
        <NewProject />
      </AppWindow>
    </div>
  </>);
}

