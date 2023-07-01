import moment from "moment";

let initialState = {
    date: moment().toDate(),
    timeOffset: 0,
  };
  
  export const reduser = (state = initialState, action) => {
    switch (action.type) {
      case "SETNEWDATE": {
        return { ...state, date: moment().add(action.timeOffset, "hours").toDate() };
      }
      default:
        return state;
    }
  };