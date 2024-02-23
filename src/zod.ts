import z from "zod";

export const EntityChangeOperation = z.enum([
  "OPERATION_UNSPECIFIED",
  "OPERATION_CREATE",
  "OPERATION_UPDATE",
  "OPERATION_DELETE",
  "OPERATION_FINAL",
]);

export const SubValue = z.union([
  z.object({ int32: z.number() }),
  z.object({ bigdecimal: z.string() }),
  z.object({ bigint: z.string() }),
  z.object({ string: z.string() }),
  z.object({ bytes: z.string() }),
  z.object({ bool: z.boolean() }),
  z.object({ undefined: z.optional(z.undefined()) }),
]);

export const Value = z.object({ array: z.object({ value: z.array(SubValue) }) }).or(SubValue);

export const Field = z.object({
  name: z.string(),
  newValue: z.optional(Value),
});

export const EntityChange = z.object({
  entity: z.string(),
  id: z.string(),
  ordinal: z.optional(z.string()), // Deprecated, this is not used within `graph-node`.
  operation: EntityChangeOperation,
  fields: z.array(Field),
});

export const EntityChanges = z.object({
  entityChanges: z.array(EntityChange),
});

export type EntityChangeOperation = z.infer<typeof EntityChangeOperation>;
export type Value = z.infer<typeof Value>;
export type Field = z.infer<typeof Field>;
export type EntityChange = z.infer<typeof EntityChange>;
export type EntityChanges = z.infer<typeof EntityChanges>;

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
