import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {

  // When a store is created,
  // Redux dispatches a dummy action to your reducer to populate the store with the initial state.
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}
