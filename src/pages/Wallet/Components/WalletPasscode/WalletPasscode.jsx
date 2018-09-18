// Write by Phuong


import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// actions
import { hideAlert } from '@/reducers/app/action';
// style
import './WalletPasscode.scss';

import Passcode from '../Passcode';


class WalletPasscode extends React.PureComponent {
  static propTypes = {
    app: PropTypes.object,
    onBack: PropTypes.func,
    onSuccess: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      valueConfirm: 0,    
    };
    // bind
    this.handleShowConfirm = ::this.handleShowConfirm;
  }

  componentWillReceiveProps(nextProps) {
    this.handleShowConfirm(nextProps);
  }

  configDefault = {
    isShow: false,
    valueConfirm: 0,    
    onSuccess: () => {},
    onBack: () => {},
  }

  handleShowConfirm(props) {
    const { configConfirmPasscode } = props.app;
    const config = Object.assign({}, this.configDefault, configConfirmPasscode);
    config.onSuccess();
    if (config.isShow) {              
        // call back
        config.onBack();
      
    }
    this.setState({ ...config });
  }

  render() {
    const {
      isShow, valueConfirm
    } = this.state;  
    const { messages } = this.props.intl;  
    if (!isShow) return null;
    return (
      
    <Modal onClose={() => {}} title={"PASSCODE"} onRef={modal => this.modalConfirmPasscodeRef = modal}>
      <div className="wallet-passscode">
      {/* <div className="wallet-passscode-title">
        Remember this Password. If you forget it, you can lost wallet
      </div> */}
      <Passcode confirmValue={valueConfirm} onFinish={(value)=> {this.handleShowConfirm}} />      

      </div>        
    </Modal>
    );
  }
}

const mapState = state => ({
  app: state.app,
});

const mapDispatch = ({
  hideAlert,
});

export default connect(mapState, mapDispatch)(WalletPasscode);
