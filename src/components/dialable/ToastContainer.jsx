import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const ToastContainer = ({ isOpen, toggle, message }) => {
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: '11' }}>
      <Toast isOpen={isOpen}>
        <ToastHeader toggle={toggle}>
          <img src="logo.png" alt="" className="me-2" height="18" /> {/* Adjust the path to your logo */}
          Upzet
        </ToastHeader>
        <ToastBody color="primary">{message}</ToastBody>
      </Toast>
    </div>
  );
};

export default ToastContainer;
