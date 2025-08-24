ALTER TABLE `order_header` RENAME COLUMN "payed" TO "status";--> statement-breakpoint
DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `order_header` ALTER COLUMN "status" TO "status" text NOT NULL DEFAULT 'CREATED';--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);