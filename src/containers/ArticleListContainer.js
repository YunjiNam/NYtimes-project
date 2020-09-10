import React from 'react';
import { connect } from 'react-redux';
import { getArticle } from '../modules/articles';
import { addMark, remove } from '../modules/marks';
import ArticleTemplate from "../components/ArticleTemplate/ArticleTemplate";

const ArticleListContainer = ({ getArticle, list, marks, addMark, remove }) => {

    const markHandler = (id) => {
        if (marks && marks.includes(id)) {
            remove(id)
        } else {
            addMark(id)
        }
    }

    return (
        <div>
            <ArticleTemplate list={list && list} marks={marks} remove={remove} markHandler={(id) => markHandler(id)}/>
        </div>
    )
}

export default connect(
    ({ articles, marks }) => ({
        list: articles.list,
        marks: marks.marks
    }),
    {
        getArticle,
        addMark,
        remove
    }
)(ArticleListContainer);