import React from 'react';
import { connect } from 'react-redux';
import { loadMatches } from '@/reducers/betting/action';
import BettingReport from '@/components/handshakes/betting-event/BettingReport';
import { API_URL } from '@/constants';
import { BetHandshakeHandler } from '@/components/handshakes/betting/Feed/BetHandshakeHandler';

const TAG = 'REPORT';
const betHandshakeHandler = BetHandshakeHandler.getShareManager();

class Report extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      login: false,
    };
  }

  componentDidMount() {
    this.fetchMatches();

  }

  componentWillReceiveProps(nextProps) {
    const { matches } = nextProps;
    this.setState({
      matches,
    });
  }

  fetchMatches() {
    console.log('fetchMatches');
    this.props.loadMatches({
      PATH_URL: `${API_URL.CRYPTOSIGN.MATCHES_REPORT}`,
    });
  }
  report(reponseData) {
    const { } = reponseData;
    betHandshakeHandler.report(hid, outcomeId, side, contractName, contractAddress);
  }


  render() {
    const { matches } = this.state;
    return (
      <BettingReport
        matches={matches}
        onReportSuccess={(reponseData)=> {
          this.fetchMatches();
        }}
      />
    );
  }
}

const mapState = state => ({
  matches: state.betting.matches,
  login: state.admin.login,
});

const mapDispatch = ({
  loadMatches,
});

export default connect(mapState, mapDispatch)(Report);
