function getDateAsString({ D, M, Y}: { D: number, M: number, Y: number }) {
    const Dstr = D.toString(), Mstr = M.toString(), Ystr = Y.toString()
    return `${Dstr}-${Mstr}-${Ystr}`
}

export default getDateAsString