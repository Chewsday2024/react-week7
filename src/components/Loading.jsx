import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';




import { getLoginStatus } from '../pages/login/loginSlice';
import { getProductListStatus } from '../pages/productlist/productlistSlice';
import { getProductDetailStatus } from '../pages/productlist/productdetail/productdetailSlice';
import { getCartListStatus } from '../pages/cartlist/cartlistSlice';
import { getCartListCRUD_Status } from '../pages/cartlist/cartlistCRUD_Slice';
import { getCheckOutFormStatus } from '../pages/cartlist/checkoutform/checkoutformSlice';
import { getBackStageProductsStatus } from '../backstage/backstageSlice';
import { getBackStageCRUD_Status } from '../backstage/backstageCRUD_Slice';





function Loading () {
  const loginStatus = useSelector(getLoginStatus);

  const productListStatus = useSelector(getProductListStatus);

  const productdetailStatus = useSelector(getProductDetailStatus);

  const cartListStatus = useSelector(getCartListStatus);

  const cartListCRUD_Status = useSelector(getCartListCRUD_Status);

  const checkOutFormStatus = useSelector(getCheckOutFormStatus);

  const backStageProductsStatus = useSelector(getBackStageProductsStatus);

  const backStageCRUD_Status = useSelector(getBackStageCRUD_Status);



  const isLoading = loginStatus === 'loading' || 
                    productListStatus === 'loading' ||
                    productdetailStatus === 'loading' ||
                    cartListStatus === 'loading' ||
                    cartListCRUD_Status === 'loading' ||
                    checkOutFormStatus === 'loading' ||
                    backStageProductsStatus === 'loading' ||
                    backStageCRUD_Status === 'loading';


  return (
    <>
      {isLoading && <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(130, 130, 130, 0.42)",
          zIndex: 999,
        }}
      >
        <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
      </div>}
    </>
  );
};

export default Loading;