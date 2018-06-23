/// <reference path="matcher-types.d.ts" />

import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { GlobalStateTree } from "../app/reducers"
import * as thunks from "../app/thunks";
import { UpdateCostPayload, UpdateQuantityPayload } from "../app/types";
import { deepEqualMatcherFactory } from "./deepEqualMatcher";

const mockStore = configureMockStore<GlobalStateTree>([thunk]); 

describe("resetLineitemThunk", function() {
    beforeEach(function() {
        jasmine.addMatchers({
            toBeDeepEqual: deepEqualMatcherFactory});
        });

    it("should dispatch the correct actions", async function() {
        let store = mockStore();
        await store.dispatch(thunks.resetLineitemThunk());
        const actions = store.getActions();

        expect(actions).toBeDeepEqual([
            {
              "type": "UPDATE_COST",
              "payload": {
                "cost": 0
              },
              "meta": {
                "logVerbosity": "INFO"
              }
            },
            {
              "type": "UPDATE_QUANTITY",
              "payload": {
                "quantity": 0
              },
              "meta": {
                "logVerbosity": "INFO"
              }
            }
          ])
    });
});