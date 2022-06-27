import { createContext, useEffect, useState } from "react";
import { getItems } from "src/services/common.service";

export const TagsContext = createContext<any>([]);

export const TagsProvider = props => {
    const [tags, setTags] = useState<any>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const {data} = await getItems('/tags', { status: 'actived', type: 'mission'});
            
            if (data) {
                setTags(data);
            } else {
                // There was an error fetching the data
            }
        };

        fetchTags();
    }, []);

    return (
        <TagsContext.Provider
            value={tags}
        >
            {props.children}
        </TagsContext.Provider>
    );
};
