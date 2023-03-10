export interface Data<T> {
  totalCount: number;
  pageInfo: PaginationInfo;
  edges: Edge<T>[];
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface PaginationInfo {
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
}

export interface Collections {
  collections: Data<Collection>;
}
export interface Collection {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  featuredAt: string;
  followersCount: number;
  url: string;
}

export interface CollectionWithPosts {
  collection: {
    id: string;
    name: string;
    posts: Data<Post>;
  };
}

export interface Posts {
  posts: Data<Post>;
}
export interface Post {
  id: string;
  name: string;
  commentsCount: number;
  featuredAt: string;
  createdAt: string;
  tagline: string;
  url: string;
  website: string;
  description: string;
  votesCount: number;
  slug: string;
  reviewsCount: number;
  collections: Data<Collection>;
  topics: Data<Topic>;
  comments: Data<Comments>;
}

export interface Topic {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  followersCount: number;
  postsCount: number;
}

export interface Comments {
  id: number;
  body: string;
  createdAt: Date;
  votesCount: number;
}
