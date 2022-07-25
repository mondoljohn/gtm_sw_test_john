import { FC } from "react";
import Logo from "../../assets/logo.png"
import { productCategories } from "../../data/catergories";
import { Link, useParams } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { ICartItem } from "../../models/carts";
import CartOverlay from "./CartOverlay";
import { ECurrency, IProduct } from "../../models";

export interface NavBarProps {
	cartItems: ICartItem[];
	showCart: boolean;
	curr: ECurrency;
	setCurr: (curr: ECurrency) => void;
	toggleCart: () => void;
	addToCart: (item: IProduct, color?: string, size?: string, count?: number) => void;
}

const NavBar: FC<NavBarProps> = ({cartItems, showCart, curr,setCurr, toggleCart, addToCart}) => {


  return (
	<div className="navBar">
		<div style={{display:"flex", gap:"8px"}}>
			{productCategories.map((category) => (
				<Link to={category.path} key={category.id}>
					<div style={{padding:"4px 16px 32px 16px", fontSize:"16px"}}>{category.displayText}</div>
				</Link>
			))}
		</div>
		<img src={Logo} height="41px" width="41px" alt="AMAJOHN" />
		<div style={{display:"flex"}}>
			{/* <Link to={"cart"} key={"cart"}> */}
				<div>
					<select style={{border:"none"}} onChange={(e: any) => setCurr(e.target.value)}>
						<option style={{padding:"16px"}} value={ECurrency.USD} selected>$ USD</option>
						<option value={ECurrency.EUR}>€ EUR</option>
						<option value={ECurrency.JPY}>¥ JPY</option>
					</select>
				</div>
				<div style={{padding:"4px 16px 32px 16px", fontSize:"16px", position:"relative"}}>
					{cartItems && cartItems.length > 0 && <span style={{backgroundColor:"#222", color: "#fff", padding:"4px", position:"absolute", top:-5, right:9, borderRadius:"50%"}}>{cartItems.length}</span>}
					<MdOutlineShoppingCart onClick={() => toggleCart()} size={"24px"} />
				</div>
				
				{showCart && <CartOverlay curr={curr} items={cartItems} toggleCart={toggleCart} addToCart={addToCart}  />}
			{/* </Link> */}
		</div>
	</div>
  );
};

export default NavBar;


