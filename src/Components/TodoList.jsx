import React, {useEffect, useState} from 'react'

import TodoItem from './TodoItem';
import TodoService from "../API/TodoService";
import TodoModal from '../UI/TodoModal';
import TodoForm from './TodoForm';

const TodoList = ({todos, edit, remove}) => {
const [todo, setTodo] = useState()
const [modal, setModalVisible] = useState(false)

/**Close modal, uses editTodo function from parent component */
const editTodo = (td) =>{
  setModalVisible(false)
  edit(td)
}

/**Uses removeTodo function from parent component */
const removeTodos = (td) => {
    remove(td)
}

/**Set previous todo for todo form to edit it? also open edit form for todo*/
const modalTodo = (td) => {
  setModalVisible(true)
  setTodo(td)
}



  return (
    <div className='todo__list'>
        <TodoModal setVisible={setModalVisible} visible={modal}><TodoForm prevtodo={todo} edit={editTodo}></TodoForm></TodoModal>
   
        {todos.filter(t => t != undefined || null).map((td, index) =>
                <TodoItem key={td.id} edit={(td) => modalTodo(td)} remove={removeTodos} todo={td} />
        )
      }
</div>
  )
}

export default TodoList