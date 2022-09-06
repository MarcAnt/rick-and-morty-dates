export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

export interface CharacterInfo {
  id: number;
  name: string;
  status: string;
  species: Species;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Origin;
  image: string;
  episode: string[];
  url: string;
  created: string;
  isMatch?: boolean;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Characters {
  results: CharacterInfo[];
  info: Info;
}

export type InitialState = {
  info: Info;
  status: "loading" | "idle";
  error: string | null;
  characters: CharacterInfo[];
  filters: string;
  matches: CharacterInfo[];
  currentCharacter: CharacterInfo;
};

export type Gender = "Female" | "Male" | "Unknown" | "Genderless";
export type Species =
  | "Alien"
  | "Human"
  | "Mythological Creature"
  | "Humanoid"
  | "Robot"
  | "Cronenberg"
  | "Poopybutthole"
  | "unknown";
