const selectLedeteksterSlice = (state) => {
    return state.ledetekster;
};

export const selectLedeteksterData = (state) => {
    return selectLedeteksterSlice(state).data;
};
