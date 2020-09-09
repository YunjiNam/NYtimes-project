import React from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../modules/articles';
import SearchTemplate from '../components/SearchTemplate/SearchTemplate';

const SearchContainer = ({ getArticle, list }) => {

    const searchHandler = (text) => {
        getArticle(text)
    }
    return (
        <div>
            <SearchTemplate searchHandler={(text) => searchHandler(text)}/>
        </div>
    )
}

export default connect(
    ({ articles }) => ({
        list: articles.list,
    }),
    {
        getArticle
    }
)(SearchContainer);