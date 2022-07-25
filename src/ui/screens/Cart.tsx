import React, { FC, useState } from "react";
import { allProducts } from "../../data/products";
import { ECurrency, IProduct } from "../../models";
import { ICartItem } from "../../models/carts";
import { getBagCount, getBagTotal, getFormattedPrice } from "../../utils";
import ColorButton from "../components/ColorButton";
import SizeButton from "../components/SizeButton";

export interface CartProps {
	items: ICartItem[];
	curr: ECurrency;
	addToCart: (item: IProduct, color?: string, size?: string, count?: number) => void;
}

const Cart: FC<CartProps> = ({items, addToCart, curr}) => {

	const total = getBagTotal(items, curr);

  return (
	<>
		<div className="categoryTitle"> CART </div>

		{items && items.length > 0 ? <div className="all-cart-items">
			{items.map((item) => (
				<>
					<div style={{display:"flex", border: "1px solid #E5E5E5", borderLeft:"none", borderRight:"none", padding:"16px"}}>
						<div style={{flex:"1 1 80%"}}>
							<div className="prod-brand-text">{item.product.brand}</div>
							<div className="prod-name-text">{item.product.name}</div>
							<div className="price-text" style={{margin:"16px 0"}}>{getFormattedPrice(item.product.priceInUSD, curr)}</div>
							<div className="prod-label2">SIZE:</div>
							{item.product.sizes.map((size) => (
								<SizeButton key={`${item.product.brand}_${item.product.name}_${size}`} displayText={size} selectHandler={(size_) => addToCart(item.product, size_, item.color)} selected={item.size === size}  />
							))}
							<div className="prod-label2">COLOR:</div>
							{item.product.colors.map((color) => (
								<ColorButton key={`${item.product.brand}_${item.product.name}_${color}`} selected={item.color === color} selectHandler={(color_) => addToCart(item.product, item.size, color_)} color={color}  />
							))}
						</div>
						<div style={{display:"flex", flex:"1 1 20%", gap: "16px"}}>
							<div style={{display:"flex", flexDirection:"column", justifyContent:"space-between",
							alignItems: "center"
						}}>
								<button className="plusMinusBtn" key={`${item.product.brand}_${item.product.name}_plus`} onClick={() => addToCart(item.product,  item.color, item.size, item.count + 1)}>+</button>
								<div key={`${item.product.brand}_${item.product.name}_count`}>{item.count}</div>
								<button key={`${item.product.brand}_${item.product.name}_minus`} className="plusMinusBtn" onClick={() => addToCart(item.product, item.color, item.size, item.count - 1)}>-</button>
							</div>
							<div>
								<img  src={item.product.images[0]} alt={`${item.product.brand} ${item.product.name}`}/>
							</div>
						</div>
					</div> 
				</>
			))}
			<div style={{display: "flex", flexDirection:"column",gap:"8px", marginTop:"16px", fontSize: "18px"}}>
				<div>Tax 21% : <b>{getFormattedPrice(total * .21, curr)}</b></div>
				<div>Quantity% : <b>{getBagCount(items)}</b></div>
				<div>Total : <b>{getFormattedPrice(total * .21 + total)}</b></div>
			</div>
			<button style={{padding:"12px", marginTop:"16px", width:"20%", backgroundColor:"#2ecc71", border:"3px solid #2ecc71", color:"#fff"}}
			onClick={() => addToCart(items[0].product, undefined, undefined, -42)}
			>ORDER</button>
		</div>: <div>Your cart is empty</div>}

	</>
  );
};

export default Cart;



