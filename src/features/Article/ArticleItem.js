import React from "react"
import styled from "@emotion/styled"
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs"

const ArticleItem = ({
  list,
  idx,
  web_url,
  headline,
  pub_date,
  byline,
  lead_paragraph,
  goMainArticle,
  marks,
  checkMark,
}) => {
  return (
    <ArticleWrap key={idx}>
      <div onClick={() => goMainArticle(web_url)}>
        <TextWrap>
          <HeadLineGroup>
            <HeadLineText>{headline}</HeadLineText>
            <DateText>{pub_date.split("T")[0]}</DateText>
          </HeadLineGroup>
          <ByLine>{byline}</ByLine>
          <LeadParagraph>
            {lead_paragraph.length < 80
              ? lead_paragraph
              : `${lead_paragraph.substr(0, 80)} ...more`}
          </LeadParagraph>
        </TextWrap>
      </div>
      <IconBtn onClick={() => checkMark(list._id)}>
        {marks && marks.includes(list._id) ? (
          <BsBookmarkFill />
        ) : (
          <BsBookmarkPlus />
        )}
      </IconBtn>
    </ArticleWrap>
  )
}

export default ArticleItem

const ArticleWrap = styled.div`
  width: 1000px;
  height: 148px;
  margin-bottom: 20px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  position: relative;

  box-shadow: 2px 2px 6px #00000029;
  border-radius: 15px;

  cursor: pointer;
`

const TextWrap = styled.div`
  margin-left: 25px;
  width: 100%;
`

const HeadLineGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: space-between;
  flex-direction: row;
`

const HeadLineText = styled.div`
  width: 80%;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`
const DateText = styled.div`
  font-size: 13px;
  font-weight: normal;
  color: #707070;

  position: absolute;
  margin-right: 30px;
  right: 0;
`

const ByLine = styled.div`
  font-size: 14px;
  font-weight: medium;
  margin-bottom: 17px;

  color: #5a5a5a;
`

const LeadParagraph = styled.div`
  font-size: 16px;
  font-weight: medium;
`

const IconBtn = styled.div`
  position: absolute;
  margin-right: 20px;
  margin-bottom: 20px;
  right: 0;
  bottom: 0;

  padding: 10px 12px;
  border-radius: 50%;
  box-shadow: 2px 2px 6px #00000029;
`
