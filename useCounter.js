import { useState } from "react";
export const useCounter = (initialValue = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const increment = (value = 1) => {
    // if(counter===30) return; //si es mayor a 30 no se puede incrementar
    setCounter(counter + value);
  };

  const decrement = (value = 1) => {
    if (counter === 0) return; //si es menor a 0 no se puede decrementar
    setCounter(counter - value);
  };
  const reset = () => {
    setCounter(initialValue);
  };

  return { 
    counter,
    increment,
    reset,
    decrement,
  };
};
