import React, { useState } from 'react';
import './ProductForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    iD: '',
    clothName: '',
    material: '',
    color: '',
    size: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Check all fileds are filled:::::
    for (const key in formData) {
      if (key !== 'image' && key !== 'status' && !formData[key]) {
        toast.error('All fields are required');
        return;
      }
    }
    if (!file) {
      toast.error('Image is required');
      return;
    }

    try {
      const apiUrl = 'http://127.0.0.1:8000/addItem';
      const formDataToSend = new FormData();
      formDataToSend.append('iD', formData.iD);
      formDataToSend.append('clothName', formData.clothName);
      formDataToSend.append('material', formData.material);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('image', file);

      const response = await axios.post(apiUrl, formDataToSend);
      console.log(response.data);
      toast.success('Details added successfully');
    }
    catch (error) {
      toast.error('Error in package data submission');
    }

  };


  return (
    <div>
      <div className="PlaceAdding_form">
        <ToastContainer />
        <div className="navplaceadding">
          <AdminNavbar />
        </div>
        <div className="sidebrUser">
          <Sidebar />
          <div className="user_main">

            <div className="heading">
              Place Adding Form
            </div>
            <div className="formborder_div">
              <div className="text_field">


                <div className="inputbox">
                  <input type="text"
                    name="iD"
                    value={formData.iD}
                    onChange={handleChange}
                    required="required" />
                  <span>iD</span>
                </div>


                <div className="inputbox">
                  <input type="text"
                    name="clothName"
                    value={formData.clothName}
                    onChange={handleChange}
                    required="required" />
                  <span>Cloth Name</span>
                </div>

                <div className="inputbox">
                  <input type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    required="required" />
                  <span>Material</span>
                </div>

                <div className="inputbox">
                  <input type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required="required" />
                  <span>Color</span>
                </div>

                <div className="inputbox">
                  <input type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required="required" />
                  <span>Size</span>
                </div>

                <div className="inputbox">
                  <input type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required="required" />
                  <span>Price</span>
                </div>

                <div className="inputbox">
                  <input type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required="required" />
                  <span>Description</span>
                </div>

                <div className="inputbox">
                  <input type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required="required" />
                  <span>Category</span>
                </div>

                <div className="inputbox">

                  <input type="file"
                    name="image"
                    onChange={onFileChange}
                    required="required"
                  />
                </div>
              </div>

              <div className="bttn_div">
                <button className='link_buttonn' onClick={handleSubmit}>Add Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm
