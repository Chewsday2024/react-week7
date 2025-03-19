import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import ReactLoading from 'react-loading';



import { getOneProductDetail, getProductDetailStatus, getProductDetail } from "./productdetailSlice";
import { addCart, getCartListCRUD_Status } from "../../cartlist/cartlistCRUD_Slice";





function ProductDetail () {

  const dispatch = useDispatch();

  const product = useSelector(getProductDetail);

  const productDetailStatus = useSelector(getProductDetailStatus);

  const cartListCRUD_Status = useSelector(getCartListCRUD_Status);

  const { id } = useParams();

  const qtyRef = useRef(null);



  useEffect(() => {
    dispatch(getOneProductDetail(id));
  }, [dispatch, id]);



  return (
    <>
      <div className={`container ${productDetailStatus === 'loading' && 'd-none'}`}>
        <Link
          type="button"
          className="btn btn-primary fs-3 me-2"
          to='/React-Week7/productList'
        >
          上一頁
        </Link>

        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                產品名稱：{product.title}
              </h2>
            </div>

            <div className="modal-body fs-5" style={{height: '650px'}}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-fit-cover w-100 h-75 mb-2"
              />
              <p className="mb-2">內容：{product.content}</p>
              <p className="mb-2">描述：{product.description}</p>
              <p className="mb-2">
                價錢：
                <del className="me-1">{product.origin_price}</del>元

                <span className="h5 mx-2">{'→'}</span>

                <span className="text-success me-1">{product?.price}</span>元
              </p>

              <div className="input-group align-items-center">
                <label htmlFor="qtySelect">數量：</label>
                <select
                  id="qtySelect"
                  className="form-select"
                  ref={qtyRef}
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="d-flex ms-auto align-items-center" style={{width: '140px'}}>
                {cartListCRUD_Status === product.id && 
                  <ReactLoading 
                    type="spin"
                    color="black"
                    width="1.5rem"
                    height="1.5rem" 
                  />
                }
                
                <button 
                  type="button" 
                  className="btn btn-primary ms-auto" 
                  onClick={() => dispatch(addCart({id: product.id, qty: qtyRef.current.value}))}
                  >
                    加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;