import {TasksStateType} from "../../AppRedux";
import {TaskType} from "../../components/Todolist";
import {v1} from "uuid";
import {createTodoACType, deleteTodoACType} from "./todo-reducer";

export const todolistId1 = v1();
export const todolistId2 = v1();

let initialState: TasksStateType = {
    [todolistId1]: [
        {taskId: v1(), title: "JS for kids", isDone: true},
        {taskId: v1(), title: "You don't know JS", isDone: false},
        {taskId: v1(), title: "Grokking Algorithms", isDone: false}
    ],
    [todolistId2]: [
        {taskId: v1(), title: "React hooks", isDone: true},
        {taskId: v1(), title: "Redux", isDone: true},
        {taskId: v1(), title: "Thunk Thunk-Creator", isDone: false},
        {taskId: v1(), title: "Axios REST API", isDone: false},
        {taskId: v1(), title: "Apollo GraphQL", isDone: false},
        {taskId: v1(), title: "Redux-Toolkit", isDone: false}
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: allActionsType): TasksStateType => {
    switch (action.type) {
        case 'DELETE-TASK': {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(el => el.taskId !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {taskId: v1(), title: action.payload.newTaskTitle, isDone: false}
            return {
                ...state,
                [action.payload.todoId]: [newTask, ...state[action.payload.todoId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(el => el.taskId === action.payload.taskId
                    ? {...el, isDone: !el.isDone}
                    : el
                )
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(el => el.taskId === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el
                )
            }
        }
        case "CREATE-TODO": {
            return {
                ...state,
                [action.payload.todoID]: []
            }
        }
        case "DELETE-TODO": {
            console.log('todo was deleted from task reducer')
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoID]
            return stateCopy
        }
        default:
            return state
    }
}

type allActionsType =
    | deleteTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | createTodoACType
    | deleteTodoACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todoId: string, taskId: string) => {
    return {
        type: 'DELETE-TASK',
        payload: {
            todoId,
            taskId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoId,
            newTaskTitle
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoId: string, taskId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoId,
            taskId
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todoId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoId,
            taskId,
            newTitle
        }
    } as const
}