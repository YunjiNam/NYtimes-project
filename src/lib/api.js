import axios from "axios"

export const getArticle = (text) =>
  axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${text}&page=1&api-key=wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu`
  )
