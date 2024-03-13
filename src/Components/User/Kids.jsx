import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Kids.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import { Buffer } from 'buffer';
import Card from 'react-bootstrap/Card';

const Kids = () => {
    const navigate = useNavigate();
    const [kidsProducts, setKidsProducts] = useState([]);

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

    useEffect(() => {
        const fetchKidsProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/getByCategory?category=kids');
                console.log("res:", response.data);
                setKidsProducts(response.data);
            } catch (error) {
                console.error('Error fetching kids products:', error);
            }
        };

        fetchKidsProducts();
    }, []);

    return (
        <div>
            <div className="kid_nav">
                <Navbar />
            </div>
            <div className="kid_ad1">
                {/* Ad space or additional content for kids */}
            </div>
            <div className="kid_headcover">
                <div className="kid_head">
                    Kids Wear
                </div>
            </div>

            <div className="kids_products">
                <Swiper
                   slidesPerView={Math.min(3, kidsProducts.length)}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}>
                    {kidsProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <Card className='cards' onClick={() => handleClick(product.iD)}>
                                <Card.Img
                                    variant="top"
                                    src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`}
                                    width={"100%"}
                                    height={"280px"}
                                />
                                <Card.Body style={{ backgroundColor: "white", width: "100%" }}>
                                    <Card.Title>{product.clothName}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Kids;
