import { useContext } from "react";
import { SessionContext } from "src/contexts/SessionContext";

const useSession = () => useContext(SessionContext);

export default useSession