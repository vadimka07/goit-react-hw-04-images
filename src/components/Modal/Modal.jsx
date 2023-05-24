import { ModalOverlay } from './Modal.styled'
import * as PropTypes from 'prop-types'
import { useEffect } from 'react'

export function Modal ({ onToggle, description, largeImage }) {



    const handlePressBackdrop = (event) => {
        if (event.target === event.currentTarget) {
            onToggle()
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const handlePressEscape = (event) => {
            if (event.key === 'Escape') {
                onToggle()
            }
        }
        window.addEventListener('keydown', handlePressEscape)
        return () => {
            document.body.style.overflow = 'inherit'
            window.removeEventListener('keydown', handlePressEscape)
        }
    }, [onToggle])

    return (
        <ModalOverlay onClick={ handlePressBackdrop }>
            <div className="modal">
                <img src={ largeImage } alt={ description } width={ 850 } />
            </div>
        </ModalOverlay>
    )

}

Modal.propTypes = {
    largeImage: PropTypes.string,
    description: PropTypes.string,
}