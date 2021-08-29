import { DevlopmentEnvironment } from "./dev.env";
import { ProductEnvironment } from "./prod.env";

export interface Environment {
  db_url: string;
}

export function getEnvironmentVariables(): Environment {
  if (process.env.NODE_ENV === "production") {
    return ProductEnvironment;
  }
  return DevlopmentEnvironment;
}
