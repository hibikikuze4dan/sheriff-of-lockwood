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

export const updateSingleChoiceSection = (state, choiceType, update) => {
  const choices = state.get("choices").set(choiceType, update);
  console.log(choices.toJS());
  return state.set("choices", choices);
};

const removeChoice = (choices, choice) => {
  return choices.delete(choices.indexOf(choice));
};

export const updateMultiChoiceSection = (state, choiceType, update) => {
  const choice = update.get("choice");
  const picked = update.get("picked");
  const stateChoices = state.get("choices");
  const choices = stateChoices.get(choiceType);
  const updatedChoices = picked
    ? stateChoices.set(choiceType, removeChoice(choices, choice))
    : stateChoices.set(choiceType, choices.push(choice));

  console.log(updatedChoices.toJS());
  return state.set("choices", updatedChoices);
};

export const deduplicateArmaments = (state) => {
  const stateChoices = state.get("choices");
  const choices = stateChoices.get("armaments");
  const uniques = choices.filter((val) => val.get("unique") === true);
  if (uniques.size < 2) {
    return state;
  }
  const newChoices = removeChoice(choices, uniques.get(0));
  const updatedChoices = stateChoices.set("armaments", newChoices);
  return state.set("choices", updatedChoices);
};
