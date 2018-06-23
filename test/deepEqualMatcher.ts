import { diff } from "deep-object-diff";

const deepEqualMatcher: jasmine.CustomMatcher = {
    compare: function(actual: any, expected: any) {
        let diffObj = diff(expected, actual);
        let result: jasmine.CustomMatcherResult;
        if (Object.keys(diffObj).length > 0) {
            result = {
                pass: false,
                message: "Expected the objects to be deep-equal but they were not:\n" + JSON.stringify(diffObj, null, 2)
            }
        } else {
            result = {
                pass: true,
                message: "Expected the objects not to be deep-equal but they were"
            };
        }

        return result;
    }
};

export const deepEqualMatcherFactory: jasmine.CustomMatcherFactory = () => deepEqualMatcher;