import React from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import {FilterValuesType} from "../AppRedux";

export type TaskType = {
    taskId: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoId: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodoFilter: (todolistId: string, newTodoFilterValue: FilterValuesType) => void
    addTask: (todoId: string, newTaskTitle: string) => void
    changeTaskStatus: (todoId: string, taskId: string) => void
    deleteTodo: (todoId: string) => void
    changeTodoTitle: (todoId: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todoId: string, taskId: string, newTaskTitle: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (taskTitle: string) => {
        props.addTask(props.todoId, taskTitle);
    }
    const removeTodolist = () => {
        props.deleteTodo(props.todoId);
    }
    const changeTodoTitle = (title: string) => {
        props.changeTodoTitle(props.todoId, title);
    }

    const onAllClickHandler = () => props.changeTodoFilter(props.todoId, "all");
    const onActiveClickHandler = () => props.changeTodoFilter(props.todoId, "active");
    const onCompletedClickHandler = () => props.changeTodoFilter(props.todoId, "completed");

    return (
        <Grid item>
            <Paper style={{padding: '10px'}}>
                    <h3>
                        <EditableSpan value={props.title} onChange={changeTodoTitle}/>
                        <IconButton onClick={removeTodolist}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </h3>
                    <AddItemForm addItem={addTask}/>
                    <ul>
                        {
                            props.tasks.map(task => {
                                const onClickHandler = () => props.deleteTask(props.todoId, task.taskId)
                                const onChangeHandler = () => {
                                    props.changeTaskStatus(props.todoId, task.taskId);
                                }
                                const onTitleChangeHandler = (newValue: string) => {
                                    props.changeTaskTitle(props.todoId, task.taskId, newValue);
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
            </Paper>
        </Grid>
    )
}


