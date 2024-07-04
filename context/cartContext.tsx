"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Product {
  _id: string;
  product: string;
  price: number;
  stock: number;
  details: string;
  images: string[];
}

interface UserContextType {
  email: string | null;
  cart: Product[] | null;
  setUser: (cart: Product[]) => void;
}

const cartContext = createContext<UserContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const email = session?.user?.email || null;
  
  const [cart, setCart] = useState<Product[] | null>(null);

  const setUser = (cart: Product[]) => {
    setCart(cart);
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        if (email) {
          const response = await axios.get(`/api/cart/getcart/${email}`);
          setCart(response.data.data);
        }
      } catch (error) {
        console.log("Error in fetching Cart", error);
      }
    };

    if (email) {
      getCart();
    }
  }, [email]);

  return (
    <cartContext.Provider value={{ email, cart, setUser }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useUser must be used within a CartProvider');
  }
  return context;
};
