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
  filters: { genders: Gender[]; species: Species[] };
  matches: CharacterInfo[];
  currentCharacter: CharacterInfo;
};

export interface FiltersBoolean {
  species: SpeciesBoolean;
  gender: GenderBoolean;
}

interface GenderBoolean {
  female: boolean;
  male: boolean;
  genderless: boolean;
  unknown: boolean;
}

interface SpeciesBoolean {
  human: boolean;
  alien: boolean;
  mythological: boolean;
  humanoid: boolean;
  other: boolean;
}

export type Gender = "Female" | "Male" | "Unknown" | "Genderless";
export type Species =
  | "Alien"
  | "Human"
  | "Mythological Creature"
  | "Humanoid"
  | "Others";
