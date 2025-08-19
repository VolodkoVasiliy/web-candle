CREATE TABLE `variant` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`price` integer NOT NULL,
	`price_id` text NOT NULL,
	`size` text NOT NULL,
	`burn_time` text NOT NULL,
	`product_id` integer,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `price`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `price_id`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `size`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `burn_time`;