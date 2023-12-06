import axios from "axios";
import type { AxiosResponse } from "axios";
import { X_API_KEY } from "$env/static/private";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}: any) => {
    try {
        const body = await request.json();

        const stopId = body.stopId.toString();

        const currentUtcTime = new Date().toISOString();


        const headers = {
            "X-Api-Key": X_API_KEY,
        };

        const getDepartures: AxiosResponse = await axios.get(
            `https://ptvapiwrapper.azurewebsites.net/trains/get-departures/${stopId}`,
            { headers }
        );

        const departures = getDepartures.data.departures;

        

        const getRoutes: AxiosResponse = await axios.get(
            `https://ptvapiwrapper.azurewebsites.net/trains/get-all-routes`,
            { headers }
        );


        const routes = getRoutes.data;

        const getDirections: AxiosResponse = await axios.get(
            `https://ptvapiwrapper.azurewebsites.net/trains/get-directions`,
            { headers }
        );

        const directions = getDirections.data;

        const uniqueDepartureRoutes = await Array.from(new Set(departures.map((departure: any) => departure.route_id)));

        const matchingDirections = directions.filter((direction: any) => uniqueDepartureRoutes.includes(direction.route_id));

        const uniqueDirections = matchingDirections.reduce((acc: any[], direction: any) => {
            const { direction_id, direction_name, route_id } = direction;
            if (!acc.some((d: any) => d.direction_id === direction_id)) {
                acc.push({ direction_id, direction_name, route_id });
            }
            return acc;
        }, []);



        // const viewingData = [departures[0], routes[0], matchingDirections[0]];

        return new Response(JSON.stringify(uniqueDirections), { status: 200 });
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response("Bad Request", { status: 400 });
    }
};

        
