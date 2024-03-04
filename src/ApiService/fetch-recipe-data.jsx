import { API_URL } from "../ApiUrl";
import { getJwt } from './Jwt';

export const fetch_recipe_data = async () => {
    
    const response = await fetch(`${API_URL}/fetch-recipe-data`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify()
    });

    const data = await response.json();

    return data.data;
} 


export const fetch_macro_data = async () => {
    
    const response = await fetch(`${API_URL}/fetch-macro-data`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify()
    });

    const data = await response.json();

    return data.data;
} 

