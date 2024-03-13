import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import './CartPage.css';
import Navbar from './Navbar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const iD = queryParams.get('iD'); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch email from local storage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          const email = userData.email;

          // Make an HTTP GET request to fetch cart items using the email ID
          const response = await axios.get(`http://127.0.0.1:8000/api/cart/details/${email}`);
          // Set the cart items state with the data received from the API
          setCartItems(response.data);
          
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
    console.log(cartItems)
  }, []);

  const handleOrderNow = (itemId) => {
    // Navigate to Order page and pass materialId as parameter
    window.location.href = `/order?iD=${itemId}`;
  };
  
  

  const removeFromCart = async (itemId) => {
    try {
      // Make an HTTP DELETE request to remove the item from the cart
      await axios.delete(`http://127.0.0.1:8000/api/cart/remove/${itemId}`);

      // Update the cart items state by filtering out the removed item
      setCartItems(cartItems.filter(item => item.itemId !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <div className="hom_nav">
        <Navbar />
      </div>
      <h2>Cart Page</h2>
      <div className="cards-row">
        {cartItems.map((cartItem, index) => (
          <div key={index} className="cards">
            <Card className='cards'>
              <Card.Img
                variant="top"
                src={cartItem.image}
                width={"100%"}
                height={"280px"}
              />
              <Card.Body style={{ backgroundColor: "white", width: "100%" }}>
                <Card.Title>{cartItem.clothName}</Card.Title>
                <Card.Text>{cartItem.description}</Card.Text>
                <p>Price: ${cartItem.price}</p>
                <p>Color: {cartItem.color}</p>
                <p>Size: {cartItem.size}</p>
                <button onClick={() => removeFromCart(cartItem._id)}>Remove from Cart</button><br/><br/>
                {/* Link to the checkout page with item details as URL parameters */}
                <button className='btt' onClick={() => handleOrderNow(cartItem.itemId)}>Order Now</button>


              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
