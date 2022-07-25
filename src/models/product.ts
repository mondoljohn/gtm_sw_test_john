export enum ESize {
	XS = "XS",
	S = "S",
	M = "M",
	L = "L",
	XL = "XL",
	XXL = "XXL",
	XXXL = "XXXL",
}

export enum EColor {
	RED = '#e74c3c',
	GREEN = '#2ecc71',
	BLUE = '#3498db',
	YELLOW = '#f1c40f',
	ORANGE = '#f39c12',
	MAROON = '#c0392b',
	SILVER = '#ecf0f1',
	PURPLE = '#9b59b6',
	GREY = "#95a5a6",
	BLACK = "#222",
	WHITE = "#FFF",
}

export type IProduct = {
	id: number;
	categoryId: number;
	images: string[];
	brand: string;
	name: string;
	description: string;
	priceInUSD: number;
	sizes: ESize[];
	colors: EColor[];
	inStock: boolean;
}