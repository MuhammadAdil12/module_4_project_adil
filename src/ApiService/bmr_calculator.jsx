import { API_URL } from "../ApiUrl";
import { getJwt } from './Jwt';

export const bmr_bmi_calculator = async (body) => {

    const response = await fetch(`${API_URL}/bmr_bmi_calculator`, {
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

export const get_bmr_bmi_calculation = async () => {

    const response = await fetch(`${API_URL}/get_bmr_bmi_calculation`, {
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