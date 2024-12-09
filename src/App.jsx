import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Wrapper from './pages/wrapper/wrapper'
import Login from './auth/login/login';
import Registration from './auth/registration/registration';
import BlogHeaders from './blogs/allblogs';
import Blogdetails from './blogs/blogdetails';
import ShowallCategoryy from './blogs/showallcategoryy';
// import Categorydetail from './category/categorydetail';




function App() {
  const public_router = [
    {
      path: "/",
      Component: <Login/>
    },
    {
      path: "/reg",
      Component: <Registration/>
    },
    {
      path: "/allblogs",
      Component: <BlogHeaders/>
    },
    {
      path: "/blogdetails/:id",
      Component: <Blogdetails/>
    },
    {
      path: "/showallcategory",
      Component: <ShowallCategoryy/>
    },
    // {
    //   path: "/categorydel/:id",
    //   Component: <Categorydetail/>
    // },
  ]
  

  return (
    <>
      <Router>
       <Wrapper>
          <Routes>
            {public_router.map((item, index) => (
              <Route key={index} path={item.path} element={item.Component} />
            ))}
          </Routes>
        </Wrapper>
      </Router>
    </>
  )
}

export default App
