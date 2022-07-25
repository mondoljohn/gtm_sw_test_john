import { IProduct } from "./product"

export type ICartItem = {
	product: IProduct,
	count: number,
	color: string,
	size: string
}