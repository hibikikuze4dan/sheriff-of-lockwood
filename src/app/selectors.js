import { createSelector } from "reselect";

import { makeFirstLetterUppercase } from "./utils";

export const getChoices = (state) => state.get("choices");

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

export const getSkillsOutline = createSelector(getOutline, (outline) => {
  return outline.get("skills");
});

export const getMountsOutline = createSelector(getOutline, (outline) => {
  return outline.get("mounts");
});

export const getDeputiesOutline = createSelector(getOutline, (outline) => {
  return outline.get("deputies");
});

export const getOfficeOutline = createSelector(getOutline, (outline) => {
  return outline.get("office");
});

export const getDrawbacksOutline = createSelector(getOutline, (outline) => {
  return outline.get("drawbacks");
});

export const getEventsOutline = createSelector(getOutline, (outline) => {
  return outline.get("events");
});
