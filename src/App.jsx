import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(()=>{
       let todoString = localStorage.getItem("todos")
       if(todoString){
       let todos = JSON.parse(todoString)
       setTodos(todos)
       }
  },[])

  function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos)) 
  }

  function handleDelete(e, id) {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    let areUSure = confirm("Are You Sure?")

    if (areUSure) {
      setTodos(newTodos)
    }

    saveToLocalStorage()

  }

  function handleEdit(e, id) {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)

    saveToLocalStorage()
  }

  function handleSubmit() {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

    saveToLocalStorage()
  }

  function handleChange(e) {
    setTodo(e.target.value)
  }

  function handleCheckbox(e) {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(id)
    console.log(index)

    saveToLocalStorage()
  }


  return (
    <>
      <Navbar></Navbar>
      <div className='w-[100vw] flex justify-center m-4 font-bold text-blue-900 text-3xl'>Your ToDo's</div>
      <div className='w-[100vw] flex justify-center'>
        <div className="w-[65vw] min-h-[50vh] bg-blue-300 border-4 border-blue-900 rounded-2xl flex flex-col gap-2">
          <div className="my-2 mx-6 text-lg font-semibold text-black">Add A ToDo</div>
          <div className="flex gap-1">
            <input type="text" onChange={handleChange} value={todo} name="todo" className='w-[60%] mx-6 p-1' />
            <button onClick={handleSubmit} className='bg-blue-800 text-white w-20 h-8 rounded-md'>Submit</button>
          </div>
          <div className="my-2 mx-6 text-lg font-semibold text-black">Your ToDos</div>
          <div className="todos flex flex-col  mx-6 gap-1 w-[65%]">

            {todos.length === 0 && <div>No Task To Do </div>}


            {todos.map(item => {
              return <div key={item.id} className="todo flex justify-between gap-2">
                
                <div className="taskbox flex gap-1">
                  <input name={item.id} onChange={handleCheckbox} className="content-center" type="checkbox" value={item.isCompleted} />
                  <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
                </div>
                <div className="buttons flex gap-1 h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-800 text-white w-20 h-8 rounded-md'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-800 text-white w-20 h-8 rounded-md'>Delete</button>
                </div>
               
              </div>
            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default App
