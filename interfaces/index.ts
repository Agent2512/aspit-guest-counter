export interface Iapi {
    type: "error" | "success"
    message: string
    [index: string]: any
}

export interface IuserToken {
    username: string
    userid: string
}