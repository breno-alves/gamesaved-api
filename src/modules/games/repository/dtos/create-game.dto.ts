export type CreateGameDto = {
  slug: string;
  name: string;
  description?: string;
  metacritic: number;
  metacritic_url?: string;
  released: string;
  background_image: string;
};
