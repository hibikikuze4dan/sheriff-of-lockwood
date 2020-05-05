import { fromJS, isKeyed } from "immutable";
import cyoaText from "../data";
import { updateChoices } from "./utils";

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
    if (key === "choices") {
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
    return updateChoices(state, "gender", action.payload);
  } else if (action.type === "UPDATE_CIRCUMSTANCES") {
    return updateChoices(state, "circumstances", action.payload);
  } else if (action.type === "UPDATE_TREATMENT") {
    return updateChoices(state, "treatment", action.payload);
  }
  return state;
}
