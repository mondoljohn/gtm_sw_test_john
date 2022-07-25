import { ECurrency, ICartItem } from "./models";


export const getFormattedPrice = (priceInUSD: number, currency?: ECurrency) => {
	if(currency === ECurrency.EUR) {
		return `€ ${priceInUSD * .98}`
	} else if (currency === ECurrency.JPY) {
		return `¥ ${priceInUSD * 136.38}`
	} else {
		return `$ ${priceInUSD}`
	}
}

export const getCurrencyConverted = (priceInUSD: number, currency?: ECurrency) => {
	if(currency === ECurrency.EUR) {
		return priceInUSD * .98
	} else if (currency === ECurrency.JPY) {
		return priceInUSD * 136.38
	} else {
		return priceInUSD
	}
}

export const getBagTotal = (items: ICartItem[], currency: ECurrency) => {
	let totalUSD = 0;
	items.forEach((item) => {
		totalUSD = totalUSD + item.count * item.product.priceInUSD
	})

	return totalUSD
}

export const getBagCount = (items: ICartItem[]) => {
	let total = 0;
	items.forEach((item) => {
		total = total + item.count;
	})

	return total
}

export const gtmPushEvent = (eventName: string, data: any) => {
	// @ts-ignore
	if(window.dataLayer) {
		// @ts-ignore
		window.dataLayer.push({
			event: eventName,
			ecommerce: data
		})
	}
}