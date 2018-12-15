import React from 'react';

import {
    CALCULATE_AMORTISATION
} from '../config';

const INITIAL_STATE = {
    amortisationPayments: []
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CALCULATE_AMORTISATION: {
            console.dir(action.payload)
            return {...state, amortisationPayments: action.payload}
        }
    }
    return state;
}
