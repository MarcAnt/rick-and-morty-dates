import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";

import axios from "axios";
import { CharacterInfo, Characters, InitialState } from "../../../models";

import { randomNum } from "../../../utilities";
import { RootState } from "../../store";

const CHARACTERS_URL = "https://rickandmortyapi.com/api/character?page=";

const initialState = {
  characters: [],
  error: "",
  loading: false,
  filters: { genders: [], species: [] },
  matches: [],
  currentCharacter: {} as CharacterInfo,
} as InitialState;

export const fetchCharacters = createAsyncThunk<Characters, number>(
  "characters/fetchCharacters",
  async (page: number) => {
    return await axios.get(`${CHARACTERS_URL}${page}`).then((response) => {
      return response.data;
    });
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    filterCharacter(state, { payload }) {
      state.filters = payload;
    },
    setMatches(state, { payload }) {
      const { currentCharacter, matches } = current(state);

      const index = matches.indexOf(currentCharacter);

      if (state.matches.length <= 4 && index === -1) {
        state.matches.push(payload);
      }
    },

    clearAllMatches(state) {
      state.matches = [];
    },
    removeMatch(state, { payload }) {
      const { matches } = current(state);

      const filteredMatches = matches.filter((match) => {
        return match.id !== payload;
      });

      state.matches = filteredMatches;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCharacters.fulfilled, (state, { payload }) => {
      const { characters, filters } = current(state);

      const filtered = characters.filter((character) => {
        return (
          filters.genders.includes(character.gender) ||
          filters.species.includes(character.species)
        );
      });

      const randomChar = filtered[randomNum(filtered.length)];
      state.characters = payload.results;
      state.currentCharacter = randomChar;
    });
  },
});

export const selectedCharacter = (state: RootState) =>
  state.characters.currentCharacter;

export const getMatches = (state: RootState) => state.characters.matches;

export const { filterCharacter, setMatches, clearAllMatches, removeMatch } =
  characterSlice.actions;

export default characterSlice.reducer;
