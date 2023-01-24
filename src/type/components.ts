import type { JsonRTE } from "@contentstack/utils";
import type { Action, Image } from "./actions";

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: Employee;
}

type BucketList = [
  BucketArray:{
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: {
      title_h3: string;
      description: string;
      url: string;
      call_to_action: Action;
      icon: Image;
    };
  }
]

type Card = [
  cardArray: {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: {
      title_h3: string;
      description: string;
      call_to_action: Action;
    };
    }
]

type Article = {
  href: string;
  title: string;
  $: Article;
}

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: {
      title: string;
      featured_image: Image;
      body: string;
      url: string;
    };
  }
]

type Widget = {
  title_h2: string;
  type?: string;
  $: Widget;
}

export type Component = {
  hero_banner: Banner;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  from_blog?: FeaturedBlogData;
  section_with_cards?: Cards;
  section_with_html_code?: AdditionalParamProps;
  our_team?: TeamProps;
  widget?: Widget;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList;
    description: string;
    // $: AdditionalParam;
  }

export type Cards = {
    cards: Card;
  }
  
export type Banner = {
    banner_title:string;
    banner_description: string;
    bg_color: string;
    call_to_action: Action;
    banner_image: Image;
    text_color: string;
    $: Banner;
  }
  
export type AdditionalParamProps = {
    html_code_alignment: string;
    title: string;
    $: AdditionalParamProps;
    description: string;
    html_code: string;
  }
  
export type SectionProps = {
    title_h2: String;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: SectionProps;
  } 
  
export type TeamProps = {
    title_h2: string;
    description: string;
    $: TeamProps;
    employees: [Employee];
  }
  
export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: FeaturedBlogData;
}

export type RenderProps = {
  blogPost?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents:Component[];
}

// export type HeaderProps ={
//   title:string;
//   logo:Image;
//   uid:string;
//   navigation_menu:{
//     label:string
//     page_reference:{
//       uid:string
//       _content_type_uid:string
//     }[]
//   }[];
//   notification_bar:{
//     show_announcement: boolean;
//     announcement_text:JsonRTE;
//   }
// }

// export type FooterProps ={
// title:string;
// uid:string;
// logo:Image;
// navigation:{
//   link:{
//     title:string;
//     href:string;
//   }[]
// }
// social:{
//   social_share:{
//     link:{
//       title:string;
//       href:string;
//     }[]
//   }[]
// }
// copyright: JsonRTE
// }

