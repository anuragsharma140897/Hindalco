
export const EditScreen = (openModal, closeModal, row, title, ScreenName) => {

    console.log('row',row);

    openModal({view:<ScreenName row={row} closeModal={closeModal} title={title}/>, title : title || 'No Title' })
}