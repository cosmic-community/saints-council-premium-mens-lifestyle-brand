// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
}

// Category object type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name: string;
    description?: string;
    category_type: {
      key: 'product' | 'content';
      value: 'Product Category' | 'Content Category';
    };
    display_order?: number;
  };
}

// Product object type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name: string;
    tagline?: string;
    description: string;
    price: number;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    product_gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category: Category;
    key_features?: string[];
    in_stock?: boolean;
    featured_product?: boolean;
  };
}

// Journal Article object type
export interface JournalArticle extends CosmicObject {
  type: 'journal-articles';
  metadata: {
    article_title: string;
    subtitle?: string;
    content: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    category: Category;
    author?: string;
    read_time?: number;
    featured_article?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}