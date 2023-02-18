import axios from "axios";

export async function getSelectOptions(type: string) {
    const url = '/lookup';
    const response = await axios.post(url, { type });

    return response.data;
}