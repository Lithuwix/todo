import { tasksReducer } from './reducers/tasks-reducer'
import { todoReducer } from './reducers/todo-reducer'
import { combineReducers, createStore } from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoReducer
})

// непосредственно создаём store
export const store = createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

// store.dispatch({
//     type: 'CHANGE-TODO-TITLE',
//     payload: {
//         todoID: id,
//         title: NEWTITLE
//     }
// })