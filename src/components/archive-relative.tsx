import type { Post } from "../type/page";
import parse from "html-react-parser";
import type { FeaturedBlog } from "../type/components";

type Props = {
  blogs: FeaturedBlog[];
};
export default function ArchiveRelative({ blogs }: Props) {
  return (
    <>
      {blogs?.map((blog, idx) => (
        <a href={blog.url} key={idx}>
          <div>
            <h4 {...(blog.$?.title as {})}>{blog.title}</h4>
            {typeof blog.body === "string" && (
              <div {...(blog.$?.body as {})}>
                {parse(blog.body.slice(0, 80))}
              </div>
            )}
          </div>
        </a>
      ))}
    </>
  );
}
