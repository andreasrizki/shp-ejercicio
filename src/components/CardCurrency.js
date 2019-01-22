import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { IndeterminateCheckBox } from '@material-ui/icons';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
} from '@material-ui/core';

const CURRENCY_FORMAT = '0,0.0000';

/**
 * Get currency exchange value
 *
 * @param {string} ID
 * @public
 */
const getExchange = (rates, ID) => rates[ID];

/**
 * Calculate currency exchange value with input value.
 *
 * @param {number} value
 * @public
 */
const handleCalculate = (initialValue, value) =>
  numeral(Number(value) * Number(initialValue)).format(CURRENCY_FORMAT);

function CardCurrency(props) {
  const {
    data, rates, initialValue, onRemoveCurrency,
  } = props;

  return (
    <Card
      style={{
        margin: '20px 15px 0px 15px',
        height: 100,
      }}
    >
      <CardContent>
        <Grid container spacing={0} style={{ marginBottom: 30 }}>
          <Grid item xs={10}>
            <Typography
              variant="title"
              component="h2"
              style={{ marginBottom: 10 }}
            >
              <span>{data.ID}</span>
              <span style={{ float: 'right' }}>
                {`${data.symbol} ${handleCalculate(
                  initialValue,
                  getExchange(rates, data.ID),
                )}`}
              </span>
            </Typography>
            <Typography
              color="textSecondary"
              style={{ fontWeight: 'bold', fontSize: 12 }}
            >
              {`${data.ID} - ${data.longName}`}
            </Typography>
            <Typography
              color="textSecondary"
              style={{ fontStyle: 'italic', fontSize: 12 }}
            >
              {`1 USD = ${data.ID} ${getExchange(data.ID)}`}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                float: 'right',
                cursor: 'pointer',
                marginTop: 22,
              }}
            >
              <Tooltip title="Remove" placement="left">
                <IndeterminateCheckBox
                  color="secondary"
                  onClick={() => onRemoveCurrency(data.ID)}
                />
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CardCurrency.propTypes = {
  data: PropTypes.shape({}).isRequired,
  rates: PropTypes.shape({}).isRequired,
  initialValue: PropTypes.number.isRequired,
  onRemoveCurrency: PropTypes.func.isRequired,
};

export default CardCurrency;
