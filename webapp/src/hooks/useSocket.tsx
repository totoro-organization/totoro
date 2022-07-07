import { useContext } from "react"
import { SocketContext } from "src/contexts/SocketContext"

const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export default useSocket