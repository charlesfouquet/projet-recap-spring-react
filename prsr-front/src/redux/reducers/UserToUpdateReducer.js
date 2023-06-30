const reducer = (state = {id:0, nom:"", prenom:"", email: "", password:""}, action) => {
    switch (action.type) {
        case "update":
            return action.payload;
        case "reset":
            return {};
        default:
            return state;
    }
}

export default reducer;