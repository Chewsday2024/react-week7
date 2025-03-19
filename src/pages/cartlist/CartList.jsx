import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


import { getAllCartItems, getCartList, getDiscountTotal, getOriginTotal } from "./cartlistSlice";
import { clearCart, delCartItem, editCartItem, getCartListCRUD_Status } from "./cartlistCRUD_Slice";
import { getCheckOutFormStatus } from "./checkoutform/checkoutformSlice";
import CheckOutForm from "./checkoutform/CheckOutForm";



function CartList () {

  const dispatch = useDispatch();

  const cartList = useSelector(getCartList);

  const originTotal = useSelector(getOriginTotal);

  const discountTotal = useSelector(getDiscountTotal);

  const checkOutFormStatus = useSelector(getCheckOutFormStatus);

  const cartListCRUD_Status = useSelector(getCartListCRUD_Status);

  

  useEffect(() => {
    dispatch(getAllCartItems());
  }, [dispatch, cartListCRUD_Status, checkOutFormStatus]);


  
  return (
    <div className="container">
      <div className='text-end mb-3'>
        <button className={`btn btn-outline-danger ${cartList.length === 0 && 'd-none'}`} type="button" onClick={() => dispatch(clearCart())}>清空購物車</button>
      </div>

      <table className={`table align-middle w-100 ${cartList.length === 0 && 'd-none'}`}>
        <thead>
          <tr className="text-center fs-4">
            <th></th>

            <th>圖片</th>

            <th>品名</th>

            <th>數量/單位</th>

            <th>特價單價</th>

            <th>單項總價</th>
          </tr>
        </thead>

        <tbody>
          {cartList.map(order => (
            <tr key={order.id} className="text-center fs-5">
              <td>
                <button type="button" className="btn btn-outline-danger fw-bold" onClick={() => dispatch(delCartItem(order.id))}>
                  x
                </button>
              </td>

              <td className="w-25"><img className="w-100" src={order.product.imageUrl} alt={order.product.title} /></td>

              <td>{order.product.title}</td>
            
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="btn-group me-2" role="group">
                    <button
                      onClick={() => {
                        dispatch(editCartItem({
                          itemId: order.id,
                          productId: order.product.id,
                          itemQty: order.qty - 1
                        }))
                      }}
                      type="button"
                      className="btn btn-outline-dark"
                      disabled={order.qty === 1}
                    >
                      -
                    </button>

                    <span className="btn border border-dark">{order.qty}</span>
                    
                    <button
                      onClick={() => {
                        dispatch(editCartItem({
                          itemId: order.id,
                          productId: order.product.id,
                          itemQty: order.qty + 1
                        }))
                      }}
                      type="button"
                      className="btn btn-outline-dark"
                    >
                      +
                    </button>
                  </div>

                  <span>{order.product.unit}</span>
                </div>
              </td>

              <td className="text-success fw-bold">$ {order.product.price}</td>

              <td>$ {order.total}</td>
            </tr>
          ))
        }
        </tbody>

        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="fs-5">原價總價：$ {originTotal}</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="text-success fs-5">特價總價：$ {discountTotal}</td>
          </tr>
        </tfoot>
      </table>

      <h1 className={`text-center mt-5 ${cartList.length === 0 ? 'd-block' : 'd-none'}`}>尚無購物車資料</h1>
      

      <CheckOutForm/>
      
    </div>
  );
};

export default CartList;