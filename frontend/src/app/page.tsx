import { GreetJsonResponse } from './api/route'

export default async function Home() {
  // gRPC サーバーに通信する API を呼び出す
  const response = await fetch('http://localhost:3000/api')

  const json: GreetJsonResponse = await response.json()

  return (
    <div>
      {json.message}
    </div>
  )
}