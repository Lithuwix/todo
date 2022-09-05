type StateType = {
    age: number
    childrenCount: number
    name: string
}
// type ActionType = {
//     type: string
//     [key: string]: any
// }

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const userReducer = (state: StateType, action: actionTsarType) => {
    switch (action.type) {
        case 'INCREMENT-AGE': {
            return {...state, age: ++state.age}
        }
        case "INCREMENT-CHILDREN-COUNT": {
            return {...state, childrenCount: ++state.childrenCount}
        }
        case "CHANGE-USER-NAME": {
            return {...state, name: action.payload.newUserName}
        }
        default: { return state }
    }
}

type actionTsarType =
    | incrementAgeACType
    | incrementChildrenCountACType
    | changeUserNameACType

type incrementAgeACType = ReturnType<typeof incrementAgeAC>
const incrementAgeAC = () => {
    return {
        type: 'INCREMENT-AGE'
    } as const
}

type incrementChildrenCountACType = ReturnType<typeof incrementChildrenCountAC>
const incrementChildrenCountAC = () => {
    return {
        type: 'INCREMENT-CHILDREN-COUNT'
    } as const
}

type changeUserNameACType = ReturnType<typeof changeUserNameAC>
const changeUserNameAC = (newName: string) => {
    return {
        type: 'CHANGE-USER-NAME',
        payload: {
            newUserName: newName
        }
    } as const
}







