import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './SearchTemplate.scss';
import classNames from 'classnames/bind';
import { CgSearch } from "react-icons/cg";

const cx = classNames.bind(styles);

const SearchTemplate = ({ searchHandler, history }) => {

    const onChange = (e) => {
        //console.log(e.target.value);
        if (e.keyCode === 13) {
            searchHandler(e.target.value)
            history.push('/articlelist')
        }
    }
    return (
        <div className={cx('SearchTemplate')}>
            <div className={cx('searchWrap')}>
                <CgSearch className={cx('searchIcon')}/>
                <input className={cx('searchBox')} placeholder="Search" onKeyUp={onChange} />
            </div>
        </div>
    )
}

export default withRouter(SearchTemplate);