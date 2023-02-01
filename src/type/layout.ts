import type { Image } from "./actions";
import type { Component } from "./components";


export type EntryData = {
  title: string;
  url: string;
  $?: EntryData;
}

type Announcement = {
  show_announcement: boolean;
  announcement_text: string;
  $?: Announcement;
}

type PageRef = {
  title: string;
  url: string;
  // $?: AdditionalParam;
}

type Share = {
  link: Links;
  icon: Image;
}

type Social = {
  social_share: [Share];
  $?:Social
}

type Navigation = {
  link: [Links];
}

export type Author = {
  title: string;
  $?: Author;
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $?: Blog;
}

export type Posts = {
  locale: string;
  author: [Author];
  body: string;
  date: string;
  featured_image: {};
  is_archived: boolean;
  related_post: [Blog];
  seo: {};
  url:string;
  title: string;
  _owner: {}
}


export type HeaderProps = {
  locale:string;
  logo: Image;
  navigation_menu:[List]
  notification_bar: Announcement;
  title: string;
  uid: string;
  social: Social;
  navigation: Navigation;
  copyright: string;
  $?: HeaderProps
}

export type Entry = [
  entry: EntryData
]

type List = {
  label?: string;
  page_reference: [PageRef];
  $?: {};
  href?: string;
}

export type NavLinks = {
  label?: string;
}

export type Links = {
  label?: string;
  title: string;
  href: string;
  $?:Links;
}

export type PageProps = {
  locale: string;
  page_components: Component[];
  uid: string;
  url: string;
  title: string;
  seo: {};
}

export type FooterProps = {
  logo: Image;
  title: string;
  social: Social;
  navigation: Navigation;
  copyright: string;
  locale: string, 
  navigation_menu: [List];
  notification_bar: Announcement; 
  uid: string;
  $?: FooterProps;
}

export type ChilderenProps = {
  props: {};
  type: Function;
}