import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
    try {
      return JSON.parse(localStorage.getItem('todos')) || [];
    } catch (error) {
      console.error('Error parsing todos from localStorage:', error);
      return []; // Devuelve un arreglo vacío si ocurre un error.
    }
  };



export const useTodos = () => {
  
 const [todos, dispatch] = useReducer(todoReducer,[],init);
   
   useEffect(() => {
   localStorage.setItem('todos', JSON.stringify(todos));
   
   }, [todos])
   



const handleNewTodo = (todo) => {
  const action = {
    type: '[TODO] Add Todo',
    payload: todo,
  }
  dispatch(action);
}

const handleDeleteTodo = (id) => {
 
  dispatch ({
    type: '[TODO] Remove Todo',
    payload: id,
  });
}
const handleToggleTodo = (id) => {
  dispatch({
    type: '[TODO] Toggle Todo',
    payload: id,
  });
}



return{
    todos,
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    


}

}