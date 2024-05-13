import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    title: string
    url: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ title: "Go Concurrency with Goroutines", url: "https://blog.jiechen.dev/Concurrency/Go/Goroutines" })
}