import { useReducer } from "react";

function myreducer(state, action) {
    switch (action.type) {
      case `plus`:
        return { value: state.value + 1 };
      case `minus`:
        return { value: state.value - 1 };
      default:
        return state;
    }
  }

function myreducer2(state2, action) {
    switch (action.type) {
      case `plus`:
        return { value: state2.value + 2 };
      case `minus`:
        return { value: state2.value - 2 };
      default:
        return state2;
    }
  }

  function mymy(mystate, action) {
    switch (action.type) {
      case `plus`:
        return { value: mystate.value + 10 };
      case `minus`:
        return { value: mystate.value - 10 };
      default:
        return mystate;
    }
  }
  
  const Counter = () => {
    const [state, dispatch] = useReducer(myreducer, { value: 0 });
    const [state2, dispatch2] = useReducer(myreducer2, { value: 0 });
    const [mystate, mydispatch] = useReducer(mymy, { value: 100 })
  
    return (
      <div>
        <p>
            카운터 1값은 <b>{state.value}</b>입니다.
        </p>
        <p>
            카운터2 값은 <b>{state2.value}</b>입니다.
        </p>
        <p>
            카운터3 값은 <b>{mystate.value}</b>입니다.
        </p>
        <button onClick={() => dispatch({ type: `plus` })}>+</button>
        <button onClick={() => dispatch({ type: `minus` })}>-</button>
        <button onClick={() => dispatch2({ type: `plus` })}>++</button>
        <button onClick={() => dispatch2({ type: `minus` })}>--</button>
        <button onClick={() => mydispatch({ type: `plus` })}>++</button>
        <button onClick={() => mydispatch({ type: `minus` })}>--</button>
      </div>
    );
  };
  
  export default Counter;