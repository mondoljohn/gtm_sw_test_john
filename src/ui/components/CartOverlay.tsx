import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ECurrency, IProduct } from "../../models";
import { ICartItem } from "../../models/carts";
import { getBagTotal, getFormattedPrice } from "../../utils";
import ColorButton from "./ColorButton";
import SizeButton from "./SizeButton";

export interface CartOverlayProps {
	items: ICartItem[];
	curr: ECurrency;
	toggleCart: () => void;
	addToCart: (item: IProduct, color?: string, size?: string, count?: number) => void;
}

const CartOverlay: FC<CartOverlayProps> = ({items, curr, toggleCart, addToCart}) => {

	return (
		<div className="cartOverlay">
			<div><b>My Bag.</b> {items.length} items </div>
	
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
									<img style={{maxWidth:"75px"}}  src={item.product.images[0]} alt={`${item.product.brand} ${item.product.name}`}/>
								</div>
							</div>
						</div> 
					</>
				))}
							{items && items.length > 0 && 
								<>
									<div style={{display:"flex", justifyContent:"space-between"}}>
										<div className="prod-label">Total:</div>
										<div className="prod-label">{getFormattedPrice(getBagTotal(items, curr), curr)}</div>
									</div>
									<div style={{display:"flex", gap:"12px", margin:"20px 00px"}}>
										<Link to={"cart"} onClick={toggleCart} key={"cart"} style={{flexBasis:"50%"}}>
											<button style={{width:"100%", padding:"12px", border:"3px solid #222", backgroundColor: "#fff"}}>VIEW BAG</button>
										</Link>
										<Link to={"cart"} onClick={toggleCart} key={"cart2"} style={{flexBasis:"50%"}}>
											<button style={{width:"100%", padding:"12px", backgroundColor:"#2ecc71", border:"3px solid #2ecc71", color:"#fff"}}>CHECK OUT</button>
										</Link>
									</div>
								</>
							}
			</div>: <div>Your cart is empty</div>}
	
		</div>
	  );
};

export default CartOverlay;


