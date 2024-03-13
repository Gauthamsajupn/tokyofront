
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminNavbar from './Components/Admin/AdminNavbar';
import Sidebar from './Components/Admin/Sidebar';
import Userdetails from './Components/Admin/Userdetails';
import ProductForm from './Components/Admin/ProductForm';
import ViewProduct from './Components/Admin/ViewProduct';
import AddAdmin from './Components/Admin/AddAdmin';
import ViewAdmin from './Components/Admin/ViewAdmin';
import Navbar from './Components/User/Navbar';
import Kids from './Components/User/Kids';
import ShowKids from './Components/User/ShowKids';
import Mens from './Components/User/Mens';
import Womens from './Components/User/Womens';
import Home from './Components/User/Home';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import Startup from './Components/Startup';
import Startnav from './Components/Startnav';
import CartPage from './Components/User/Cart';
import CheckoutPage from './Components/User/Checkout';
import Order from './Components/User/Order';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Startup/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/adminNav' element={<AdminNavbar/>}/>
        <Route path='/sidebar' element={<Sidebar/>}/>
        <Route path='/userDetails' element={<Userdetails/>}/>
        <Route path='/productForm' element={<ProductForm/>}/>
        <Route path='/viewProduct' element={<ViewProduct/>}/>
        <Route path='/addadmin' element={<AddAdmin/>}/>
        <Route path='/listAdmin' element={<ViewAdmin/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path="/check" element={<CheckoutPage/>}/>

        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/showKids' element={<ShowKids/>}/>
        <Route path='/mens' element={<Mens/>}/>
        <Route path='/womens' element={<Womens/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/startnav' element={<Startnav/>}/>
        <Route path="/order" element={<Order/>}/>

      

        </Routes>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
