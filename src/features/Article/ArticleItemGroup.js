import React from "react"
import styled from "@emotion/styled"
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs"
import { useMediaQuery } from "react-responsive"
import Moment from "react-moment"
import useWindowSize from "../../lib/useWindowSize"

const ArticleItemGroup = ({
  list,
  goMainArticle,
  marks,
  checkMark,
  showMark,
}) => {
  const size = useWindowSize()
  const isDesktop = useMediaQuery({ minWidth: 1030 })
  const isTablet = useMediaQuery({ minWidth: 600 })

  console.log("list: ", list && list)
  return (
    <>
      {!showMark &&
        list &&
        list.map((item, idx) => (
          <ArticleWrap
            key={idx}
            width={
              isDesktop
                ? size.width - 400
                : isTablet
                ? size.width - 200
                : size.width - 100
            }
          >
            <div onClick={() => goMainArticle(item.web_url)}>
              <TextWrap>
                <HeadLineGroup>
                  <DateText isTablet={isTablet}>
                    <Moment format="MMM DD YYYY">{item.pub_date}</Moment>
                  </DateText>
                  <HeadLineText isTablet={isTablet}>
                    {item.headline.main}
                  </HeadLineText>
                </HeadLineGroup>
                <ByLine>{item.byline.original}</ByLine>
                <LeadParagraph>
                  {item.lead_paragraph.length < 80
                    ? item.lead_paragraph
                    : `${item.lead_paragraph.substr(0, 160)} ...`}
                </LeadParagraph>
              </TextWrap>
            </div>
            <IconBtn onClick={() => checkMark(item._id)}>
              {marks && marks.includes(item._id) ? (
                <BsBookmarkFill />
              ) : (
                <BsBookmarkPlus />
              )}
            </IconBtn>
          </ArticleWrap>
        ))}
      {showMark &&
        list &&
        list.map((item, idx) => (
          <ArticleWrap
            key={idx}
            width={
              isDesktop
                ? size.width - 400
                : isTablet
                ? size.width - 200
                : size.width - 100
            }
          >
            <div onClick={() => goMainArticle(item?.list[0].web_url)}>
              <TextWrap>
                <HeadLineGroup>
                  <DateText isTablet={isTablet}>
                    <Moment format="MMM DD YYYY">
                      {item?.list[0].pub_date}
                    </Moment>
                  </DateText>
                  <HeadLineText isTablet={isTablet}>
                    {item?.list[0].headline.main}
                  </HeadLineText>
                </HeadLineGroup>
                <ByLine>{item?.list[0].byline.original}</ByLine>
                <LeadParagraph>
                  {item?.list[0].lead_paragraph.length < 80
                    ? item?.list[0].lead_paragraph
                    : `${item?.list[0].lead_paragraph.substr(0, 160)} ...`}
                </LeadParagraph>
              </TextWrap>
            </div>
            <IconBtn onClick={() => checkMark(item?.list[0]._id)}>
              {marks && marks.includes(item?.list[0]._id) ? (
                <BsBookmarkFill />
              ) : (
                <BsBookmarkPlus />
              )}
            </IconBtn>
          </ArticleWrap>
        ))}
    </>
  )
}

export default ArticleItemGroup

const ArticleWrap = styled.div`
  width: ${(props) => props.width}px;
  /* width: 1000px; */
  /* height: 148px; */
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
  padding: 20px 25px;
`

const HeadLineGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: space-between;
  flex-direction: row;
`

const HeadLineText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: ${(props) => (props.isTablet ? 70 : 23)}px;
  margin-bottom: 10px;
  ${(props) => !props.isTablet && "margin-top: 20px;"}
`
const DateText = styled.div`
  font-size: 13px;
  font-weight: normal;
  color: #707070;

  position: absolute;
  margin-right: 30px;
  ${(props) => (props.isTablet ? "right: 0;" : "left: 25px;")}
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
  white-space: pre-wrap;
  padding-right: 40px;
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
