import { createSelector } from "reselect";

import { makeFirstLetterUppercase } from "./utils";
import { fromJS } from "immutable";

export const getChoices = (state) => state.get("choices");

export const getOutline = (state) => state.get("outline");

export const getDefaultPoints = (state) => state.get("points");

export const getPoints = (state) => state.get("currentPoints");

export const getSections = createSelector(getOutline, (outline) => {
  const sections = outline.reduce((acc, value, key) => {
    if (key === "title") {
      return acc;
    }
    const accumulator = acc;
    accumulator.push(key);
    return accumulator;
  }, []);

  return sections;
});

export const getSectionsFormattedTitle = createSelector(
  getSections,
  (sections) => {
    const formattedSections = sections.map((val) =>
      makeFirstLetterUppercase(val)
    );
    return formattedSections;
  }
);

export const getOpeningOutline = createSelector(getOutline, (outline) => {
  return outline.get("opening");
});

export const getGenderOutline = createSelector(getOutline, (outline) => {
  return outline.get("gender");
});

export const getGenderChoices = createSelector(getChoices, (choices) => {
  return choices.get("gender").map((val) => val.get("title"));
});

export const getCircumstancesOutline = createSelector(getOutline, (outline) => {
  return outline.get("circumstances");
});

export const getCircumstancesChoices = createSelector(getChoices, (choices) => {
  return choices.get("circumstances").map((val) => val.get("title"));
});

export const getTreatmentOutline = createSelector(getOutline, (outline) => {
  return outline.get("treatment");
});

export const getTreatmentChoices = createSelector(getChoices, (choices) => {
  return choices.get("treatment").map((val) => val.get("title"));
});

export const getArmamentsOutline = createSelector(getOutline, (outline) => {
  return outline.get("armaments");
});

export const getArmamentsChoices = createSelector(getChoices, (choices) => {
  return choices.get("armaments").map((val) => val.get("title"));
});

export const getSkillsOutline = createSelector(getOutline, (outline) => {
  return outline.get("skills");
});

export const getSkillsChoices = createSelector(getChoices, (choices) => {
  return choices.get("skills").map((val) => val.get("title"));
});

export const getMountsOutline = createSelector(getOutline, (outline) => {
  return outline.get("mounts");
});

export const getMountsChoices = createSelector(getChoices, (choices) => {
  return choices.get("mounts").map((val) => val.get("title"));
});

export const getDeputiesOutline = createSelector(getOutline, (outline) => {
  return outline.get("deputies");
});

export const getDeputiesChoices = createSelector(getChoices, (choices) => {
  return choices.get("deputies").map((val) => val.get("title"));
});

export const getOfficeOutline = createSelector(getOutline, (outline) => {
  return outline.get("office");
});

export const getOfficeChoices = createSelector(getChoices, (choices) => {
  return choices.get("office").map((val) => val.get("title"));
});

export const getDrawbacksOutline = createSelector(getOutline, (outline) => {
  return outline.get("drawbacks");
});

export const getDrawbacksChoices = createSelector(getChoices, (choices) => {
  return choices.get("drawbacks").map((val) => val.get("title"));
});

export const getEventsOutline = createSelector(getOutline, (outline) => {
  return outline.get("events");
});

export const getEventsChoices = createSelector(getChoices, (choices) => {
  return choices.get("events").map((val) => val.get("title"));
});

export const getSpendingBreakdown = createSelector(
  [getDefaultPoints, getChoices],
  (points, choices) => {
    let modifyPoints = points;
    const breakdown = choices
      .map((section) => {
        return section.map((choice) => {
          const cost = choice.get("cost", 0);
          const returnObj = fromJS({
            title: choice.get("title"),
            cost,
            prev: modifyPoints,
            curr: modifyPoints - cost,
          });
          modifyPoints = modifyPoints - cost;
          return returnObj;
        });
      })
      .reduce((acc, section) => {
        const accumulator = acc;
        accumulator.push(section.toJS());
        return accumulator;
      }, []);
    return breakdown;
  }
);

export const getChoicesSections = createSelector(getChoices, (choices) => {
  return choices.reduce((acc, cur, key) => {
    const accumulator = acc;
    accumulator.push(makeFirstLetterUppercase(key));
    return accumulator;
  }, []);
});
