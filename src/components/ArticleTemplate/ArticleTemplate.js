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
                // <div className={cx('articleWrap')} key={idx} >
                //     <div onClick={() => goMainArticle(list.web_url)}>
                //         <div className={cx('imgWrap')}>
                //             <img src={`https://www.nytimes.com/${list.multimedia.url}`} alt=""/>
                //         </div>
                //         <div className={cx('textWrap')}>
                //             <div className={cx('headLine')}>
                //                 <div className={cx('text')}>
                //                     {list.headline.main}
                //                 </div>
                //                 <div className={cx('date')}>{list.pub_date.split('T')[0]}</div>
                //             </div>
                //             <div className={cx('byLine')}>{list.byline.original}</div>
                //             <div className={cx('leadParagraph')}>{list.lead_paragraph.length < 80 ? list.lead_paragraph : `${list.lead_paragraph.substr(0, 80)} ...more`}</div>

                //         </div>
                //     </div>
                //     <div className={cx('icon')} onClick={() => checkMark(list._id)}>
                //         { marks && marks.includes(list) ? <BsBookmarkFill /> : <BsBookmarkPlus /> }
                //     </div>
                // </div>
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