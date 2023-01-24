import React from 'react';

import Section from './section';
import HeroBanner from './hero-banner';
import BlogBanner from './blog-banner';
import CardSection from './card-section';
import TeamSection from './team-section';
import BlogSection from './blog-section';
import SectionBucket from './section-bucket';
import AboutSectionBucket from './about-section-bucket';
import SectionWithHtmlCode from './section-with-html-code';
import type { RenderProps } from "../type/components";

export default function RenderComponents(props: RenderProps) {
  const { pageComponents, blogPost, entryUid, contentTypeUid, locale } = props;
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponents?.map((component, key: number) => {
        if (component.hero_banner) {
          return blogPost ? (
            <BlogBanner
              blogBanner={component.hero_banner}
              key={component.hero_banner.banner_title}
            />
          ) : (
            <HeroBanner
              banner={component.hero_banner}
              key={component.hero_banner.banner_title}
            />
          );
        }
        if (component.section) {
          return (
            <Section section={component.section} key={`component-${key}`} />
          );
        }
        if (component.section_with_buckets) {
          return component.section_with_buckets.bucket_tabular ? (
            <AboutSectionBucket
              sectionWithBuckets={component.section_with_buckets}
              key={component.section_with_buckets.title_h2}
            />
          ) : (
            <SectionBucket
              section={component.section_with_buckets}
              key={component.section_with_buckets.title_h2}
            />
          );
        }
        if (component.from_blog) {
          return (
            <BlogSection
              fromBlog={component.from_blog}
              key={component.from_blog.title_h2}
            />
          );
        }
        if (component.section_with_cards) {
          return (
            <CardSection
              cards={component.section_with_cards.cards}
              key={`component-${key}`}
            />
          );
        }
        if (component.section_with_html_code) {
          return (
            <SectionWithHtmlCode
              embedCode={component.section_with_html_code}
              key={component.section_with_html_code.title}
            />
          );
        }
        if (component.our_team) {
          return (
            <TeamSection
              ourTeam={component.our_team}
              key={component.our_team.title_h2}
            />
          );
        }
      })}
    </div>
  );
}