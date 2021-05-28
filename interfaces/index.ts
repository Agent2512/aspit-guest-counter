export interface Iquery {
    [index: string]: string|number
}

export interface Iapi {
    type: "error" | "success"
    message: string
    [index: string]: any
}