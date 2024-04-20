import './App.css';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import PublicRoute from './components/authroute/PublicRoute';
import ProtectedRoute from './components/authroute/ProtectedRoute';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ProductList from './components/ProductList';
import AddProducts from './components/AddProducts';
import CategoryList from './components/CategoryList';
import AddCategories from './components/AddCategories';
import Updatecategory from './components/UpdateCategory';
import { Outlet } from 'react-router-dom';
import Users from './components/Users';
import AddUsers from './components/AddUsers';
import NewUser from './components/NewUser';
import Category from '@mui/icons-material/Category';
import UpdateProducts from './components/UpdateProducts';



// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <PublicRoute>
//                 <LogIn/>
//             </PublicRoute>,
//   },
//   {
//     path : "/",
//     element : <ProtectedRoute>
//                <Dashboard/> 
//               </ProtectedRoute>,
//     children: [
//       {
//         path: "products",
//         element: <ProductList/>,
//       },
//       {
//         path: "addproducts",
//         element: <AddProducts/>,
//       },
//       {
//         path: "categories",
//         element: <Categories/>,
//       },
//     ]
//   },
// ]);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<PublicRoute><LogIn/></PublicRoute>}></Route>
          <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
            <Route path='users' element={<Users/>}/>
            <Route path='addusers' element={<AddUsers/>}/>
            <Route path='products' element={<ProductList/>}/>
            <Route path='addproducts' element={<AddProducts/>}/>
            <Route path='updateproducts' element={<UpdateProducts/>}/>
            <Route path='categorylist' element={<CategoryList/>}/>
            <Route path='addcategory' element={<AddCategories/>}/>
            <Route path='updatecategory' element={<Updatecategory/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




























