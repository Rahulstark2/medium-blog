import { Appbar } from "./Appbar"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="grid grid-cols-12 px-10 w-full">
        <div className="bg-red-200 col-span-8">
            <div className="text-3xl font-extrabold">
                {title}
            </div>
        </div>
        <div className="bg-green-200 col-span-4">
            hello
        </div>
    </div>
    </div>
}