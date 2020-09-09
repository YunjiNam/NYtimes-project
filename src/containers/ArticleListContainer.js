import React from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../modules/articles';
import ArticleTemplate from "../components/ArticleTemplate/ArticleTemplate";

const ArticleListContainer = ({ getArticle, list }) => {
    return (
        <div>
            <ArticleTemplate list={list && list} />
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
)(ArticleListContainer);