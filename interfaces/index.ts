export interface Iapi {
    type: "error" | "success"
    message: string
    [index: string]: any
}