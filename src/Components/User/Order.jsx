import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Navbar from './Navbar';
import axios from 'axios'; // Import Axios for making API requests
import './Order.css';
import { Buffer } from 'buffer';

const Order = () => {
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [itemDetails, setItemDetails] = useState(null);

    const location = useLocation(); // Get location object
    const queryParams = new URLSearchParams(location.search); // Get query parameters
    const iD = queryParams.get('iD'); // Get the value of 'iD' parameter

    useEffect(() => {
        if (iD) {
            // Call handleGetItemById when component mounts
            handleGetItemById(iD);
        }
    }, [iD]); // Run effect when 'iD' changes

    const handleBuyNow = async () => {
        try {
            // Make the API request to add order
            const response = await axios.post('http://127.0.0.1:8000/addOrder', {
                customerName,
                iD:iD,
                address,
                pincode,
                phoneno
            });
            console.log('Order added:', response.data);
            setCustomerName('');
            setAddress('');
            setPincode('');
            setPhoneno('');
            // Reset form fields after successful order
        } catch (error) {
            console.error('Failed to add order:', error);
            // Handle error if necessary
        }
    };

    const handleGetItemById = async (iD) => {
        try {
            // Make the API request to get item details by ID
            const response = await axios.get(`http://127.0.0.1:8000/getItemById?iD=${iD}`);
            console.log('Item details:', response.data);
            setItemDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch item details:', error);
            // Handle error if necessary
        }
    };

    return (
        <div>
            <div className="ordr_nav">
                <Navbar />
            </div>
            <div className="order_cover">
                <div className="order_cover_1">
                    <div className="show_details">
                        <div className="item_img">
                            {/* Render item image if available */}
                            {itemDetails && 
                            <img width={"100%"} height={"100%"}
                            src={`data:image/jpeg;base64,${Buffer.from(itemDetails.image.data).toString('base64')}`}
                             alt="Item" />}
                        </div>
                        <div className="item_details">
                            {/* Render item details */}
                            {itemDetails && (
                                <>
                                    <div className="od_clothname">{itemDetails.clothName}</div>
                                    <div className="od_price">Price: ${itemDetails.price}</div>
                                    <div className="od_description">{itemDetails.description}</div>
                                    <div className="od_size">Size:{itemDetails.size}</div>
                                    <div className="od_color">color:{itemDetails.color}</div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="Add_details">
                        <div className="order_head"></div>
                        {/* Customer details form */}
                        <span style={{ marginTop: '20px', fontSize: '20px' }}>CustomerName:</span>
                        <input
                            type="text"
                            className="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />

                        <span style={{ marginTop: '10px', fontSize: '20px' }}>Address:</span>
                        <textarea
                            style={{ border: '3px solid black' }}
                            className="area"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <span style={{ marginTop: '10px', fontSize: '20px' }}>PinCode:</span>
                        <input
                            type="text"
                            className="text"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />

                        <span style={{ fontSize: '20px' }}>Phone No:</span>
                        <input
                            type="text"
                            className="text"
                            value={phoneno}
                            onChange={(e) => setPhoneno(e.target.value)}
                        />

                        <button className="btt" style={{ marginTop: '40px' }} onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
