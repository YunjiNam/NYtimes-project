import { useQuery } from "react-query"
import * as Api from "../api"

export const ArticleQuery = (text) => {
  const getArticle = async () => {
    const { data } = await Api.getArticle(text)
    return data
  }

  return useQuery({
    queryKey: "article",
    queryFn: getArticle,
    enabled: text !== "",
    placeholderData: { data: [] },
  })
}
