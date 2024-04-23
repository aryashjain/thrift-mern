import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {getProducts} from '../redux/actions/productActions';
import Product from './Product';
import Loading from '../components/Loading';

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
	console.log(randomIndex);
    // get random item
    const item = arr[randomIndex];
	console.log(item);
    return item;
}
const FeaturedProducts = () => {

	const products = useSelector((state)=> state.allProducts.products);
	
	const featuredProduct = [];
	const map1 = new Map();
	for(let i=0;i<products.length * 100 && featuredProduct.length<6;i++){
		const result = getRandomItem(products);
		if(map1.has(result))
		continue;
		if(featuredProduct.length<6){
			featuredProduct.push(result);
			map1.set(result, 1);
		}
		
	}
	const renderList = featuredProduct.map((product)=>{
		return(
			<Product detail={product} key={product._id}/>
			)
	})
	
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(getProducts(0,6,'','',''));
	},[])

	return(
			<>
				<section className="section featured">
			        <div className="title">
			          <span />
			          <h2>Featured Products</h2>
			          <span />
			        </div>
			        {
						(Object.keys(products).length === 0) ? 
						<Loading/> :
						<div className="section-center featured-center">
				          { renderList }
				        </div>
			        }
			        
			        <Link to="/products" className="btn"> all products </Link>
			    </section>
			</>
		)
}

export default FeaturedProducts;