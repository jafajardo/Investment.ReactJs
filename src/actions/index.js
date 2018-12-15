import React from 'react';
import axios from 'axios';

import {
    WEBAPIENDPOINT,
    INVESTMENTENDPOINT,
    LOANENDPOINT,
    CALCULATE_INVESTMENT,
    CALCULATE_AMORTISATION
} from '../config';

export function CalculateInvestment(yearsToInvest, interestEarned, initialInvestment, reinvestmentAmount) {
    return dispatch => {
        axios.post(`${WEBAPIENDPOINT}${INVESTMENTENDPOINT}`, {
            YearsToInvest: yearsToInvest,
            InvestmentInterest: interestEarned,
            InitialInvestment: initialInvestment,
            ReinvestmentAmount: reinvestmentAmount,

        })
        .then(response => {
            dispatch({
                type: CALCULATE_INVESTMENT,
                payload: response.data.performance
            });
        });
    }
}

export function CalculateAmortisation(loanAmount, interestRate, loanTerm, paymentFrequency, offset) {
    return dispatch => {
        axios.post(`${WEBAPIENDPOINT}${LOANENDPOINT}`, {
            Amount: loanAmount,
            Interest: interestRate,
            Term: loanTerm,
            PaymentFrequency: paymentFrequency,
            Offset: offset
        })
        .then(response => {
            console.dir(response.data.amortisationPayments)
            dispatch({
                type: CALCULATE_AMORTISATION,
                payload: response.data.amortisationPayments
            });
        });
    }
}