import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
export * from './schemaAuth';

export const Category = sqliteTable("category", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  shortDescription: text().notNull(),
});

export const Product = sqliteTable("product", 
  {
  id: text().primaryKey().notNull(),
  category_id: text().references(() => Category.id, {onDelete: 'cascade', onUpdate:'cascade'}).notNull(),
  name: text().notNull(),
  review: text().notNull(),
  included: text(),
  specs: text().notNull(),
});

export const Color = sqliteTable("color", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  color: text().notNull(),
});

export const Volt = sqliteTable("volt", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  name: text()
});

export const Variant = sqliteTable("variant", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  product_id: text().references(() => Product.id, {onDelete: 'cascade', onUpdate:'cascade'}).notNull(),
  color_id: int().references(() => Color.id, {onDelete: 'set null', onUpdate:'cascade'}),
  volt_id: int().references(() => Volt.id , {onDelete: 'set null', onUpdate:'cascade'}),
  catalog_id: int().references(() => Catalog.id, {onDelete: 'set null', onUpdate:'cascade'}),
});

export const Catalog = sqliteTable("catalog", {
  id: int().primaryKey().notNull(),
  name: text().notNull(),
  price: real().notNull(),
  status_id : int().references(() => Status.id, {onDelete: 'set null', onUpdate:'cascade'}),
  productPerBox: int().notNull(),
  show: int({mode: 'boolean'}).default(true).notNull().notNull(),
} );

export const Status = sqliteTable("status", {
  id: int().primaryKey({ autoIncrement: true}).notNull(),
  name: text().notNull()
})

export const Photo = sqliteTable("photo", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  variant_id: int().references(() => Variant.id, {onDelete: 'cascade', onUpdate:'cascade'}).notNull(),
  url: text().notNull(),
  order: int().notNull(),
});

export const Languages = sqliteTable("languages", {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
});

export const Internationalization = sqliteTable("internationalization", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  key : text().notNull(),
  value: text(),
  lang: text().notNull().references(() => Languages.id, {onDelete: "set null", onUpdate:'cascade'}).notNull(),
} );

