import React from 'react';
import axios from 'axios';

import {
    webApiEndpoint,
    investmentEndpoint,
    CALCULATE_INVESTMENT
} from '../config';

export function CalculateInvestment(yearsToInvest, interestEarned, initialInvestment, reinvestmentAmount) {
    return dispatch => {
        axios.post(`${webApiEndpoint}${investmentEndpoint}`, {
            YearsToInvest: yearsToInvest,
            InvestmentInterest: interestEarned,
            InitialInvestment: initialInvestment,
            ReinvestmentAmount: reinvestmentAmount
        })
        .then(response => {
            dispatch({
                type: CALCULATE_INVESTMENT,
                payload: response.data.performance
            });
        });
    }
}