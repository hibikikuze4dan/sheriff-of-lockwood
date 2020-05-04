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
  console.log(sections);
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
