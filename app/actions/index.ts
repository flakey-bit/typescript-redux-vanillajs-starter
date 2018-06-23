import { createAction, ActionType } from 'typesafe-actions';
import { UpdateCostPayload, UpdateQuantityPayload, UpdateTaxRatePayload } from '../types';
import { LogVerbosityLevel } from "../middleware";

interface AppActionMeta {
  logVerbosity: LogVerbosityLevel
}

export const createUpdateCostAction = createAction("UPDATE_COST", resolve => {
  return (payload: UpdateCostPayload) => resolve(payload, {logVerbosity: LogVerbosityLevel.INFO} as AppActionMeta);
});

export const createUpdateQuantityAction = createAction("UPDATE_QUANTITY", resolve => {
  return (payload: UpdateQuantityPayload) => resolve(payload, {logVerbosity: LogVerbosityLevel.INFO} as AppActionMeta);
});

export const createUpdateTaxRateAction = createAction("UPDATE_TAX_RATE", resolve => {
  return (payload: UpdateTaxRatePayload) => resolve(payload, {logVerbosity: LogVerbosityLevel.INFO} as AppActionMeta);
});

const lineitemActionCreators = {
  createUpdateCostAction,
  createUpdateQuantityAction
};

const taxRateActionCreators = {
  createUpdateTaxRateAction
};

export type TaxRateActions = ActionType<typeof taxRateActionCreators>;
export type LineitemActions = ActionType<typeof lineitemActionCreators>;
export type AllAppActions = TaxRateActions | LineitemActions;