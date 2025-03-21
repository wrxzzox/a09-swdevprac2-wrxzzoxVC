'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Banner() {

    const [index, setIndex] = useState(0);
    const router = useRouter();

    const { data:session } = useSession();

    return (
        <div className="block m-[0] w-[100vw] h-[50vh] relative" onClick={() => setIndex((index+1)%4)}>
            <Image 
            src={`/img/cover${index==0?"":`${index+1}`}.jpg`}
            alt="Banner"
            fill={true}
            style={{objectFit:"cover"}}/>
            <div className="relative top-[50px] z-20 text-center bg-black/80 py-[20px] rounded-lg">
                <h1 className='text-4xl font-medium'>where every event finds its venue</h1>
                <h3 className='text-xl font-serif' style={{marginTop:"8px"}}>Looking for the perfect venue for your next event? We offer a spacious and well-equipped venue for all types of gatherings, including weddings, corporate events, birthday parties, and more.</h3>
            </div>
            {
                session ? <div className='z-30 absolute top-5 right-10 font-semibold text-white bg-black/80 px-[10px] rounded-[16px] py-[5px] text-xl'>Welcome {session.user?.name}</div>:null
            }
            <button className="bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent" 
            onClick={(e) => {
                e.stopPropagation();
                router.push('/venue');
            }}>
                Select Venue
            </button>
        </div>
    )
}