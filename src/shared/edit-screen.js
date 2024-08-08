
export const EditScreen = (openModal, closeModal, row, title, ScreenName) => {
    openModal({view:<ScreenName row={row} closeModal={closeModal}/>, title : title || 'No Title' })
}