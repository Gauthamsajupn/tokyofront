import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import './ShowKids.css';
import axios from 'axios';
import lzString from 'lz-string'; // Assuming you need compression
import { Buffer } from 'buffer';

const ShowKids = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const iD = queryParams.get('iD');
  const [item, setItem] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setEmail(userData.email);
    }
  }, []);

  const handleAddToCart = async () => {
    try {
      if (!item) {
        console.error('Error adding item to cart: Item is null');
        return;
      }
      
      // Store the image data URI in a variable
      const imageDataUri = `data:image/jpeg;base64,${Buffer.from(item.image.data).toString('base64')}`;
  
      // Include email, item details, and image data URI in the data object
      const data = {
        email: email,
        itemId: item.iD, // Use 'iD' as the itemId
        clothName: item.clothName,
        description: item.description,
        price: item.price,
        color: item.color,
        size: item.size,
        image: imageDataUri,
      };
  
      // Send API request to add item to cart
      const response = await axios.post('http://127.0.0.1:8000/api/cart/add', data);
  
      console.log('Item added to cart successfully:', response.data); // Log response data here
      setAddedToCart(true);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  useEffect(() => {
    console.log(addedToCart);
  }, [addedToCart]);
  
  useEffect(() => {
    const fetchItemById = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/getItemById?iD=${iD}`);
        const responseData = response.data;
    
        // Extract image data from responseData and store it separately
        const imageData = responseData.image.data;
    
        // Convert the image data to a data URI
        const imageDataUri = `data:image/jpeg;base64,${Buffer.from(imageData).toString('base64')}`;
        console.log(responseData)
    
        // Set item state including image data URI
        setItem({
          ...responseData,
          imageDataUri: imageDataUri
        });
      } catch (error) {
        console.error('Error fetching item by ID:', error);
      }
    };
    

    fetchItemById();
  }, [iD]);


  const handleOrderNow = () => {
    // Navigate to Order page and pass iD as parameter
    window.location.href = `/order?iD=${iD}`;
    console.log("iD:",iD);
  };

  return (
    <div>
      <div className="sk_nav">
        <Navbar />
      </div>
      <div className="sk_cover_bdy">
        <div className="sk_bdy">
          {item && (
            <>
              <div
                className="sk_img"
                style={{
                  backgroundImage: `url(${item.imageDataUri})`, // Use item.imageDataUri here
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100%',
                  height: '100%',
                }}
              ></div>
              <div className="sk_details">
                <div className="sk_details1">
                  <div className="productdetails">Product Details</div>
                  <div className="clothName">{item.clothName}</div>
                  <div className="description_sk">{item.description}</div>
                  <div className="price">$ {item.price}</div>
                  <div className="color">Color: {item.color}</div>
                  <div className="size">Size: {item.size}</div>
                  <div className="addtocart">
                  <button className='btt' onClick={handleOrderNow}>Order Now</button>
                    <button className="btt" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                    {addedToCart && <p>Added to cart successfully!</p>}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowKids;
