import { createAction, handleActions } from 'redux-actions';

const ADD_MARK = 'mark/ADD_MARK';
const REMOVE = 'mark/REMOVE';

export const addMark = createAction(ADD_MARK, id => id);
export const remove = createAction(REMOVE, id => id)

const initialState = {
    marks: []
}

const marks = handleActions(
    {
        [ADD_MARK]: (state, action) => ({
            ...state,
            marks: state.marks.concat(action.payload),
        }),
        [REMOVE]: (state, action) => ({
            ...state,
            marks: state.marks.filter(mark => mark._id !== action.payload),
        })
    },
    initialState,
)

export default marks;