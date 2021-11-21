import React from "react"
import styled from "@emotion/styled"
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs"
import useWindowSize from "../../lib/useWindowSize"

const ArticleItemGroup = ({
  list,
  goMainArticle,
  marks,
  checkMark,
  showMark,
}) => {
  const size = useWindowSize()
  console.log("######## list: ", list && list)
  return (
    <>
      {list &&
        list.map((item, idx) => (
          <ArticleWrap key={idx} width={size.width}>
            <div
              onClick={() =>
                goMainArticle(showMark ? item?.list[0].web_url : item.web_url)
              }
            >
              <TextWrap>
                <HeadLineGroup>
                  <HeadLineText>
                    {showMark
                      ? item?.list[0].headline.main
                      : item.headline.main}
                  </HeadLineText>
                  <DateText>
                    {showMark
                      ? item?.list[0].pub_date.split("T")[0]
                      : item.pub_date.split("T")[0]}
                  </DateText>
                </HeadLineGroup>
                <ByLine>
                  {showMark
                    ? item?.list[0].byline.original
                    : item.byline.original}
                </ByLine>
                <LeadParagraph>
                  {showMark
                    ? item?.list[0].lead_paragraph.length < 80
                    : item.lead_paragraph.length < 80
                    ? showMark
                      ? item?.list[0].lead_paragraph
                      : item.lead_paragraph
                    : `${
                        showMark
                          ? item?.list[0].lead_paragraph.substr(0, 80)
                          : item.lead_paragraph.substr(0, 80)
                      } ...more`}
                </LeadParagraph>
              </TextWrap>
            </div>
            <IconBtn
              onClick={() => checkMark(showMark ? item?.list[0]._id : item._id)}
            >
              {marks &&
              marks.includes(showMark ? item?.list[0]._id : item._id) ? (
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
  width: ${(props) => props.width - 200}px;
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
  margin-left: 25px;
  width: 80%;
  padding: 15px 0;
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
  white-space: pre-wrap;
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
