export type Book = {
  title: string;
  author: string;
  rating: Rating;
  description: string;
  color: string;
  goodreadsRating: number;
};

export type Rating = {
  composite: number;
  impact: number;
  emotion: number;
  style: number;
  topics: number;
  length: number;
  difficulty: number;
}