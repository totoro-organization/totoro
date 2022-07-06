import { useContext } from "react";
import { SessionContext } from "src/contexts/SessionContext";

export const useSession = () => useContext(SessionContext);