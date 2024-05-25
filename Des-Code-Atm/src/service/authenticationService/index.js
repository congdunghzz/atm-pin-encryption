import axios from "axios";
import ApiUrl from "../../utils/ApiUrl";


export async function login(loginRequest) {
    
    try{
        const response = await axios.post(`${ApiUrl}/user/login`, {
            userEmail: loginRequest.email,
            password: loginRequest.password
        },
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
        if (response?.status === 200) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
        return response;
    } catch(e){
        return e.response;
    }
}

export async function register(request) {
    try{
        const response = await axios.post(`${ApiUrl}/register`, request, {
            headers: {'Content-Type': 'application/json'}
        })
        if (response?.status === 200) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
        return response;

    }catch(e){
        return e.response;
    }
}

