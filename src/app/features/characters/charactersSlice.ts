import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import { CharacterInfo, Characters, Info, InitialState } from "../../../models";
import { getCharacters } from "../../../services";

import { RootState } from "../../store";

const initialState = {
  info: {} as Info,
  characters: [],
  status: "idle",
  error: null,
  loading: false,
  filters: "",
  matches: [],
  currentCharacter: {} as CharacterInfo,
} as InitialState;

type FetchCharactersError = {
  message: string;
};

export const fetchCharacters = createAsyncThunk<
  Characters,
  { page: number; params: string },
  { rejectValue: FetchCharactersError }
>("characters/fetchCharacters", async ({ page, params }, thunkApi) => {
  return await getCharacters(page, params).then((response) => {
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
        localStorage.setItem("latestMatch", JSON.stringify([payload]));
      }
    },

    clearAllMatches(state) {
      state.matches = initialState.matches;
      localStorage.removeItem("latestMatch");
    },

    removeMatch(state, { payload }) {
      const { matches } = current(state);

      if (matches.length < 1) localStorage.removeItem("latestMatch");

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
      state.characters = payload.results;
      state.info = payload.info;
      state.status = "idle";
    });

    builder.addCase(fetchCharacters.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export const filteredCharacter = (state: RootState) =>
  state.characters.currentCharacter;

export const getAllCharacters = (state: RootState) =>
  state.characters.characters;

export const getMatches = (state: RootState) => state.characters.matches;
export const getInfo = (state: RootState) => state.characters.info;
export const getFilters = (state: RootState) => state.characters.filters;

export const selectStatus = (state: RootState) => state.characters.status;

export const { filterCharacter, setMatches, clearAllMatches, removeMatch } =
  characterSlice.actions;

export default characterSlice.reducer;
