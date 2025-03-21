import getVenues from "@/libs/getVenues"
import VenueCatalog from "@/components/VenueCatalog"
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Venue() {

    const venues = await getVenues();

    return (
        <main className="text-center p-5">
            <h1 className="text-2xl font-medium">Select Your Venue</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <VenueCatalog venuesJson={venues} />
            </Suspense>
        </main>
    )
}