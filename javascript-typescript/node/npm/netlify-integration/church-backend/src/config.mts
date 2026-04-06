import { Config } from "@netlify/functions";

export const config: Config = {
  path: ["/hello", "/ping/:name"]
};