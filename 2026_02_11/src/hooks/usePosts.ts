import type {Post} from "../types/Post/Post.ts"
import {useQuery} from "@tanstack/react-query";

const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
}

export const usePosts = () => {
    return useQuery<Array<Post>>({
        queryKey: ['posts'],
        queryFn: getPosts,
    })
}
