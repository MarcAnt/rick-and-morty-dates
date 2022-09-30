import { Dispatch, SetStateAction } from "react";
import { BsGenderFemale, BsGenderMale, BsQuestionLg } from "react-icons/bs";
import { FaGenderless } from "react-icons/fa";
import { sharingInformationService } from "./subject-manager";

export const randomNum = (value: number): number => {
  const random = Math.abs(Math.round(Math.random() * value));
  if (random === 0) return 1;
  return random;
};

/**
 *
 * @param text string to add ellipses at final
 * @param from first range value to slice the string
 * @param to last range value to slice the string
 * @returns string
 */

export const addEllipses = (text: string, from?: number, to?: number) => {
  const strLength = text.length;

  let strSliced = "";

  let fromNum = from ? from : 0;
  let toNum = to ? to : 12;

  if (strLength > toNum) strSliced += `${text.slice(fromNum, toNum)}...`;
  else strSliced += text;

  return strSliced;
};

export const createUrlParams = (
  typeFilter: string,
  filters: string | string[],
  AmpPosition?: "init" | "end" | "both"
) => {
  if (filters.length === 0)
    throw new Error("There is not data to create filter");
  if (!Array.isArray(filters))
    throw new Error("There is no data array to filter");

  let params = new URLSearchParams([[typeFilter, filters[0]]]).toString();

  if (AmpPosition === "both") params = `&${params}&`;
  if (AmpPosition === "init") params = `&${params}`;
  if (AmpPosition === "end") params = `${params}&`;

  // return q;
  return params;
};

export const gendersIcons = {
  Male: BsGenderMale,
  Female: BsGenderFemale,
  Genderless: FaGenderless,
  Unknown: BsQuestionLg,
};

export const handleFiltersParams = <T>(
  value: T,
  setParamsFilters: Dispatch<SetStateAction<T[]>>,
  paramsFilters: T[]
): void => {
  let index = paramsFilters.indexOf(value);
  if (index === -1) {
    setParamsFilters([value]);
    return;
  } else {
    setParamsFilters([]);
  }
};
