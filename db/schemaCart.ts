import {  sqliteTable, text, integer, primaryKey, int } from "drizzle-orm/sqlite-core";
import { Variant } from "./schema";

export const ECOMMERCE_STATUS = sqliteTable("ecommercer_status", {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
})

export const ECOMMERCE_ORDERS = sqliteTable("ecommercer_order", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userIp: text("userIp").notNull(),
  status: int().references(() => ECOMMERCE_STATUS.id, {onDelete: 'set null', onUpdate:'cascade'}).notNull(),
  totalAmount: integer("totalAmount").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).notNull(),
});

export const ECOMMERCE_ORDER_ITEMS = sqliteTable("ecommercer_order_item", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
orderId: text().references(() => ECOMMERCE_ORDERS.id, {onDelete: 'cascade', onUpdate:'cascade'}).notNull(),
variantId: int().references(() => Variant.id, {onDelete: 'set null', onUpdate:'cascade'}).notNull(),
quantity: int().notNull(),
price: integer("price").notNull(),
});

export const ECOMMERCE_INFO = sqliteTable("ecommercer_info", {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    orderId: text().references(() => ECOMMERCE_ORDERS.id, {onDelete: 'cascade', onUpdate:'cascade'}).notNull(),
    fullName: text("fullName").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    country: text("country").notNull(),
});