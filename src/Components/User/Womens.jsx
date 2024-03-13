import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './womens.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axios from 'axios';
import { Buffer } from 'buffer';
import Card from 'react-bootstrap/Card';

const Womens = () => {
    const navigate = useNavigate();
    const [womensProducts, setWomensProducts] = useState([]);

    const handleClick = (iD) => {
        axios.get(`http://127.0.0.1:8000/getItemById?iD=${iD}`)
            .then((res) => {
                console.log('Product Clicked:', res.data);
                // Navigate to the ShowProduct page with data
                navigate(`/showProduct?iD=${iD}`);
            })
            .catch((error) => {
                console.log('Error fetching data for product:', error);
            });
    };

    useEffect(() => {
        const fetchWomensProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/getByCategory?category=Womens');
                console.log("Response:", response.data);
                setWomensProducts(response.data);
            } catch (error) {
                console.error('Error fetching womens products:', error);
            }
        };

        fetchWomensProducts();
    }, []);

    return (
        <div>
            <div className="kid_nav">
                <Navbar />
            </div>
            <div className="womens_adds">
                {/* Ad space or additional content for womens */}
            </div>
            <div className="kid_headcover">
                <div className="kid_head">
                    Womens Wear
                </div>
            </div>

            <div className="womens_products">
                <Swiper
          slidesPerView={Math.min(3, womensProducts.length)}
          spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}>
                    {womensProducts.map((product) => (
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

export default Womens;
