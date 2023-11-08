import { EntityChange } from "./zod.js";

export function getValuesInEntityChange(change: EntityChange) {
  const values: Record<string, unknown> = {};

  for (const field of change.fields) {
    for (const [key, value] of Object.entries(field.newValue ?? {})) {
      if (!value) {
        continue;
      }

      if (key === "array") {
        const { value: array } = value as { value: Record<string, unknown>[] };
        values[field.name] = array.flatMap(Object.values);
      } else {
        values[field.name] = value;
      }
    }
  }

  return values;
}
