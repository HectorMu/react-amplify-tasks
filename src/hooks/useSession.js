import { useContext } from "react";
import { Session } from "../context/SessionProvider";

export const useSession = () => useContext(Session);
