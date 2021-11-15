import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import ArticleItem from "./ArticleItem"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"
import { addArticle, deletArticle, savedArticleList } from "./saveArticleSlice"
import { addKeyword, delKeyword, saveKeywordList } from "./saveKeywordSlice"

const ArticleListContainer = ({ articleList }) => {
  //const [lists, setLists] = useState([])
  const [mark, setMark] = useState([])
  const [showMark, setShowMark] = useState(false)
  const [searchVal, setSearchVal] = useState("")
  const history = useHistory()

  useEffect(() => {
    setSearchVal(history.location.hash.split("#")[1])
  }, [history.location])

  const dispatch = useDispatch()
  const markList = useSelector(savedArticleList)
  const keywordList = useSelector(saveKeywordList)

  useEffect(() => {
    console.log("markList: ", markList && markList[0]?.list[0]._id)
  }, [markList])

  console.log("markList: ", markList && markList)
  console.log("keywordList: ", keywordList && [...new Set(keywordList)])

  const checkMark = (id) => {
    if (!mark.includes(id)) {
      setMark(mark.concat(id))
      const checkMark = articleList.filter((el) => el._id === id)
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
      console.log("file: ", filer[0].keyWord)
      dispatch(delKeyword(filer[0].keyWord))
      dispatch(deletArticle(id))
    }
  }

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
            marks={mark}
            goMainArticle={goMainArticle}
            checkMark={checkMark}
          />
        ))}
      <KeyWordGroup>
        {keywordList &&
          [...new Set(keywordList)]?.map((item, idx) => {
            return <KeyWordTag key={`${item}_${idx}`}>{item}</KeyWordTag>
          })}
      </KeyWordGroup>
      {showMark &&
        markList?.map((item, idx) => (
          <ArticleItem
            list={item?.list[0]}
            idx={idx}
            key={idx}
            marks={mark}
            goMainArticle={goMainArticle}
            checkMark={checkMark}
          />
        ))}
      <ShowMarkBtn onClick={showMarkHandler}>
        {showMark ? <BsBookmarkFill size="40" /> : <BsBookmark size="40" />}
      </ShowMarkBtn>
      {/* add footer */}
      <div style={{ height: 100 }} />
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
const KeyWordGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  margin: 5px 0 20px 0;
`

const KeyWordTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  background-color: #a6e0ff;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #7ac9f3;
  }
`
