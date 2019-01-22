import { actionType } from '../const';

const initialState = {
  data: {},
};

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENCIES:
      return {
        ...state,
        data: action.data,
      };

    case actionType.GET_CURRENCIES_FAIL:
      return {
        ...state,
        data: {},
      };

    default:
      return state;
  }
};

export default { currencyReducer };
