import React from 'react'
import Task from './Task'

const TasksItems = ({ tasks }) => {
    return (
        <div className="todosContainer">
            {tasks.map((task, i) => {
                return < Task title={task.title} desc={task.desc} isCompleted={task.isCompleted} id={task._id} key={i} />
            })
            }
        </div>
    )
}

export default TasksItems