import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = ({ logo, items = [], onNavigateToCart}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const goToCart = () => {
        if (isHomePage) { 
            if (onNavigateToCart) {
                onNavigateToCart();
            } else {
                navigate('/cart');
            }
        }
    };

    const isCartEmpty = items.length === 0;
    return (
        <header>
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt=""/>
                </div>
                <button onClick={goToCart} disabled={!isHomePage}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {
                        isCartEmpty ? ""
                            : (
                                <div className="goods-in-cart"><span>{items.length}</span></div>
                            )
                    }
                    Cart</button>
            </div>
        </header>
    )
}

export default Header;