import { Li } from './ImageGalleryItem.styled'
import { Modal } from '../Modal/Modal'
import * as PropTypes from 'prop-types'
import { useState } from 'react'

export function ImageGalleryItem ({ webformatImage, largeImage, description }) {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const toggleModal = (event) => {
        setIsOpenModal(prevState => !prevState)
    }

    return (
        <>
            <Li>
                <img src={ webformatImage } alt={ description } width={ 250 } onClick={ toggleModal } />
            </Li>
            { isOpenModal &&
                <Modal largeImage={ largeImage } description={ description } onToggle={ toggleModal } /> }
        </>
    )

}

ImageGalleryItem.propTypes = {
    webformatImage: PropTypes.string,
    largeImage: PropTypes.string,
    description: PropTypes.string,
}