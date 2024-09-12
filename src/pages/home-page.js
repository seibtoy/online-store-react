import React from "react";
import '../home.css';
import logo from '../Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './store';
import Header from "./header";
import data from './data.json';


const sliceArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}


const Main = () => {
    const slicedProducts = sliceArray(data.products, 5);
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    const addGoodToCart = (item) => {
        dispatch(addItem(item));
    };

    const isAdded = (item) => items.some(i => i.id === item.id);
    return (
        <div>
            <Header
                logo={logo}
                items={items}
            />
            <div className="container">
                {slicedProducts.map((slice, index) => (
                    <div className="goods-block" key={index}>
                        {slice.map(item => (
                            <div className="goods" id={item.id} key={item.id}>
                                <div className="img-container">
                                    <img src={item.images[0]} alt="img" />
                                </div>
                                <div className="description-container">
                                    <p className="description">{item.description}</p>
                                    <span>{item.price + '$'}</span>
                                </div>
                                <div className="button-cart-container">
                                    <button onClick={() => addGoodToCart(item)}>
                                        {isAdded(item) ?
                                            (
                                                <span>
                                                    <FontAwesomeIcon icon={faCheck} /> Added
                                                </span>

                                            ) : (
                                                <span>
                                                    <FontAwesomeIcon icon={faPlus} /> Add to Cart
                                                </span>)
                                        }
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>

    )

}

export default Main;
