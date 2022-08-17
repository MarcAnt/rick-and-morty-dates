import { BsGenderFemale, BsGenderMale, BsQuestionLg } from "react-icons/bs";
import { FaGenderless } from "react-icons/fa";

export const randomNum = (value: number) =>
  Math.abs(Math.round(Math.random() * value));

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

export const gendersIcons = {
  Male: BsGenderMale,
  Female: BsGenderFemale,
  Genderless: FaGenderless,
  Unknown: BsQuestionLg,
};
