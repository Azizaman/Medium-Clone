
import './App.css'
import {BrowserRouter, Routes,Route} from "react-router-dom";
import {Signup} from "./Pages/Signup.tsx";
import {Signin} from "./Pages/Signin.tsx";
import {Blog} from "./Pages/Blog.tsx";
import {Blogs} from "./Pages/Blogs.tsx";
import { Publish } from './Pages/Publish.tsx';
import LandingPage from './Pages/Landingpage.tsx';

function App() {


  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<LandingPage/>}></Route>
              <Route path={'/signup'} element={<Signup/>}></Route>
              <Route path={'/signin'} element={<Signin/>}></Route>
              <Route path={'/blog/:id'} element={<Blog/>}></Route>
              <Route path={'/blogs'} element={<Blogs/>}></Route>
              <Route path={'/publish'} element={<Publish/>}></Route>
              
          </Routes>

      </BrowserRouter>


    </>
  )
}

export default App
