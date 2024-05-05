import { UserContext } from "@/providers/UserProvider";
import { useContext } from "react";

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserContextProvider");
  }

  return context;
};

export default useUser;
