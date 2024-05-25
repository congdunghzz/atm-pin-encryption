import { useNavigate } from "react-router-dom";
import { useState } from "react";

import * as authenticationService from "../service/authenticationService"
import "./Login.css"
function Login() {

    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginBtn = async () => {

        if (accountNumber.trim() === '' || password.trim() === '') {
            alert("Please enter all information login");
            return;
        }

        const loginRequest = {
            accountNumber: accountNumber,
            password: password
        }
        const res = await authenticationService.login(loginRequest)
        if (res.status === 200) {
            console.log("login successfully");
            navigate("/")
        } else if (res?.status === 403) {
            setPassword('');
            alert("accountNumber or password is incorrect");
        } else {
            alert("Cant not log in now");
        }
    }



    return (
        <div className="login container-fluid mh-100  d-flex align-items-center justify-content-center">
            <div className="login-cart  p-4">
                <h2 className="text-center">Login</h2>
                <hr></hr>

                <div className="mb-4">
                    <label htmlFor="accountNumber" className="form-label">Account Number</label>
                    <br></br>
                    <input type="text" className="w-100 h-100"
                        id="accountNumber" placeholder="Enter your Account Number"
                        value={accountNumber}
                        onChange={(e) => { setAccountNumber(e.target.value) }} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <br />
                    <input type="password" className="w-100 h-100"
                        id="password" placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <button className="btn btn-light rounded-pill w-100 fw-bold" onClick={handleLoginBtn}>Login</button>


                <div className="text-center mt-3 d-flex ">
                    <a href="#" className="text-decoration-none ms-auto text-light">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;