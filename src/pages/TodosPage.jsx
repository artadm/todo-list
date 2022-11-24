import TodoForm from '../Components/TodoForm'
import TodoModal from '../UI/TodoModal'
import React, {useEffect, useState} from 'react'
import TodoList from '../Components/TodoList'
import TodoService from '../API/TodoService'


const TodosPage = () => {
    const [modalVisible, setModalVisible] = useState(Boolean)
    const [loading, setLoading] = useState() 
    const [todos, setTodos] = useState([])


    /**FetchTodo - Function for fetching data and setting loding if request is too long, also for catching errors. */
    const fetchTodo = async() => {
        try {
        setLoading(true)
        await TodoService.getAll(setTodos)
        console.log();
        } catch(e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }


 /**addTodo - use async function from TodoService class to add new Todo, id = max index of elem in array + 1 */   
const addTodo = (td) => {
    TodoService.addTodo({...td, id: (Math.max(...todos.map(t => Number(t.id))) + 1)})
    setModalVisible(false)
}


/**removeTodo - use async function from TodoService class to remove Todo by index = id of elem */  
const removeTodo = (td) => {
    TodoService.removeTodo(td.id)
}

/**editTodo - use async function from TodoService class to edit Todo by index = id of elem. Then get all todos again. */ 
const editTodo = (td) => {
    TodoService.setTodo(td, td.id)
    fetchTodo()
}



useEffect(() => {
    fetchTodo()
}, [todos.length])


  return (
    <div>
        <button className='btn btn__page btn__primary' onClick={() => setModalVisible(true)}>Add todo</button>

        <TodoModal setVisible={setModalVisible} visible={modalVisible}>
            <TodoForm create={addTodo}/>
        </TodoModal>
        {!loading ? 
        <TodoList remove={removeTodo} todos={todos} edit={editTodo}/>
     :
     <div className="loader">Loading...</div>
     }
    </div>
  )
}

export default TodosPage