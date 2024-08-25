import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignupForm from './Pages/Signup/Signup';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import MyBlogs from './Pages/Myblogs/Myblog';
import BlogFunction from './Pages/BlogFunction/BlogFunction';

function App() {

  const Authorization = () => {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" />;
  }
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route element={<Authorization />}>
          <Route path='/' element={<Layout />}>
            <Route path='/addBlog' element={<BlogFunction />} />
            <Route path='/addBlog/:id' element={<BlogFunction />} />
            <Route path='/myBlogs' element={<MyBlogs />} />
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;