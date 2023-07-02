import moment from "moment";
import { actionTypes } from "@/store/actionTypes/index.js";
import { ZERO_VALUE, NEXT_VALUE, PREV_VALUE } from "@/constants/index.js";

const initialState = {
//   date: moment().toDate(),
  timeOffset: ZERO_VALUE,
  previousTimeOffset: PREV_VALUE,
  nextTimeOffset: NEXT_VALUE

};

export const reduser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEW_DATE: {
      return {
        ...state,
        // date: moment().add(action.timeOffset, "hours").toDate(),
        timeOffset: action.timeOffset,
        previousTimeOffset: action.timeOffset - 1,
        nextTimeOffset: action.timeOffset + 1,
      };
    }
    default:
      return state;
  }
};
