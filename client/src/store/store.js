import { atom } from "jotai";

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.1,
  transport: -0.3,
};

const defaultActivityState = {
  walking: 0,
  running: 0,
  biking: 0,
  transport: 0,
  totalCO2: 6.9,
};

const reducer = (state, action, userState) => {
  switch (action.type) {
    case "INCREMENT": {
      const newMinutes = state[action.activity] + Number(action.minutes);
      const co2Impact = CO2_EMISSIONS[action.activity] * Number(action.minutes);
      const newXP = userState.experience + Number(action.minutes); // XP se povećava za svaku minutu aktivnosti

      return {
        newState: {
          ...state,
          [action.activity]: newMinutes,
          totalCO2: state.totalCO2 + co2Impact,
        },
        newUserState: {
          ...userState,
          experience: newXP,
        },
      };
    }
    case "RESET":
      return {
        newState: defaultActivityState,
        newUserState: { ...userState, experience: 0 },
      };
    case "SET_INITIAL_STATE":
      return {
        newState: action.payload.dailyActivity,
        newUserState: action.payload,
      };
    default:
      return { newState: state, newUserState: userState };
  }
};

export const stateAtom = atom(defaultActivityState);
export const userAtom = atom({
  username: "",
  streak: 0,
  experience: 0,
  points: 0,
  level: 1,
  friends: [],
  quests: [],
  dailyActivity: defaultActivityState, // Dodajemo dailyActivity u userAtom
});

export const dispatchAtom = atom(null, (get, set, action) => {
  const state = get(stateAtom);
  const userState = get(userAtom);
  const { newState, newUserState } = reducer(state, action, userState);

  set(stateAtom, newState);
  set(userAtom, newUserState);
});
