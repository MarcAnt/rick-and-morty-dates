import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import { CharacterInfo, Characters, Info, InitialState } from "../../../models";
import { getCharacters } from "../../../services";

import { randomNum } from "../../../utilities";
import { RootState } from "../../store";

const initialState = {
  info: {} as Info,
  characters: [],
  status: "idle",
  error: null,
  loading: false,
  filters: { genders: [], species: [] },
  matches: [],
  currentCharacter: {} as CharacterInfo,
} as InitialState;

type FetchCharactersError = {
  message: string;
};

export const fetchCharacters = createAsyncThunk<
  Characters,
  number,
  { rejectValue: FetchCharactersError }
>("characters/fetchCharacters", async (page: number, thunkApi) => {
  return await getCharacters(page).then((response) => {
    // Check if status is not okay:
    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({
        message: "Failed to fetch characters.",
      });
    }

    return response.data;
  });
});

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
      state.matches = initialState.matches;
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
    builder.addCase(fetchCharacters.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchCharacters.fulfilled, (state, { payload }) => {
      const { characters, filters } = current(state);

      //Filter by gender
      const filteredGenres = characters.filter((character) => {
        return filters.genders.includes(character.gender);
      });

      //Filter by species
      const filteredEspecies = characters.filter((character) => {
        return filters.species.includes(character.species);
      });

      //Filter by others
      const filteredOtherEspecies = characters.filter((character) => {
        if (filters.species.includes("Others")) {
          if (
            !character.species.includes("Alien") &&
            !character.species.includes("Human") &&
            !character.species.includes("Humanoid") &&
            !character.species.includes("Mythological Creature")
          ) {
            return character;
          }
        }
      });

      //Generate non repeat results
      const resultsFiltered = [
        ...new Set([
          ...filteredEspecies,
          ...filteredGenres,
          ...filteredOtherEspecies,
        ]),
      ];

      //Filter by two filters
      const finalFilters = resultsFiltered.filter((final) => {
        return (
          filters.species.includes(final.species) ||
          filters.genders.includes(final.gender)
        );
      });

      //Filter onlu by gender in other species
      const finalFiltersOthers = filteredOtherEspecies.filter((final) => {
        return filters.genders.includes(final.gender);
      });

      //Merge all
      const mergeFilter = [...finalFilters, ...finalFiltersOthers];

      const randomChar = mergeFilter[randomNum(mergeFilter.length)];

      state.characters = payload.results;
      state.info = payload.info;
      state.status = "idle";
      state.currentCharacter = randomChar ? randomChar : ({} as CharacterInfo);
    });

    builder.addCase(fetchCharacters.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const filteredCharacter = (state: RootState) =>
  state.characters.currentCharacter;

export const getMatches = (state: RootState) => state.characters.matches;
export const getInfo = (state: RootState) => state.characters.info;

export const selectStatus = (state: RootState) => state.characters.status;

export const { filterCharacter, setMatches, clearAllMatches, removeMatch } =
  characterSlice.actions;

export default characterSlice.reducer;
