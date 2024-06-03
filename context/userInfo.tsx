"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({});

function UserInfoProvider({ children } : { children: React.ReactNode }) {
    const [userInfo, setUserInfo] = useState({});

    const {data:session} = useSession()
    const email = session?.user?.email

    const getUser = async() => {
        try {
            const res = await axios.post("/api/user", { email })
            setUserInfo(res.data.data)
            // return res.data.data
        } catch (error) {
            console.log(error);
            console.log("Error in fetching User Data");
            // return null
        }
    }

    getUser()

    return (
        <Context.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </Context.Provider>
    );
}

export default UserInfoProvider

export const useUserInfo = () => useContext(Context);