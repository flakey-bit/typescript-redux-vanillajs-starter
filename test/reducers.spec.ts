/// <reference path="matcher-types.d.ts" />

import GlobalReducer, { GlobalStateTree } from "../app/reducers";
import { createUpdateQuantityAction } from "../app/actions";
import { deepEqualMatcherFactory } from "./deepEqualMatcher";

describe("globalStateTreeReducer", function() {
    beforeEach(function() {
        jasmine.addMatchers({
            toBeDeepEqual: deepEqualMatcherFactory});
        });

    it("shouldCalculateTheAmountsWhenQuantityIsChanged", function() {
        let inputState: GlobalStateTree = {
            lineitem: {
                quantity: 0,
                cost: 100
            },
            tax: {
                currentTaxRate: 0.1
            },
            calculation: {
                lineItemTotal: 0,
                gstAmount: 0,
                grandTotal: 0
            }
        };

        let inputAction = createUpdateQuantityAction({
            quantity: 1
        });

        let resultingState = GlobalReducer(inputState, inputAction);
        expect(resultingState!.calculation).toBeDefined();
        expect(resultingState!.calculation.lineItemTotal).toBe(100);
        expect(resultingState!.calculation.gstAmount).toBe(10);
        expect(resultingState!.calculation.grandTotal).toBe(110);
    });
});