import React, { Fragment, useEffect, useState } from 'react';
import { CgMouse } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { clearErrors, getProduct } from '../../actions/productAction';
import { clearNewsletter, newsletter } from '../../actions/subscribeAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import ProductCard from './ProductCard';
import ProductGridItem from './ProductGridItem';

import './Home.css';

const Home = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const { loading, error, products } = useSelector(state => state.products);
    const { success: subscribeSuccess, error: subscribeError } = useSelector(state => state.subscribe);

    const submitSubscribeHandler = e => {
        e.preventDefault();
        dispatch(newsletter(email));
        setEmail('');
    };

    useEffect(() => {
        if (subscribeSuccess) {
            toast.success("You've successfully subscribed to our newsletter");
            dispatch(clearNewsletter());
        }

        if (subscribeError) {
            toast.error("You've already subscribed to our newsletter");
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct());
    }, [dispatch, error, subscribeSuccess, subscribeError]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title='ECOMMERCE' />

                    <div className='banner'>
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href='#container'>
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    {/* <h2 className='homeHeading'>Featured Products</h2>

                    <div className='container' id='container'>
                        {products &&
                            products.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div> */}

                    {/* New Drop Section */}
                    <h2 className='homeHeading'>New Drop</h2>
                    <div className='new-drop-container'>
                        {/* Render the last 3 products from the database */}
                        {products &&
                            products
                                .slice(-3)
                                .map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                    </div>

                    {/* Shop All Section */}
                    <h2 className='homeHeading'>Shop All</h2>
                    <div className='shop-all-container'>
                        {console.log(products.images)}
                        {/* Render a 3x2 grid with 6 product images */}
                        {products &&
                            products.map(product => (
                                <ProductGridItem
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>

                    {/* Newsletter Section */}
                    <h2 className='homeHeading'>Subscribe to Our Newsletter</h2>
                    <form
                        className='newsletter-container'
                        onSubmit={submitSubscribeHandler}
                    >
                        <input
                            type='email'
                            placeholder='Enter your email address'
                            className='newsletter-input'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button className='subscribe-button' type='submit'>
                            Subscribe
                        </button>
                    </form>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
