import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { withRouter, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { useMediaQuery } from "react-responsive"
import queryString from "query-string"

import { ArticleQuery } from "../../lib/apiQueries"
import useWindowSize from "../../lib/useWindowSize"
import ArticleItemGroup from "./ArticleItemGroup"
import { addArticle, deletArticle, savedArticleList } from "./saveArticleSlice"
import { addKeyword, delKeyword, saveKeywordList } from "./saveKeywordSlice"
import Search from "../Search/Search"

const Article = () => {
  let history = useHistory()
  const size = useWindowSize()
  const isTablet = useMediaQuery({ minWidth: 600 })
  const isDesktop = useMediaQuery({ minWidth: 1030 })
  const query = queryString.parse(history.location.search)

  const dispatch = useDispatch()
  const [searchVal, setSearchVal] = useState("")
  const [mark, setMark] = useState([])
  const [showMark, setShowMark] = useState(false)
  const [selKeyword, setSelKeyword] = useState([])
  const [filterMarkList, setFilterMarkList] = useState([])
  const {
    data: { response: articleList },
    isFetching,
  } = ArticleQuery()

  const markList = useSelector(savedArticleList)
  const keywordList = useSelector(saveKeywordList)

  useEffect(() => {
    setSearchVal(query && query.keyword)
  }, [history.location.search])

  const goHome = () => {
    window.location.reload()
  }

  const filterMark = (item) => {
    if (selKeyword.includes(item)) {
      const delSelKeyword = selKeyword.filter((el) => el !== item)
      setSelKeyword(delSelKeyword)
      setFilterMarkList(
        markList.filter((el) => delSelKeyword.includes(el.keyWord))
      )
    } else {
      let addSelKeyword = [...selKeyword, item]
      setSelKeyword(addSelKeyword)
      if (item !== "" && markList) {
        setFilterMarkList(
          markList.filter((el) => addSelKeyword.includes(el.keyWord))
        )
      }
    }
  }

  useEffect(() => {
    if (filterMarkList.length === 0) {
      setSelKeyword([])
    }
  }, [filterMarkList])

  const checkMark = (id) => {
    if (!mark.includes(id)) {
      setMark(mark.concat(id))
      const checkMark = articleList.docs.filter((el) => el._id === id)
      dispatch(addKeyword(searchVal))
      dispatch(
        addArticle({
          keyWord: searchVal,
          list: checkMark,
        })
      )
    } else {
      const delMark = mark.filter((el) => el !== id)
      setMark(delMark)
      let filer = markList.filter((el) => el.list[0]._id == id)
      dispatch(delKeyword(filer[0].keyWord))
      dispatch(deletArticle(id))
      if (selKeyword.length !== 0) {
        let delList = filterMarkList.filter((el) => el.list[0]._id !== id)
        setFilterMarkList(delList)
      }
    }
  }

  const goMainArticle = (url) => {
    // window.location = url
    window.open(url, "_blank")
  }

  const showMarkHandler = () => {
    setShowMark(!showMark)
    setSelKeyword([])
  }

  return (
    <ArticleListWrap>
      <LogoBox onClick={goHome} isTablet={isTablet}>
        <svg viewBox="0 0 184 25" fill="#000">
          <path d="M13.8 2.9c0-2-1.9-2.5-3.4-2.5v.3c.9 0 1.6.3 1.6 1 0 .4-.3 1-1.2 1-.7 0-2.2-.4-3.3-.8C6.2 1.4 5 1 4 1 2 1 .6 2.5.6 4.2c0 1.5 1.1 2 1.5 2.2l.1-.2c-.2-.2-.5-.4-.5-1 0-.4.4-1.1 1.4-1.1.9 0 2.1.4 3.7.9 1.4.4 2.9.7 3.7.8v3.1L9 10.2v.1l1.5 1.3v4.3c-.8.5-1.7.6-2.5.6-1.5 0-2.8-.4-3.9-1.6l4.1-2V6l-5 2.2C3.6 6.9 4.7 6 5.8 5.4l-.1-.3c-3 .8-5.7 3.6-5.7 7 0 4 3.3 7 7 7 4 0 6.6-3.2 6.6-6.5h-.2c-.6 1.3-1.5 2.5-2.6 3.1v-4.1l1.6-1.3v-.1l-1.6-1.3V5.8c1.5 0 3-1 3-2.9zm-8.7 11l-1.2.6c-.7-.9-1.1-2.1-1.1-3.8 0-.7 0-1.5.2-2.1l2.1-.9v6.2zm10.6 2.3l-1.3 1 .2.2.6-.5 2.2 2 3-2-.1-.2-.8.5-1-1V9.4l.8-.6 1.7 1.4v6.1c0 3.8-.8 4.4-2.5 5v.3c2.8.1 5.4-.8 5.4-5.7V9.3l.9-.7-.2-.2-.8.6-2.5-2.1L18.5 9V.8h-.2l-3.5 2.4v.2c.4.2 1 .4 1 1.5l-.1 11.3zM34 15.1L31.5 17 29 15v-1.2l4.7-3.2v-.1l-2.4-3.6-5.2 2.8v6.6l-1 .8.2.2.9-.7 3.4 2.5 4.5-3.6-.1-.4zm-5-1.7V8.5l.2-.1 2.2 3.5-2.4 1.5zM53.1 2c0-.3-.1-.6-.2-.9h-.2c-.3.8-.7 1.2-1.7 1.2-.9 0-1.5-.5-1.9-.9l-2.9 3.3.2.2 1-.9c.6.5 1.1.9 2.5 1v8.3L44 3.2c-.5-.8-1.2-1.9-2.6-1.9-1.6 0-3 1.4-2.8 3.6h.3c.1-.6.4-1.3 1.1-1.3.5 0 1 .5 1.3 1v3.3c-1.8 0-3 .8-3 2.3 0 .8.4 2 1.6 2.3v-.2c-.2-.2-.3-.4-.3-.7 0-.5.4-.9 1.1-.9h.5v4.2c-2.1 0-3.8 1.2-3.8 3.2 0 1.9 1.6 2.8 3.4 2.7v-.2c-1.1-.1-1.6-.6-1.6-1.3 0-.9.6-1.3 1.4-1.3.8 0 1.5.5 2 1.1l2.9-3.2-.2-.2-.7.8c-1.1-1-1.7-1.3-3-1.5V5l8 14h.6V5c1.5-.1 2.9-1.3 2.9-3zm7.3 13.1L57.9 17l-2.5-2v-1.2l4.7-3.2v-.1l-2.4-3.6-5.2 2.8v6.6l-1 .8.2.2.9-.7 3.4 2.5 4.5-3.6-.1-.4zm-5-1.7V8.5l.2-.1 2.2 3.5-2.4 1.5zM76.7 8l-.7.5-1.9-1.6-2.2 2 .9.9v7.5l-2.4-1.5V9.6l.8-.5-2.3-2.2-2.2 2 .9.9V17l-.3.2-2.1-1.5v-6c0-1.4-.7-1.8-1.5-2.3-.7-.5-1.1-.8-1.1-1.5 0-.6.6-.9.9-1.1v-.2c-.8 0-2.9.8-2.9 2.7 0 1 .5 1.4 1 1.9s1 .9 1 1.8v5.8l-1.1.8.2.2 1-.8 2.3 2 2.5-1.7 2.8 1.7 5.3-3.1V9.2l1.3-1-.2-.2zm18.6-5.5l-1 .9-2.2-2-3.3 2.4V1.6h-.3l.1 16.2c-.3 0-1.2-.2-1.9-.4l-.2-13.5c0-1-.7-2.4-2.5-2.4s-3 1.4-3 2.8h.3c.1-.6.4-1.1 1-1.1s1.1.4 1.1 1.7v3.9c-1.8.1-2.9 1.1-2.9 2.4 0 .8.4 2 1.6 2V13c-.4-.2-.5-.5-.5-.7 0-.6.5-.8 1.3-.8h.4v6.2c-1.5.5-2.1 1.6-2.1 2.8 0 1.7 1.3 2.9 3.3 2.9 1.4 0 2.6-.2 3.8-.5 1-.2 2.3-.5 2.9-.5.8 0 1.1.4 1.1.9 0 .7-.3 1-.7 1.1v.2c1.6-.3 2.6-1.3 2.6-2.8s-1.5-2.4-3.1-2.4c-.8 0-2.5.3-3.7.5-1.4.3-2.8.5-3.2.5-.7 0-1.5-.3-1.5-1.3 0-.8.7-1.5 2.4-1.5.9 0 2 .1 3.1.4 1.2.3 2.3.6 3.3.6 1.5 0 2.8-.5 2.8-2.6V3.7l1.2-1-.2-.2zm-4.1 6.1c-.3.3-.7.6-1.2.6s-1-.3-1.2-.6V4.2l1-.7 1.4 1.3v3.8zm0 3c-.2-.2-.7-.5-1.2-.5s-1 .3-1.2.5V9c.2.2.7.5 1.2.5s1-.3 1.2-.5v2.6zm0 4.7c0 .8-.5 1.6-1.6 1.6h-.8V12c.2-.2.7-.5 1.2-.5s.9.3 1.2.5v4.3zm13.7-7.1l-3.2-2.3-4.9 2.8v6.5l-1 .8.1.2.8-.6 3.2 2.4 5-3V9.2zm-5.4 6.3V8.3l2.5 1.8v7.1l-2.5-1.7zm14.9-8.4h-.2c-.3.2-.6.4-.9.4-.4 0-.9-.2-1.1-.5h-.2l-1.7 1.9-1.7-1.9-3 2 .1.2.8-.5 1 1.1v6.3l-1.3 1 .2.2.6-.5 2.4 2 3.1-2.1-.1-.2-.9.5-1.2-1V9c.5.5 1.1 1 1.8 1 1.4.1 2.2-1.3 2.3-2.9zm12 9.6L123 19l-4.6-7 3.3-5.1h.2c.4.4 1 .8 1.7.8s1.2-.4 1.5-.8h.2c-.1 2-1.5 3.2-2.5 3.2s-1.5-.5-2.1-.8l-.3.5 5 7.4 1-.6v.1zm-11-.5l-1.3 1 .2.2.6-.5 2.2 2 3-2-.2-.2-.8.5-1-1V.8h-.1l-3.6 2.4v.2c.4.2 1 .3 1 1.5v11.3zM143 2.9c0-2-1.9-2.5-3.4-2.5v.3c.9 0 1.6.3 1.6 1 0 .4-.3 1-1.2 1-.7 0-2.2-.4-3.3-.8-1.3-.4-2.5-.8-3.5-.8-2 0-3.4 1.5-3.4 3.2 0 1.5 1.1 2 1.5 2.2l.1-.2c-.3-.2-.6-.4-.6-1 0-.4.4-1.1 1.4-1.1.9 0 2.1.4 3.7.9 1.4.4 2.9.7 3.7.8V9l-1.5 1.3v.1l1.5 1.3V16c-.8.5-1.7.6-2.5.6-1.5 0-2.8-.4-3.9-1.6l4.1-2V6l-5 2.2c.5-1.3 1.6-2.2 2.6-2.9l-.1-.2c-3 .8-5.7 3.5-5.7 6.9 0 4 3.3 7 7 7 4 0 6.6-3.2 6.6-6.5h-.2c-.6 1.3-1.5 2.5-2.6 3.1v-4.1l1.6-1.3v-.1L140 8.8v-3c1.5 0 3-1 3-2.9zm-8.7 11l-1.2.6c-.7-.9-1.1-2.1-1.1-3.8 0-.7.1-1.5.3-2.1l2.1-.9-.1 6.2zm12.2-12h-.1l-2 1.7v.1l1.7 1.9h.2l2-1.7v-.1l-1.8-1.9zm3 14.8l-.8.5-1-1V9.3l1-.7-.2-.2-.7.6-1.8-2.1-2.9 2 .2.3.7-.5.9 1.1v6.5l-1.3 1 .1.2.7-.5 2.2 2 3-2-.1-.3zm16.7-.1l-.7.5-1.1-1V9.3l1-.8-.2-.2-.8.7-2.3-2.1-3 2.1-2.3-2.1L154 9l-1.8-2.1-2.9 2 .1.3.7-.5 1 1.1v6.5l-.8.8 2.3 1.9 2.2-2-.9-.9V9.3l.9-.6 1.5 1.4v6l-.8.8 2.3 1.9 2.2-2-.9-.9V9.3l.8-.5 1.6 1.4v6l-.7.7 2.3 2.1 3.1-2.1v-.3zm8.7-1.5l-2.5 1.9-2.5-2v-1.2l4.7-3.2v-.1l-2.4-3.6-5.2 2.8v6.8l3.5 2.5 4.5-3.6-.1-.3zm-5-1.7V8.5l.2-.1 2.2 3.5-2.4 1.5zm14.1-.9l-1.9-1.5c1.3-1.1 1.8-2.6 1.8-3.6v-.6h-.2c-.2.5-.6 1-1.4 1-.8 0-1.3-.4-1.8-1L176 9.3v3.6l1.7 1.3c-1.7 1.5-2 2.5-2 3.3 0 1 .5 1.7 1.3 2l.1-.2c-.2-.2-.4-.3-.4-.8 0-.3.4-.8 1.2-.8 1 0 1.6.7 1.9 1l4.3-2.6v-3.6h-.1zm-1.1-3c-.7 1.2-2.2 2.4-3.1 3l-1.1-.9V8.1c.4 1 1.5 1.8 2.6 1.8.7 0 1.1-.1 1.6-.4zm-1.7 8c-.5-1.1-1.7-1.9-2.9-1.9-.3 0-1.1 0-1.9.5.5-.8 1.8-2.2 3.5-3.2l1.2 1 .1 3.6z"></path>
        </svg>
      </LogoBox>
      <Search />
      <KeyWordGroup
        width={
          isDesktop
            ? size.width - 400
            : isTablet
            ? size.width - 200
            : size.width - 100
        }
        showMark={showMark}
      >
        <GroupTitle>Keyword filter | </GroupTitle>
        <KeyWordTag
          key={`keyword_all`}
          onClick={() => {
            setSelKeyword([])
          }}
        >
          All
        </KeyWordTag>
        {showMark &&
          keywordList &&
          [...new Set(keywordList)]?.map((item, idx) => {
            return (
              <KeyWordTag
                key={`${item}_${idx}`}
                select={selKeyword.includes(item)}
                onClick={() => {
                  filterMark(item)
                }}
              >
                {item}
              </KeyWordTag>
            )
          })}
      </KeyWordGroup>
      <ArticleContainer showMark={showMark}>
        {isFetching && <div>로딩중...</div>}
        <ArticleItemGroup
          list={
            showMark && selKeyword.length === 0 && markList
              ? markList
              : showMark && selKeyword.length !== 0 && filterMarkList
              ? filterMarkList
              : articleList && articleList.docs
          }
          marks={mark}
          showMark={showMark}
          goMainArticle={goMainArticle}
          checkMark={checkMark}
        />

        <ShowMarkBtn onClick={showMarkHandler}>
          {showMark ? <BsBookmarkFill size="30" /> : <BsBookmark size="30" />}
        </ShowMarkBtn>
        {/* add footer */}
        <div style={{ height: 100 }} />
      </ArticleContainer>
    </ArticleListWrap>
  )
}

export default withRouter(Article)

const ArticleListWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  height: 100vh;
`

const LogoBox = styled.div`
  width: ${(props) => (props.isTablet ? 40 : 50)}%;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
`

const ArticleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  ${(props) => (!props.showMark ? "margin-top: 45px;" : "margin-top: 15px;")}
  margin-bottom: 75px;
`

const ShowMarkBtn = styled.div`
  position: fixed;
  margin-right: 30px;
  margin-bottom: 30px;
  right: 0;
  bottom: 0;

  padding: 13px 15px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 6px #00000029;

  cursor: pointer;
`
const KeyWordGroup = styled.div`
  display: ${(props) => (props.showMark ? "grid" : "none")};
  grid-template-columns: 130px repeat(auto-fill, minmax(12%, auto));
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  /* gap: 10px; */
  grid-gap: 12px 12px;
  margin: 20px 0 5px 20px;
  width: ${(props) => props.width}px;
`

const GroupTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`

const KeyWordTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  background-color: ${(props) => (props.select ? "#a6e0ff" : "#fff")};
  font-weight: bold;
  font-size: 14px;

  box-shadow: 2px 2px 6px #00000029;
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.select ? "#7ac9f3" : "#a6e0ff")};
  }
`
