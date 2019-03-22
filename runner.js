const Redux = require('redux');

const log = console.log;

log(Redux);

const initial_state = {counter: 0, color: 'green'};

const reducer = (state, action)=>{
    log("reducer: action: ", action);

    let counter = state.counter;
    const dC = typeof(action.delta)!=='number'?1:action.delta;
   
    if (typeof(action.type)==='string')
    { if(action.type.indexOf('@redux/INIT') !== -1) log("INIT fired.."); }

    switch(action.type)
    {
     case 'PLUS': counter = state.counter + dC; break;
     case 'MINUS': counter = state.counter - dC; break;
     case 'RESET': counter = 0; log("RESET called..");  
    }

    return {...state, counter: counter};
};


const reducerMINUS = (state, action)=>{
    log("reducer: action: ", action);

    let counter = state.counter;
    const dC = typeof(action.delta)!=='number'?1:action.delta;
   
    if (typeof(action.type)==='string')
    { if(action.type.indexOf('@redux/INIT') !== -1) log("INIT fired.."); }

    switch(action.type)
    {
    // case 'PLUS': counter = state.counter + dC; break;
     case 'MINUS': counter = state.counter - dC; break;
     case 'RESET': counter = 0; log("RESET called..");  
    }

    return {...state, counter: counter};
};

const store = Redux.createStore(reducer, initial_state);
store.subscribe(() =>{ log("subs: ", store.getState()); } );

log("State0: ", store.getState());


store.dispatch({type: {e:2222}});
store.dispatch({type: "PLUS", delta: 10});
log("State1: ", store.getState());
store.dispatch({type: "MINUS"});
log("State2: ", store.getState());
store.dispatch({type: "RESET"});
store.dispatch({type: "MINUS213"});
store.dispatch({type: "Mewrewr"});
log("State3: ", store.getState());

//----------- change reducer -------------

store.replaceReducer(reducerMINUS);
store.dispatch({type: "PLUS", delta: 10});
store.dispatch({type: "PLUS", delta: 10});
log("State4: ", store.getState());


log(store);
// log(new Date().toTimeString());

var plus = (st=0, ac) => {
    log('plus, ac:', ac);
    return st +1;
}

var minus = (st=0, ac) => {
    log('minus, ac:', ac);
    
    return st - 1;
}

const plus_minus = Redux.combineReducers({p: plus, m: minus});
//var store3 = Redux.createStore(plus_minus,{p:0, m:0});
const store3 = Redux.createStore(plus_minus);

log(store3.getState());

store3.dispatch({type:'+'});
log(store3.getState());
