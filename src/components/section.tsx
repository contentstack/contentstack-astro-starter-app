import type { SectionProps } from "../type/components";

export default function Section({ section }: { section: SectionProps }) {
  function contentSection(key: any) {
    return (
      <div className="home-content" key={key}>
        {section.title_h2 && (
          <h2 {...(section.$?.title_h2 as {})}>{section.title_h2}</h2>
        )}
        {section.description && (
          <p {...(section.$?.description as {})}>{section.description}</p>
        )}
        {section.call_to_action.title && section.call_to_action.href ? (
          <a
            href={section.call_to_action.href}
            className="btn secondary-btn"
            {...section.call_to_action.$?.title as {}}
          >
            {section.call_to_action.title}
          </a>
        ) : (
          ""
        )}
      </div>
    );
  }

  function imageContent(key: any) {
    return (
      <img
        {...(section.image.$?.url as {})}
        src={section.image.url}
        alt={section.image.filename}
        key={key}
      />
    );
  }
  return (
    <div className="home-advisor-section">
      {section.image_alignment === "Left"
        ? [imageContent("key-image"), contentSection("key-contentstection")]
        : [contentSection("key-contentstection"), imageContent("key-image")]}
    </div>
  );
}
