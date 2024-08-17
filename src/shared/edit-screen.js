
export const EditScreen = (openModal, closeModal, row, title, ScreenName, customSize) => {


    openModal({view:<ScreenName row={row} closeModal={closeModal}/>, title : title || 'No Title', customSize: customSize + 'px' || '1020px',})
}