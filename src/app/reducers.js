import { fromJS } from "immutable";
import cyoaText from "../data";

const initialState = fromJS({
  outline: cyoaText.default,
  points: 25,
});

export function rootReducer(state = initialState, action) {
  return state;
}
