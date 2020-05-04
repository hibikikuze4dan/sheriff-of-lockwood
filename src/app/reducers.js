import { fromJS, isKeyed } from "immutable";
import cyoaText from "../data";

const initialState = fromJS(
  {
    outline: cyoaText.default,
    points: 25,
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
  return state;
}
