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

export const getCircumstance = (state) => {
  return state
    .get("choices")
    .get("circumstances")
    .get(0, new Map())
    .get("title", "");
};

export const deduplicateArmaments = (state) => {
  const stateChoices = state.get("choices");
  const circumstance = stateChoices
    .get("circumstances")
    .get(0, new Map())
    .get("title", "");
  const choices = stateChoices.get("armaments");
  const uniques = choices.filter((val) => val.get("unique") === true);
  if (uniques.size < 2 || circumstance === "Famous Gunslinger") {
    return state;
  }
  let numOfUniques = uniques.size;
  const newChoices = choices.filter((choice) => {
    if (choice.get("unique")) {
      if (numOfUniques > 1) {
        numOfUniques = numOfUniques - 1;
        return false;
      }
      return true;
    }
    return true;
  });
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
  const hasBombCollar = stateChoices
    .get("drawbacks")
    .filter((choice) => choice.get("title") === "Bomb Collar")
    .get(0, false);
  if (!isBrigand || hasBombCollar) {
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

export const lawbringerModifier = (state) => {
  const stateChoices = state.get("choices");
  const officeChoices = stateChoices
    .get("office")
    .map((choice) => choice.set("cost", choice.get("cost") - 1));
  const updatedChoices = stateChoices.set("office", officeChoices);
  return state.set("choices", updatedChoices);
};

export const regularOldJoeModifier = (state) => {
  const stateChoices = state.get("choices");
  let armamentDiscountApplied = false;
  const armamentsChoices = stateChoices
    .get("armaments")
    .sort((a, b) => {
      if (a.get("cost") < b.get("cost")) {
        return -1;
      }
      if (a.get("cost") > b.get("cost")) {
        return 1;
      }
      return 0;
    })
    .reverse()
    .map((choice) => {
      if (armamentDiscountApplied) {
        return choice;
      }
      const applyDiscount = choice.get("weight") === "Light";
      if (applyDiscount && !armamentDiscountApplied) {
        armamentDiscountApplied = true;
        return choice.set("cost", 0);
      }
      return choice;
    });
  let skillDiscountApplied = false;
  const skillsChoices = stateChoices
    .get("skills")
    .sort((a, b) => {
      if (a.get("cost") < b.get("cost")) {
        return -1;
      }
      if (a.get("cost") > b.get("cost")) {
        return 1;
      }
      return 0;
    })
    .reverse()
    .map((choice) => {
      if (skillDiscountApplied) {
        return choice;
      }
      if (!skillDiscountApplied) {
        skillDiscountApplied = true;
        return choice.set("cost", 0);
      }
      return choice;
    });
  const drawbacksChoices = stateChoices.get("drawbacks").map((choice) => {
    return choice.set("cost", choice.get("cost") + -1);
  });
  const updatedChoices = stateChoices
    .set("armaments", armamentsChoices)
    .set("skills", skillsChoices)
    .set("drawbacks", drawbacksChoices);
  return state.set("choices", updatedChoices);
};

export const exMilitaryModifier = (state) => {
  const stateChoices = state.get("choices");
  const armamentsChoices = stateChoices
    .get("armaments")
    .sort((a, b) => {
      if (a.get("cost") < b.get("cost")) {
        return -1;
      }
      if (a.get("cost") > b.get("cost")) {
        return 1;
      }
      return 0;
    })
    .reverse()
    .map((choice, index) => {
      if (choice.get("unique")) {
        return choice;
      }
      if (index < 2) {
        return choice.set("cost", 0);
      }
      return choice.set("cost", choice.get("cost") - 1);
    });
  const updatedChoices = stateChoices.set("armaments", armamentsChoices);
  return state.set("choices", updatedChoices);
};

export const famousGunslingerModifier = (state) => {
  const stateChoices = state.get("choices");
  const armamentsChoices = stateChoices.get("armaments").map((choice) => {
    if (choice.get("unique") && choice.get("title") !== "Wild West") {
      return choice.set("cost", choice.get("cost") - 2);
    }
    return choice;
  });
  const updatedChoices = stateChoices.set("armaments", armamentsChoices);
  return state.set("choices", updatedChoices);
};

export const famousShowmanModifier = (state) => {
  const stateChoices = state.get("choices");
  const deputiesChoices = stateChoices
    .get("deputies")
    .sort((a, b) => {
      if (a.get("cost") < b.get("cost")) {
        return -1;
      }
      if (a.get("cost") > b.get("cost")) {
        return 1;
      }
      return 0;
    })
    .reverse()
    .map((choice, index) => {
      if (index < 2) {
        return choice.set("cost", 0);
      }
      return choice.set("cost", choice.get("cost") - 1);
    });
  const updatedChoices = stateChoices.set("deputies", deputiesChoices);
  return state.set("choices", updatedChoices);
};

export const brigandModifier = (state) => {
  const stateChoices = state.get("choices");
  const bringandChoices = fromJS(
    stateChoices
      .reduce((acc, section) => {
        const accumulator = acc;
        section
          .filter((choice) => choice.get("bo", false))
          .forEach((choice) => accumulator.push(choice));
        return accumulator;
      }, [])
      .sort((a, b) => {
        if (a.get("cost") < b.get("cost")) {
          return -1;
        }
        if (a.get("cost") > b.get("cost")) {
          return 1;
        }
        return 0;
      })
      .reverse()
      .filter((val, index) => index < 2)
  );
  const updatedChoices = stateChoices.map((section) => {
    return section.map((choice) => {
      if (bringandChoices.includes(choice)) {
        return choice.set("cost", 0);
      }
      return choice;
    });
  });
  return state.set("choices", updatedChoices);
};

const applyCircumstanceModifier = (circumstance, state) => {
  const modifiers = {
    Lawbringer: lawbringerModifier,
    "Regular Old Joe": regularOldJoeModifier,
    "Ex-Military": exMilitaryModifier,
    "Famous Gunslinger": famousGunslingerModifier,
    "Famous Showman": famousShowmanModifier,
    Brigand: brigandModifier,
  };
  const func = modifiers[circumstance] ? modifiers[circumstance] : (val) => val;
  return func(state);
};

export const getCosts = (state) => {
  const circumstance = getCircumstance(state);
  let stateChoices = null;
  if (circumstance) {
    stateChoices = applyCircumstanceModifier(circumstance, state).get(
      "choices"
    );
  } else {
    stateChoices = state.get("choices");
  }
  const updatedChoices = stateChoices.map((section) => {
    return section.map((choice) => {
      const cost = checkIfFree(choice, state) ? 0 : choice.get("cost", 0);
      return choice.set("cost", cost);
    });
  });
  return state.set("choices", updatedChoices);
};

export const applyCosts = (state) => {
  const circumstance = getCircumstance(state);
  let stateChoices = null;
  if (circumstance) {
    stateChoices = applyCircumstanceModifier(circumstance, state).get(
      "choices"
    );
  } else {
    stateChoices = state.get("choices");
  }
  const pointModifier = stateChoices.reduce((acc, section) => {
    const sectionPoints = section.reduce((acc2, curr) => {
      const cost = checkIfFree(curr, state) ? 0 : curr.get("cost", 0);
      return acc2 + cost;
    }, 0);
    return acc + sectionPoints;
  }, 0);
  return state.set("currentPoints", state.get("points") - pointModifier);
};
