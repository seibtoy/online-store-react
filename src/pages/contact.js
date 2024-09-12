
import React, { useRef } from "react";
import '../contact.css';
import logo from '../Logo.png'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from "./header";
import { setFormContactValues } from "./store";


const MainContact = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;
    const items = useSelector(state => state.cart.items);


    const goToShipment = () => {
        navigate('/shipment');
    }
    const goToCart = () => {
        navigate('/cart');
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('This field is required!')
            .matches(
                /^[A-Za-zА-Яа-яЁё]+$/,
                'Incorrect symbols'
            ),
        lastName: Yup.string().required('This field is required!')
            .matches(
                /^[A-Za-zА-Яа-яЁё]+$/,
                'Incorrect symbols'
            ),
        email: Yup.string().email('Invalid email adress').required('This field is required!'),
        phone: Yup.string().required('This field is required!')
            .matches(
                /^\+?[1-9]\d{1,14}$/,
                'Invalid phone number'
            )
    })

    const formikRef = useRef(null);

    const handleContinue = async () => {
        if (formikRef.current) {
            const errors = await formikRef.current.validateForm();
            formikRef.current.setTouched({
                firstName: true,
                lastName: true,
                email: true,
                phone: true
            });
            if (Object.keys(errors).length === 0) {
                formikRef.current.submitForm();
                goToShipment();
            }
        }

    };

    return (
        <div>
            <Header
                logo={logo}
                items={items}
            />
            <div className="cart-container">
                <div className="navigation">
                    <span className={path === '/cart' ? "span-green" : "span-blue"} onClick={goToCart}>Cart</span>
                    <span className="span-gray">&gt;</span>
                    <span className={path === '/contact' ? "span-green" : "span-blue"}>Contact information</span>
                    <span className="span-gray">&gt;</span>
                    <span className={path === '/shipment' ? "span-green" : "span-blue"} onClick={handleContinue}>Shipment information</span>
                </div>
                <div className="cart-main">
                    <h1>Contact information</h1>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{ firstName: '', lastName: '', email: '', phone: '' }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            dispatch(setFormContactValues(values));
                        }}
                    >
                        {({ errors, touched }) => (
                            <form className="contact-information">
                                <div className="input-containers">
                                    <div className="input-container">
                                        <label htmlFor="firstName">First name*</label>
                                        <Field
                                            name="firstName"
                                            type="text"
                                            placeholder="Enter your first name"
                                            className={touched.firstName && errors.firstName ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="firstName" component='div' className="error-message" />
                                    </div>
                                    <div className="input-container" >
                                        <label htmlFor="lastName">Last name*</label>
                                        <Field name="lastName" type="text" placeholder="Enter your last name"
                                            className={touched.lastName && errors.lastName ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="lastName" component='div' className="error-message" />
                                    </div>
                                </div>
                                <div className="input-containers">
                                    <div className="input-container">
                                        <label htmlFor="email">Email*</label>
                                        <Field name="email" type="email" placeholder="Enter your email"
                                            className={touched.email && errors.email ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="email" component='div' className="error-message" />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="phone">Phone*</label>
                                        <Field name="phone" type="tel" placeholder="Enter your phone"
                                            className={touched.phone && errors.phone ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="phone" component='div' className="error-message" />
                                    </div>

                                </div>
                            </form>
                        )}

                    </Formik>
                    <div className="total-button-container">
                        <button onClick={handleContinue}>Next step</button>
                    </div>

                </div>
            </div>
        </div>

    )
}



export default MainContact;
