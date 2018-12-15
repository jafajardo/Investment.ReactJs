import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Line } from 'react-chartjs-2';

class Loan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loanAmount: 0.0,
            interestRate: 0.0,
            loanTerm: 0,
            paymentFrequency: 0,
            offset: 0.0
        }
    }
    handlePaymentFrequencyTextboxOnChange = (e) => {
        this.setState({
            paymentFrequency: e.target.value
        });
    }
    handleLoanTermTextboxOnChange = (e) => {
        this.setState({
            loanTerm: e.target.value
        });
    }
    handleInterestRateTextboxOnChange = (e) => {
        this.setState({
            interestRate: e.target.value
        });
    }
    handleLoanAmountTextboxOnChange = (e) => {
        this.setState({
            loanAmount: e.target.value
        });
    }
    handleLoanCalculateOnClick = (e) => {
        this.props.CalculateAmortisation(
            this.state.loanAmount,
            this.state.interestRate,
            this.state.loanTerm,
            this.state.paymentFrequency,
            this.state.offset);
    }
    handlePaymentFrequencySelection = (e) => {
        this.setState({
            paymentFrequency: e.target.value
        })
    }
    handleOffsetTextboxOnChange = (e) => {
        this.setState({
            offset: e.target.value
        });
    }
    renderChart = () => {
        let labels = [];
        let monthlyAmortisation = [];
        let interest = [];
        let principal = [];

        if (this.props.amortisationPayments.length > 0) {
            this.props.amortisationPayments.map((pay, index) => {
                labels.push(`Payment ${index + 1}`);
                monthlyAmortisation.push(pay.montlyPayment);
                interest.push(pay.interestPortion);
                principal.push(pay.principalPortion);
            });

            return (
                <Line 
                    data={{
                        labels,
                        datasets: [
                            {
                                label: 'Monthly Payments',
                                data: monthlyAmortisation,
                                backgroundColor: [
                                    'rgba(63, 191, 80, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(63, 191, 80, 1)'
                                ],
                                borderWidth: 1
                            },
                            {
                                label: 'Interest Portion',
                                data: interest,
                                backgroundColor: [
                                    'rgba(192,163,77,0.2)'
                                ],
                                borderColor: [
                                    'rgba(192,163,77,1)'
                                ],
                                borderWidth: 1
                            },
                            {
                                label: 'Principal Portion',
                                data: principal,
                                backgroundColor: [
                                    'rgba(40,63,214,0.2)'
                                ],
                                borderColor: [
                                    'rgba(40,63,214,0.2)'
                                ],
                                borderWidth: 1
                            }
                        ]
                    }}
                />
            )
        }

        return <div></div>
    }
    render() {
        return(
            <div>
                <form>
                    <div className="row">
                        <div className="form-group col-sm-3">
                            <label htmlFor="loanAmountTextbox">Loan Amount</label>
                            <input type="text" className="form-control" id="loanAmountTextbox" placeholder="Loan amount" onChange={this.handleLoanAmountTextboxOnChange}></input>
                        </div>
                        <div className="form-group col-sm-2">
                            <label htmlFor="interestTextbox">Interest</label>
                            <input type="text" className="form-control" id="interestTextbox" placeholder="Interest rate" onChange={this.handleInterestRateTextboxOnChange}></input>
                        </div>
                        <div className="form-group col-sm-2">
                            <label htmlFor="loanTermTextbox">Loan Term</label>
                            <input type="text" className="form-control" id="loanTermTextbox" placeholder="Loan term" onChange={this.handleLoanTermTextboxOnChange}></input>
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="paymentFrequencyDropDown">Payment Frequency</label>
                            <select id="paymentFrequencyDropDown" className="form-control" value={this.state.paymentFrequency} onChange={this.handlePaymentFrequencySelection}>
                                <option>Please select</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Fortnightly">Fortnightly</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                            {/* <input type="text" className="form-control" id="paymentFrequencyTextbox" placeholder="Payment frequency" onChange={this.handlePaymentFrequencyTextboxOnChange}></input> */}
                        </div>
                        <div className="form-group col-sm-2">
                            <label htmlFor="offsetTextbox">Offset</label>
                            <input type="text" className="form-control" id="offsetTextbox" placeholder="Offset" onChange={this.handleOffsetTextboxOnChange}></input>
                        </div>
                    </div>
                    <div className="row col-sm-12 m-0 p-0">
                        <button type="button" className="btn btn-warning btn-block" href="#" onClick={this.handleLoanCalculateOnClick}>Calculate</button>
                    </div>
                </form>
                {this.renderChart()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        amortisationPayments: state.loan.amortisationPayments
    }
}

export default connect(mapStateToProps, actions)(Loan);
