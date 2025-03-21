import Card from "./Card"
import Link from "next/link"

export default async function VenueCatalog( {venuesJson} : {venuesJson:Promise<VenueJson>}) {
    const venueJsonReady = await venuesJson;

    return (
        <div>
            <div className="text-black text-center">{venueJsonReady.count} catalogs, take it or leave it</div>
            <div className="m-5 flex flex-row flex-wrap items-center justify-around gap-5">
                {
                    venueJsonReady.data.map((venueItem:VenueItem) => (
                        <Link key={venueItem.name} href={`/venue/${venueItem._id}`} className="w-1/5">
                            <Card
                                venueName={venueItem.name}
                                imgSrc={venueItem.picture}
                            />
                        </Link>
                    ))
                }               
            </div>
        </div>
    )
}