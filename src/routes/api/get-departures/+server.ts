import axios from "axios";
import type { AxiosResponse } from "axios";
import { X_API_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}: any) => {
    try {
        const body = await request.json();

        const stopId = body.stopId.toString();

        console.log(stopId)

        const headers = {
            "X-Api-Key": X_API_KEY,
        };

        const response: AxiosResponse = await axios.get(
            `https://ptvapiwrapper.azurewebsites.net/trains/get-departures/${stopId}`,
            { headers }
        );


        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response("Bad Request", { status: 400 });
    }
};
