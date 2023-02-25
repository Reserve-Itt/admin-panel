interface JsonEditorState {
    jsonData: any;
}

const initialState: JsonEditorState = {
    jsonData: {}
};

export default function jsonEditorReducer(state = initialState, action: any) {
    switch (action.type) {
        case "SET_JSON_DATA":
            return {
                ...state,
                jsonData: action.payload
            };
        default:
            return state;
    }
}
