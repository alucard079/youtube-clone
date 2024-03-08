const VIEW_FORMATTER  =  new Intl.NumberFormat(
    undefined, { notation: "compact" }
)

export function ViewFormatter( views:number ) {
    return VIEW_FORMATTER.format(views)
}
