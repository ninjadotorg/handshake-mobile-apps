import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// service, constant
import { loadDiscoverList } from '@/reducers/discover/action';
import {
  API_URL,
  DISCOVER_GET_HANDSHAKE_RADIUS,
  // EXCHANGE_ACTION,
  // EXCHANGE_ACTION_NAME,
  HANDSHAKE_ID,
  URL,
} from '@/constants';
// components
import { Col, Grid, Row } from 'react-bootstrap';
// import SearchBar from '@/components/core/controls/SearchBar';
import Category from '@/components/core/controls/Category';

import FeedPromise from '@/components/handshakes/promise/Feed';
import FeedBetting from '@/components/handshakes/betting/Feed';
import FeedExchange from '@/components/handshakes/exchange/Feed/FeedExchange';
import FeedSeed from '@/components/handshakes/seed/Feed';
import FeedCreditCard from '@/components/handshakes/exchange/Feed/FeedCreditCard';

// import Tabs from '@/components/handshakes/exchange/components/Tabs';
import NoData from '@/components/core/presentation/NoData';
import BettingFilter from '@/components/handshakes/betting/Feed/Filter';
import { getListOfferPrice } from '@/reducers/exchange/action';
import Image from '@/components/core/presentation/Image';
import loadingSVG from '@/assets/images/icon/loading.gif';

// style
import './Discover.scss';

const maps = {
  [HANDSHAKE_ID.PROMISE]: FeedPromise,
  [HANDSHAKE_ID.BETTING]: FeedBetting,
  [HANDSHAKE_ID.EXCHANGE]: FeedExchange,
  [HANDSHAKE_ID.SEED]: FeedSeed,
};

class DiscoverPage extends React.Component {
  static propTypes = {
    discover: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    loadDiscoverList: PropTypes.func.isRequired,
    getListOfferPrice: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
    firebaseUser: PropTypes.object,
  }

  static defaultProps = {
    firebaseUser: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      handshakeIdActive: HANDSHAKE_ID.BETTING, // default show bet
      // tabIndexActive: '',
      query: '',
      isLoading: true,
    };
    // this.loadDiscoverList();
    // bind
    this.clickCategoryItem = this.clickCategoryItem.bind(this);
    this.clickTabItem = this.clickTabItem.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  componentDidMount() {
    this.getListOfferPrice();
    // this.setState({ isLoading: false });
  }

  componentWillReceiveProps(nextProps) {
    console.log('firebase', nextProps.firebaseUser);
    // set active betting
    // if (this.state.handshakeIdActive === -1) {
    //   if (this.props.discover.list.length < 1) {
    //     this.setState({
    //       handshakeIdActive: HANDSHAKE_ID.BETTING
    //     });
    //     this.categoryRef.idActive = HANDSHAKE_ID.BETTING;
    //   }
    // }
  }

  getHandshakeList() {
    const { list } = this.props.discover;
    if (list && list.length > 0) {
      return list.map((handshake) => {
        const FeedComponent = maps[handshake.type];
        if (FeedComponent) {
          return (
            <Col key={handshake.id} md={12} className="feed-wrapper">
              <FeedComponent
                {...handshake}
                history={this.props.history}
                onFeedClick={() => this.clickFeedDetail(handshake.id)}
                refreshPage={this.loadDiscoverList}
              />
            </Col>
          );
        }
        return null;
      });
    }
    return <NoData style={{ height: '50vh' }} />;
  }

  setLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  }

  getListOfferPrice = () => {
    this.props.getListOfferPrice({
      PATH_URL: API_URL.EXCHANGE.GET_LIST_OFFER_PRICE,
      qs: { fiat_currency: this.props?.app?.ipInfo?.currency },
      successFn: this.handleGetPriceSuccess,
      errorFn: this.handleGetPriceFailed,
    });
  }

  handleGetPriceSuccess = () => {
    // this.loadDiscoverList();
  }

  handleGetPriceFailed = () => {
    // this.loadDiscoverList();
  }

  searchChange(query) {
    clearTimeout(this.searchTimeOut);
    this.searchTimeOut = setTimeout(() => {
      this.setState({ query }, () => {
        this.loadDiscoverList();
      });
    }, 500);
  }

  clickFeedDetail(id) {
    this.props.history.push(`${URL.HANDSHAKE_DISCOVER}/${id || ''}`);
  }

  clickCategoryItem(category) {
    const { id } = category;
    if (this.state.handshakeIdActive !== id) {
      this.setLoading(true);
    }
    // let tabIndexActive = '';
    switch (id) {
      case HANDSHAKE_ID.BETTING:
        // do something
        break;
      case HANDSHAKE_ID.SEED:
        // do something
        break;
      case HANDSHAKE_ID.EXCHANGE:
        // do something
        // tabIndexActive = 1;
        break;
      default:
        // is promise
    }
    // set feed type activate
    this.setState({
      handshakeIdActive: id,
      // tabIndexActive,
    }, () => {
      if (category.id !== 3) {
        this.loadDiscoverList();
      }
    });
  }

  clickTabItem() {
    // index
    this.setState({
      // tabIndexActive: index
    }, () => {
      // if (category.id !== 3) {
      //   this.loadDiscoverList();
      // }
    });
  }

  loadDiscoverList = () => {
    console.log('call loadDiscoverList');
    const {
      handshakeIdActive,
      // tabIndexActive,
      query,
    } = this.state;
    const qs = { };

    const pt = `${this.props?.app?.ipInfo?.latitude},${this.props?.app?.ipInfo?.longitude}`;

    qs.location_p = { pt, d: DISCOVER_GET_HANDSHAKE_RADIUS };
    if (handshakeIdActive) {
      qs.type = handshakeIdActive;
    }

    // if (tabIndexActive) {
    //   qs.custom_query = `offer_feed_type_s:exchange AND offer_type_s:${tabIndexActive === 1 ? EXCHANGE_ACTION.SELL : EXCHANGE_ACTION.BUY}`;
    // }

    if (query) {
      qs.query = query;
    }

    this.props.loadDiscoverList({
      PATH_URL: API_URL.DISCOVER.INDEX,
      qs,
      successFn: () => {
        this.setLoading(false);
      },
      errorFn: () => {
        this.setLoading(false);
      },
    });
  }

  render() {
    const {
      handshakeIdActive,
      // tabIndexActive,
    } = this.state;

    return (
      <React.Fragment>
        <div className={`discover-overlay ${this.state.isLoading ? 'show' : ''}`}>
          <Image src={loadingSVG} alt="loading" />
        </div>
        <Grid className="discover">
          {/* <Row className="search-bar-wrapper">
            <Col md={12} xs={12}>
              <SearchBar onSuggestionSelected={() => {}} onInputSearchChange={this.searchChange} />
            </Col>
          </Row> */}
          <Row>
            <Col md={12} xs={6}>
              <Category
                idActive={handshakeIdActive}
                className="category-wrapper"
                onRef={(category) => { this.categoryRef = category; return null; }}
                onItemClick={this.clickCategoryItem}
              />
            </Col>
          </Row>
          {
            handshakeIdActive === HANDSHAKE_ID.EXCHANGE && (
              <Row>
                <Col md={12} className="feed-wrapper">
                  <FeedCreditCard history={this.props.history} />
                </Col>
              </Row>
            )
          }
          {
            handshakeIdActive === HANDSHAKE_ID.BETTING && (
              <React.Fragment>
                <BettingFilter setLoading={this.setLoading} />
                <Row>
                  <Col md={12}>
                    <dl className="faq">
                      <dt>Price (Odds)</dt>
                      <dd>
                        Ninja uses <strong>decimal odds</strong>.  A winning bet at 1.75 would return a total of 1.75 ETH for every ETH staked. An even money bet is expressed as 2.00.
                      </dd>
                      <dt>Pool (ETH)</dt>
                      <dd>
                        The total bets for different price points (odds).  Red: Support orders. Green: Oppose orders.
                      </dd>
                      <dt>Support or Oppose</dt>
                      <dd>
                        Pick a side to bet on.  You can support the outcome or oppose the outcome.
                      </dd>
                      <dt>Market odds</dt>
                      <dd>
                        You can bet with the market odds, which will likely be matched immediately with existing orders on the order book, or set your own odds, which will likely go on the order book to wait for a matching order.
                      </dd>
                      <dt>Market volume</dt>
                      <dd>
                        The total volume of bets on this outcome.
                      </dd>
                      <dt>Market fee</dt>
                      <dd>
                        This is the fee set by the market creator, as a percentage of the winnings.  A market fee of 1% would be 1ETH on a winning payout of 100 ETH.
                      </dd>
                    </dl>
                  </Col>
                </Row>
              </React.Fragment>
            )
          }
          <Row>
            {handshakeIdActive !== HANDSHAKE_ID.BETTING && this.getHandshakeList()}
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapState = state => ({
  discover: state.discover,
  firebaseUser: state.firebase.data,
  app: state.app,
});

const mapDispatch = ({
  loadDiscoverList,
  getListOfferPrice,
});

export default connect(mapState, mapDispatch)(DiscoverPage);
