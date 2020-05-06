import reduce from "lodash/reduce";

import cyoaText from "../data";
import { fromJS } from "immutable";

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

export const checkRequirements = (state, choice) => {
  const requirements = choice.get("requirements", null);
  if (!requirements) {
    return true;
  }
  const requirementKey = requirements.keySeq().toArray()[0];
  const stateChoices = state.get("choices");
  const relevantChoices = stateChoices
    .get(requirementKey)
    .map((val) => val.get("title"));
  return relevantChoices.includes(requirements.get(requirementKey));
};

export const setBombCollar = (state) => {
  const stateChoices = state.get("choices");
  const circumstancesChoices = stateChoices.get("circumstances");
  const defMap = new Map();
  const isBrigand =
    circumstancesChoices.get(0, defMap).get("title", "") === "Brigand";
  if (!isBrigand) {
    return state;
  }
  const updatedChoices = stateChoices.set(
    "drawbacks",
    stateChoices
      .get("drawbacks")
      .push(fromJS(cyoaText.default.drawbacks.choices[5]))
  );
  return state.set("choices", updatedChoices);
};

export const removeUnmetRequirements = (state) => {
  const stateChoices = state.get("choices");
  const updatedChoices = stateChoices.map((section) => {
    const updatedSection = section.filter((choice) =>
      checkRequirements(state, choice)
    );
    return updatedSection;
  });
  return setBombCollar(state.set("choices", updatedChoices));
};

const checkIfFree = (choice, state) => {
  const free = choice.get("free", null);
  if (!free) {
    return false;
  }
  const freeKey = free.keySeq().toArray()[0];
  const stateChoices = state.get("choices");
  const relevantChoices = stateChoices
    .get(freeKey)
    .map((val) => val.get("title"));
  return relevantChoices.includes(free.get(freeKey));
};

export const applyCosts = (state) => {
  const stateChoices = state.get("choices");
  const pointModifier = stateChoices.reduce((acc, section) => {
    const sectionPoints = section.reduce((acc2, curr) => {
      const cost = checkIfFree(curr, state) ? 0 : curr.get("cost", 0);
      return acc2 + cost;
    }, 0);
    return acc + sectionPoints;
  }, 0);
  return state.set("currentPoints", state.get("points") - pointModifier);
};
