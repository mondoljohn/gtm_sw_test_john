import { EColor, ESize, IProduct } from "../models";
import prod1 from "../assets/prod/1.png"
import prod2 from "../assets/prod/2.png"


const commonDescription = "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.";

export const allProducts: IProduct[] = [
	{
		id: 0,
		categoryId: 0,
		images: [prod1, prod2, prod1, prod2],
		brand: 'Apollo',
		name: 'Running Short',
		description: commonDescription,
		priceInUSD: 50,
		sizes: [ESize.XS, ESize.S, ESize.M, ESize.L],
		colors: [EColor.GREY, EColor.BLACK, EColor.GREEN],
		inStock: true,
	},
	{
		id: 1,
		categoryId: 0,
		images: [prod1],
		brand: 'Apollo',
		name: 'Running Short',
		description: commonDescription,
		priceInUSD: 50,
		sizes: [ESize.XS, ESize.S, ESize.M, ESize.L],
		colors: [EColor.GREY, EColor.BLACK, EColor.GREEN],
		inStock: true,
	},
	{
		id: 2,
		categoryId: 2,
		images: [prod1],
		brand: 'Apollo',
		name: 'Running Short',
		description: commonDescription,
		priceInUSD: 50,
		sizes: [ESize.XS, ESize.S, ESize.M, ESize.L],
		colors: [EColor.GREY, EColor.BLACK, EColor.GREEN],
		inStock: true,
	},
];