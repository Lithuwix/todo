import React from 'react';
import './App.css';

import {TaskType, Todolist} from './components/Todolist';

import {AddItemForm} from "./components/AddItemForm";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/reducers/tasks-reducer";
import {changeTodoFilterAC, changeTodoTitleAC, createTodoAC, deleteTodoAC} from "./state/reducers/todo-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = { todoId: string, title: string, filter: FilterValuesType }
export type TasksStateType = { [key: string]: Array<TaskType> }

export const AppWithRedux = () => {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const dispatch = useDispatch()

    const addTask = (todoId: string, newTaskTitle: string) => {
        dispatch(addTaskAC(todoId, newTaskTitle))
    }
    const deleteTask = (todoId: string, taskId: string) => {
        dispatch(deleteTaskAC(todoId, taskId))
    }
    const changeTaskStatus = (todoId: string, taskId: string) => {
        dispatch(changeTaskStatusAC(todoId, taskId))
    }
    const changeTaskTitle = (todoId: string, taskId: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC(todoId, taskId, newTaskTitle))
    }

    const addTodo = (todoTitle: string) => {
        let action = createTodoAC(todoTitle)
        dispatch(action)
    }
    const changeTodoFilter = (todolistId: string, newTodoFilterValue: FilterValuesType) => {
        dispatch(changeTodoFilterAC(todolistId, newTodoFilterValue))
    }
    const deleteTodo = (todoID: string) => {
        dispatch(deleteTodoAC(todoID))
    }
    const changeTodoTitle = (todoId: string, newTodoTitle: string) => {
        dispatch(changeTodoTitleAC(todoId, newTodoTitle))
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" style={{backgroundColor: '#ffa726'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container style={{padding: '20px 0'}}>
                        <AddItemForm addItem={addTodo}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todoLists.map((tl, index) => {

                                let allTodolistTasks = tasks[tl.todoId];
                                let tasksForTodolist = allTodolistTasks;

                                if (tl.filter === "active") {
                                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                                }
                                if (tl.filter === "completed") {
                                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                                }

                                return (
                                    <Todolist
                                        key={tl.todoId}
                                        todoId={tl.todoId}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        deleteTask={deleteTask}
                                        changeTodoFilter={changeTodoFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        deleteTodo={deleteTodo}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoTitle={changeTodoTitle}
                                    />
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}




