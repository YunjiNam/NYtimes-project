import React, { useState } from "react"
import styled from "@emotion/styled"
import Article from "./Article/Article"
import { BsBookmark, BsBookmarkFill } from "react-icons/bs"

const ArticleTemplate = ({ list, marks, markHandler, remove }) => {
  //const [lists, setLists] = useState([])
  const [mark, setMark] = useState([])
  const [showMark, setShowMark] = useState(false)

  const checkMark = (id) => {
    if (!mark.includes(id)) {
      setMark(mark.concat(id))
      const checkMark = list.filter((el) => el._id === id)
      markHandler(checkMark)
    } else {
      const delMark = mark.filter((el) => el !== id)
      setMark(delMark)
      const removeMark = marks.filter((el) => el._id !== id)
      remove(removeMark)
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
        list &&
        list.map((list, idx) => (
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
        ))}
      {showMark &&
        marks &&
        marks.map((list, idx) => (
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
        ))}
      <ShowMarkBtn onClick={showMarkHandler}>
        {showMark ? <BsBookmarkFill size="40" /> : <BsBookmark size="40" />}
      </ShowMarkBtn>
    </ArticleContainer>
  )
}

export default ArticleTemplate

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
