import { User } from "next-auth";
import { LOCALES } from "../constants";
import { EventInput } from "@fullcalendar/core";

export interface CalendarEvent extends EventInput {
  extendedProps?: {
    post_type?: string;
  };
}

export interface ProfileFields {
  id: number;
  name: string;
  password: string;
  passwordConfirmation: string;
  youtube: string;
  instagram: string;
  url: string;
}

export interface MVUser extends User {
  id: string;
  email: string;
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
  user: {
    id: number;
    email: string;
    name: string;
    first_name: string;
    last_name: string;
    avatar: string;
    roles: Array<string>;
  }
}

export type Locale = (typeof LOCALES)[number];

export type PageName =
  | "404"
  | "about"
  | "account"
  | "blog"
  | "calendar"
  | "contact"
  | "events"
  | "forgotPassword"
  | "home"
  | "map"
  | "news"
  | "privacy"
  | "races"
  | "race"
  | "resetPassword"
  | "signin"
  | "signup"
  | 'single-blog'
  | 'single-page'
  | 'taxonomy'
  | "terms";

export type Comment = {
  id: number;
  author_name: string;
  content: string;
  date: string;
};
export type BlockName =
  | "core/paragraph"
  | "core/image"
  | "core/video"
  | "core/heading"
  | "core/quote"
  | "core/gallery"
  | "core/list-item"
  | "core/embed"
  | "core/list";
export type Block = {
  blockName: BlockName;
  attrs: Record<string, string>;
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
  city?: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  country_short: string;
  post_code?: string;
  name?: string;
  place_id?: string;
};
export type RefLink = {
  title: string;
  url: string;
};

export type PostStatus = "draft" | "publish";

export type MVRace = {
  id: number;
  title: string;
  thumbnail?: string;
  thumbnail_lg?: string;
  thumbnail_full?: string;
  background_image?: string;
  slug: string;
  post_type: "race";
  content: Array<Block>;
  content_json: Array<Block>;
  excerpt?: string;
  start_date: string;
  end_date?: string;
  registration_date?: string;
  registration_end_date?: string;
  location_data: Location;
  status: PostStatus;
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
  tiktok?: string;
  youtube?: string;
  links?: Array<RefLink>;
  comments: Array<Comment>;
  athlete_category: Array<Taxonomy>;
  fai_category: Array<Taxonomy>;
  race_format: Array<Taxonomy>;
  yoast_head?: string;
  yoast_head_json: object;
  tracking_url?: string;
  results_url?: string;
};
export type MVAd = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  url: string;
};
export type MVNews = {
  id: number;
  title: string;
  slug: string;
  thumbnail?: string;
  thumbnail_full?: string;
  content_json: Array<Block>;
  post_type: 'news';
  status: PostStatus;
  date: string;
  excerpt?: string;
  comments: Array<Comment>;
  news_category: Array<Taxonomy>;
  yoast_head?: string;
  yoast_head_json: object;
};
export type MVBlog = {
  id: number;
  title: string;
  slug: string;
  thumbnail?: string;
  thumbnail_full?: string;
  content_json: Array<Block>;
  post_type: 'post';
  date: string;
  excerpt?: string;
  comments: Array<Comment>;
  category: Array<Taxonomy>;
  status: PostStatus;
  yoast_head?: string;
  yoast_head_json: object;
};
export type ApiResponse<T> = {
  data: T;
  messages: Array<string>;
};
export type RegistrationResponse = {
  success: boolean;
  messages: Array<string>;
};
export type HomePhoto = {
  title: string;
  thumbnail: string;
  pathname: string;
}
export type HomeResponse = {
  upcoming: Array<MVRace>;
  ads: Array<MVAd>;
  news: Array<MVNews>;
  blog: Array<MVBlog>;
  images: Array<HomePhoto>;
};
export type FilterOptions = {
  athlete_categories: Array<Taxonomy>;
  fai_categories: Array<Taxonomy>;
  race_formats: Array<Taxonomy>;
};
export type CalendarResponse = {
  calendar: Array<MVRace>;
  filter_options: FilterOptions;
};

export type SidebarContent = {
  ads: Array<MVAd>;
  upcoming: Array<MVRace>;
  blogs: Array<MVBlog>;
}

export type UserSubscription = {
  post_title: string;
  post_id: string;
  subscription_id: string;
  created_at: string;
  deleted_at: string;
}

export type SearchResult = {
  title: string;
  slug: string;
  type: "post" | "news" | "race";
  thumbnail?: string;
  language: keyof typeof LOCALES;
}

export type SiteTaxonomies = {
    categories: Array<Taxonomy>;
    news_categories: Array<Taxonomy>;
    fai_categories: Array<Taxonomy>;
    race_formats: Array<Taxonomy>;
    athlete_categories: Array<Taxonomy>;
}

export type TaxonomyPage = {
  taxonomy: {
    name: string;
    term: string;
    image: string;
    description: string;  
  };
  data: Array<MVNews | MVBlog>
}