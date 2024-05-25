import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../Encrypt/Encrypt.css";

const MainFunction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accountNumber = localStorage.getItem('accountNumber');
  })
  useEffect(() => {
    const accountNumber = localStorage.getItem('accountNumber');
    if(!accountNumber){
      navigate("/login")
    }
  })
  return (
    <div>
      <div className="working-space p-5 d-flex  justify-content-center align-items-center">
        <div className=" container working-space-cart ">
          <h1 className="mb-5">DIGIBACK</h1>
          <div className="row p-4">
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button type="button" class="btn btn-light btn-lg">Rút tiền</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button type="button" class="btn btn-light btn-lg">Chuyển tiền</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button type="button" class="btn btn-light btn-lg">Nạp tiền</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button type="button" class="btn btn-light btn-lg">Thanh toán thẻ tín dụng</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button type="button" class="btn btn-light btn-lg">Đổi mã PIN</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button type="button" class="btn btn-light btn-lg">Khác</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFunction;