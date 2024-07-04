"use client"
import axios from "axios";
import { useState, useEffect } from "react";

export default function Cartlength() {
    const [cart, setCart] = useState([]);

    const getUser = async () => {
        try {
            const response = await axios.get("/api/user")
            setCart(response.data.data.cart)
        } catch (error) {
            console.log("Unable to get User Data", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <span>{cart.length > 0 ? cart.length : 0}</span>
    )
}