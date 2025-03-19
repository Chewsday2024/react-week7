import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import { useEffect } from "react";


import { getProductlist, getAllProducts } from "./productlistSlice";
import { addCart, getCartListCRUD_Status } from "../cartlist/cartlistCRUD_Slice";


import './ProductList.scss';


function ProductList () {

  const dispatch = useDispatch();

  const productList = useSelector(getProductlist);

  const cartListCRUD_Status = useSelector(getCartListCRUD_Status);



  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])



  return (
    <div className='container'>
        <table className="table align-middle">
          <thead className="text-center">
            <tr className="fs-3">
              <th>圖片</th>

              <th>商品名稱</th>

              <th>價格</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {productList && productList.length > 0 
            ? (productList.map( product => (
              <tr key={product.id} className="text-center">
                <td className="w-25">
                  <img className="w-100 product-list-img" src={product.imageUrl} />
                </td>

                <td className="h3">{product.title}</td>

                <td>
                  <div className="d-flex justify-content-around align-items-center">
                    <div>
                      <div className="h5 mb-1">原價</div>
                      <del className="h5 ">${product.origin_price}</del>
                    </div>

                    <span className="h1">{'→'}</span>

                    <div >
                      <div className="h5 mb-1">特價</div>
                      <h5 className="text-success fw-bold">${product.price}</h5>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="d-flex m-auto" style={{width: '205px'}}>
                    <div className="btn-group btn-group-sm">
                      <Link 
                        type="button"
                        className="btn btn-outline-secondary"
                        to={`${product.id}`}
                        >
                          查看更多
                      </Link>
                      
                      <button 
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => dispatch(addCart({id: product.id, qty: 1 }))}
                        >
                      <i className="bi bi-cart-fill me-1"></i>
                        加到購物車
                      </button>
                    </div>
                    
                    {cartListCRUD_Status === product.id && <ReactLoading className="d-inline-block ms-2" type="spin" color="black" width="1rem" height="1rem" />}
                  </div>
                </td>
              </tr>
            )))
            : (<tr><td colSpan="5">尚無產品資料</td></tr>)}
            
          </tbody>
        </table>
      </div>
  );
};

export default ProductList;