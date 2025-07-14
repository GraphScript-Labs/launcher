import { AppWindow } from "./components/AppWindow";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";

export function App() {
  return (<>
    <div className="app">
      <AppWindow>
        <Hero />
        <Projects />
      </AppWindow>
    </div>
  </>);
}

