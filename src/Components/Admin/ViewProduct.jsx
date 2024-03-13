import { TextField } from '@mui/material';
import axios from 'axios';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import './ViewProduct.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ViewProduct = () => {
    const [places, setPlaces] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [formData, setFormData] = useState({
        clothName: '',
        material: '',
        color: '',
        description: '',
        price: '',
        category: '',
        size: '',
      image: ''
    });
  
    const [file, setFile] = useState(null);
  
    useEffect(() => {
      fetchPlaces();
    }, []);
  
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/viewItem');
        console.log("Data received from server:", response.data);
        const parsedData = response.data.map(place => ({
          ...place,
          status: place.status !== undefined && place.status !== null ? Boolean(place.status) : place.status
        }));
        console.log("Parsed data:", parsedData);
        setPlaces(parsedData);
      } catch (error) {
        console.error('Error fetching Place details:', error);
      }
    };
  
    const handleClose = () => setShow(false);
    const handleShow = (place) => {
      setSelectedPlace(place); // Set the selected place for editing
      setFormData(place); // Populate form data with the selected place details
      setShow(true); // Open the modal
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
    };
  
  
    const onFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSaveChanges = async () => {
       try{
        const apiURL=`http://127.0.0.1:8000/editProduct/${selectedPlace.iD}`;
        const formDatatoSend =new FormData();
        for(const key in formData){
          formDatatoSend.append(key, formData[key]);
        }
        formDatatoSend.append('image',file);
        const response = await axios.put(apiURL, formDatatoSend);
        console.log(response.data);
        toast.success('Details updated successfully');
        handleClose();
        fetchPlaces();
       }catch(err) {
        console.error('Error editing package:', err);
        toast.error('Failed to update package details');
      }
    };
  
  
  
    const buttonStatus = (id, currentStatus) => {
      const setStatus = !currentStatus;
      axios.put('http://127.0.0.1:8000/status', { _id: id, status: setStatus })
        .then((response) => {
          console.log("Status updated successfully");
          console.log("Updated status:", response.data.status); // Log the updated status
          // Update the status of the place in the state
          setPlaces(prevPlaces => prevPlaces.map(place => {
            if (place._id === id) {
              return { ...place, status: response.data.status };
            }
            return place;
          }));
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    };

  return (
    <div>
       <div className="main_body_placeDetails">
      <ToastContainer/>
      <div className="navPlaceDetails">
        <AdminNavbar />
      </div>
      <div className="sidebrUser">
        <Sidebar />
        <div className="user_main">
          <div className="table">
            <div className="heading">
              Product Details
            </div>
            <div className="table_content">
              <table className='table_border'>
                <thead className='bs'>
                  <tr>
                    <th>Product_id</th>
                    <th>iD</th>
                    <th>ClothName</th>
                    <th>material</th>
                    <th>color</th>
                    <th>description</th>
                    <th>price</th>
                    <th>category</th>
                    <th>size</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className='tb'>
                  {places.length > 0 && places.map((place) => (
                    <tr key={place._id}>
                      <td>{place._id}</td>
                      <td>{place.iD}</td>
                      <td>{place.clothName}</td>
                      <td>{place.material}</td>
                      <td>{place.color}</td>
                      <td>{place.description}</td>
                      <td>{place.price}</td>
                      <td>{place.category}</td>
                      <td>{place.size}</td>
                      <td>{place.image && place.image.data && (
                        <div style={{
                          backgroundImage: `url(data:image/png;base64,${Buffer.from(place.image.data).toString('base64')})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          width: "100px",
                          height: "100px"
                        }}></div>
                      )}
                      </td>

                      <td>
                        <button onClick={() => buttonStatus(place._id, place.status)} style={{
                          background: "#CBD5C0",
                          width: "100px",
                          height: "30px"
                        }}>
                          {place.status ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>
                        <Button style={{
                          background: "#CBD5C0",
                          width: "100px",
                          height: "30px",
                          color: "black",
                          textAlign: "center"
                        }} onClick={() => handleShow(place)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedPlace && (
            <div>

              <TextField
                id="clothName"
                name="clothName"
                label="ClotName"
                variant="outlined"
                value={formData.clothName}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br /><br />

              <TextField
                id="material"
                name="material"
                label="Material"
                variant="outlined"
                value={formData.material}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br /><br />
              <TextField
                id="color"
                name="color"
                label="Color"
                variant="outlined"
                value={formData.color}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br /><br />
              <TextField
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br /><br />
              <TextField
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                value={formData.price}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br /><br />
              <TextField
                id="category"
                name="category"
                label="Category"
                variant="outlined"
                value={formData.category}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br /><br />

              <TextField
                id="size"
                name="size"
                label="Size"
                variant="outlined"
                value={formData.size}
                onChange={handleChange}
                style={{ width: "350px" }}
              />
              <br />

              <input
                id="image"
                type='file'
                name="image"
                onChange={onFileChange}
                style={{ width: "350px" }}
              />
              <br />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
    </div>
  )
}

export default ViewProduct
