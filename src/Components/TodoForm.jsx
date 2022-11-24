import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

const TodoForm = ({create, edit, prevtodo, setVisible}) => {
  const [todo, setTodo] = useState({title: '', body: '', date: '', completed: Boolean, id: null, file: ''} )

  /**Uses addTodo (create) function from parent component, clean todo inputs*/
const addTodo = (e) => {
  e.preventDefault()
  if(todo.date != '' && todo.title != '' && todo.body != '' ) {
  create({...todo, completed: false})
  setTodo({title: '', body: '', date: '', completed: Boolean, id: null, file: ''})
  } else {
    alert("Заполните все поля")
  }
}

/**Create a link to an image or file for a database */
const setInputFile = (event) => {
  if (event.target.files && event.target.files[0]) {
      setTodo({...todo, file: URL.createObjectURL(event.target.files[0])})
}
}

/**Uses editTodo (edit) function from parent component, clean todo inputs*/ 
const editTodo = (e) => {
  e.preventDefault()
  edit(todo)
  setTodo({title: '', body: '', date: '', completed: Boolean, id: null, file: ''})
}

useEffect(() => {
  /**Checks if it is editing todo or adding todo and putting values into inputs */
  prevtodo ? setTodo(prevtodo) : setTodo(todo)
}, [prevtodo])

  return (
    <form className='form'>
    <input className='form__input'
        value={todo.title}
        onChange={e => setTodo({...todo, title: e.target.value})}
        type="text"
        placeholder="Todo title"
        required={true}
    />
    <textarea className='form__input'
        value={todo.body}
        onChange={e => setTodo({...todo, body: e.target.value})}
        type="text"
        placeholder="Todo description"
        required={true}
    />
    <input className='form__input'
        value={todo.date}
        onChange={e => setTodo({...todo, date: e.target.value})}
        min={dayjs().format('YYYY-MM-DD')}
        type="date"
        placeholder="Todo date"
        required={true}
    />
    {create? 
    <>
     <input onChange={e =>  setInputFile(e)} type="file" />
    <button className='btn btn__primary' onClick={(e) => addTodo(e)}>Create</button>
    </>
    :
    <>
    <select className='form__input'
        value={todo.completed}
        onChange={e => setTodo({...todo, completed: e.target.value})}
        placeholder="Todo Complete"
    >
       <option value={true}>Complete</option>
       <option value={false}>Unfinished</option>
    </select>
    <input onChange={e =>  setInputFile(e)} type="file" />

    <button className='btn btn__primary' onClick={(e) => editTodo(e)}>Edit</button>
    </>
  }
</form>
  )
}

export default TodoForm