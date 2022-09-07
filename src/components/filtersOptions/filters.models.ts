import { Dispatch, SetStateAction } from "react";

export interface FilterState<T> {
  setParamsFilters: Dispatch<SetStateAction<T[]>>;
  paramsFilters: T[];
}
