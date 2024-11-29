export type TCollection = {
  id: number; // Auto-incrementing integer ID
  name: string; // Collection name
  description: string; // Collection description
  price: number; // Price as a float
  website: string; // Website URL
  xHandle: string; // X (formerly Twitter) handle
  discordHandle: string; // Discord handle
  telegramHandle: string; // Telegram handle
  instagramHandle: string; // Instagram handle
  creatorName: string; // Creator's name
  creatorEmail: string; // Creator's email address
  creatorDogeAddress: string; // Creator's Dogecoin address
  thumbnail: string; // Thumbnail image URL
  banner: string; // Banner image URL
  inscriptions: string; // Ordinal inscriptions string
  createdAt: string; // Timestamp for creation
  updatedAt: string; // Timestamp for last update
};
