import { FC } from "react";
import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { FilterState } from "./filters.models";
import { handleFiltersParams } from "../../utilities";

const GENDERS = ["Female", "Male", "Genderless", "Unknown"];

export const FilterGenders: FC<FilterState<string>> = ({
  paramsFilters,
  setParamsFilters,
}) => {
  return (
    <RadioGroup defaultValue={GENDERS[0]}>
      <Stack
        direction={["column", "row"]}
        wrap={"wrap"}
        spacing={0}
        columnGap={2}
        mt={2}
      >
        {GENDERS.map((gender) => {
          return (
            <Radio
              key={gender}
              value={gender}
              onChange={(e) =>
                handleFiltersParams<string>(
                  e.target.value,
                  setParamsFilters,
                  paramsFilters
                )
              }
            >
              <Text color={"brand.primary"}>{gender}</Text>
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};
