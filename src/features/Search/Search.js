import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import styled from "@emotion/styled"
import { useDispatch } from "react-redux"
import { CgSearch } from "react-icons/cg"
import { useQueryClient } from "react-query"
import { useMediaQuery } from "react-responsive"
import useWindowSize from "../../lib/useWindowSize"

const Search = ({ history }) => {
  const queryClient = useQueryClient()
  const size = useWindowSize()
  const isDesktop = useMediaQuery({ minWidth: 1030 })
  const isTablet = useMediaQuery({ minWidth: 600 })

  const onChange = (e) => {
    //console.log(e.target.value);
    if (e.keyCode === 13 && e.target.value !== "") {
      history.push(`/#${e.target.value}`)
      queryClient.invalidateQueries("article")
    }
  }
  return (
    <SearchContainer>
      <SearchWrap width={size.width} isDesktop={isDesktop} isTablet={isTablet}>
        <SearchIcon>
          <CgSearch size="24" color="#3d3d3d" />
        </SearchIcon>
        <SearchInput
          placeholder="Search"
          onKeyUp={onChange}
          onChange={onChange}
        />
      </SearchWrap>
    </SearchContainer>
  )
}

export default withRouter(Search)

const SearchContainer = styled.div`
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchWrap = styled.div`
  width: ${(props) =>
    props.isDesktop
      ? props.width - 400
      : props.isTablet
      ? props.width - 200
      : props.width - 100}px;
  height: 60px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  box-shadow: 2px 2px 6px #00000029;
  border-radius: 300px;
`

const SearchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 30px;

  color: #fff;
`

const SearchInput = styled.input`
  width: 80%;
  margin-left: 30px;

  outline: none;
  border: none;

  font-weight: medium;
  font-size: 20px;
  background-color: #00000000;
`
