export const yearOptions = () => {
    const tmp = []
    for(let i = 1990; i < new Date().getFullYear() + 1; i++) {
        tmp.push({id: String(i), name: String(i)})
    }

    return tmp
}