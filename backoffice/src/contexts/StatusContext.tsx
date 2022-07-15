import { createContext, useEffect, useState } from "react";
import { getStatuses } from "src/services/status.service";

export const StatusContext = createContext<any>([]);

export const StatusProvider = props => {
    const [statuses, setStatuses] = useState<any>([]);

    useEffect(() => {
        const fetchStatuses = async () => {
            const {data} = await getStatuses();

            if (data) {
                setStatuses(data);
            } else {
                // There was an error fetching the data
            }
        };

        fetchStatuses();
    }, []);

    return (
        <StatusContext.Provider
            value={statuses}
        >
            {props.children}
        </StatusContext.Provider>
    );
};