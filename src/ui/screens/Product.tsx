import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allProducts } from "../../data/products";
import { ECurrency, IProduct } from "../../models";
import { getCurrencyConverted, getFormattedPrice, gtmPushEvent } from "../../utils";
import ColorButton from "../components/ColorButton";
import SizeButton from "../components/SizeButton";

export interface ProductProps {
	addToCart: (item: IProduct, color?: string, size?: string) => void;
	curr: ECurrency;
}

const Product: FC<ProductProps> = ({addToCart, curr}) => {
	let params = useParams();
	const prod = allProducts.find(x => x.id === Number(params.pid)) || null;

	const [currentImg, setCurrentImg] = useState(prod!.images[0] as string);
	const [selectedSize, setSelectedSize] = useState(prod!.sizes[0] as string);
	const [selectedColor, setSelectedColor] = useState(prod!.colors[0] as string);
	useEffect(() => {
		if (prod) {
			const data = {
				detail: {
						products: [{
							id: prod.id,
							name: prod.name,
							price: getCurrencyConverted(prod.priceInUSD, curr),
							brand: '',
							variant: '',
							category: '',
							dimension1: '',
							dimension2: '',
						}]
					}
			}
			gtmPushEvent('detail',data)
		}
	}, [])

	
	return (
		<>
		{prod && <div className="prod-page">
				<div className="prod-thumbs-list">{prod.images.map((prodImg, index) => (
					<img className="prod-thumbs" onClick={() => setCurrentImg(prodImg)} src={prodImg} key={index} alt={`${prod.brand} ${prod.name} ${index+1}`}/>
				))}</div>
				<div className="prod-master-image">
					<img src={currentImg} alt="Product Preview" style={{width: "100%"}} />
				</div>
				<div className="prod-desc">
					<div className="prod-brand-text">{prod.brand}</div>
					<div className="prod-name-text">{prod.name}</div>
					<div className="prod-label">SIZE:</div>
					{prod.sizes.map((size) => (
						<SizeButton key={size} selectHandler={(size) => setSelectedSize(size)} displayText={size} selected={size === selectedSize} />
					))}
					<div className="prod-label">COLOR:</div>
					{prod.colors.map((color) => (
						<ColorButton key={color} selectHandler={(color) => setSelectedColor(color)} color={color} selected={color === selectedColor} />
					))}
					<div className="prod-label">PRICE:</div>
					<div className="price-text">{getFormattedPrice(prod.priceInUSD, curr)}</div>
					<button className="prod-add-to-cart" onClick={() => addToCart(prod, selectedColor, selectedSize)}>ADD TO CART</button>
					<div className="prod-desc-text">{prod.description}</div>
				</div>
			</div>}
		</>
	);
};

export default Product;


