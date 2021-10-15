import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import ArticleItem from "./ArticleItem"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { addArticle, deletArticle, savedArticleList } from "./saveArticleSlice"

const ArticleListContainer = ({ articleList }) => {
  //const [lists, setLists] = useState([])
  const [mark, setMark] = useState([])
  const [showMark, setShowMark] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const history = useHistory()

  useEffect(() => {
    setSearchVal(history.location.hash.split('#')[1])
  },[history.location])

  const dispatch = useDispatch()
  const markList = useSelector(savedArticleList)

  useEffect(() => {
    console.log('markList: ', markList && markList)
  },[markList]);

  const checkMark = (id) => {
    if (!mark.includes(id)) {
      setMark(mark.concat(id))
      const checkMark = articleList.filter((el) => el._id === id)
      dispatch(addArticle({
        keyWord: searchVal,
        list: checkMark
      }))
    } else {
      console.log('del')
      const delMark = mark.filter((el) => el !== id)
      setMark(delMark)
      dispatch(deletArticle(id))
    }
  }

  // const checkMark = (id) => {
  //   if (!mark.includes(id)) {
  //     setMark(mark.concat(id))
  //     const checkMark = articleList.filter((el) => el._id === id)
  //     dispatch(addArticle(checkMark))
  //   } else {
  //     const delMark = mark.filter((el) => el !== id)
  //     setMark(delMark)
  //     dispatch(deletArticle(id))
  //   }
  // }

  const goMainArticle = (url) => {
    window.location = url
  }

  const showMarkHandler = () => {
    setShowMark(!showMark)
  }

  return (
    <ArticleContainer>
      {!showMark &&
        articleList?.map((list, idx) => (
          <ArticleItem
            list={list}
            idx={idx}
            key={idx}
            web_url={list.web_url}
            headline={list.headline.main}
            pub_date={list.pub_date}
            byline={list.byline.original}
            lead_paragraph={list.lead_paragraph}
            marks={mark}
            goMainArticle={goMainArticle}
            checkMark={checkMark}
          />
        ))}
      {showMark &&
        markList?.map((item, idx) => (
          <ArticleItem
            list={item.list}
            idx={idx}
            key={idx}
            web_url={item.list.web_url}
            headline={item.list.headline.main}
            pub_date={item.list.pub_date}
            byline={item.list.byline.original}
            lead_paragraph={item.list.lead_paragraph}
            marks={mark}
            goMainArticle={goMainArticle}
            checkMark={checkMark}
          />
        ))}
      <ShowMarkBtn onClick={showMarkHandler}>
        {showMark ? <BsBookmarkFill size="40" /> : <BsBookmark size="40" />}
      </ShowMarkBtn>
    </ArticleContainer>
  )
}

export default ArticleListContainer

const ArticleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  margin-top: 45px;
  margin-bottom: 75px;
`

const ShowMarkBtn = styled.div`
  position: fixed;
  margin-right: 40px;
  margin-bottom: 40px;
  right: 0;
  bottom: 0;

  padding: 20px 22px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 6px #00000029;

  cursor: pointer;
`
