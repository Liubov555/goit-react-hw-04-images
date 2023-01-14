import React, { useState } from "react";
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import {
    SearchbarHeader,
    SearchForm,
    SubmitButton,
    SearchFormLabel,
    SearchFormInput
} from "./Searchbar.styled";

export default function Searchbar({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = evt => {
        evt.preventDefault();
        onSubmit(searchQuery);
    };

    const handleChange = evt => {
        const { value } = evt.target;
        setSearchQuery(value);
    };

    return (
        <SearchbarHeader>
            <SearchForm onSubmit={handleSubmit}>
                <SubmitButton type="submit">
                    <SearchFormLabel>
                        <FiSearch size={30} stroke='#207e9b' />
                    </SearchFormLabel>
                </SubmitButton>

                <SearchFormInput
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
            </SearchForm>
        </SearchbarHeader>
    );
};


Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};
