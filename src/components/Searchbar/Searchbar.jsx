import { useState } from 'react'
import { Header, Form } from './Searchbar.styled'

export function Searchbar ({ onSubmit }) {

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value);
    }

    return (
        <>
            <Header>
                <Form className="form" onSubmit={ handleSubmit }>
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        name="search"
                        value={ value }
                        onChange={ handleChange }
                        placeholder="Search images and photos"
                    />
                </Form>
            </Header>
        </>
    )
}
