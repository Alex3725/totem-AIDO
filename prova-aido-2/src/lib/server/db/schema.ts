/**
 * DRIZZLE ORM SCHEMA
 * - Definizione tabelle MySQL
 */

import { mysqlTable, serial, varchar, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';

/**
 * USERS TABLE
 */
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  nome: varchar('nome', { length: 255 }).notNull(),
  ruolo: mysqlEnum('ruolo', ['admin', 'user']).notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  lastLoginAt: timestamp('last_login_at')
});

/**
 * DOCUMENTS TABLE
 */
export const documents = mysqlTable('documents', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  nomeFile: varchar('nome_file', { length: 255 }).notNull(),
  dataCaricamento: timestamp('data_caricamento').notNull().defaultNow(),
  dataVisualizzata: timestamp('data_visualizzata').notNull(),
  fileUrl: varchar('file_url', { length: 512 }).notNull(),
  previewImgUrl: varchar('preview_img_url', { length: 512 }).notNull(),
  ruoloVisibile: mysqlEnum('ruolo_visibile', ['admin', 'user']).notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});

/**
 * TYPES (inferiti da schema)
 */
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;