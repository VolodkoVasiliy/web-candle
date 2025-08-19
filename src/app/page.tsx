import { collection } from "@/utils/schema/collection-schema";
import HomeComponent from "./HomeComponent";
import { db } from "@/utils/db";

export default async function Home() {
  const collections = await db.select().from(collection);
  return <HomeComponent collections={collections} />
}

