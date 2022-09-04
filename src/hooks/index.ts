import { useEffect, useState } from "react";
import { fetchCharacters } from "../app/features/characters/charactersSlice";
import { useAppDispatch } from "../app/store";

export const useFetchCharacter = ({
  page,
  params,
}: {
  page: number;
  params: string;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCharacters({ page, params }));

    //reset count page after change filters
  }, [page, params]);

  return {};
};

export const useBoolean = () => {
  const [change, setChange] = useState(false);
  return { change, setChange };
};
