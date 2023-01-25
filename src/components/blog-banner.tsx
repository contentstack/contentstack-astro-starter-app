import type { Banner } from "../type/components";

type Props = {
  blogBanner: Banner;
};

export default function BlogBanner({ blogBanner }: Props) {
  return (
    <div
      className="blog-page-banner"
      style={{
        background: `${blogBanner.bg_color ? blogBanner.bg_color : ""}`,
      }}
    >
      <div className="blog-page-content">
        {blogBanner.banner_title && (
          <h1 className="hero-title" {...(blogBanner.$?.banner_title as {})}>
            {blogBanner.banner_title}
          </h1>
        )}

        {blogBanner.banner_description && (
          <p
            className="hero-description"
            {...(blogBanner.$?.banner_description as {})}
          >
            {blogBanner.banner_description}
          </p>
        )}
      </div>
    </div>
  );
}
