import { fromJS, isKeyed } from "immutable";
import cyoaText from "../data";
import {
  updateSingleChoiceSection,
  updateMultiChoiceSection,
  deduplicateArmaments,
} from "./utils";

const defaultChoices = {
  gender: [],
  circumstances: [],
  treatment: [],
  armaments: [],
  skills: [],
  mounts: [],
  deputies: [],
  office: [],
  drawbacks: [],
  events: [],
};

const initialState = fromJS(
  {
    outline: cyoaText.default,
    points: 25,
    choices: defaultChoices,
    currentPoints: 25,
  },
  (key, value) => {
    if (key === "choices" || key === "outline") {
      return value.toOrderedMap();
    } else if (isKeyed(value)) {
      return value.toMap();
    }
    return value.toList();
  }
);

export function rootReducer(state = initialState, action) {
  console.log(action.type);
  if (action.type === "UPDATE_GENDER") {
    return updateSingleChoiceSection(state, "gender", action.payload);
  } else if (action.type === "UPDATE_CIRCUMSTANCES") {
    return updateSingleChoiceSection(state, "circumstances", action.payload);
  } else if (action.type === "UPDATE_TREATMENT") {
    return updateSingleChoiceSection(state, "treatment", action.payload);
  } else if (action.type === "UPDATE_ARMAMENTS") {
    return deduplicateArmaments(
      updateMultiChoiceSection(state, "armaments", action.payload)
    );
  } else if (action.type === "UPDATE_SKILLS") {
    return updateMultiChoiceSection(state, "skills", action.payload);
  } else if (action.type === "UPDATE_MOUNTS") {
    return updateMultiChoiceSection(state, "mounts", action.payload);
  } else if (action.type === "UPDATE_DEPUTIES") {
    return updateMultiChoiceSection(state, "deputies", action.payload);
  }
  return state;
}
