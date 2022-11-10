import {v1} from 'uuid'
import {changeTodoFilterAC, changeTodoTitleAC, createTodoAC, deleteTodoAC, todoReducer} from "./todo-reducer";
import {FilterValuesType, TodoListType} from "../../AppRedux";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {todoId: todolistId1, title: 'What to learn', filter: 'all'},
        {todoId: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoReducer(startState, deleteTodoAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].todoId).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'
    const endState = todoReducer(startState, createTodoAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    const action: any = {
        type: 'CHANGE-TODO-TITLE',
        payload: {
            todoID: todolistId2,
            title: newTodolistTitle
        }
    }
    const endState = todoReducer(startState, changeTodoTitleAC(action.payload.todoID, action.payload.title))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'
    const action: any = {
        type: 'CHANGE-TODO-FILTER',
        payload: {
            todoID: todolistId2,
            filter: newFilter
        }
    }
    const endState = todoReducer(startState, changeTodoFilterAC(action.payload.todoID, action.payload.filter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})














