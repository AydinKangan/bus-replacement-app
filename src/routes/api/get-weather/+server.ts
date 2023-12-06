
import axios from "axios";
import type { AxiosResponse } from "axios";
import { WEATHER_API_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    const lat = "-37.813629";
    const lon = "144.963058";

    const response: AxiosResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
    );

    const data = response.data


    return new Response(JSON.stringify(data), { status: 200 });
};
