import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
            loading...
        </div>
    }
    return <div>
        <Appbar/>
    <div className="flex justify-center">
    <div className="max-w-xl">
        <BlogCard
            authorName={"Rahul Roy Chowdhury"}
            title={"How an ugly single page website makes $5000 a month without affiliate marketing"}
            content={"How an ugly single page website makes $5000 a month without affiliate marketing. How an ugly single page website makes $5000 a month without affiliate marketing."}
            publishedDate={"2nd Feb 2024"}

        />
    </div>
    </div>
    </div>
}