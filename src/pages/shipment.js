import React, { useRef } from "react";
import '../shipment.css';
import logo from '../Logo.png'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from "./header";
import { setFormShipmentValue } from "./store";


const MainShipment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;
    const items = useSelector(state => state.cart.items);


    const confirmation = () => {
        navigate('/confirmation');
    }
    const goToCart = () => {
        navigate('/cart');
    }
    const goToContact = () => {
        navigate('/cart');
    }
    const validationSchema = Yup.object({
        adress: Yup.string().required('This field is required!')
            .matches(
                /^[a-zA-Z0-9\s,'-]*$/,
                'Incorrect adress'
            ),
        suite: Yup.string().required('This field is required!')
            .matches(
                /^[a-zA-Z0-9\s-]*$/,
                'Incorrect suite'
            ),
        city: Yup.string().required('This field is required!')
            .matches(
                /^[a-zA-Z\s'-]*$/,
                'Incorrect city'
            ),
        zip: Yup.string().required('This field is required!')
            .matches(
                /^\d{5}(-\d{4})?$/,
                'Invalid zip code'
            ),
        country: Yup.string().required('This field is required!').notOneOf([""], 'You must select an option'),
        state: Yup.string().required('This field is required!').notOneOf([""], 'You must select an option'),
    })

    const formikRef = useRef(null);
    const handleContinue = async () => {
        if (formikRef.current) {
            const errors = await formikRef.current.validateForm();
            formikRef.current.setTouched({
                adress: true,
                suite: true,
                city: true,
                country: true,
                state: true,
                zip: true,
            });
            if (Object.keys(errors).length === 0) {
                formikRef.current.submitForm();
                confirmation();
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
                    <span className={path === '/contact' ? "span-green" : "span-blue"} onClick={goToContact}>Contact information</span>
                    <span className="span-gray">&gt;</span>
                    <span className={path === '/shipment' ? "span-green" : "span-blue"}>Shipment information</span>
                </div>
                <div className="cart-main">
                    <h1>Shipment information</h1>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{ adress: '', suite: '', city: '', country: '', state: '', zip: '' }}
                        validationSchema={validationSchema}
                        onSubmit={values => {
                            dispatch(setFormShipmentValue(values));
                        }}
                    >
                        {({ errors, touched }) => (
                            <form className="contact-information-shipment">
                                <div className="input-containers-shipment">
                                    <div className="input-container-shipment">
                                        <label>Address (No P.O.Boxes)*</label>
                                        <Field name="adress" type="text" placeholder="Enter your first name"
                                            className={touched.adress && errors.adress ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="adress" component='div' className="error-message"></ErrorMessage>
                                    </div>
                                    <div className="input-container-shipment">
                                        <label>Apartment, suite etc. (optional)*</label>
                                        <Field name="suite" type="text" placeholder="Enter your last name"
                                            className={touched.suite && errors.suite ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="suite" component='div' className="error-message"></ErrorMessage>
                                    </div>
                                    <div className="input-container-shipment">
                                        <label>City*</label>
                                        <Field name="city" type="text" placeholder="Enter your last name"
                                            className={touched.city && errors.city ? 'red-border' : ''}
                                        ></Field>
                                        <ErrorMessage name="city" component='div' className="error-message"></ErrorMessage>
                                    </div>
                                </div>
                                <div className="input-containers-shipment-select">
                                    <div className="input-container-shipment-select">
                                        <label htmlFor="country">Country/Region*</label>
                                        <Field as="select" name="country"
                                            className={touched.country && errors.country ? 'red-border' : ''}
                                        >
                                            <option value="" label="Select country" />
                                            <option value="UKR" label="Ukraine" />
                                            <option value="GB" label="Great Britain" />
                                            <option value="USA" label="United States" />
                                        </Field>
                                        <ErrorMessage name="country" component='div' className="error-message"></ErrorMessage>
                                    </div>
                                    <div className="input-container-shipment-select">
                                        <label>State*</label>
                                        <Field as="select" name="state"
                                            className={touched.state && errors.state ? 'red-border' : ''}
                                        >
                                            <option value="" label="Select state" />
                                            <option value="UKR" label="State1" />
                                            <option value="GB" label="State2" />
                                            <option value="USA" label="State3" />
                                        </Field>
                                        <ErrorMessage name="state" component='div' className="error-message"></ErrorMessage>
                                    </div>
                                    <div className="input-container-shipment">
                                        <label>ZIP code*</label>
                                        <Field name="zip" type="text" placeholder="Enter your ZIP code"
                                            className={touched.zip && errors.zip ? 'red-border last-input' : 'last-input'}></Field>
                                        <ErrorMessage name="zip" component='div' className="error-message"></ErrorMessage>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className="total-button-container">
                        <button onClick={handleContinue}>Submit order</button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default MainShipment;