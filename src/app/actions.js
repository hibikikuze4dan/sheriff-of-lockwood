import { fromJS } from "immutable";

export function updateGender(choice) {
  return { type: "UPDATE_GENDER", payload: fromJS([choice]) };
}

export function updateCircumstances(choice) {
  return { type: "UPDATE_CIRCUMSTANCES", payload: fromJS([choice]) };
}

export function updateTreatment(choice) {
  return { type: "UPDATE_TREATMENT", payload: fromJS([choice]) };
}
