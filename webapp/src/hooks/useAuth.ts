import { useContext } from "react";
import { SessionContext } from "src/contexts/SessionContext";

export default function useAuth() {
    return useContext(SessionContext);
}