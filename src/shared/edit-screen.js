
export const EditScreen = (openModal, closeModal, row, title, ScreenName, customSize, ApiHit) => {




    openModal({view:<ScreenName row={row} closeModal={closeModal} ApiHit={ApiHit}/>, title : title || 'No Title', customSize: customSize + 'px' || '1020px',})
}