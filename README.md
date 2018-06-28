# typescript-redux-vanillajs-starter
A starter for strongly-typed redux vanilla JS apps. Uses the fantastic [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) along with webpack, karma and jasmine.

If you're like me and like the purity of redux/functional programming but can't live without strong typing everywhere (Typescript all the things!) then this is for you.

* Type safety in your reducers (thanks to type guards)
* No more leaked string constants for action names. The only place you see the action names is when you're defining the action creators.

## Getting started:
- Clone the repo
- `npm install`

## Running the dev server w/ automatic refresh:
`npm run dev`

## Running tests in "watch" mode (runs tests on file change)
`npm run test-watch`

## Build for deploy
`npm run build`

The demo app is just a trivial invoice-type-thing (but demonstrates the concepts nicely, I think).
