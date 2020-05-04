import { createSelector } from "reselect";

import { makeFirstLetterUppercase } from "./utils";

export const getOutline = (state) => state.get("outline");

export const getPoints = (state) => state.get("points");

export const getSections = createSelector(getOutline, (outline) => {
  const sections = outline.reduce((acc, value, key) => {
    if (key === "title") {
      return acc;
    }
    const accumulator = acc;
    accumulator.push(key);
    return accumulator;
  }, []);
  console.log(outline.toJS());
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

export const getCircumstancesOutline = createSelector(getOutline, (outline) => {
  return outline.get("circumstances");
});

export const getTreatmentOutline = createSelector(getOutline, (outline) => {
  return outline.get("treatment");
});

export const getArmamentsOutline = createSelector(getOutline, (outline) => {
  return outline.get("armaments");
});

export const getSkillsOutline = createSelector(getOutline, (outline) => {
  return outline.get("skills");
});
