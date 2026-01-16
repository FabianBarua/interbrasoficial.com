import { int, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
export * from './schemaAuth';
export * from './schemaCart';

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
  // stock: int().default(0).notNull(),
});

export const Catalog = sqliteTable("catalog", {
  id: int().primaryKey().notNull(),
  old_id: int(),
  new_id: int(),
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

export const PromotionType = sqliteTable("promotion_type", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  name: text().notNull(), // "percentage", "fixed", "bundle", etc.
  description: text().notNull()
});

export const Promotion = sqliteTable("promotion", {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  catalog_id: int().references(() => Catalog.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }).notNull(),
  type_id: int().references(() => PromotionType.id, {
    onDelete: "restrict",
    onUpdate: "cascade"
  }).notNull(),
  // Información específica según tipo
  data: text({ mode: 'json' }).notNull(),
  active: int({ mode: 'boolean' }).default(true).notNull(),
  label: text().default("")
});
