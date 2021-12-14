import { useQuery } from "react-query"
import { withRouter, useHistory } from "react-router-dom"
import queryString from "query-string"
import * as Api from "../api"

export const ArticleQuery = (text) => {
  let history = useHistory()
  const query = queryString.parse(history.location.search)
  const getArticle = async () => {
    const { data } = await Api.getArticle(query && query.keyword)
    return data
  }

  return useQuery({
    queryKey: "article",
    queryFn: getArticle,
    enabled:
      query && query.keyword !== "" && query && query.keyword !== undefined,
    placeholderData: { data: [] },
  })
}
