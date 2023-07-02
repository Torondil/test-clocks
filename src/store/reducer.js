import moment from "moment";
import { actionTypes } from "@/store/actionTypes/index.js";
import { ZONE_STEP } from "@/constants/index.js";

const initialState = {
  timeOffset: moment().zone(),
  previousTimeOffset: moment().zone() - ZONE_STEP,
  nextTimeOffset: moment().zone() + ZONE_STEP
};

export const reduser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NEW_DATE: {
      return {
        ...state,
        timeOffset: action.timeOffset,
        previousTimeOffset: action.timeOffset + ZONE_STEP,
        nextTimeOffset: action.timeOffset - ZONE_STEP,
      };
    }
    default:
      return state;
  }
};
