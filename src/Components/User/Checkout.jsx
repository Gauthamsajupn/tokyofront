import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './check.css'; // Make sure to import your CSS file
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation hook from react-router-dom

const CheckoutPage = () => {
  const location = useLocation(); // Get location using useLocation hook
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Extract the cartItem from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const cartItemParam = searchParams.get('cartItem');
  const cartItem = JSON.parse(decodeURIComponent(cartItemParam));
  console.log(cartItem);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!cartItem) {
      navigate('/cart');
    }
  }, [cartItem]);

  // Function to handle payment
  const handlePayment = async () => {
    try {
      console.log('Attempting to place order...');

      
        const data = {
          email: cartItem.email,
          itemId: cartItem.itemId, // Use 'iD' as the itemId
          clothName: cartItem.clothName,
          description: cartItem.description,
          price: cartItem.price,
          color: cartItem.color,
          size: cartItem.size,
          image: cartItem.image,
        };

        console.log(data)
    
  
      
      const response = await axios.post('http://127.0.0.1:8000/api/order/add', {
        data // Assuming your backend expects the entire cartItem object
      });
      console.log('Order placed successfully:', response.data);
      // Redirect or show a success message to the user
    } catch (error) {
      console.error('Error placing order:', error.message);
      // Handle error: show an error message to the user or retry
    }
  };
  

  return (
    <div>
      <div className="hom_nav">
        <Navbar />
      </div>
      <div className="checkout-page m-5">
        {loading ? (
          <h1 className='text-center'>Loading...</h1>
        ) : error ? (
          <div className="text-center">Error: {error}</div>
        ) : (
          <div className="order-summary">
            <h2 className="text-center mb-4">Order Summary</h2>
            <div className="cart-items">
              {cartItem && (
                <div className="cart-item">
                  <img src={cartItem.image} alt={cartItem.clothName} />
                  <div className="item-details">
                    <h3 className="item-name">{cartItem.clothName}</h3>
                    <p className="item-description">{cartItem.description}</p>
                    <p className="item-price">Price: ${cartItem.price}</p>
                    <p className="item-color">Color: {cartItem.color}</p>
                    <p className="item-size">Size: {cartItem.size}</p>
                  </div>
                </div>
              )}
            </div>
            {cartItem && (
              <div className="total-price text-center mt-4">
                <p>Total Price: ${cartItem.price}</p>
              </div>
            )}
            <div className="checkout-button text-center mt-4">
              <button className='btn btn-primary' onClick={handlePayment}>Pay Now</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
