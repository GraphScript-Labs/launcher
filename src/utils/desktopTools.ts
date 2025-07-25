import type { LauncherData } from "../defs/LauncherData";
import type { PyWebview } from "../defs/PyWebview";

const setupDesktopTools = () => {
  const getApi = (): PyWebview["api"] | undefined => {
    return window.pywebview?.api;
  };

  const checkApiState = (): boolean => {
    return !!Object.keys(getApi() || {}).length;
  };

  const waitForPWV = (): Promise<void> => {
    return (new Promise((resolve) => {
      if (checkApiState()) {
        resolve();
        return;
      }

      const checkInterval = setInterval(() => {
        if (checkApiState()) {
          resolve();
          clearInterval(checkInterval);
        }
      }, 10);
    }));
  }

  const closeWindow = async () => {
    return getApi()?.close();
  }

  const openProject = async (projectId: string) => {
    await waitForPWV();
    await getApi()?.open_project(projectId);
  }

  const getData = async (): Promise<LauncherData | undefined> => {
    await waitForPWV();
    const raw_data = await getApi()?.get_data();
    
    if (!raw_data) return undefined;
    return JSON.parse(raw_data) as LauncherData;
  }

  const storeData = async (data: string): Promise<boolean> => {
    await waitForPWV();
    return await getApi()?.store_data(data) || false;
  }

  const getVersion = async (): Promise<{[key: string]: string;}> => {
    await waitForPWV();
    return await getApi()?.get_version() || {};
  }

  const checkUpdates = async (): Promise<boolean> => {
    await waitForPWV();
    return await getApi()?.check_updates() || false;
  }

  const updateTools = async () => {
    await waitForPWV();
    return await getApi()?.update();
  }

  return {
    closeWindow,
    openProject,
    getData,
    storeData,
    getVersion,
    checkUpdates,
    updateTools,
  }
};

export const {
  closeWindow,
  openProject,
  getData,
  storeData,
  getVersion,
  checkUpdates,
  updateTools,
} = setupDesktopTools();

