import { configureStore } from "@reduxjs/toolkit";



import productdetailReducer from './pages/productlist/productdetail/productdetailSlice';
import checkoutformReducer from './pages/cartlist/checkoutform/checkoutformSlice';
import productlistReducer from './pages/productlist/productlistSlice';
import cartlistReducer from './pages/cartlist/cartlistSlice';
import backstageReducer from './backstage/backstageSlice';
import cartlistCRUD_Reducer from './pages/cartlist/cartlistCRUD_Slice';
import loginReducer from './pages/login/loginSlice';
import backstageCRUD_Reducer from './backstage/backstageCRUD_Slice';
import modalReducer from './backstage/modal/modalSlice';
import toastReducer from './components/toast/toastSlice';






const store = configureStore({
  reducer: {
    login: loginReducer,
    productlist: productlistReducer,
    productdetail: productdetailReducer,
    cartlist: cartlistReducer,
    cartlistCRUD: cartlistCRUD_Reducer,
    checkoutform: checkoutformReducer,
    backstage: backstageReducer,
    backstageCRUD: backstageCRUD_Reducer,
    modal: modalReducer,
    toast: toastReducer
  }
});






export default store;