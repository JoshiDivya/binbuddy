import { integer,varchar,pgTable,serial, text,timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export const Users = pgTable('users',{
    id: serial('id').primaryKey(),
    email: varchar('email',{length:250}).notNull().unique(),
    name : varchar('name',{length:255}).notNull(),
    createdAt : timestamp('created_at').defaultNow().notNull()
})

export const Reports = pgTable('reports',{
    id : serial('id').primaryKey().notNull(),
    userId : integer('user_id').references(()=>Users.id).notNull(),
    location: text('location').notNull(),
    wasteType : varchar('waste_type',{length: 250}).notNull(),
    amount : varchar('amount',{length:255}).notNull(),
    imageUrl : text('image_url'),
    verificationResult : jsonb('verification_result'),
    status : varchar('status',{length:255}).notNull().default('pending'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    collectionId: integer('collection_id').references(()=>Users.id),
})

export const Rewards = pgTable('rewards',{
    id: serial('id').primaryKey(),
    userId : integer('user_id').references(()=>Users.id).notNull(),
    points :integer('points').notNull().default(0),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull(),
    isAvailable : boolean('isAvailable').notNull().default(true),
    name : varchar('name',{length:255}).notNull(),
    collectionInfo : text('collection_info').notNull()
})

export const CollectionWaste = pgTable('collection_waste',{
    id: serial('id').primaryKey(),
    reportId : integer('report_id').references(()=> Reports.id),
    collectionDate : timestamp('collection_date').notNull(),
    status : varchar('status',{length: 255}).notNull().default('collected')
})

export const Notifications = pgTable('notifications',{
    id: serial('id').primaryKey(),
    userId : integer('user_id').references(()=>Users.id).notNull(),
    message : text('message').notNull(),
    type : varchar('type',{length:255}).notNull(),
    isRead : boolean('isRead').notNull().default(false),
    createdAt : timestamp('created_at').defaultNow().notNull(),
})

export const Transactions = pgTable('transactions',{
    id: serial('id').primaryKey(),
    userId : integer('user_id').references(()=>Users.id).notNull(),
    type : varchar('type',{length:20}).notNull(),
    amount : integer('amount').notNull(),
    description : text('description').notNull(),
    date : timestamp('date').defaultNow().notNull()
})