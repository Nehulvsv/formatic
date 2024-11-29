import { pgTable, text, serial, varchar ,integer} from "drizzle-orm/pg-core";

// Define the table schema using drizzle-orm
export const jsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(), 
    theme: varchar("theme"), 
    background: varchar("background"), 
    style: varchar("style"), 
    createdBy: varchar('createdBy').notNull(), 
    createdAt: varchar("createdAt").notNull() 
});


export const userResponses = pgTable('userResponses',
    {
        id: serial('id').primaryKey(),
        jsonResponse:text("jsonResponse").notNull(),
        createdBy:varchar('createdBy').default('anonymus'),
        createdAt: varchar("createdAt").notNull(),
        formRef: integer("formRef")
        .references(() => jsonForms.id)
    }
)