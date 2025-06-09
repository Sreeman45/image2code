"use client"
import { auth } from '@/configs/firebaseConfig';
import {  signOut } from 'firebase/auth';
import React from 'react'
import { useAuthContext } from '../provider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ProfileAvatar() {

    const user = useAuthContext();
    const router = useRouter();
    const onButtonPress = () => {
        signOut(auth).then(() => {
     
            router.replace('/')
        }).catch((error) => {
            
        });
    }
    return (
        <div>
            <Popover >
                <PopoverTrigger>
                    {user?.user?.photoURL && <img src={user?.user?.photoURL} alt='profile' className='w-[35px] h-[35px] rounded-full' />}
                </PopoverTrigger>
                <PopoverContent className='w-[100px] mx-w-sm'>
                    <Button variant={'ghost'} onClick={onButtonPress} className=''>Logout</Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileAvatar