import reduce from "lodash/reduce";

export const makeFirstLetterUppercase = (string) =>
  string
    .split("")
    .reduce((acc, letter, ind) => {
      const accumulator = acc;
      const letterToPush = ind === 0 ? letter.toUpperCase() : letter;
      accumulator.push(letterToPush);
      return accumulator;
    }, [])
    .join("");

export const extractRequirements = (choice) => {
  const requirements = choice?.requirements;

  if (!requirements) {
    return [];
  }

  const requirementsArray = reduce(
    requirements,
    (acc, val) => {
      const accumulator = acc;
      accumulator.push(val);
      return accumulator;
    },
    []
  );
  return requirementsArray;
};

export const updateChoices = (state, choiceType, update) => {
  const choices = state.get("choices").set(choiceType, update);
  console.log(choices.toJS());
  return state.set("choices", choices);
};
