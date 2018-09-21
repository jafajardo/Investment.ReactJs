import React from 'react';

import {
    CALCULATE_INVESTMENT
} from '../config';

const INITIAL_STATE = {
    investmentCalculation: []
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CALCULATE_INVESTMENT: {
            return {...state, investmentCalculation: action.payload}
        }
    }
    return state;
}