import { API_URL } from "../ApiUrl";
import { getJwt } from './Jwt';

export const water_tracker = async () => {

    const response = await fetch(`${API_URL}/water_tracker`, {
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



export const water_tracker_list = async (body) => {

    const response = await fetch(`${API_URL}/water_tracker_list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getJwt()}`
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    // console.log(data);
    return data;
};
export const update_water_tracker_list = async (body) => {

    const response = await fetch(`${API_URL}/update_water_tracker_list`, {
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
export const restartWater = async (body) => {

    const response = await fetch(`${API_URL}/restartWater`, {
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
export const updateWaterTarget = async (body) => {

    const response = await fetch(`${API_URL}/updateWaterTarget`, {
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
