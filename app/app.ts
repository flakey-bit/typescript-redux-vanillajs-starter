import * as redux from 'redux';
import thunk from 'redux-thunk';

import reducers, * as state from './reducers'
import { LoggingMiddleware } from './middleware';
import { createUpdateCostAction, createUpdateQuantityAction, createUpdateTaxRateAction } from './actions';
import { resetLineitemThunk } from './thunks';

import { GlobalStateTree } from "./reducers";

window.addEventListener("load", () => {
    const store: redux.Store<state.GlobalStateTree> = redux.createStore(
        reducers,
        state.initialState,
        redux.applyMiddleware(LoggingMiddleware, thunk),
      );
    
    // Wire up events
    const gstRateInput = <HTMLInputElement> document.getElementById('gstRateInput');
    gstRateInput.addEventListener('input', (event) => {
        const taxRate = parseFloat(gstRateInput.value);
        if (!isNaN(taxRate)) {
            store.dispatch(createUpdateTaxRateAction({
                taxRate
            }));
        }
    });

    const costInput = <HTMLInputElement> document.getElementById('costInput');
    costInput.addEventListener('input', (event) => {
        const cost = parseFloat(costInput.value);
        if (!isNaN(cost)) {
            store.dispatch(createUpdateCostAction({
                cost
            }));
        }
    });

    const quantityInput = <HTMLInputElement> document.getElementById('quantityInput');
    quantityInput.addEventListener('input', (event) => {
        const quantity = parseFloat(quantityInput.value);
        if (!isNaN(quantity)) {
            store.dispatch(createUpdateQuantityAction({
                quantity
            }));
        }
    });

    const resetButton = <HTMLInputElement> document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        store.dispatch(resetLineitemThunk());
    });

    const lineItemTotalOutput = <HTMLElement> document.getElementById('lineItemTotalOutput');
    const gstAmountOutput = <HTMLElement> document.getElementById('gstAmountOutput');
    const grandTotalOutput = <HTMLElement> document.getElementById('grandTotalOutput');

    const bruteForceRefresh = () => {
        // Brute-force update the fields & inputs based on latest state.
        const state: GlobalStateTree = store.getState();

        lineItemTotalOutput.innerText = state.calculation.lineItemTotal.toString();
        gstAmountOutput.innerText = state.calculation.gstAmount.toString();
        grandTotalOutput.innerText = state.calculation.grandTotal.toString();

        costInput.value = state.lineitem.cost.toString();
        quantityInput.value = state.lineitem.quantity.toString();
        gstRateInput.value = state.tax.currentTaxRate.toString();
    };

    store.subscribe(bruteForceRefresh)

    bruteForceRefresh();
});

