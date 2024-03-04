import { API_URL } from "../ApiUrl";
import { getJwt } from './Jwt';

export const adding_cal_tracker_entry = async (body) => {

    const response = await fetch(`${API_URL}/adding_cal_tracker_entry`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
};


export const cal_tracker_entry_list = async (body) => {

    const response = await fetch(`${API_URL}/cal_tracker_entry_list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
};

export const delete_cal_tracker_entry = async (body) => {

    const response = await fetch(`${API_URL}/delete_cal_tracker_entry/${body}`, {
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


export const savedTotalItemFromCalTracker = async () => {

    const response = await fetch(`${API_URL}/savedTotalItemFromCalTracker`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify()
    });

    const data = await response.json();

    return data;
};


export const updateTotalItemFromCalTracker= async (body) => {

    const response = await fetch(`${API_URL}/updateTotalItemFromCalTracker`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
};



export const getTotalItemFromCalTracker = async () => {
    
    const response = await fetch(`${API_URL}/getTotalItemFromCalTracker`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify()
    });

    const data = await response.json();
    return data;
} 


export const getUserName = async () => {
    
    const response = await fetch(`${API_URL}/getUserName`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify()
    });

    const data = await response.json();
    return data;
} 