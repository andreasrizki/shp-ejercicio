import request from 'superagent';
import { baseURL, actionType, currenciesList } from '../const';

export const loadCurrencies = () => (dispatch) => {
  const currencyList = [];
  currenciesList.map((obj) => {
    currencyList.push(obj.ID);
  });

  try {
    request
      .get(
        `${baseURL}/latest?base=USD&symbols=${currencyList.join(',')}`,
      )
      .end((err, res) => {
        if (!res.error) {
          dispatch({ type: actionType.GET_CURRENCIES, data: res.body });
        } else {
          dispatch({ type: actionType.GET_CURRENCIES_FAIL, data: {} });
        }
      });
  } catch (err) {
    dispatch({ type: actionType.GET_CURRENCIES_FAIL, data: {} });
  }
};

export default { loadCurrencies };
