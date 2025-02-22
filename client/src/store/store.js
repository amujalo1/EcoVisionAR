import { atom } from "jotai";

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.1,
  transport: -0.3,
};

const defaultState = {
  walking: 0,
  running: 0,
  biking: 0,
  transport: 0,
  totalCO2: 6.9,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": {
      const newMinutes = state[action.activity] + Number(action.minutes);
      const co2Impact = CO2_EMISSIONS[action.activity] * Number(action.minutes);
      return {
        ...state,
        [action.activity]: newMinutes,
        totalCO2: state.totalCO2 + co2Impact,
      };
    }
    case "RESET":
      return defaultState;
    case "SET_INITIAL_STATE":
      return action.payload;
    default:
      return state;
  }
};

export const stateAtom = atom(defaultState);
export const dispatchAtom = atom(null, (get, set, action) => {
  const state = get(stateAtom);
  const newState = reducer(state, action);
  set(stateAtom, newState);
});
