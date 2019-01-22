import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Tooltip,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withMobileDialog,
} from '@material-ui/core';

import { currenciesList, defaultCurrency, currencyFormat } from '../const';
import { getKeyID } from '../helpers';
import { loadCurrencies } from '../actions';

import CardCurrency from '../components/CardCurrency';

class MainPage extends React.Component {
  static propTypes = {
    /**
     * The size of the modal
     *
     * @since Version 1.0.0
     */
    fullScreen: PropTypes.bool.isRequired,
    /**
     * The function for get currency list
     *
     * @since Version 1.0.0
     */
    onLoadCurrencies: PropTypes.func.isRequired,
    /**
     * The updated data currency
     *
     * @since Version 1.0.0
     */
    currencyReducer: PropTypes.shape({
      data: PropTypes.shape({}),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const listArranged = {};
    currenciesList.map((obj) => {
      listArranged[obj.ID] = obj.initialValue;
    });

    this.state = {
      initialValue: 10,
      changedValue: 10,
      editNominal: false,
      selectedCurrencyID: '',
      modalAddCurrencyOpen: false,
      currencies: {
        rates: listArranged,
        base: defaultCurrency,
        date: '',
      },
      availableCurrencies: currenciesList,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  componentWillMount = () => {
    const { onLoadCurrencies } = this.props;
    onLoadCurrencies();
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ currencies: nextProps.currencyReducer.data });
  };

  /**
   * Function for handle item update
   *
   * @param {string} ID
   * @param {object} itemAttributes
   * @public
   */
  handleUpdateItem = (ID, itemAttributes) => {
    const { availableCurrencies } = this.state;

    const index = availableCurrencies.findIndex(x => x.ID === ID);
    if (index !== -1) {
      this.setState({
        availableCurrencies: [
          ...availableCurrencies.slice(0, index),
          Object.assign({}, availableCurrencies[index], itemAttributes),
          ...availableCurrencies.slice(index + 1),
        ],
      });
    }
  };

  /**
   * Remove card currency
   *
   * @param {string} ID
   * @public
   */
  handleRemove = (ID) => {
    this.handleUpdateItem(ID, { selected: false });
  };

  /**
   * Open add currency modal
   *
   * @public
   */
  handleClickOpen = () => {
    this.setState({ modalAddCurrencyOpen: true });
  };

  /**
   * Close add currency modal
   *
   * @public
   */
  handleClose = () => {
    this.setState({ modalAddCurrencyOpen: false });
  };

  /**
   * Show currency selected
   *
   * @public
   */
  handleShow = async () => {
    const { selectedCurrencyID } = this.state;
    await this.handleUpdateItem(selectedCurrencyID, { selected: true });

    this.setState({ modalAddCurrencyOpen: false });
  };

  /**
   * Selected new currency
   *
   * @param {object} value
   * @public
   */
  handleSelectCurrency = value =>
    this.setState({ selectedCurrencyID: value.target.value });

  render() {
    const { fullScreen } = this.props;
    const {
      editNominal,
      initialValue,
      changedValue,
      currencies: { rates },
      selectedCurrencyID,
      availableCurrencies,
      modalAddCurrencyOpen,
    } = this.state;

    const getSelectedCurr = availableCurrencies.filter(
      obj => obj.selected === true,
    );

    const checkSelectedCurrCount = availableCurrencies.filter(
      obj => obj.selected === false,
    );

    const SelectOptionsCurrencies = options =>
      options.map(option => (
        <MenuItem key={option.ID} value={option.ID}>
          {option.longName}
        </MenuItem>
      ));

    return (
      <div className="page-wrapper" style={{ height: '100%' }}>
        <div className="page-body">
          <Card style={{ height: editNominal ? 155 : 100 }}>
            <CardContent style={{ marginTop: 10 }}>
              <Typography color="secondary" style={{ fontWeight: 'bold' }}>
                {`${defaultCurrency} - United States Dollars`}
                <img
                  src="../../assets/shopee.png"
                  style={{ width: 50, float: 'right' }}
                  alt="shopee-logo"
                />
              </Typography>
              {editNominal ? (
                <div>
                  <FormControl fullWidth style={{ marginTop: 10 }}>
                    <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                    <Input
                      value={changedValue}
                      onChange={(evt) => {
                        evt.preventDefault();
                        this.setState({ changedValue: evt.target.value });
                      }}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>
                  <div style={{ float: 'right', marginTop: 10 }}>
                    <Button
                      size="small"
                      color="secondary"
                      style={{ fontWeight: 'bold' }}
                      onClick={() => this.setState({ editNominal: false })}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      style={{ fontWeight: 'bold' }}
                      onClick={() =>
                        this.setState({
                          initialValue: Number(changedValue),
                          editNominal: false,
                        })
                      }
                    >
                      Ok
                    </Button>
                  </div>
                </div>
              ) : (
                <Typography
                  variant="headline"
                  component="h2"
                  style={{ marginTop: 10 }}
                >
                  {defaultCurrency}
                  <Tooltip title="Change Me" placement="top">
                    <span
                      role="presentation"
                      style={{
                        float: 'right',
                        cursor: 'pointer',
                        borderBottom: '1px dotted black',
                      }}
                      onClick={() => this.setState({ editNominal: true })}
                    >
                      {`$ ${numeral(initialValue).format(currencyFormat)}`}
                    </span>
                  </Tooltip>
                </Typography>
              )}
            </CardContent>
          </Card>
          {getSelectedCurr.map(data => (
            <CardCurrency
              key={getKeyID()}
              data={data}
              rates={rates}
              initialValue={initialValue}
              onRemoveCurrency={this.handleRemove}
            />
          ))}
        </div>
        <footer className="page-footer">
          <List>
            <ListItem disableGutters dense>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={!(checkSelectedCurrCount.length > 0)}
                onClick={this.handleClickOpen}
              >
                Add More Currencies
              </Button>
            </ListItem>
          </List>
          <Dialog
            fullScreen={fullScreen}
            open={modalAddCurrencyOpen}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              Please select the currency that will be displayed
            </DialogTitle>
            <DialogContent>
              <Select
                value={selectedCurrencyID}
                style={{ width: '100%' }}
                onChange={this.handleSelectCurrency}
              >
                {SelectOptionsCurrencies(checkSelectedCurrCount)}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleShow} color="primary" autoFocus>
                Show
              </Button>
            </DialogActions>
          </Dialog>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencyReducer: state.currencyReducer,
});

const mapDispatchToProps = dispatch => ({
  onLoadCurrencies: () => dispatch(loadCurrencies()),
});

const MainPageWithStore = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);

export default withMobileDialog()(MainPageWithStore);
