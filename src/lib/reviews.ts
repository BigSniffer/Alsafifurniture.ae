import reviewsData from "../../data/google-reviews.json";

export type Review = {
  name: string;
  info: string;
  rating: number;
  date: string;
  text: string;
};

export type ReviewsData = {
  businessName: string;
  sourceUrl: string;
  overallRating: number;
  totalReviewCount: number;
  displayedReviewCount: number;
  minRatingDisplayed: number;
  scrapedAt: string;
  reviews: Review[];
};

export const reviews = reviewsData as ReviewsData;

/** Reviews that include written text, for the carousel. */
export const reviewsWithText = reviews.reviews.filter((r) => r.text.length > 0);
