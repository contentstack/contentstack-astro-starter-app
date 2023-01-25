import moment from "moment";
import parse from "html-react-parser";
import type { FeaturedBlog } from "../type/components";

function BlogList({ bloglist }: { bloglist: FeaturedBlog }) {
  let body: string = bloglist.body && bloglist.body.substr(0, 300);
  const stringLength = body.lastIndexOf(" ");
  body = `${body.substr(0, Math.min(body.length, stringLength))}...`;
  return (
    <div className="blog-list">
      {bloglist.featured_image && (
        <a href={bloglist.url}>
          <img
            className="blog-list-img"
            src={bloglist.featured_image.url}
            alt="blog img"
            {...(bloglist.featured_image.$?.url as {})}
          />
        </a>
      )}
      <div className="blog-content">
        {bloglist.title && (
          <a href={bloglist.url}>
            <h3 {...(bloglist.$?.title as {})}>{bloglist.title}</h3>
          </a>
        )}
        <p>
          <strong {...(bloglist.$?.date as {})}>
            {moment(bloglist.date).format("ddd, MMM D YYYY")}
          </strong>
          ,{" "}
          <strong {...(bloglist.author[0].$?.title as {})}>
            {bloglist.author[0].title}
          </strong>
        </p>
        <div {...(bloglist.$?.body as {})}>{parse(body)}</div>
        {bloglist.url ? (
          <a href={bloglist.url}>
            <span>{"Read more -->"}</span>
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BlogList;
