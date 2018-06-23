import { combineReducers, AnyAction, Reducer } from 'redux';
import { getType } from 'typesafe-actions';
import { UpdateCostPayload, UpdateQuantityPayload, UpdateTaxRatePayload } from '../types';
import { createUpdateTaxRateAction, createUpdateCostAction, createUpdateQuantityAction, TaxRateActions, LineitemActions } from '../actions';

export interface GlobalStateTree {
  tax: TaxStateTree;
  lineitem: LineitemStateTree;
  calculation: CalculationStateTree;
}

export interface CalculationStateTree {
  lineItemTotal: number;
  gstAmount: number;
  grandTotal: number;
}

export interface TaxStateTree {
  currentTaxRate: number;
}

export interface LineitemStateTree {
  quantity: number;
  cost: number;
}

export const initialState: GlobalStateTree = {
  tax: {
    currentTaxRate: 0
  },
  lineitem: {
    quantity: 0,
    cost: 0
  },
  calculation: {
    lineItemTotal: 0,
    gstAmount: 0,
    grandTotal: 0
  }
}

// Handle actions acting on the TaxStateTree
export const taxRateTreeReducer = (state: TaxStateTree = initialState.tax, action: TaxRateActions) => {
  switch (action.type) {
    case getType(createUpdateTaxRateAction):
      return reduceSetTaxRateAction(action.payload, state);  
    default:
      return state;
  }
};

// Handle actions acting on the LineitemStateTree
export const lineItemTreeReducer = (state: LineitemStateTree = initialState.lineitem, action: LineitemActions) => {
  switch (action.type) {
    case getType(createUpdateCostAction):
      return reduceUpdateCostAction(action.payload, state)
    case getType(createUpdateQuantityAction):
      return reduceUpdateQuantityAction(action.payload, state); 
    default:
    return state;
  }
};

const specificReducers = combineReducers<GlobalStateTree>({
  tax: taxRateTreeReducer,
  lineitem: lineItemTreeReducer,
  calculation: (state, action) => state || initialState.calculation
})

const reducer: Reducer<GlobalStateTree | undefined, AnyAction> = (state = initialState, action) => {
  let newState = specificReducers(state, action);
  if (newState.tax === state.tax && newState.lineitem === state.lineitem) {
    return state;
  }

  let lineItemTotal = newState.lineitem.quantity * newState.lineitem.cost;
  let gstAmount = newState.tax.currentTaxRate * lineItemTotal;
  let grandTotal = lineItemTotal + gstAmount;

  return {...newState, calculation: {
    lineItemTotal,
    gstAmount,
    grandTotal
  }}
};

export default reducer;

// Implementation below

function reduceUpdateCostAction(payload: UpdateCostPayload, state: LineitemStateTree): LineitemStateTree {
  return {...state,
    cost: Math.ceil(payload.cost)
  };
}

function reduceUpdateQuantityAction(payload: UpdateQuantityPayload, state: LineitemStateTree): LineitemStateTree {
  return {...state,
    quantity: payload.quantity <= 0 ? 1 : payload.quantity
  };
}

function reduceSetTaxRateAction(payload: UpdateTaxRatePayload, state: TaxStateTree): TaxStateTree {
  return  { ...state, currentTaxRate: payload.taxRate };
}