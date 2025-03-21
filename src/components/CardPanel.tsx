'use client'
import { useReducer, useRef, useEffect } from 'react'
import Card from '@/components/Card'
import Link from 'next/link'

export default function CardPanel() {

    const cardReducer = (ratingList:Map<string, number>, action:{type:string, venueName: string, rating?: number}) => {
        switch(action.type) {
            case 'set': {
                const newState = new Map(ratingList);
                newState.set(action.venueName, action.rating || 0);
                return newState;
            }
            case 'remove': {
                const newState = new Map(ratingList);
                newState.delete(action.venueName);
                return newState;
            }
            default: return ratingList;
        }
    }
    
    /*
        Mock Data for Demonstration Only
    */
   
   const mockVenueRepo = [
       { vid: "001", name: "The Bloom Pavilion", image:"/img/bloom.jpg" },
       { vid: "002", name: "Spark Space", image:"/img/sparkspace.jpg" },
       { vid: "003", name: "The Grand Table", image:"/img/grandtable.jpg" }
    ];

    const ratingMap = new Map<string, number>();

    mockVenueRepo.map((venueItem) => {
        ratingMap.set(venueItem.name, 0);
    });

    const [ratingList, dispatchRating] = useReducer(cardReducer, ratingMap);
    
    return (
        <div>
            <div style={{display: "flex", justifyContent: "center", gap: "3%", marginTop: "20px"}}>
                {
                    mockVenueRepo.map((venueItem) => 
                        <Link key={venueItem.name} href={`/venue/${venueItem.vid}`} className="w-1/5">
                            <Card venueName={venueItem.name} imgSrc={venueItem.image}
                            dispatch={(venue: string, newRating: number) => {dispatchRating({type: "set", venueName: venue, rating: newRating})}}
                            rating={ratingList.get(venueItem.name)}/>
                        </Link>
                    )
                }
            </div>
            <div className="w-full text-2xl font-bold ml-[20px] mt-[3%]">
                Venue List with Ratings : { ratingList.size }
            </div>
            <div>
            {
                Array.from(ratingList).map((venue) => 
                    <div data-testid={venue[0]} key={venue[0]} className="w-full text-xl font-medium ml-[20px] mt-[5px]"
                    onClick={() => dispatchRating({type:'remove', venueName: venue[0]})}>
                        {venue[0]} : {venue[1]}
                    </div>
                )
            }
            </div>
        </div>
    )
}