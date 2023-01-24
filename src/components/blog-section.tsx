import parse from 'html-react-parser';
import type { Image } from "../type/actions";

type AdditionalParam = {
  banner_title: string;
  banner_description: string;
  title: {};
  title_h2: string;
  body: string;
  date: string;
};

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
};

type FeaturedBlog = {
  title: string;
  featured_image: Image;
  body: string;
  url: string;
  $: AdditionalParam;
};

type FeaturedBlogData = {
  title_h2: string;
  view_articles: Article;
  featured_blogs: [FeaturedBlog];
  $: AdditionalParam;
};

type FeaturedBlogProps = {
  fromBlog: FeaturedBlogData;
};

export default function BlogSection(props: FeaturedBlogProps) {
  const fromBlog = props.fromBlog;

  return (
    <div className="community-section">
      <div className="community-head">
        {fromBlog.title_h2 && (
          <h2 {...(fromBlog.$?.title_h2 as {})}>{fromBlog.title_h2}</h2>
        )}
        {fromBlog.view_articles && (
          <a
            href={fromBlog.view_articles.href}
            className="btn secondary-btn article-btn"
            {...fromBlog.view_articles.$?.title}
          >
            {fromBlog.view_articles.title}
          </a>
        )}
      </div>
      <div className="home-featured-blogs">
        {fromBlog.featured_blogs.map((blog, index) => (
          <div className="featured-blog" key={index}>
            {blog.featured_image && (
              <img
                {...(blog.featured_image.$?.url as {})}
                src={blog.featured_image.url}
                alt={blog.featured_image.filename}
                className="blog-post-img"
              />
            )}
            <div className="featured-content">
              {blog.title && <h3 {...blog.$?.title}>{blog.title}</h3>}
              {typeof blog.body === "string" && (
                <div>
                  {parse(blog.body.slice(0, 300))}
                </div>
              )}
              {blog.url && (
                <a href={blog.url} className="blogpost-readmore">
                  {"Read More -->"}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
