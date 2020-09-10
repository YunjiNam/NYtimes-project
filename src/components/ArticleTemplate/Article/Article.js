import React from 'react';
import styles from './Article.scss';
import classNames from 'classnames/bind';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

const Article = ({ list, idx, web_url, headline, pub_date, byline, lead_paragraph, goMainArticle, marks, checkMark }) => {
    return (
        <div className={cx('articleWrap')} key={idx} >
            <div onClick={() => goMainArticle(web_url)}>
                {/* <div className={cx('imgWrap')}>
                    <img src={`https://www.nytimes.com/${list.multimedia.url}`} alt=""/>
                </div> */}
                <div className={cx('textWrap')}>
                    <div className={cx('headLine')}>
                        <div className={cx('text')}>
                            {headline}
                        </div>
                        <div className={cx('date')}>{pub_date.split('T')[0]}</div>
                    </div>
                    <div className={cx('byLine')}>{byline}</div>
                    <div className={cx('leadParagraph')}>{lead_paragraph.length < 80 ? lead_paragraph : `${lead_paragraph.substr(0, 80)} ...more`}</div>
                </div>
            </div>
            <div className={cx('icon')} onClick={() => checkMark(list._id)}>
                { marks && marks.includes(list) ? <BsBookmarkFill /> : <BsBookmarkPlus /> }
            </div>
        </div>
    )
}

export default Article;