import { fromJS, isKeyed } from "immutable";
import cyoaText from "../data";
import {
  updateSingleChoiceSection,
  updateMultiChoiceSection,
  deduplicateArmaments,
  removeUnmetRequirements,
  applyCosts,
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
    location: window.location.href.split("/").pop(),
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
    return applyCosts(
      removeUnmetRequirements(
        deduplicateArmaments(
          updateSingleChoiceSection(state, "circumstances", action.payload)
        )
      )
    );
  } else if (action.type === "UPDATE_TREATMENT") {
    return updateSingleChoiceSection(state, "treatment", action.payload);
  } else if (action.type === "UPDATE_ARMAMENTS") {
    return applyCosts(
      removeUnmetRequirements(
        deduplicateArmaments(
          updateMultiChoiceSection(state, "armaments", action.payload)
        )
      )
    );
  } else if (action.type === "UPDATE_SKILLS") {
    return applyCosts(
      removeUnmetRequirements(
        updateMultiChoiceSection(state, "skills", action.payload)
      )
    );
  } else if (action.type === "UPDATE_MOUNTS") {
    return applyCosts(
      removeUnmetRequirements(
        updateMultiChoiceSection(state, "mounts", action.payload)
      )
    );
  } else if (action.type === "UPDATE_DEPUTIES") {
    return applyCosts(
      removeUnmetRequirements(
        updateMultiChoiceSection(state, "deputies", action.payload)
      )
    );
  } else if (action.type === "UPDATE_OFFICE") {
    return applyCosts(
      removeUnmetRequirements(
        updateMultiChoiceSection(state, "office", action.payload)
      )
    );
  } else if (action.type === "UPDATE_DRAWBACKS") {
    return applyCosts(
      removeUnmetRequirements(
        updateMultiChoiceSection(state, "drawbacks", action.payload)
      )
    );
  } else if (action.type === "UPDATE_EVENTS") {
    return updateMultiChoiceSection(state, "events", action.payload);
  } else if (action.type === "UPDATE_LOCATION") {
    return state.set("location", action.payload);
  }
  return state;
}
