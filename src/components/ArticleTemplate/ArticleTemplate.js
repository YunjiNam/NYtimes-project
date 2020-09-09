import React, { useEffect, useState } from 'react';
import styles from './ArticleTemplate.scss';
import classNames from 'classnames/bind';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

const ArticleTemplate = ({ list }) => {
    
    const [lists, setLists] = useState([])

    console.log(list)
    // console.log(lists[0].multimedia[0].url)

    return (
        <div className={cx('ArticleTemplate')}>
            {list && list.map((list,idx) => (
                <div className={cx('articleWrap')} key={idx}>
                    <div className={cx('imgWrap')}>
                        <img src={`https://www.nytimes.com/${list.multimedia.url}`} alt=""/>
                    </div>
                    <div className={cx('textWrap')}>
                        <div className={cx('headLine')}>
                            <div className={cx('text')}>
                                {list.headline.main}
                            </div>
                            <div className={cx('date')}>{list.pub_date.split('T')[0]}</div>
                        </div>
                        <div className={cx('byLine')}>{list.byline.original}</div>
                        <div className={cx('leadParagraph')}>{list.lead_paragraph.length < 30 ? list.lead_paragraph : `${list.lead_paragraph.substr(0, 30)}...more`}</div>

                    </div>
                    <div className={cx('icon')}>
                        <BsBookmarkPlus />
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default ArticleTemplate;