import { NextRequest, NextResponse } from 'next/server'
import { GreeterClient } from '@/_generated/hello_grpc_pb'
import { HelloRequest,HelloReply } from '@/_generated/hello_pb'
import * as grpc from '@grpc/grpc-js'

const client = new GreeterClient('localhost:50051', grpc.ChannelCredentials.createInsecure())

export interface Params {
  name?: string
}

export interface GreetJsonResponse {
  message: string
}

export const GET = async (request: NextRequest): Promise<NextResponse<GreetJsonResponse>> => {
  const params = getParams(request)

  const grpcRequest = new HelloRequest()
  grpcRequest.setName(params?.name ?? '')

  const grpcResponse = await new Promise<HelloReply>((resolve, reject) => {
    client.sayHello(grpcRequest, (serviceError: grpc.ServiceError | null, response:HelloReply) => {
      if (serviceError) {
        reject(serviceError)
      }

      resolve(response)
    })
  })

  return NextResponse.json<GreetJsonResponse>({ message: grpcResponse.getMessage() })
}

const getParams = (request: NextRequest): Params => {
  const searchParams = request.nextUrl.searchParams

  return {
    name: searchParams.get('name') ?? undefined
  }
}