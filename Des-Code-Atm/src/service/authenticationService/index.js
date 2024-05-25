import axios from "axios";
import ApiUrl from "../../utils/ApiUrl";


export async function login(loginRequest) {
    
    try{
        const response = await axios.post(`${ApiUrl}/user/login`, {
            accountNumber: loginRequest.accountNumber,
            password: loginRequest.password
        },
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
        if (response?.status === 200) {
            localStorage.setItem('accountNumber', response.data.accountNumber);
            localStorage.setItem('userId', response.data.id);
        }
        console.log(response);
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

        }
        return response;

    }catch(e){
        return e.response;
    }
}

export async function getEncodedPin(userId) {
    try{
        const response = await axios.get(`${ApiUrl}/user/${userId}/pin`, {
            headers: {'Content-Type': 'application/json'}
        })
        return response;

    }catch(e){
        return e.response;
    }
}



