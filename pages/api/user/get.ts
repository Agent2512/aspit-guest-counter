import { NextApiRequest, NextApiResponse } from "next";
import { userControl } from "../../../utils/userControl";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await new userControl().getUser("test")
    
    res.json(user)
}