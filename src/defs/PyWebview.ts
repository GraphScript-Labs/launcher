export interface PyWebview {
  api: {
    close: () => Promise<void>;
    open_project: (project_id: string) => Promise<void>;
    get_data: () => Promise<string>;
    store_data: (data: string) => Promise<boolean>;
  }
};

