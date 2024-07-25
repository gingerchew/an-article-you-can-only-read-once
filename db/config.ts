import { defineDb, defineTable, column } from 'astro:db';

const Visitor = defineTable({
  columns: {
    index: column.number({ primaryKey: true }),
    hash: column.text(),
    attemptedRevist: column.boolean({ default: false })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Visitor
  }
});
