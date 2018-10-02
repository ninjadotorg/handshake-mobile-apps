import React, { Component } from 'react';
import InvestNavigation from './InvestNavigation';
import StarRatings from 'react-star-ratings';
import './TraderDetail.scss';
import './TraderList.scss';
import { green } from 'ansi-colors';
import { ProgressBar } from 'react-bootstrap';

const TraderDetailBlock = ({ rating }) => (
    <div key={'addlater'} style={{ marginTop: '1em', height: '2000px' }} >
        <div className="profile">
            <div className="relativeLine">
                <div className="profile-picture">
                <img
                    src={'https://randomuser.me/api/portraits/men/9.jpg'} 
                />
                <label>{'Quang Vo'}</label>
                <div className="star-ratings">
                    <StarRatings
                    className="stars"
                    rating={rating}
                    isSelectable={false}
                    starDimension="14px"
                    starRatedColor="#546FF7"
                    starSpacing="3px"
                    numberOfStars={5}
                    name="rating"
                    />
                    <span className="rating-count">(26)</span>
                </div>
            </div>
            </div>
            <div style={{ height: '50px' }}></div>
            <div className="profile-banner"></div>
            <div className="relativeLine">
                <div className="profile-sumary">
                    <div className="block block-b1">
                        <label className="black">{'115'}</label>
                        <label className="grey">{'ACTIVE PROJECTS'}</label>
                    </div>
                    <div className="block block-b2">
                        <label className="black">{'$200,000,000'}</label>
                        <label className="grey">{'CUM.VALUE OF MANAGED FUNDS'}</label>
                    </div>
                    <div className="block block-b2">
                        <label className="green">{'32%'}</label>
                        <label className="grey">{'AVERAGE RETURN'}</label>
                    </div>
                    <div className="block block-b1">
                        <label className="black">{'$15,000'}</label>
                        <label className="grey">{'CUM EARNINGS'}</label>
                    </div>
                </div>
            </div>
            <div style={{ height: '200px' }}></div>
            <div className="funding">
                <div className="funding-title">
                    <label>CURRENTLY FUNDING</label>
                </div>
                <div className="funding-body">
                    <div className="funding-body-row">
                        <div className="funding-body-row-left">
                            <label>1. TraderId</label>
                            <ProgressBar className="progress" now={60} />
                            <label className="progress-title">{'10,000 of 150,000 ETH'}</label>
                        </div>
                        <div className="funding-body-row-right">
                            <label>{'5 days left'}</label>
                            <label>{'55%'}</label>
                        </div>
                    </div>
                    <div className="funding-body-row">
                        <div className="funding-body-row-left">
                            <label>1. TraderId</label>
                            <ProgressBar className="progress" now={60} />
                            <label className="progress-title">{'10,000 of 150,000 ETH'}</label>
                        </div>
                        <div className="funding-body-row-right">
                            <label>{'5 days left'}</label>
                            <label>{'55%'}</label>
                        </div>
                    </div>
                    <div className="funding-body-row">
                        <div className="funding-body-row-left">
                            <label>1. TraderId</label>
                            <ProgressBar className="progress" now={60} />
                            <label className="progress-title">{'10,000 of 150,000 ETH'}</label>
                        </div>
                        <div className="funding-body-row-right">
                            <label>{'5 days left'}</label>
                            <label>{'55%'}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="completed">
                <div className="completed-title">
                    <label>{'COMPLETED PROJECTS'}</label>
                </div>
                <div className="completed-body">
                    <div>
                        <div style={{ padding: '10px', fontSize: '16px' }}>{'XProject'}</div>
                        <div className="completed-body-row">
                            <div className="completed-body-row-left">
                                <label>{'Duration'}</label>
                                <label>{'Deadline'}</label>
                                <label>{'Requested fund'}</label>
                                <label>{'Returns'}</label>
                                <label>{''}</label>
                            </div>
                            <div className="completed-body-row-right">
                                <label>{'3 months'}</label>
                                <label>{'14 Sep 2018'}</label>
                                <label>{'1,000,000 ETH'}</label>
                                <label>{'1,200,000 ETH'}</label>
                                <label>{'+25%'}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
);

export default class TraderDetail extends Component {
    render(){
        const item = { rating: 1 }
        return (
            <div style={{ backgroundColor: '#fafbff', minHeight: '100vh' }}>
                <InvestNavigation header="Trader" history={this.props.history} />
                <TraderDetailBlock {...item} />
            </div>
        )
    }
}