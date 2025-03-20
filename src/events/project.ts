import EVENT_NAME from "@/constants/event-name";
import { ICreateProject } from "@/lib/type/project";
import { invoke } from "@tauri-apps/api/core";

async function createProject(payload: ICreateProject) {
  const res = await invoke(EVENT_NAME.CREATE_PROJECT, { payload });
  return res;
}

const ProjectEvent = {
  createProject,
};

export default ProjectEvent;
