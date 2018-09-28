import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './ProjectList.scss';
import ProjectList from '@/pages/Invest/ProjectList';
import TraderList from '@/pages/Invest/TraderList';
import ExpandArrowSVG from './settings.svg';

class InvestBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'trader',
    };
  }

  navigateToSettings=() => {

  }
  render() {
    return (
      <div style={{ backgroundColor: '#fafbff', minHeight: '100vh' }}>
        <div
          style={{
        backgroundColor: '#fff',
        height: '43px',
        padding: '13px 1em',
        marginBottom: '2px',
      }}
          className="clearfix"
        >
          <button
            type="button"
            style={{
          float: 'right',
          width: '25px',
          position: 'relative',
          padding: 0,
          top: '-4px',
          }}
            onClick={this.navigateToSettings}
          ><img
            src={ExpandArrowSVG}
            alt="arrow"
          />
          </button>
          <button
            style={{ paddingLeft: 0 }}
            className={this.state.activeTab === 'projects' ? 'active-tab' : 'inactive-tab'}
          >
            <h6
              style={{
              textAlign: 'left',
            }}
              onClick={() => {
              this.setState({
                activeTab: 'trader',
              });
            }}
            >
          Trader
            </h6>
          </button>
          <button
            className={this.state.activeTab === 'trader' ? 'active-tab' : 'inactive-tab'}
            onClick={() => {
              this.setState({
                activeTab: 'projects',
              });
            }}
          >
            <h6 style={{
              textAlign: 'left',
              }}
            >
              Projects
            </h6>
          </button>
        </div>
        {this.state.activeTab === 'trader' ? <TraderList {...this.props} /> : <ProjectList {...this.props} />}
      </div>
    );
  }
}

export default InvestBlock;
