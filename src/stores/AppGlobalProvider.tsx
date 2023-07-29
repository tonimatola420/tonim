import { createContext, useContext, useEffect, useReducer, useState } from "react";

interface State {
  data: { name: string, value: { [k: string]: any }, id: number }[];
}

interface Action {
  type: string;
  payload: any;
}

export const StateContext = createContext<State>({
  data: [{ name: 'somak', value: {}, id: 0 }]
});

export type IContextProps = (type: string, payload?: any) => void;

export const DispatchContext = createContext({} as IContextProps);
// const [count, setCount] = useState(0);
const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'add':
      // setCount(count+1);
      // console.log('somakRunCount', state.data.length, payload.name, JSON.stringify(payload.value));
      // payload.len = state.data.length;
      // console.log('Dispatch inside somakRunCount', state.data.length, payload.name, JSON.stringify(payload.value));
      return {
        ...state,
        data: [
          // ...state.data,
          ...state.data.filter((todo) => todo.name !== payload.name),
          { name: '' + payload.name, value: payload.value, id: state.data.length + 1 },
        ],
      };
    case 'deleteById':
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== payload.id)
      };
      case 'deleteByName':
      return {
        ...state,
        data: state.data.filter((todo) => todo.name !== payload.name)
      };
    case 'update_value':
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === payload.id) {
            todo.value = payload.value;
            return todo;
          }
          return todo;
        }),
      };
    case 'update_name':
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo.id === payload.id) {
            todo.name = payload.name;
            return todo;
          }
          return todo;
        }),
      };      
    default:
      return {
        ...state,
        data: [{ name: 'somak', value: {}, id: 0 },],
      }
  }
};

export const AppGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    data: [{ name: 'somak', value: {}, id: 0 }],
  });

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAppGlobalState = () => useContext(StateContext);
export const useAppGlobalDispatch = () => useContext(DispatchContext);
