import axios from "axios";
import { Characters, UserInfo } from "../models";

export const CHARACTERS_URL = "https://rickandmortyapi.com/api";
// https://rickandmortyapi.com/api/character/?page=1&gender=Female&gender=Male&species=Human

export const USERS_URL = import.meta.env.DEV
  ? "https://rick-morty-match.herokuapp.com/api"
  : "http://localhost:8000/api";

export const getCharacters = async (page: number, params: string) => {
  return axios.get<Characters>(
    `${CHARACTERS_URL}/character?page=${page}${params}`
  );
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createUser = async ({ name, email }: UserInfo) => {
  return axios
    .post<UserInfo>(`${USERS_URL}/user`, { name, email }, config)
    .catch((error) => error);
};

export const siginUser = async ({ email }: Omit<UserInfo, "name">) => {
  return axios
    .post<UserInfo>(`${USERS_URL}/auth/login`, { email }, config)
    .catch((error) => error);
};

export const getUser = async (token: string) => {
  return axios
    .get<UserInfo>(`${USERS_URL}/user/profile`, {
      headers: { "x-token": token },
    })
    .catch((error) => error);
};
