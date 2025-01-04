import { LOCALES } from "../constants";

export type Locale = (typeof LOCALES)[number];

export type PageName =
  | "home"
  | "about"
  | "contact"
  | "404"
  | "races"
  | "events"
  | "news"
  | "blog"
  | "signin"
  | "account"
  | "privacy"
  | "terms";

export type Comment = {
  id: number;
  name: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
};
export type BlockName =
  | "core/paragraph"
  | "core/image"
  | "core/video"
  | "core/list";
export type Block = {
  blockName: BlockName;
  attrs: Array<unknown>;
  innerBlocks: Array<Block>;
  innerHTML: string;
  innerContent: Array<string>;
};

export type Taxonomy = {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
};
export type Location = {
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  country_short: string;
};
export type RefLink = {
  title: string;
  url: string;
};
export type MVEvent = {
  id: number;
  name: string;
  post_type: "event";
};
export type MVRace = {
  id: number;
  title: string;
  thumbnail?: string;
  thumbnail_lg?: string;
  thumbnail_full?: string;
  slug: string;
  post_type: "race";
  content: Array<Block>;
  excerpt?: string;
  start_date?: string;
  end_date?: string;
  registration_date?: string;
  registration_end_date?: string;
  location?: Location;
  length?: number;
  duration?: number;
  format: "speed" | "points" | "distance" | "mix";
  embed_code?: string;
  display_option?: "content" | "popup";
  max_width?: number;
  facebook?: string;
  x?: string;
  instagram?: string;
  website?: string;
  links?: Array<RefLink>;
  comments: Array<Comment>;
  athlete_category: Array<Taxonomy>;
  fai_category: Array<Taxonomy>;
  race_category: Array<Taxonomy>;
};
export type MVAd = {
  id: number;
  title: string;
};
export type MVNews = {
  id: number;
  title: string;
  thumbnail?: string;
  content: Array<Block>;
  date: string;
  comments: Array<Comment>;
};
export type MVBlog = {
  id: number;
  title: string;
  thumbnail?: string;
  content: Array<Block>;
  date: string;
  comments: Array<Comment>;
};
export type ApiResponse<T> = {
  data: T;
  messages: Array<string>;
};
export type HomeResponse = {
  upcoming: Array<MVEvent | MVRace>;
  ads: Array<MVAd>;
  news: Array<MVNews>;
  blog: Array<MVBlog>;
};
