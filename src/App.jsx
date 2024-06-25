import { useState } from 'react'
import './App.css'
import { PlusCircleFill,Trash3,PencilSquare } from 'react-bootstrap-icons';

function App() {


const [tasks,setTasks] = useState([])
const [newTask,setNewTask] = useState("")
const [editingTaskId,setEditingTaskId] = useState(null)


function handleInputChange(event){
  setNewTask(event.target.value)
}
  
function addTask(){
  
  if (tasks.find(task => task.text === newTask)) {
    alert('task already exists');
    setNewTask('')
    return
  }
  
  if(newTask.trim() !== ''){
    if(editingTaskId===null){
      setTasks(t=>[...t,{id:Date.now(),text:newTask,status:false}])
    setNewTask("")
    }else{
      setTasks(t=>t.map(task=> 
        task.id === editingTaskId ? {...task,text:newTask} : task
      ))
      setEditingTaskId(null)
      
    }
    setNewTask("")
  }
}

function deleteTask(index){
  let updateTask = tasks.filter((obj) => index!== obj.id)
  setTasks(updateTask)
}

function editTask(index){
  let taskEdit = tasks.find(task=>task.id===index)
  if(taskEdit){
    setNewTask(taskEdit.text)
    setEditingTaskId(index)
  }
}



function selectedlist(index,event){
  setTasks(tasks.filter((obj,ind)=>{
    if(index===ind){
      obj.status = event.target.checked
    }
    return obj
    
  }))
  
}
  return (<>
     <nav>
     <h4 className='heading'>
      <span className='todoname'>TODO</span><span className='matename'>MATE</span>
     </h4>
      </nav>
    
    <div className='container'>
      
      <div className="row todostatus">
        <div className="col-8 statusname">
        <h3>Todo Done</h3>
        <p>keep it up</p>
        </div>
          <div className="col-4 statuscount">
            <span className='counttext' id='setcount'>{!tasks.length ? 0: tasks.filter(obj=>{
              if(obj.status){
                return obj
              }
            }).length}</span><span className='counttext'>/{!tasks.length?0:tasks.length}</span>
          </div>


      </div>
   
      <div className='todo'>
    <input className='input' type="text" 
    placeholder='Write your next task'
    value = {newTask}
    onChange={handleInputChange}/>
    
  
     <PlusCircleFill className='addBtn' onClick={addTask}/>
  </div>
  
  <div className='todo-list'>
   
    {tasks.map((obj,ind)=>
    <div className='row'>
     
    <p key={obj.id} className='list'>
    <div className="col-1">
    <input type="checkbox" className='checkbox' value={obj.text} onChange={(e)=>selectedlist(ind,e)} />

        </div>
        <div className="col-8">
        <span className={`text ${obj.status ? 'completed' : ''}`} id='textbox'>{obj.text}</span>
        </div>
        <div className="col-3 list-icons">
        <PencilSquare className='editBtn' onClick={()=>editTask(obj.id)}/>
        <Trash3 className='dltBtn' onClick={()=>deleteTask(obj.id)}/>
        </div>
   
    </p> 
    </div>
    )}
    
  
  </div>
    </div>
  </>
   
  )
}

export default App
