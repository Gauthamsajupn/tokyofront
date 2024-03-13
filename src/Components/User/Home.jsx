import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Home.css';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/viewItem');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        
        fetchItems();
    }, []);

    
    const storedUserData = localStorage.getItem('userData');
                console.log('Stored User Data:', storedUserData);
    
    const handleClick = (iD) => {
        axios.get(`http://127.0.0.1:8000/getItemById?iD=${iD}`)
          .then((res) => {
            console.log('PlaceName Clicked:', res.data);
            // Navigate to the ShowDestination page with data
            navigate(`/showKids?iD=${iD}`);
          })
          .catch((error) => {
            console.log('Error fetching data for placeName:', error);
          });
      };

    return (
        <div>
            <div className="hom_nav">
                <Navbar />
            </div>
            <div className="add1"></div>
            <div className="hom_product_details">
                <div className="hom_product">
                    {items.map(item => (
                        <Card key={item._id} className='cards'>
                            <Card.Img  onClick={()=>handleClick(item.iD)}
                                src={`data:image/jpeg;base64,${Buffer.from(item.image.data).toString('base64')}`} 
                                width={"100%"} 
                                height={"350px"} 
                                />                            <Card.Body>
                                <Card.Title>{item.clothName}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
