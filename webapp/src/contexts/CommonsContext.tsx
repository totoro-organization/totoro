import { createContext, useEffect, useState } from "react";
import { getItems } from "src/services/common.service";

export const CommonsContext = createContext<any>({});

export const CommonsProvider = props => {
    const [tags, setTags] = useState<any>([]);
    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState<any>([]);


    useEffect(() => {
        fetchTags();
        fetchDifficulties()
    }, []);

    const fetchTags = async () => {
        const {data} = await getItems('/tags', { status: 'actived'});
        
        if (data) {
            const tagArray = data.filter(item => item.type === "mission");
            const categoryArray = data.filter(item => item.type === "category");
            setTags(tagArray);
            setCategories(categoryArray);
        } else {
            // There was an error fetching the data
        }
    };

    const fetchDifficulties = async () => {
        const {data} = await getItems('/difficulties', { status: 'actived'});
        
        if (data) {
            setDifficulties(data);
        } else {
            // There was an error fetching the data
        }
    };

    return (
        <CommonsContext.Provider
            value={{tags, categories, difficulties}}
        >
            {props.children}
        </CommonsContext.Provider>
    );
};
