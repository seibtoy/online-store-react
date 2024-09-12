import React from "react";
import '../cart.css';
import logo from '../Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./header";
import { removeItem, changeItemCount } from './store';

export const CartContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const items = useSelector((state) => state.cart.items);
    const itemsAmount = useSelector((state) => state.cart.totalAmount);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const values = useSelector((state) => state.cart.shipmentValues);
    const dispatch = useDispatch();

    const clickToRemove = (id) => {
        dispatch(removeItem(id));
    }
    const handleIncrement = (id) => {
        dispatch(changeItemCount({ itemId: id, newQuantity: items.find(item => item.id === id).quantity + 1 }));
    };

    const handleDecrement = (id) => {
        const item = items.find(item => item.id === id);
        if (item.quantity > 1) {
            dispatch(changeItemCount({ itemId: id, newQuantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(id));
        }
    };
    const goToContactInfo = () => {
        if (items.length > 0) {
            navigate('/contact');
        } else {
            alert('Zero items in cart!')
        }
    }
    const goToShipment = () => {
        const hasValues = Object.values(values).some(value => value !== undefined && value !== null && value !== "");
        if (hasValues) {
            navigate('/shipment');
        } else {
            alert('Fill the contact information!');
        }
    }

    return (
        <div>
            <Header
                logo={logo}
                items={items}
            />
            <div className="cart-container">
                <div className="navigation">
                    <span className={path === '/cart' ? "span-green" : "span-blue"}>Cart</span>
                    <span className="span-gray">&gt;</span>
                    <span className={path === '/contact' ? "span-green" : "span-blue"} onClick={goToContactInfo}>Contact information</span>
                    <span className="span-gray">&gt;</span>
                    <span className={path === '/shipment' ? "span-green" : "span-blue"} onClick={goToShipment}>Shipment information</span>
                </div>
                <div className="cart-main">
                    <h1>Cart</h1>
                    <div className="cart-content">
                        {
                            items.map((item) => (
                                <div className="cart-block">
                                    <div className="cart-img-container">
                                        <img src={item.images[0]} alt="" />
                                    </div>
                                    <div className="info-side">
                                        <div className="cart-description">
                                            <p>{item.description}</p>
                                            <button onClick={() => clickToRemove(item.id)}><FontAwesomeIcon icon={faTrashCan} />Delete</button>
                                        </div>
                                        <div className="nav-info">
                                            <div className="count">
                                                <button onClick={() => handleDecrement(item.id)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleIncrement(item.id)}>+</button>
                                            </div>
                                            <div className="price-block">
                                                <span>Price:</span>
                                                <span>{item.price.toFixed(2) + '$'} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                    <div className="total-container">
                        <div className="total-price">
                            <div>
                                <span>Together:</span>
                                <span>Sum:</span>
                            </div>
                            <div>
                                <span> {itemsAmount} products</span>
                                <span>{totalPrice + '$'}</span>
                            </div>
                        </div>
                        <div className="total-button-container">
                            <button onClick={goToContactInfo}>Next step</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CartContent;
