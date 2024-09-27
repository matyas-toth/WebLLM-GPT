import { prebuiltAppConfig } from "@mlc-ai/web-llm";

const appConfig = {
  model_list: prebuiltAppConfig.model_list,
  use_web_worker: true,
};

export default appConfig;