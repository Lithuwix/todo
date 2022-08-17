import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm";
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

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    todoId: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(todolistId: string, taskId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.taskId !== taskId);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {taskId: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.todoId === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.taskId === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.taskId === id);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodoLists(todoLists.filter(tl => tl.todoId !== id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todoLists.find(tl => tl.todoId === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodoLists([...todoLists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {todoId: todolistId1, title: "What to learn", filter: "all"},
        {todoId: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {taskId: v1(), title: "Milk", isDone: true},
            {taskId: v1(), title: "React Book", isDone: true}
        ]
    });

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {todoId: newTodolistId, title: title, filter: 'all'};
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
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
                    <Grid container style={{padding: '20px 0'}}><AddItemForm addItem={addTodolist}/></Grid>
                    <Grid container spacing={3}>
                        {
                            todoLists.map(tl => {
                                let allTodolistTasks = tasks[tl.todoId];
                                let tasksForTodolist = allTodolistTasks;

                                if (tl.filter === "active") {
                                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                                }
                                if (tl.filter === "completed") {
                                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                                }

                                return (
                                    <Grid item>
                                        <Paper style={{padding: '10px'}}>
                                            <Todolist
                                                key={tl.todoId}
                                                todoId={tl.todoId}
                                                title={tl.title}
                                                tasks={tasksForTodolist}
                                                removeTask={removeTask}
                                                changeFilter={changeFilter}
                                                addTask={addTask}
                                                changeTaskStatus={changeStatus}
                                                filter={tl.filter}
                                                removeTodolist={removeTodolist}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodolistTitle}
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

export default App;


