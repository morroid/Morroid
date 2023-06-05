import { Snowflake } from "@theinternetfolks/snowflake";

export function generateId(): string {
  return Snowflake.generate();
}
