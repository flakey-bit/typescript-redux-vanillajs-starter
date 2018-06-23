declare namespace jasmine {
    interface Matchers<T> {
        toBeDeepEqual(observed: any): boolean;
    }

    interface ArrayLikeMatchers<T> {
        toBeDeepEqual(observed: any): boolean;
    }
}