// import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"

// export const Users = sqliteTable("user", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text("name"),
//   email: text("email").unique(),
//   emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
//   image: text("image"),
//   role: text("role").default('user').notNull(),
// })
 
// export const Accounts = sqliteTable(
//   "account",
//   {
//     userId: text("userId")
//       .notNull()
//       .references(() => Users.id, { onDelete: "cascade" }),
//     type: text("type").notNull(),
//     provider: text("provider").notNull(),
//     providerAccountId: text("providerAccountId").notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: text("token_type"),
//     scope: text("scope"),
//     id_token: text("id_token"),
//     session_state: text("session_state"),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   })
// )
 
// export const Sessions = sqliteTable("session", {
//   sessionToken: text("sessionToken").primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => Users.id, { onDelete: "cascade" }),
//   expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
// })
 
// export const VerificationTokens = sqliteTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   })
// )
 
// export const Authenticators = sqliteTable(
//   "authenticator",
//   {
//     credentialID: text("credentialID").notNull().unique(),
//     userId: text("userId")
//       .notNull()
//       .references(() => Users.id, { onDelete: "cascade" }),
//     providerAccountId: text("providerAccountId").notNull(),
//     credentialPublicKey: text("credentialPublicKey").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credentialDeviceType").notNull(),
//     credentialBackedUp: integer("credentialBackedUp", {
//       mode: "boolean",
//     }).notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => ({
//     compositePK: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   })
// )