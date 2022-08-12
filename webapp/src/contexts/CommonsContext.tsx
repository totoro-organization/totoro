import { createContext, useEffect, useState } from "react";
import { JobDifficulty, Tag } from "src/models";
import { getItems } from "src/api/requests";

export const CommonsContext = createContext<any>({});

export const CommonsProvider = props => {
    const [tags, setTags] = useState<Array<Tag>>([]);
    const [categories, setCategories] = useState<Array<Tag>>([]);
    const [difficulties, setDifficulties] = useState<Array<JobDifficulty>>([]);


    useEffect(() => {
        fetchTags();
        fetchDifficulties()
    }, []);

    const fetchTags = async () => {
        const {data} = await getItems('/tags', { status: 'actived'});
        
        if (data) {
            const tagArray = data.filter((tag: Tag) => tag.type === "mission");
            const categoryArray = data.filter((tag: Tag )=> tag.type === "category");
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
