import { INCREMENT, DECREMENT } from '../actionsLegacy/types';

const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, 
    action: { type: string, payload: number }) => {
  switch (action.type) {
    case INCREMENT:
      return {
        // the ... (spread operator) will copy current state and update then replace the current state
        // prevent mutate/modify state directly is the essential priciple of Redux
        ...state,
        value: state.value + action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;