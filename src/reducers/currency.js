import { actionType, currenciesList, defaultCurrency } from '../const';

const initialState = {
  data: {},
};

const listArranged = {};
currenciesList.map((obj) => {
  listArranged[obj.ID] = obj.initialValue;
});

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
        data: {
          rates: listArranged,
          base: defaultCurrency,
          date: '',
        },
      };

    default:
      return state;
  }
};

export default { currencyReducer };
