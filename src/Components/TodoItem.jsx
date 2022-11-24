import dayjs from 'dayjs'
import React from 'react'
import { useEffect, useState } from 'react'
import { useRef } from 'react'


const TodoItem = (props) => {
const [item, setItem] = useState(false)
const [btn, setBtn] = useState(false)


/** Remove the ability to edit tasks if it's completed or failed. Also adds classes for outstanding and completed tasks, validating fields and date todo.comlete*/
const setClasses = () => {
    if(props.todo.completed) {
            setItem(' complete')
            setBtn(true)
    } else {
            if(dayjs().format('YYYY-MM-DD') >= props.todo.date) {
                setBtn(true)
                setItem(' unfinished')
            } else {
                setBtn(false)
                setItem('')
            }
    }
}
    

useEffect(() => {
   setClasses()
}, [props.todo.completed])



  return (
    <div  className={`todo__item ${item}`}>
            <div className="todo__item-content">
                <strong>{props.todo.title}</strong>
                <div>
                    {props.todo.body}
                </div>
                <div className="todo__item-date">
                    {props.todo.date}
                </div>
            
            {props.todo.file? 
                <div className="todo__item-files">
                    <img src={props.todo.file}/>
                </div>
                :
                <></>
}
            </div>
            <div className="todo__item-btns">
                <button disabled={btn}  className='btn btn__primary' onClick={() => props.edit(props.todo)}>
                   {!btn ? "Edit" : props.todo.completed? 'Completed' : 'Failed'} 
                </button>
                    <button className='btn btn__delete' onClick={() => props.remove(props.todo)}>
                    Delete
                </button>
            </div>
        </div>
  )
}

export default TodoItem