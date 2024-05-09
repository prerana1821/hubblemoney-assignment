"use client";

import { User } from "@supabase/auth-helpers-nextjs";
import { UserDetails } from "@/types/app";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

interface UserProviderProps {
  children?: ReactNode;
}

type UserContextType = {
  user: User | null;
  accessToken: string | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetails = () => supabase.from("users").select("*").single();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && !isLoadingData && !userDetails) {
        setIsLoadingData(true);
        try {
          const { data } = await getUserDetails();
          setUserDetails(data as UserDetails);
        } catch (error) {
          console.error(error);
        }
        setIsLoadingData(false);
      } else if (!user && !isLoadingUser && !isLoadingData) {
        setUserDetails(null);
      }
    };

    fetchUserDetails();
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};

export default UserProvider;
