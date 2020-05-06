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

export function updateArmaments(choice, picked) {
  const payload = {
    choice,
    picked,
  };
  return { type: "UPDATE_ARMAMENTS", payload: fromJS(payload) };
}

export function updateSkills(choice, picked) {
  const payload = {
    choice,
    picked,
  };
  return { type: "UPDATE_SKILLS", payload: fromJS(payload) };
}

export function updateMounts(choice, picked) {
  const payload = {
    choice,
    picked,
  };
  return { type: "UPDATE_MOUNTS", payload: fromJS(payload) };
}

export function updateDeputies(choice, picked) {
  const payload = {
    choice,
    picked,
  };
  return { type: "UPDATE_DEPUTIES", payload: fromJS(payload) };
}
