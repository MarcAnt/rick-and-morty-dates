import { useEffect, useState } from "react";
import {
  fetchCharacters,
  getAllCharacters,
} from "../app/features/characters/charactersSlice";
import { useAppDispatch } from "../app/hooks";
import { useAppSelector } from "../app/hooks";

type FetchCharactersParams = {
  page: number;
  params: string;
};

export const useFetchCharacter = ({ page, params }: FetchCharactersParams) => {
  const dispatch = useAppDispatch();

  const characters = useAppSelector(getAllCharacters);

  useEffect(() => {
    dispatch(fetchCharacters({ page: page, params: params }));
  }, [page]);

  //changing filters and set to 1
  useEffect(() => {
    dispatch(fetchCharacters({ page: 1, params: params }));
  }, [params]);

  return characters;
};

export const useBoolean = (value: string | boolean) => {
  const [change, setChange] = useState(value);
  return { change, setChange };
};
