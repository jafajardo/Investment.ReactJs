import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import * as action from '../actions';
import { Line } from 'react-chartjs-2';

class Investment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearsToInvest: 0,
            interestEarned: 0.0,
            initialInvestment: 0.0,
            reinvestmentAmount: 0.0
        }
    }

    handleYearsToInvestInputChange = (e) => {
        this.setState({
            yearsToInvest: e.target.value
        });
    }
    handleInterestEarnedInputChange = (e) => {
        this.setState({
            interestEarned: e.target.value
        });
    }
    handleInitialInvestmentInputChange = (e) => {
        this.setState({
            initialInvestment: e.target.value
        });
    }
    handleReinvestmentAmountInputChange = (e) => {
        this.setState({
            reinvestmentAmount: e.target.value
        });
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.CalculateInvestment(
            this.state.yearsToInvest,
            this.state.interestEarned,
            this.state.initialInvestment,
            this.state.reinvestmentAmount
        );
    }
    renderChart = () => {
        let labels = [];
        let chartData = [];

        if (this.props.investmentCalculation.length > 0) {
            this.props.investmentCalculation.map((calc, index) => {
                labels.push(`Year ${index + 1}`);
                chartData.push(calc);
            })

            return(
                <Line 
                    data={{ 
                        labels: labels,
                        datasets: [
                            {
                                label: 'Investment Performance',
                                data: chartData,
                                backgroundColor: [
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)'
                                ],
                                borderWidth: 1
                            }
                        ]
                    }}
                />
            );
        }

        return <div></div>
    }

    render() {
        return(
            <div>
                <form className="p-2 pt-3">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="yearsToInvest">Years To Invest</label>
                                <input type="text" className="form-control" id="yearsToInvest" placeholder="Years to invest" onChange={this.handleYearsToInvestInputChange}></input>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="interestEarned">Interest Earned</label>
                                <input type="text" className="form-control" id="interestEarned" placeholder="Interest rate" onChange={this.handleInterestEarnedInputChange}></input>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="initialInvestment">Initial Investment</label>
                                <input type="text" className="form-control" id="initialInvestment" placeholder="Investment amount" onChange={this.handleInitialInvestmentInputChange}></input>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="form-group">
                                <label htmlFor="reinvestment">Reinvestment Amount</label>
                                <input type="text" className="form-control" id="reinvestment" placeholder="Reinvestment amount" onChange={this.handleReinvestmentAmountInputChange}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row col-sm-12 m-0 p-0">
                        <button type="button" className="btn btn-success btn-block" href="#" onClick={this.handleFormSubmit}>Calculate</button>
                    </div>
                </form>
                {this.renderChart()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        investmentCalculation: state.investment.investmentCalculation
    }
}

export default connect(mapStateToProps, action)(Investment);