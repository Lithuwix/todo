import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType, TodoListType} from "../../components/__AppReducers";
import {createTodoAC, deleteTodoAC, todoReducer} from "./todo-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {taskId: '1', title: 'CSS', isDone: false},
            {taskId: '2', title: 'JS', isDone: true},
            {taskId: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {taskId: '1', title: 'bread', isDone: false},
            {taskId: '2', title: 'milk', isDone: true},
            {taskId: '3', title: 'tea', isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = deleteTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        'todolistId1': [
            {taskId: '1', title: 'CSS', isDone: false},
            {taskId: '2', title: 'JS', isDone: true},
            {taskId: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {taskId: '1', title: 'bread', isDone: false},
            {taskId: '3', title: 'tea', isDone: false}
        ]
    })
})
test('correct task should be added to correct array', () => {
    const action = addTaskAC('todolistId2', 'juice')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].taskId).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].taskId).toBeDefined()
    expect(endState['todolistId2'][1].title).toBe('milk')
    expect(endState['todolistId2'][1].isDone).toBe(false)
})
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2', '2', 'new title')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].taskId).toBeDefined()
    expect(endState['todolistId2'][1].title).toBe('new title')
    expect(endState['todolistId2'][0].title).toBe('bread')

})
test('new array should be added when new todolist is added', () => {
    const action = createTodoAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test("id's should be equals", () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []
    const action = createTodoAC('new todolist')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoReducer(startTodoListsState, action)
    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].todoId
    expect(idFromTasks).toBe(action.payload.todoID)
    expect(idFromTodoLists).toBe(action.payload.todoID)
})
test('property with todolistId should be deleted', () => {
    const action = deleteTodoAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})











