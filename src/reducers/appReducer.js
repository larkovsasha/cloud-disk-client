const TOGGLE_LOADER = 'TOGGLE_LOADER'
const CHANGE_FILES_VIEW = 'CHANGE_FILES_VIEW'



const defaultState = {
    loader: false,
    filesView: 'list'
}
export default function (state = defaultState, action){
    switch (action.type){
        case TOGGLE_LOADER:
            return {
                ...state,
                loader: !state.loader
            }
        case CHANGE_FILES_VIEW:
            return {
                ...state,
                filesView: action.payload
            }
        default:
            return state
    }
}

export const toggleLoader = () => ({type: TOGGLE_LOADER})
export const changeFilesView = (payload) => ({type: CHANGE_FILES_VIEW, payload})
