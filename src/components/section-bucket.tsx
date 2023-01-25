import parse from 'html-react-parser';
import type { SectionWithBucket } from "../type/components";

export default function SectionBucket({ section }: {section: SectionWithBucket}) {
  return (
    <div className='member-main-section'>
      <div className='member-head'>
        {section.title_h2 && (
          <h2 {...section.$?.title_h2 as {}}>{section.title_h2}</h2>
        )}
        {section.description && (
          <p {...section.$?.description as {}}>{section.description}</p>
        )}
      </div>
      <div className='member-section'>
        {section.buckets?.map((bucket, index) => (
          <div className='content-section' key={index}>
            {bucket.icon && (
              <img
                {...bucket.icon.$?.url as {}}
                src={bucket.icon.url}
                alt='bucket icon'
              />
            )}

            {bucket.title_h3 ? (
              <h3 {...bucket.$?.title_h3 as {}}>{bucket.title_h3}</h3>
            ) : (
              ''
            )}
            {typeof bucket.description === 'string' && (
              <div {...bucket.$?.description as {}}>{
                parse(bucket.description)
                }</div>
            )}
            {bucket.call_to_action.title ? (
              <a
                href={
                  bucket.call_to_action.href ? bucket.call_to_action.href : '#'
                }
              >
                {`${bucket.call_to_action.title} -->`}
              </a>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}