import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from './reducers/reduxReducer';

const saveStateToLocalStorage = (state) => {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
   } catch (error) {

      console.error('Ошибка при сохранении состояния в localStorage:', error);
   }
};

const loadStateFromLocalStorage = () => {
   try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
         return undefined;
      }
      return JSON.parse(serializedState);
   } catch (error) {

      console.error('Ошибка при загрузке состояния из localStorage:', error);
      return undefined;
   }
};


const store = configureStore({
   reducer: reduxReducer,
   preloadedState: loadStateFromLocalStorage()
});

store.subscribe(() => {
   const state = store.getState();
   saveStateToLocalStorage(state);

});

export default store;



