import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/core/controls/Button';
import ModalDialog from '@/components/core/controls/ModalDialog';
import Feed from '@/components/core/presentation/Feed';
import BettingShake from './Shake';
import  {BetStatusHandler, ROLE} from './StatusHandler.js';
import './Feed.scss';

const date = "2018-06-18"
const eventDate = new Date(date);
const goal = 30;
class FeedBetting extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    userEmail: PropTypes.string,
  }
static defaultProps = {
    item: {
        "contract_file": "QmNSDCSvXJwi34AUgW3pCK9jhP6HY611tb5gUfj4NS2VPp",
        "contract_file_name": "1526386710_2bf702980869bb1a8b0aa0b4126be6f3_crypto.pdf",
        "delivery_date": "Tue, 15 May 2018 12:18:28 GMT",
        "description": "long promises trong to test deploy.",
        "escrow_date": "Tue, 15 May 2018 12:18:28 GMT",
        "from_address": "0xBf7ca460D4D2AE804ade14b2399E2A2d67964983",
        "from_email": "pierre.neter@gmail.com",
        "hid": "442",
        "id": 530,
        "industries_type": 1,
        "public": 0,
        "signed_contract_file": "QmUfXMJhL55Kt8XtiQBkJyuSNYyaWbqpyBYy26rkJUPL7p",
        "source": "android",
        "status": 4,
        "term": 0,
        "to_address": "0x5eE2A7BF750Ad8103F04ec62FAbE502e3e3f93B4",
        "to_email": "trong1@autonomous.nyc",
        "user_id_shaked": 3
      },
      userEmail: 'trong@autonomous.nyc',

}
componentDidMount(){
  const {userEmail, item} = this.props;
  console.log('From email: ', item.from_email);
  console.log('To Email:', item.to_email);
  console.log('User Email:', userEmail);
  const role = (userEmail === item.from_email) ? ROLE.PAYEE : 
                (userEmail === item.to_email) ? ROLE.PAYER : ROLE.GUEST;
  console.log('Role:', role);
  this.setState({
    item,
    role
  });
}
  componentWillReceiveProps(nextProps){
    
  }
  constructor(props) {
      super(props);
    
      this.state = {
          item: props.item,
          role: ROLE.GUEST,
          balance: 0,
      };
  }
  render() {
    const {item,role, balance} = this.state;
    const {description, from_email, status} = item;
    const bottomDes = `22 bettors against ${from_email}`;
    
    const statusLabel = BetStatusHandler.getStatusLabel(status, role);
    console.log('Action:', statusLabel.action);
    return (
      <div>
        {/* Feed */}
        <Feed className="feed" handshakeId={this.props.id} onClick={this.props.onFeedClick}>
          <div className="wrapper">
              {/*<p>Role: {`${role}`}</p>}
              {statusLabel.status && <p>Status: {`${statusLabel.status}`}</p>}
              {<p>Date: {`${date}`}</p>}
              {<p>Bet: {`${goal}`}</p>}
    {<p>Balance: {`${balance}`}</p>*/}

              <p className="description">{description}</p>
              <div className="bottomWrapper">
                  <div className="email">{bottomDes}</div>
                  <div className="email">80%</div>
              </div>
          </div>
        </Feed>
        {/* Shake */}
        {statusLabel.action && <Button block onClick={() => { this.modalBetRef.open(); }}>{statusLabel.action}</Button>}
        {/* Modal */}
        <ModalDialog title="Make a bet" onRef={modal => this.modalBetRef = modal}>
          <BettingShake
            remaining={10}
            odd={0.1}
            onCancelClick={() => this.modalBetRef.close()}
            onSubmitClick={(amount) => this.submitShake(amount)}
          />
        </ModalDialog>
      </div>
    );
  }
  submitShake(amount){
    this.modalBetRef.close();
    const {item, role, balance} = this.state;
    let newItem = BetStatusHandler.shakeItem(role, eventDate, amount,goal,balance, item);
    if(newItem){
      this.setState({
        item: newItem,
        balance: balance + amount,
      })
    }
    
  }
}

export default FeedBetting;

