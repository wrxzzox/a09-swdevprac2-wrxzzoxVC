import DateReserve from '@/components/DateReserve'
import { Select, MenuItem, TextField } from '@mui/material'
import getUserProfile from '@/libs/getUserProfile'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'

export default async function Booking() {

    const session = await getServerSession(authOptions);

    const profile = !session || !session.user.token ? null : await getUserProfile(session.user.token);
    var createdAt = !profile ? 0 : new Date(profile.data.createdAt);

    return (
        <div>
            {
                profile ? 
                <div className="m-5 p-5">
                    <div className="text-2xl">{profile.data.name}</div>
                    <table className="table-auto border-separate border-spacing-2">
                        <tbody>
                            <tr><td>Email</td><td>{profile.data.email}</td></tr>
                            <tr><td>Tel</td><td>{profile.data.tel}</td></tr>
                            <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
                        </tbody>
                    </table>
                </div>
                : ""
            }
            <form action="#" method='POST' className="bg-slate-100 rounded-lg space-y-5 w-[100%] p-10 flex flex-col justify-center items-center">
                <TextField id="name" label="Name-Lastname" name="Name-Lastname" variant='standard'/>
                <TextField id="contact" label="Contact-Number" name="Contact-Number" variant='standard'/>
                <Select variant="standard" name="Bloom" id="venue" className="h-[2em] w-[200px]">
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>
                <DateReserve/>
                <button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 p-3 shadow-sm text-white">
                    Book Venue
                </button>
            </form>
        </div>
    )
}