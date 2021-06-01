import { compare, hash } from "bcrypt";
import { serialize } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { GetServerSidePropsContext, NextApiResponse, Redirect } from "next";
import squel, { BaseBuilder } from "squel";
import { Iapi, IuserToken } from "../interfaces";
import { query } from "./dbConnect";

const TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || process.exit(1)
interface user {
    id: number
    username: string
    password: string
    isAdmin: number
}
export class userControl {
    query = (q: BaseBuilder) => query<user[]>(q);
    /**
     * @param input if number=id or string=username
     * @returns one user object
     */
    async getUser(input: string | number) {
        if (typeof input == "number") {
            const q = squel.select().from("users").where(`id = ${input}`)

            return await this.query(q).then(i => i ? i[0] : false)
        } else {
            const q = squel.select().from("users").where(`username = "${input}"`)

            return await this.query(q).then(i => i ? i[0] : false)
        }
    }

    async signup(username: string, password: string, res: NextApiResponse) {
        if (this.validateUsername(username) == false) return res.json({ type: "error", message: "username most be 6 or longer" } as Iapi)
        if (this.validatePassword(password) == false) return res.json({ type: "error", message: "password most be 8 or longer" } as Iapi)
        if (await this.getUser(username) != false) return res.json({ type: "error", message: "username is already in use" } as Iapi)

        // hash password
        const passwordHash = await hash(password, 12)

        const q = squel.insert()
            .into("users")
            .setFieldsRows([{ username, password: passwordHash }])
        const t = await query<any>(q)

        if (t) return res.json({ type: "success", message: "true" } as Iapi)
        else return res.json({ type: "error", message: "error" } as Iapi)
    }

    async login(username: string, password: string, res: NextApiResponse) {
        const user = await this.getUser(username)

        if (user) {
            const resolvePassword = await compare(password, user.password)

            if (resolvePassword) {
                const token = sign({
                    username: user.username,
                    userid: user.id
                }, TOKEN_SECRET, {
                    expiresIn: "1d",
                    algorithm: "HS512"
                })

                res.setHeader("Set-cookie", serialize("token", token, {
                    // httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    path: "/",
                }))

                return res.json({ type: "success", message: "true" })

            } else return this.incorrect(res)
        } else return this.incorrect(res)
    }

    async Auth(context: GetServerSidePropsContext) {
        const { req, res } = context
        const token = req.cookies.token

        if (token) {
            try {
                let userToken = verify(token, TOKEN_SECRET)

                if (typeof userToken == "object") {
                    userToken = userToken as IuserToken
                    const isUser = await this.getUser((userToken as IuserToken).username)
                    if (isUser) {
                        return userToken as IuserToken
                    }
                    else {
                        this.removeToken(res)

                        return this.goToLogin()
                    }
                }
                else {
                    this.removeToken(res)

                    return this.goToLogin()
                }
            }
            catch {
                this.removeToken(res)

                return this.goToLogin()
            }
        } else return this.goToLogin()
    }

    private goToLogin() {
        return { destination: "/login", permanent: false } as Redirect
    }

    removeToken(res: GetServerSidePropsContext["res"]) {
        res.setHeader("Set-cookie", serialize("token", "", {
            // httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
            expires: new Date(0)
        }))
    }

    private incorrect(res: NextApiResponse) {
        return res.json({ type: "error", message: "incorrect fields" } as Iapi)
    }
    private validatePassword(password: string): boolean {
        return password.length >= 8
    }
    private validateUsername(useranme: string): boolean {
        return useranme.length >= 6
    }

    // private validateEmail(email: string): boolean {
    //     return !(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    // }
}