import axios from "axios";
import type { AxiosResponse } from "axios";
import { X_API_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    const headers = {
        "X-Api-Key": X_API_KEY,
    };

    const response: AxiosResponse = await axios.get(
        "https://ptvapiwrapper.azurewebsites.net/trains/get-all-stops",
        { headers }
    );

    const data = response.data.map((stop: any) => ({
        stopId: stop.stop_id,
        stopName: stop.stop_name,
        stopSuburb: stop.stop_suburb,
    }));


    return new Response(JSON.stringify(data), { status: 200 });
};
