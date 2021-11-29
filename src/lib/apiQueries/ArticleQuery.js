import { useQuery } from "react-query"
import { withRouter, useHistory } from "react-router-dom"
import * as Api from "../api"

export const ArticleQuery = (text) => {
  let history = useHistory()
  const getArticle = async () => {
    const { data } = await Api.getArticle(history.location.hash.split("#")[1])
    return data
  }

  return useQuery({
    queryKey: "article",
    queryFn: getArticle,
    enabled:
      history.location.hash.split("#")[1] !== "" &&
      history.location.hash.split("#")[1] !== undefined,
    placeholderData: { data: [] },
  })
}
