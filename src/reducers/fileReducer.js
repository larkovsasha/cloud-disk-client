const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const SET_VISIBLE_POPUP = 'SET_VISIBLE_POPUP'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const POP_FROM_STACK = 'POP_FROM_STACK'

const defaultState = {
    files: [],
    currentDir: null,
    visiblePopup: false,
    dirStack: []
}
export default function (state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case SET_VISIBLE_POPUP:
            return {
                ...state,
                visiblePopup: !state.visiblePopup
            }
        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        case POP_FROM_STACK:
            return {
                ...state,
                dirStack: state.dirStack.slice(0, state.dirStack.length - 1)
            }

        default:
            return state
    }
}

export const setFiles = (files) => ({type: SET_FILES, payload: files})
export const setCurrentDir = (dir) => ({type: SET_CURRENT_DIR, payload: dir})
export const addFile = (file) => ({type: ADD_FILE, payload: file})
export const setVisiblePopup = () => ({type: SET_VISIBLE_POPUP})
export const pushToStack = (dir) => ({type: PUSH_TO_STACK, payload: dir})
export const popFromStack = () => ({type: POP_FROM_STACK})
