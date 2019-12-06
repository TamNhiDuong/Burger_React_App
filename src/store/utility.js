export const updatedObject = (oldState, updatedState) => {
    return {
        ...oldState,
        ...updatedState
    }
}