import { NextApiRequest, NextApiResponse } from "next"

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Diego" },
    { id: 2, name: "Paulo" },
    { id: 3, name: "Luiz" },
  ]

  return response.json(users)
}