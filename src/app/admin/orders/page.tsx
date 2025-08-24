import { db } from "@/utils/db"
import { orderHeader } from "@/utils/schema/order-schema"
import { OrderList } from "./OrderList"

export default async function OrdersPage() {
    const orders = await db.select().from(orderHeader)
    return <OrderList orders={orders} />
}