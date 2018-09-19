import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { renderField } from '@/pages/CreateMarket/form';
import { emailValidator, required } from '@/pages/CreateMarket/validate';
import { Field, reduxForm } from 'redux-form';
import ExtLogo from '@/assets/images/pex/ext-landing-page/logo.svg';
import MacBook from '@/assets/images/pex/ext-landing-page/mac.png';
import { ExtensionSubscribe } from './action';
import { subscribeResultSelector } from './selector';

import './PexExtension.scss';

class PexExtension extends React.Component {
  static displayName = 'PexExtension';
  static propTypes = {
    reactHelmetElement: PropTypes.element,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    reactHelmetElement: null,
  };

  onSubmit = (value) => {
    this.props.dispatch(ExtensionSubscribe(value));
  }

  renderLeftContainer = () => {
    return (
      <div className="ExtLeftContainer">
        <div className="LeftSideBar">
          <img src={ExtLogo} alt="Extension logo" className="ExtLogo" />
        </div>
        <div className="MacBook">
          <img src={MacBook} alt="MacBook" />
        </div>
      </div>
    );
  }

  renderSubscribeForm = (props) => {
    let errMsg;
    if (props.subscribeResult && props.subscribeResult.status) {
      return (
        <span className="SubscribeSuccess">Thank you for subscribing!</span>
      );
    } else if (props.subscribeResult && !props.subscribeResult.status) {
      errMsg = props.subscribeResult.message;
    }
    console.log('errMsg', errMsg);
    console.log('props.subscribeResult', props.subscribeResult);
    return (
      <div className="ExtSubscribe">
        <span>Get exclusive launch party goodies</span>
        <form className="EmailRequiredForm" onSubmit={props.handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            type="email"
            className="form-group"
            fieldClass="form-control"
            component={renderField}
            placeholder="Enter your email address"
            validate={[required, emailValidator]}
          />
          <button type="submit" className="btn btn-primary btn-block">
            Ready to rock
          </button>
        </form>
        <span className="SubscribeError">{errMsg}</span>
      </div>
    );
  }

  renderRightContainer = (props) => {
    return (
      <div className="ExtRightContainer">
        <p className="ExtHeader">
          <span>
            The Ninja Predicts playground <br />just got much bigger.
          </span>
        </p>
        <p className="ExtQuestion">
          Browsing the web and feeling clever?
        </p>
        <p className="ExtDescription">
          Create a bet and get the whole internet to play. <br />
          Predict the future and win ETH for being right.
        </p>
        {this.renderSubscribeForm(props)}
      </div>
    );
  }

  render() {
    return (
      <div className={PexExtension.displayName}>
        {this.props.reactHelmetElement}
        {this.renderLeftContainer(this.props, this.state)}
        {this.renderRightContainer(this.props, this.state)}
      </div>
    );
  }
}


export default connect(
  (state) => {
    return {
      subscribeResult: subscribeResultSelector(state),
    };
  },
)(
  reduxForm({
    form: 'ExtLandingForm',
    // enableReinitialize: true,
  })(PexExtension),
);
