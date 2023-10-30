import { expect, test } from "vitest";
import { getValuesInEntityChange } from "./extract-values.js";
import { EntityChange } from "./zod.js";

test("getValuesInEntityChange", () => {
  const change: Partial<EntityChange> = {
    fields: [
      { name: "value a", newValue: { string: "a string" } },
      { name: "value b", newValue: { int32: 1 } },
      { name: "value c", newValue: { bigint: "12345" } },
      { name: "value d", newValue: { bigdecimal: "1234.5678" } },
      { name: "value e", newValue: { bool: true } },
      { name: "value f", newValue: { bytes: "eeff" } },
      { name: "value g", newValue: { undefined: undefined } },
      {
        name: "value h",
        newValue: {
          array: {
            value: [{ int32: 1 }, { int32: 2 }, { int32: 3 }, { int32: 4 }],
          },
        },
      },
    ],
  };

  const values = getValuesInEntityChange(change as EntityChange);
  expect(Object.keys(values).length).toBe(7);
  expect(values).toEqual({
    "value a": "a string",
    "value b": 1,
    "value c": "12345",
    "value d": "1234.5678",
    "value e": true,
    "value f": "eeff",
    "value h": "[1, 2, 3, 4]",
  });
  expect("value g" in values).toBeFalsy();
});
