import { FC } from "react";
import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { FilterState } from "./filters.models";
import { handleFiltersParams } from "../../utilities";

const SPECIES = [
  "Human",
  "Alien",
  "Animal",
  "Humanoid",
  "Robot",
  "Cronenberg",
  "Mythological",
  "Poopybutthole",
  "unknown",
];

export const FilterSpecies: FC<FilterState<string>> = ({
  paramsFilters,
  setParamsFilters,
}) => {
  return (
    <RadioGroup defaultValue={SPECIES[0]}>
      <Stack
        direction={["column", "row"]}
        wrap={"wrap"}
        spacing={0}
        columnGap={2}
        mt={2}
      >
        {SPECIES.map((specie) => {
          return (
            <Radio
              key={specie}
              value={specie}
              onChange={(e) =>
                handleFiltersParams<string>(
                  e.target.value,
                  setParamsFilters,
                  paramsFilters
                )
              }
            >
              <Text color={"brand.primary"}>{specie}</Text>
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default FilterSpecies;
