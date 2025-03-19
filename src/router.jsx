import { createHashRouter } from "react-router-dom";



import App from "./App";
import Navbar from "./layout/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProductList from "./pages/productlist/ProductList";
import ProductDetail from "./pages/productlist/productdetail/ProductDetail";
import CartList from "./pages/cartlist/CartList";
import BackStage from "./backstage/BackStage";
import NotFound from "./pages/NotFound";








const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
        
      },
      {
        path: 'React-Week7',
        element: <Navbar />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: 'productlist',
            element: <ProductList />
          },
          {
            path: 'productlist/:id',
            element: <ProductDetail />
          },
          {
            path: 'cartlist',
            element: <CartList />
          },
          {
            path: 'backstage',
            element: <BackStage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])








export default router;