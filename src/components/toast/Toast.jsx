import {  useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Toast as BsToast } from "bootstrap";



import { getToastMessages, removeMessage } from "./toastSlice";



function Toast () {
  const dispatch = useDispatch();

  const toastMessages = useSelector(getToastMessages);

  const toastRef = useRef({});


  useEffect(() => {
    toastMessages.forEach( message => {
      const messageElement = toastRef.current[message.id];

      if (messageElement) {
        const toastInstance = new BsToast(messageElement);

        toastInstance.show();

        setTimeout(() => {
          dispatch(removeMessage(message.id));
        }, 3000);
      }
    })
  }, [toastMessages, dispatch]);



  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1000 }}>
      {toastMessages.map( message => (
        <div
          ref={(el) => toastRef.current[message.id]= el}
          key={message.id}
          className='toast rounded-3 mb-2'
          role="alert"
          aria-live="assertive"
          aria-atomic="true">
          <div className={`toast-header ${message.success ? 'bg-success' : 'bg-danger'} text-white`}>
            <strong className="me-auto">
              {message.success ? '成功' : '失敗'}
            </strong>

            <button
              data-bs-dismiss="toast"
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">{message.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Toast;