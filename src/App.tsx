import './App.css';
import NavBar from './ui/components/NavBar';
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import Catalog from './ui/screens/Catalog';
import Product from './ui/screens/Product';
import Cart from './ui/screens/Cart';
import { useEffect, useState } from 'react';
import { ECurrency, IProduct } from './models';
import { ICartItem } from './models/carts';
import ReactGa from 'react-ga';
import { getCurrencyConverted, gtmPushEvent } from './utils';

  
function App() {
	useEffect(() => {
		ReactGa.initialize('G-YHS9YF4XGV')

		// ReactGa.pageview('/')
	}, [])
	
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	const [showCart, setShowCart] = useState<boolean>(false);
	const [currency, setCurrency] = useState<ECurrency>(ECurrency.USD);

	const toggleCart = () => setShowCart(showCart ? false : true);

	const addToCart = (item: IProduct, color?: string, size?: string, count?: number) => {
		if(count === -42) {
			const data = {
				currencyCode: currency,
				checkout: {
					actionField: {
						step: 1,
						option: 'Cart Page',
						products: cartItems.map((item) => (
							{
								id: item.product.id,
								name: item.product.name,       // Name or ID is required.
								price: getCurrencyConverted(item.product.priceInUSD, currency),
								brand: item.product.brand,
								variant: '',
								category: '',
								quantity: item.count,
								dimension1: `${item.product.id}-${size||item.product.sizes[0]}`,
								dimension2: `${item.product.name} ${size||item.product.sizes[0]}`,
							}
						))
					}
					}
				}
			gtmPushEvent('checkout', data);
			setCartItems([])
			alert("Order placed, Thank you for shopping with us...");
		} else {
			const currentItems = cartItems;
			const exists = currentItems.findIndex(x => x.product.id === item.id);
			if(exists !==  -1) {
				if(count !== 0) {
					currentItems[exists].count =  count || currentItems[exists].count + 1 ;
					currentItems[exists].size = size || currentItems[exists].size ;
					currentItems[exists].color = color || currentItems[exists].color ;
					setCartItems([...currentItems])
					alert("Product updated");
	
				} else {
					const itemRemoved = currentItems.find(x => x.product.id === item.id);
					if (itemRemoved) {
						const item_ = itemRemoved.product;
						const data = {
						currencyCode: currency,
						remove: {
								products: [{
									id: item_.id,
									name: item_.name,       // Name or ID is required.
									price: getCurrencyConverted(item_.priceInUSD, currency),
									brand: item_.brand,
									variant: '',
									category: '',
									quantity: 1,
									dimension1: `${item_.id}-${size||item_.sizes[0]}`,
									dimension2: `${item_.name} ${size||item_.sizes[0]}`,
								}]
						}
					}
					gtmPushEvent('removeFromCart',data);
				}
					const updatedItems = currentItems.filter(x => x.product.id !== item.id);
					setCartItems([...updatedItems])
					alert("Product removed");
	
				}
			} else {
				setCartItems([...cartItems, {product: item, color: color || item.colors[0], size: size || item.sizes[0], count: count || 1}])
				alert("Product added");
				const data = {
					currencyCode: currency,
					add: {
							products: [{
								id: item.id,
								name: item.name,       // Name or ID is required.
								price: getCurrencyConverted(item.priceInUSD, currency),
								brand: item.brand,
								variant: '',
								category: '',
								quantity: count || 1,
								dimension1: `${item.id}-${size||item.sizes[0]}`,
								dimension2: `${item.name} ${size||item.sizes[0]}`,
							}]
					}
				}
				gtmPushEvent('addToCart',data);

			}
		}

	}

	useEffect(() => {
		const body = document.querySelector('body');
		if(body) {
			body.style.overflow = showCart ? "hidden" : "initial";
		}
	}, [showCart]) 

  return (
    <div className="App" style={{overflowX: showCart ? "hidden" : "initial"}}>
		<Router>
			<NavBar setCurr={setCurrency} cartItems={cartItems} showCart={showCart} toggleCart={toggleCart} addToCart={(item: IProduct, color?: string, size?: string, count?: number) => addToCart(item, color, size, count)} curr={currency}  />
			<div onClick={() => toggleCart()} className={showCart ? "overlay" : ""}></div>
			<div style={{maxWidth:"1200px", margin:"0 auto"}} >
				<Routes>
					<Route path="/" element={<Catalog curr={currency} addToCart={(item: IProduct) => addToCart(item)} />} />
					<Route path="catalog/:cid" element={<Catalog curr={currency} addToCart={(item: IProduct) => addToCart(item)} />} />
					<Route path="product/:pid" element={<Product curr={currency} addToCart={(item: IProduct, color?: string, size?: string) => addToCart(item, color, size)} />} />
					<Route path="cart" element={<Cart curr={currency} items={cartItems} addToCart={(item: IProduct, color?: string, size?: string, count?: number) => addToCart(item, color, size, count)}  /> }> 	
					</Route>
				</Routes>
				</div>
		</Router>
    </div>
  );
}

export default App;
