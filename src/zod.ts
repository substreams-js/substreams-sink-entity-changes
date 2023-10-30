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
  ordinal: z.string(),
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
