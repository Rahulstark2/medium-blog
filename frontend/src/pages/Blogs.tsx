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
        {blogs.map(blog => <BlogCard
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"}

        />)}

    </div>
    </div>
    </div>
}