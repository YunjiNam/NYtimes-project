import React, { useState } from 'react';
import styles from './ArticleTemplate.scss';
import classNames from 'classnames/bind';
import Article from './Article/Article';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

const ArticleTemplate = ({ list, marks, markHandler, remove }) => {
    
    //const [lists, setLists] = useState([])
    const [mark, setMark] = useState([])
    const [showMark, setShowMark] = useState(false);

    const checkMark = (id) => {
        if (!mark.includes(id)) {
            setMark(mark.concat(id))
            const checkMark = list.filter((el) => el._id === id)
            markHandler(checkMark);
        } else {
            const delMark = mark.filter((el) => el !== id)
            setMark(delMark);
            const removeMark = marks.filter((el) => el._id !== id)
            remove(removeMark)
        }
    }


    const goMainArticle = (url) => {
        window.location = url;
    }

    const showMarkHandler = () => {
        setShowMark(!showMark)
    }

    return (
        <div className={cx('ArticleTemplate')}>
            {!showMark && list && list.map((list,idx) => (
                <Article 
                    list={list} 
                    idx={idx} 
                    key={idx}
                    web_url={list.web_url} 
                    headline={list.headline.main} 
                    pub_date={list.pub_date} 
                    byline={list.byline.original} 
                    lead_paragraph={list.lead_paragraph} 
                    marks={marks}
                    goMainArticle={goMainArticle}
                    checkMark={checkMark}
                />
            ))
            }
            {showMark && marks && marks.map((list,idx) => (
                <Article 
                    list={list} 
                    idx={idx} 
                    key={idx}
                    web_url={list.web_url} 
                    headline={list.headline.main} 
                    pub_date={list.pub_date} 
                    byline={list.byline.original} 
                    lead_paragraph={list.lead_paragraph} 
                    marks={marks}
                    goMainArticle={goMainArticle}
                    checkMark={checkMark}
                />
            ))
            }
            <div className={cx('showMarkBtn')} onClick={showMarkHandler}>
                { showMark ? <BsBookmarkFill size="40"/> : <BsBookmark size="40"/>}
            </div>
        </div>
    )
}

export default ArticleTemplate;