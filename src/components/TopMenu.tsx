import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="w-full h-[96px] bg-[#555555] fixed top-0 left-0 z-30 flex flex-row border-b border-solid border-white">
            <div className="w-full flex flex-row">
                <TopMenuItem title={session ? `Sign-Out of ${session.user?.name}` : `Sign-In`} pageRef={session ? "/api/auth/signout" : "/api/auth/signin"}/>
            </div>
            <div className="w-full flex flex-row-reverse">
                <Image src={'/img/logo.png'}
                className="h-full w-auto ml-[40px]"
                alt='logo'
                width={0}
                height={0}
                sizes="100vh"
                />
                <TopMenuItem title="Booking" pageRef="/booking" />
            </div>
        </div>
    )
}