export interface Quote {
  id?: string; // Unique identifier of quote.
  author: string; // Author of a quote.
  text: string; // Quote text.
  source?: string; // optional link/source of quote.
  tags?: string[]; // optional list of tags related to quote.
  createdBy?: string; // app’s user who initiate creation of quote.
  createdAt?: number | Date; // timestamp of quote creation.
  updatedAt?: number | Date; // timestamp of quote update.
  isDeleted: boolean; // status of deletion (soft delete).
}

export interface QuoteDto {
  tags?: string[];
  source?: string;
  author: string;
  text: string;
}
