import React from "react";
import '../confirmation.css';
import logo from '../Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import confirmImage from '../Confirm.png';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from './store';
import Header from "./header";


const MainConf = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const formContactValue = useSelector((state) => state.cart.contactValues);
    const formShipmentValue = useSelector((state) => state.cart.shipmentValues);

    const toMain = () => {
        dispatch(clearCart());
        navigate('/home-page')
    }
    return (
        <div>
            <Header
                logo={logo}
            />
            <div className="container-confirm">
                <div className="header-confirm">
                    <div className="confirm-img-container">
                        <img src={confirmImage} alt="" />
                    </div>
                    <h1>Thank you for your order!</h1>
                    <span>The order confirmation email with details of your order and a link to track its progress has been sent to your email address.</span>
                    <span className="bold">Your order # is 000000003 - PENDING</span>
                    <span>Order Date: 6 Nov 2023</span>
                </div>
                <div className="container-info-main">
                    <div className="container-info">
                        <div className="contact-info">
                            <h3><FontAwesomeIcon icon={faUser} className="icon-color" />Contact information</h3>

                            <p>{formContactValue.firstName} {formContactValue.lastName}</p>
                            <p>{formContactValue.email}</p>
                            <p>{formContactValue.phone}</p>
                        </div>
                        <div className="shipment-info">
                            <h3><FontAwesomeIcon icon={faTruck} className="icon-color" />Shipment information</h3>

                            <p>{formShipmentValue.adress}</p>
                            <p>{formShipmentValue.city}, {formShipmentValue.state}, {formShipmentValue.zip}</p>
                            <p>{formShipmentValue.country}</p>
                        </div>
                    </div>
                    <div className="order-summary">
                        <h3><FontAwesomeIcon icon={faCircleInfo} className="icon-color" /> Order summary</h3>
                        <div className="order">
                            {items.map((item) => (
                                <div className="order-block">
                                    <div className="order-img-container">
                                        <img src={item.images[0]} alt="" />
                                    </div>
                                    <div className="order-info">
                                        <p>{item.description}</p>
                                        <span>{item.price + "$"}, {item.quantity} product</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <div className="total-type">
                                <span>Subtotal:</span>
                                <span>Shipping and Handling:</span>
                                <span>Tax:</span>
                                <span className="grand-total">Grand total:</span>
                            </div>
                            <div className="total-sum">
                                <span>$0</span>
                                <span>$0</span>
                                <span>$0</span>
                                <span className="grand-total">{'$' + totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    <div className="cont-button">
                        <button onClick={toMain}>Continue shopping</button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default MainConf;