
import { UpdateCostPayload, UpdateQuantityPayload } from "../types";
import { createUpdateCostAction, createUpdateQuantityAction, AllAppActions } from "../actions";
import { AnyAction } from "redux";
import { GlobalStateTree } from "../reducers";

export const resetLineitemThunk = function(): AnyAction {
  return <AllAppActions>(<any>(function(dispatch: (action: AllAppActions) => void, getState: () => GlobalStateTree) {
    dispatch(createUpdateCostAction({
      cost: 0
    }));

    dispatch(createUpdateQuantityAction({
      quantity: 0
    }));
  }));
}