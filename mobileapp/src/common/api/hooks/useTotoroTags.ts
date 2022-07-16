import React, { useEffect, useState } from "react";
import { Tag } from "../../../models/job";
import getTotoroTags from "../requests/getTotoroTags";

export default function useTotoroTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Tag[]>([]);

  const fetchTags = async () => {
    const { data } = await getTotoroTags();

    if (data) {
      // TODO: Use groupBy function of lodash here?
      const tagArray = data.filter((tag: Tag) => tag.type === "mission");
      const categoryArray = data.filter((tag: Tag) => tag.type === "category");
      setTags(tagArray);
      setCategories(categoryArray);
    } else {
      // There was an error fetching the data
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, categories };
}
