import * as masterData from './__mocks__/action_merchant_data';
import * as merchantStatusData from './__mocks__/action_merchant_status';
import * as merchantData from './__mocks__/action_merchant';

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: 'http://api.mex(.*)',

    /**
     * returns the data
     *
     * @param match array Result of the resolution of the regular expression
     * @param params object sent by 'send' function
     * @param headers object set by 'set' function
     * @param context object the context of running the fixtures function
     */
    fixtures(match, params, headers, context) {
      headers.Authorization = 'TOKEN_AUTHENTICATION';

      if (match[1] === '/v1/salesportal/merchant/business-category') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.merchant_category_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/merchant-scale') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.merchant_scale_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/average-sales') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.avarage_sales_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/business-type') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.business_type_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/business-sub-category?category_id=2') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.merchant_subcategory_result,
        };
      }

      if (match[1] === '/v1/salesportal/user/country-list') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.country_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/province-list?country_id=12') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.province_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/city-list?province_id=1') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.city_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/district-list?city_id=2') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.district_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/sub-district-list?district_id=12') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.subdistrict_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/location_type') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.location_type_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/settlement-bank?country_id=12') {
        return {
          code: 1000,
          message: 'OK',
          data: masterData.settlement_bank_result,
        };
      }
      // MERCHANT STATUS
      if (match[1] === '/v2/salesportal/merchant/store/list-verification') {
        return {
          code: 1000,
          message: 'OK',
          data: merchantStatusData.merchant_load_status_result,
        };
      }

      if (match[1] === '/v1/salesportal/merchant/merchant-status') {
        return {
          code: 1000,
          message: 'OK',
          data: merchantStatusData.merchant_status_result,
        };
      }

      if (match[1] === '/v2/salesportal/merchant/store/detail/2') {
        return {
          code: 1000,
          message: 'OK',
          data: merchantStatusData.merchant_status_detail_result,
        };
      }

      if (match[1] === '/v2/salesportal/merchant/list') {
        return {
          code: 1000,
          message: 'OK',
          data: merchantData.merchant_result,
        };
      }
    },

    /**
     * returns the result of the GET request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    get(match, data) {
      return {
        body: data,
      };
    },

    /**
     * returns the result of the POST request
     *
     * @param match array Result of the resolution of the regular expression
     * @param data  mixed Data returns by `fixtures` attribute
     */
    post(match, data) {
      return {
        status: 200,
        body: data,
      };
    },
  },
];
