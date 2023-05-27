export type Category = {
    id: number,
    name: string,
    visible: boolean
}

export type Task = {
    id: number,
    name: string,
    categories: Category[]
}