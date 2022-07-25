import { FC } from "react";
import { allProducts } from "../../data/products";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { productCategories } from "../../data/catergories";
import { ECurrency, IProduct } from "../../models";
import { getCurrencyConverted, getFormattedPrice, gtmPushEvent } from "../../utils";
import ReactGa from 'react-ga';


export interface CatalogProps {
	addToCart: (item: IProduct) => void;
	curr: ECurrency;
}

const Catalog: FC<CatalogProps> = ({addToCart,curr}) => {
	let params = useParams();
	const category = productCategories.find(x => x.path === `catalog/${params.cid}`)
	const products = allProducts.filter(x => x.categoryId === category?.id || 0);


const captureProductClick = (prod: IProduct, index: number) => {
	const data = {
		click: {
			actionField: {
				list: "",
				products: [{
					id: prod.id,
					name: prod.name,       // Name or ID is required.
					price: getCurrencyConverted(prod.priceInUSD, curr),
					brand: prod.brand,
					variant: '',
					category: '',
					position: index,
					dimension1: '',
					dimension2: '',
				}]
			}
		}
	}
	gtmPushEvent('productClick', data)
}
  return (
	<>
		<div className="categoryTitle"> {category?.displayText || "WOMEN"} </div>

		<div className="catalog">
			{products && products.map((prod, index) => (
				<div className="prod" key={prod.id}>
					<img src={prod.images[0]} alt={`${prod.brand} ${prod.name}`}/>
					<button className="addToCartButton">
						<MdOutlineShoppingCart onClick={() => addToCart(prod)} size={"24px"} />
					</button>
					<Link onClick={() => captureProductClick(prod, index + 1)} to={`/product/${prod.id}`}>
						<div className="prodTitle">
							{prod.brand} {prod.name}
						</div>
						<div className="prodPrice">
							{getFormattedPrice(prod.priceInUSD, curr)}
						</div>
					</Link>
				</div>
			))}
		</div>
	</>
  );
};

export default Catalog;


