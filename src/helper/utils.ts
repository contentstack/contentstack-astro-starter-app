import Stack from '../contentstack-sdk';
import { addEditableTags } from '@contentstack/utils';
import type { FooterProps, HeaderProps } from "../type/layout";
import type { Page, Post } from "../type/page";


const liveEdit = import.meta.env.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';

export const getHeaderRes = async ():Promise<HeaderProps> => {
  const response = await Stack.getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  }) as [[HeaderProps]];

  liveEdit && addEditableTags(response[0][0], 'header', true);
  return response[0][0];
};

export const getFooterRes = async ():Promise<FooterProps> => {
  const response = await Stack.getEntry({
    contentTypeUid: 'footer',
    referenceFieldPath: undefined,
    jsonRtePath: ['copyright'],
  }) as [[FooterProps]];
  liveEdit && addEditableTags(response[0][0], 'footer', true);
  return response[0][0];
};

export const getAllEntries = async ():Promise<Page[]> => {
  const response = await Stack.getEntry({
    contentTypeUid: 'page',
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  })as [Page[]];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'page', true));
  return response[0];
};

export const getPageRes = async (entryUrl:string):Promise<Page> => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  }) as Page[];
  liveEdit && addEditableTags(response[0], 'page', true);
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  }) as [Post[]];
  liveEdit &&
    response[0].forEach((entry:any) => addEditableTags(entry, 'blog_post', true));
  return response[0];
};

export const getBlogPostRes = async (entryUrl:string) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  }) as Post[];
  liveEdit && addEditableTags(response[0], 'blog_post', true);
  return response[0];
};