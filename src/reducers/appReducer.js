import navigation from './navigation';

const combineReducers = (reducersMap) => (state, action) => Object.keys(reducersMap)
  .reduce(
    (newState, reducerName) => {
      const reducer = reducersMap[reducerName];
      const partialState = newState[reducerName];
      return {
        ...newState,
        [reducerName]: reducer(partialState, action),
      };
    },
    state,
  );

export default combineReducers({ navigation });
