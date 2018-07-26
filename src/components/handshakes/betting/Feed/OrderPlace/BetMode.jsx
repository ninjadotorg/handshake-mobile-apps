import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BettingFilter from '@/components/handshakes/betting/Feed/Filter';
import { API_URL } from '@/constants';
import { loadHandshakes, checkFreeAvailable } from '@/reducers/betting/action';
import { CRYPTOSIGN_MINIMUM_MONEY } from '@/components/handshakes/betting/constants.js';
import { getBalance } from '@/components/handshakes/betting/utils';

import Tabs from './../Tabs';

const TAG = 'BET_MODE';
class BetMode extends React.Component {
  static propTypes = {
    selectedOutcome: PropTypes.object,
    selectedMatch: PropTypes.object,
  }

  static defaultProps = {
    selectedOutcome: {},
    selectedMatch: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      support: null,
      against: null,
      isFirstFree: false,
      bettingShakeIsOpen: true,
    };
    this.openPopup = this.openPopup.bind(this);
  }

  componentDidMount() {
    this.props.openPopup(this.openPopup);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedOutcome, support, against, isFirstFree } = nextProps;
    // console.log(TAG, 'componentWillReceiveProps', 'support:', support, 'against:', against, 'isFirstFree', isFirstFree);
    const filterSupport = support && support.length > 0 && support.filter(item => item.amount >= CRYPTOSIGN_MINIMUM_MONEY);
    const filterAgainst = against && against.length > 0 && against.filter(item => item.amount >= CRYPTOSIGN_MINIMUM_MONEY);
    this.setState({
      support: filterSupport,
      against: filterAgainst,
      isFirstFree,
    });
  }

  afterTabChanges = (tab) => {
    const tabType = tab.toLowerCase();
    console.log('BETMODE', tabType);
  }
  async openPopup(selectedOutcome) {
    this.setState({
      bettingShakeIsOpen: true,
    });
    this.callGetHandshakes(selectedOutcome);
    await this.checkShowFreeBanner();
  }

  callGetHandshakes(item) {
    if (item) {
      const params = {
        outcome_id: item.id,
      };
      this.props.loadHandshakes({
        PATH_URL: API_URL.CRYPTOSIGN.LOAD_HANDSHAKES,
        METHOD: 'POST',
        data: params,

      });
      if (typeof window !== 'undefined') {
        window.isGotDefaultOutCome = true;
      }
    }
  }
  callCheckFirstFree() {
    console.log(TAG, 'Call API check first free');
    this.props.checkFreeAvailable({
      PATH_URL: API_URL.CRYPTOSIGN.CHECK_FREE_AVAILABLE,
      METHOD: 'GET',
    });
  }

  async checkShowFreeBanner() {
    const balance = await getBalance();
    console.log(TAG, 'checkShowFreeBanner', balance, typeof balance);
    if (balance === '0') {
      // Call API check if show free
      this.callCheckFirstFree();
    }
  }
  renderTab(props) {
    return (
      <Tabs htmlClassName="BetModeContainer" afterClick={this.afterTabChanges}>
        <div className="BetModeItem" label="Paid bet">
          <BettingFilter
            {...props}
            isFree={false}

          />
        </div>
        <div className="BetModeItem" label="Free bet">
          <BettingFilter
            {...props}
            isFree
          />
        </div>
      </Tabs>
    );
  }
  renderSingleMode(props) {
    return (
      <BettingFilter
        {...props}
        isFree={false}
      />
    );
  }

  render() {
    const { selectedOutcome, selectedMatch } = this.props;
    const {
      support,
      against,
      isFirstFree,
      bettingShakeIsOpen,
    } = this.state;
    const filterProps = {
      selectedOutcome,
      selectedMatch,
      support,
      against,
      isOpen: bettingShakeIsOpen,
      onSubmitClick: ((isFree) => {
        this.setState({
          bettingShakeIsOpen: false,
        });
        this.props.onSubmitClick(isFree);
      }),
      onCancelClick: (() => {
        this.setState({
          bettingShakeIsOpen: false,
        });
        this.props.onCancelClick();
      }),
    };
    return (
      <React.Fragment>
        { isFirstFree ? this.renderTab(filterProps) : this.renderSingleMode(filterProps)}
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  support: state.betting.support,
  against: state.betting.against,
  isFirstFree: state.betting.isFirstFree,
});

const mapDispatch = ({
  loadHandshakes,
  checkFreeAvailable,
});

export default connect(mapState, mapDispatch)(BetMode);

