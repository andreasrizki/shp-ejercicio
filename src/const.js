export const baseURL = 'https://api.exchangeratesapi.io';

export const defaultCurrency = 'USD';
export const currencyFormat = '0,0.0000';

export const actionType = {
  GET_CURRENCIES: 'GET_CURRENCIES',
  GET_CURRENCIES_FAIL: 'GET_CURRENCIES_FAIL',
};

export const appRoutes = {
  registerHome: '/',
};

export const currenciesList = [
  {
    ID: 'SGD',
    initialValue: 0,
    selected: false,
    longName: 'Singapore Dollar',
    symbol: 'S$',
  },
  {
    ID: 'INR',
    initialValue: 0,
    selected: false,
    longName: 'Indian Rupee',
    symbol: '₹',
  },
  {
    ID: 'GBP',
    initialValue: 0,
    selected: false,
    longName: 'Pound Sterling',
    symbol: '£',
  },
  {
    ID: 'IDR',
    initialValue: 0,
    selected: true,
    longName: 'Indonesian Rupiah',
    symbol: 'Rp',
  },
  {
    ID: 'KRW',
    initialValue: 0,
    selected: false,
    longName: 'Korean Won',
    symbol: '₩',
  },
  {
    ID: 'CAD',
    initialValue: 0,
    selected: false,
    longName: 'Canadian Dollar',
    symbol: 'C$',
  },
  {
    ID: 'MYR',
    initialValue: 0,
    selected: false,
    longName: 'Malaysian Ringgit',
    symbol: 'RM',
  },
  {
    ID: 'CHF',
    initialValue: 0,
    selected: false,
    longName: 'Swiss Franc',
    symbol: 'CHF',
  },
  {
    ID: 'JPY',
    initialValue: 0,
    selected: false,
    longName: 'Japanese Yen',
    symbol: '¥',
  },
];
