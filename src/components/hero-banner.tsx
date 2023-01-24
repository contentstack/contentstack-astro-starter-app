import type { Image, Action } from "../type/actions";

type AdditionalParam = {
  banner_title: string;
  banner_description: string;
}

type Banner = {
  bg_color: string;
  text_color: string;
  banner_title: string;
  banner_description: string;
  call_to_action: Action;
  banner_image: Image;
  $: Banner;
}

type BannerProps = {
  banner: Banner;
}

export default function HeroBanner(props: BannerProps) {
  const banner = props.banner;

  return (
    <div
      className="hero-banner"
      style={{
        background: banner?.bg_color ? banner.bg_color : "",
      }}
    >
      <div
        className="home-content"
        style={{
          color: banner?.text_color ? banner.text_color : "#000",
        }}
      >
        {banner.banner_title && (
          <h1 className="hero-title" {...(banner.$?.banner_title as {})}>
            {banner.banner_title}
          </h1>
        )}
        {banner.banner_description ? (
          <p
            className="hero-description "
            style={{
              color: banner?.text_color ? banner.text_color : "#222",
            }}
            {...(banner.$?.banner_description as {})}
          >
            {banner?.banner_description}
          </p>
        ) : (
          ""
        )}
        {banner.call_to_action.title && banner.call_to_action.href ? (
          <a
            href={banner?.call_to_action.href}
            className="btn tertiary-btn"
            // {...banner.call_to_action.$?.title}
          >
            {banner?.call_to_action.title}
          </a>
        ) : (
          ""
        )}
      </div>
      {banner.banner_image ? (
        <img
          alt={banner.banner_image.filename}
          src={banner.banner_image.url}
          {...(banner.banner_image.$?.url as {})}
        />
      ) : (
        ""
      )}
    </div>
  );
}
