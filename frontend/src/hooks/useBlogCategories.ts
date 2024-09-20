// Author: Heli Desai
import { useQuery } from "@tanstack/react-query";
import { getBlogCategories } from "../services/blogServie";

export const useBlogCategories = () => {
    const blogCategoryQuery = useQuery({
        queryKey: ["blogCategories"],
        queryFn: getBlogCategories,
    });
    return {
        blogCategories: blogCategoryQuery.data,
        blogCategoriesLoading: blogCategoryQuery.isLoading,
        blogCategoriesError: blogCategoryQuery.error,
    };
};

export default useBlogCategories;