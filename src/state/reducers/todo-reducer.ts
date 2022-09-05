import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../../AppRedux";
import {todolistId1, todolistId2} from "./tasks-reducer";

let initialState: TodoListType[] = [
    {todoId: todolistId1, title: "What to Read", filter: "all"},
    {todoId: todolistId2, title: "What to Learn", filter: "all"}
]

export const todoReducer = (state: TodoListType[] = initialState, action: actionTsarType): TodoListType[] => {
    switch (action.type) {
        case 'DELETE-TODO': {
            return state.filter(
                (t) => t.todoId !== action.payload.todoID
            )
        }
        case "CREATE-TODO": {
            console.log('from todos')
            console.log(action.payload.todoID)
            let newTodo: TodoListType = {
                todoId: action.payload.todoID, title: action.payload.todoTitle, filter: 'all'
            }
            return [newTodo, ...state]
        }
        case 'CHANGE-TODO-TITLE': {
            return state.map(
                t => t.todoId === action.payload.todoID ? {...t, title: action.payload.title} : t
            )
        }
        case "CHANGE-TODO-FILTER": {
            return state.map(
                t => t.todoId === action.payload.todoID ? {...t, filter: action.payload.filterValue} : t
            )
        }
        default:
            return state
    }
}

type actionTsarType =
    | deleteTodoACType
    | createTodoACType
    | changeTodoTitleACType
    | changeTodoFilterACType


export type createTodoACType = ReturnType<typeof createTodoAC>
export const createTodoAC = (newTodoTitle: string) => {
    return {
        type: 'CREATE-TODO',
        payload: {
            todoTitle: newTodoTitle,
            todoID: v1()
        }
    } as const
}

export type deleteTodoACType = ReturnType<typeof deleteTodoAC>
export const deleteTodoAC = (todoID: string) => {
    return {
        type: 'DELETE-TODO',
        payload: {
            todoID: todoID
        }
    } as const
}

type changeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todoID: string, newTodoTitle: string) => {
    return {
        type: 'CHANGE-TODO-TITLE',
        payload: {
            todoID: todoID,
            title: newTodoTitle
        }
    } as const
}

type changeTodoFilterACType = ReturnType<typeof changeTodoFilterAC>
export const changeTodoFilterAC = (todoID: string, filterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODO-FILTER',
        payload: {
            todoID,
            filterValue
        }
    } as const
}



















