export interface Post {
  title: string;
  date?: string;
  tags?: string | string[];
  content: string;
  slug?: string;
  key?: string;
  lastModified?: Date;
}
