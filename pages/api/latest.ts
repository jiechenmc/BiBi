import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

type ResponseData = {
    title: string
    url: string
}
// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function,
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await runMiddleware(req, res, cors);
    res.status(200).json({ title: "Go Concurrency with Goroutines", url: "https://blog.jiechen.dev/Concurrency/Go/Goroutines" })
}