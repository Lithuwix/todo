import React, {useReducer} from 'react';
import '../App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {v1} from 'uuid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    changeTodoFilterAC,
    changeTodoTitleAC,
    createTodoAC,
    deleteTodoAC,
    todoReducer
} from "../state/reducers/todo-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    tasksReducer
} from "../state/reducers/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = { todoId: string, title: string, filter: FilterValuesType }
export type TasksStateType = { [key: string]: Array<TaskType> }

export const AppWithReducers = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, dispatchToTodoReducer] = useReducer(todoReducer,
        [
            {todoId: todolistId1, title: "What to Read", filter: "all"},
            {todoId: todolistId2, title: "What to Learn", filter: "all"}
        ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,
        {
            [todolistId1]: [
                {taskId: v1(), title: "JS for kids", isDone: true},
                {taskId: v1(), title: "You Don't know JS", isDone: false},
                {taskId: v1(), title: "Grokking Algorithms", isDone: false}
            ],
            [todolistId2]: [
                {taskId: v1(), title: "React hooks", isDone: false},
                {taskId: v1(), title: "Redux", isDone: false},
                {taskId: v1(), title: "Thunk Thunk-Creator", isDone: false},
                {taskId: v1(), title: "Axios REST API", isDone: false},
                {taskId: v1(), title: "Apollo GraphQL", isDone: false},
                {taskId: v1(), title: "Redux-Toolkit", isDone: false}
            ]
        }
    )

    const addTask = (todoId: string, newTaskTitle: string) => {
        dispatchToTasksReducer(addTaskAC(todoId, newTaskTitle))
    }
    const deleteTask = (todoId: string, taskId: string) => {
        dispatchToTasksReducer(deleteTaskAC(todoId, taskId))
    }
    const changeTaskStatus = (todoId: string, taskId: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(todoId, taskId))
    }
    const changeTaskTitle = (todoId: string, taskId: string, newTaskTitle: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todoId, taskId, newTaskTitle))
    }

    const addTodo = (todoTitle: string) => {
        let action = createTodoAC(todoTitle)
        dispatchToTasksReducer(action)
        dispatchToTodoReducer(action)
    }
    const changeTodoFilter = (todolistId: string, newTodoFilterValue: FilterValuesType) => {
        dispatchToTodoReducer(changeTodoFilterAC(todolistId, newTodoFilterValue))
    }
    const deleteTodo = (todoID: string) => {
        dispatchToTodoReducer(deleteTodoAC(todoID))
        dispatchToTasksReducer(deleteTodoAC(todoID))
    }
    const changeTodoTitle = (todoId: string, newTodoTitle: string) => {
        dispatchToTodoReducer(changeTodoTitleAC(todoId, newTodoTitle))
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
                                    tasksForTodolist = allTodolistTasks.filter((t: { isDone: boolean; }) => !t.isDone);
                                }
                                if (tl.filter === "completed") {
                                    tasksForTodolist = allTodolistTasks.filter((t: { isDone: boolean; }) => t.isDone);
                                }

                                return (
                                    <Grid item key={index}>
                                        <Paper style={{padding: '10px'}}>
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
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}




