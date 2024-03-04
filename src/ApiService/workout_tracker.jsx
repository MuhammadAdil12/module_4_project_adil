import { API_URL } from "../ApiUrl";
import { getJwt } from './Jwt';

export const workout_tracker_backend = async (body) => {

    const response = await fetch(`${API_URL}/workout_tracker_backend`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    console.log(data);
    return data;
};

export const workout_tracker_delete = async (body) => {

    const response = await fetch(`${API_URL}/workout_tracker_backend/${body}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
};


export const workout_tracker_list = async () => {

    const response = await fetch(`${API_URL}/workout_tracker_list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify()
    });

    const data = await response.json();
    return data;
};


export const update_workout_tracker_entry = async (body) => {
    
    const response = await fetch(`${API_URL}/update_workout_tracker_entry`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    return data;
} 