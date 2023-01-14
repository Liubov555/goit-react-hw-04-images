import React, { Component } from "react";
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import {
    SearchbarHeader,
    SearchForm,
    SubmitButton,
    SearchFormLabel,
    SearchFormInput
} from "./Searchbar.styled";

export class Searchbar extends Component {
    state = {
        searchQuery: '',
    };

    handleSubmit = evt => {
        evt.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            return toast.warning('Write something...');
        };
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
        this.reset();
    };

    handleChange = evt => {
        this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
    };

    reset = () => {
        this.setState({ searchQuery: '' });
    };

    render() {
        return (
            <SearchbarHeader>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SubmitButton type="submit">
                        <SearchFormLabel>
                            <FiSearch size={30} stroke='#207e9b' />
                        </SearchFormLabel>
                    </SubmitButton>

                    <SearchFormInput
                        name="searchQuery"
                        className="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.handleChange}
                    />
                </SearchForm>
            </SearchbarHeader>
        );
    };

};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};
