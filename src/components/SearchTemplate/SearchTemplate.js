import React from "react"
import { withRouter } from "react-router-dom"
import styled from "@emotion/styled"
import { CgSearch } from "react-icons/cg"

const SearchTemplate = ({ searchHandler, history }) => {
  const onChange = (e) => {
    //console.log(e.target.value);
    if (e.keyCode === 13) {
      searchHandler(e.target.value)
      history.push("/articlelist")
    }
  }
  return (
    <SearchContainer>
      <SearchWrap>
        <SearchIcon>
          <CgSearch />
        </SearchIcon>
        <SearchInput placeholder="Search" onKeyUp={onChange} />
      </SearchWrap>
    </SearchContainer>
  )
}

export default withRouter(SearchTemplate)

const SearchContainer = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchWrap = styled.div`
  width: 80%;
  height: 70px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: #0000002b;
  border-radius: 15px;
`

const SearchIcon = styled.div`
  width: 28px;
  height: 28px;
  margin-left: 30px;

  color: #fff;
`

const SearchInput = styled.input`
  width: 80%;
  margin-left: 30px;

  outline: none;
  border: none;

  font-weight: medium;
  font-size: 25px;
  background-color: #00000000;
`
