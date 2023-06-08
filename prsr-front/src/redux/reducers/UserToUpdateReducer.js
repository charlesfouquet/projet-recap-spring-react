const reducer = (state = {id:0, nom:"a", prenom:"b", email: "c", password:"d"}, action) => {
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