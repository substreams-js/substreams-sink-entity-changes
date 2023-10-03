# Substreams Sink Entity Changes

> [Buf](https://buf.build/) codegen for [`EntityChanges`](https://github.com/streamingfast/substreams-sink-entity-changes).

## Install

```bash
$ npm install @substreams/sink-entity-changes
```

## Quickstart

```typescript
import { EntityChanges } from "@substreams/sink-entity-changes"
...

const emitter = new BlockEmitter(transport, request, registry);

// Stream EntityChanges
emitter.on("output", (output: EntityChanges) => {
  for ( const entityChange of output.entityChanges) {
    // EntityChange {
    //   entity,
    //   id,
    //   operation,
    //   fields
    // }
    console.log(entityChange);
  }
});
```