import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.todoId);
    }
    const removeTodolist = () => {
        props.removeTodolist(props.todoId);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todoId, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.todoId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoId);

    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const onClickHandler = () => props.removeTask(props.todoId, task.taskId)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(task.taskId, newIsDoneValue, props.todoId);
                        }
                        const onTitleChangeHandler = (newValue: string) => {
                            props.changeTaskTitle(task.taskId, newValue, props.todoId);
                        }
                        return <li key={task.taskId} className={task.isDone ? "is-done" : ""}>
                            <FormControlLabel
                                control={<Checkbox onChange={onChangeHandler} checked={task.isDone}/>}
                                label={<EditableSpan value={task.title} onChange={onTitleChangeHandler}/>}/>
                            <IconButton onClick={onClickHandler}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    size='small'
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    size='small'
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color="secondary">
                    Active
                </Button>
                <Button
                    size='small'
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color="success">
                    Completed
                </Button>
            </div>
        </div>
    )
}


