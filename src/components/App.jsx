import { Searchbar } from './Searchbar/Searchbar'
import { useState, useEffect, useCallback } from 'react'
import { getImagesList } from './services/api'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button'
import PropTypes from 'prop-types'
import { Loader } from './Loader/Loader'

export function App () {

    const [value, setValue] = useState('')
    const [imagesList, setImagesList] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(12)
    const [isLoading, setIsLoading] = useState(false)
    const [showBtn, setShowBtn] = useState(false)

    const getInputValue = (valueString) => {
        if (valueString === value || !valueString) {
            return
        }
        setValue(valueString)
        setImagesList([])
        setPage(1)
        setPerPage(12)
        setIsLoading(false)
        setShowBtn(false)
    }

    const loadMore = () => {
        setPage(prevState => prevState + 1)
    }

    const getImages = useCallback(() => {
        setIsLoading(true)
        getImagesList({ queryString: value, page, per_page: perPage }).then((data) => {
            setImagesList(prevState => [...prevState, ...data.hits])
            setShowBtn(page < Math.ceil(data.totalHits / perPage))
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)

        })
    }, [value, page, perPage])

    useEffect(() => {
        if (value) {
            getImages()
        }
    }, [value, getImages])

    return (
        <div
            style={ {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 40,
                color: '#010101',
                paddingBottom: 50,
            } }
        >
            <Searchbar onSubmit={ getInputValue } />
            <ImageGallery listItems={ imagesList } />
            { showBtn && <Button onClick={ loadMore } /> }
            { isLoading && <Loader /> }
        </div>
    )

}

App.propTypes = {
    onSubmit: PropTypes.func,
    listItems: PropTypes.array,
    onClick: PropTypes.array,
}