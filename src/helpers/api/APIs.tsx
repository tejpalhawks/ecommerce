// import axios from "axios"
import { base } from "../../API/api"
// import { number } from "yup";



export async function ProjectDetails() {
    try {
        const response = await fetch(`${base.API_URL}user/get-setting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}

export async function UserLogin({formData} :any) {
    

    try {
        const response = await fetch(`${base.API_URL}user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}

export async function UserDetails() {
    const token = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['token'] = token;
    }

    try {
        const response = await fetch(`${base.API_URL}user/me`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.user;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function UserProfileEdit({filteredFormData}:any) {
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['Authorization'] = AUTH_TOKEN;
    }
    try {
        const response = await fetch(`${base.API_URL}user/edit-profile`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(filteredFormData)
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}

export async function UploadProfileimage(file : File){
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = new Headers();

    if (AUTH_TOKEN) {
        headers.append('Authorization', AUTH_TOKEN);
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`${base.API_URL}user/edit-profile-image`, {
            method: 'POST',
            headers: headers,
            body: formData
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}



export async function UserPasswordReset({formData}:any){
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['Authorization'] = AUTH_TOKEN;
    }
    try {
        const response = await fetch(`${base.API_URL}user/change-password`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                password: formData.Password,
                oldPassword : formData.oldPassword
            })
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}



export async function GetAllCountries(){
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['Authorization'] = AUTH_TOKEN;
    }
    try {
        const response = await fetch(`${base.API_URL}user/get-countries`, {
            method: 'POST',
            headers: headers,
            
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}

export async function GetStateByCountry({countryId}:any){
    // const countryID = Number(countryId)
    console.log(countryId);
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['Authorization'] = AUTH_TOKEN;
    }
    try {
        const response = await fetch(`${base.API_URL}user/get-states`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                country_id : countryId
            })
            
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function GetCitiesByState({stateId}:any){
    console.log(stateId);
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['Authorization'] = AUTH_TOKEN;
    }
    try {
        const response = await fetch(`${base.API_URL}user/get-city`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                state_id : stateId
            })
            
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}



export async function SendForgetPasswordEmail({formData}:any){
    console.log(formData);
    try {
        const response = await fetch(`${base.API_URL}user/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                email : formData.email
            })
            
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}

export async function ResetPasswordViaLink({formData}:any){
    console.log(formData);
    try {
        const response = await fetch(`${base.API_URL}user/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                resetToken : formData.resetToken,
                password: formData.password
            })
            
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function VerifyOtp({formData} : any){
    try {
        const response = await fetch(`${base.API_URL}user/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                otp: formData.otp,
                email: formData.email
            })
            
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function GetAllProducts() {
    try {
        const response = await fetch(`${base.API_URL}products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function GetSingleProduct() {
    const productId = window.location.pathname.split('/').pop();
    try {
        const response = await fetch(`${base.API_URL}products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}



export async function UserCart() {
    const token = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['token'] = token;
    }

    try {
        const response = await fetch(`${base.API_URL}cart`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function AddToCart(productId :any, count : any){
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['token'] = AUTH_TOKEN;
    }

    try {
        const response = await fetch(`${base.API_URL}cart/`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                count : count,
                productId : productId
            })
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}


export async function RemoveFromCart(cartId :any){
    const AUTH_TOKEN = sessionStorage.getItem('AUTH_SESSION_KEY');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (AUTH_TOKEN) {
        headers['token'] = AUTH_TOKEN;
    }

    try {
        const response = await fetch(`${base.API_URL}cart/delete-cart`, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({
                cartId : cartId,
            })
        });
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error; 
    }
}






