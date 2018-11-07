import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CRYPTO_CURRENCY } from '@/constants';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import arrowDownIcon from '@/assets/images/icon/expand-arrow.svg';
import Cleave from 'cleave.js/react';
import './styles.scss';

const CRYPTO_CURRENCY_SUPPORT = {
  ...CRYPTO_CURRENCY,
};

const DEFAULT_CURRENCY = CRYPTO_CURRENCY_SUPPORT.ETH;

const scopedCss = (className) => `currency-input-${className}`;

export default class CurrencyInput extends Component {
  constructor() {
    super();
    this.state = {
      amount: 0.0,
      currency: DEFAULT_CURRENCY,
    };
  }

  componentDidMount() {
    this.updateData(this.props.value);
  }

  UNSAFE_componentWillReceiveProps({ value }) {
    value && this.updateData(value);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // get coin info if currency or amount changes
    if (nextState.amount !== this.state.amount || nextState.currency !== this.state.currency) {
      this.callbackHandler({ amount: nextState.amount, currency: nextState.currency });
    }
    return true;
  }

  onAmountChange = (e) => {
    this.setState({ amount: Number.parseFloat(e?.target?.value?.replace(/,/g, '')) });
  }

  onCurrencyChange = (value) => {
    this.setState({ currency: value || DEFAULT_CURRENCY });
  }

  updateData = (data = {}) => {
    this.setState({ ...data });
  }

  callbackHandler = (data) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(data);
    }
  }

  render() {
    const { currency, amount } = this.state;
    const { onFocus, onBlur, markError, placeholder } = this.props;
    return (
      <div className={scopedCss('container')}>
        <Cleave
          className={markError ? 'error' : ''}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          value={amount || amount === 0 ? amount : ''}
          options={{
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            numeralIntegerScale: 9,
          }}
          placeholder={placeholder}
          onChange={this.onAmountChange}
        />
        <UncontrolledButtonDropdown className={scopedCss('currency-selector')}>
          <DropdownToggle color="light" block>
            <img style={{ opacity: 0.5, margin: '0px 5px' }} alt="" src={arrowDownIcon} width={12} /> {currency}
          </DropdownToggle>
          <DropdownMenu>
            {
              Object.entries(CRYPTO_CURRENCY_SUPPORT).map(([key, value]) => (
                <DropdownItem key={key} value={value} onClick={() => this.onCurrencyChange(value)}>
                  {value}
                </DropdownItem>
              ))
            }
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    );
  }
}

CurrencyInput.defaultProps = {
  value: {},
  onFocus: () => {},
  onBlur: () => {},
  markError: false,
  placeholder: '0.0',
};
CurrencyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.object,
  markError: PropTypes.bool,
  placeholder: PropTypes.string,
};
