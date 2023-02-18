import axios from 'axios';
import SubmitGameResultRequest from './../models/submitGameResultRequest';

export async function submitGameResult(request: SubmitGameResultRequest) {
    const url = '/gameResult';

    await axios.post(url, request);
}