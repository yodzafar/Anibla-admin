export const imageExtValidate = (str) => {
    const filename = str.match(/\w+(.)\w+$/)[0]
    const ext = filename.split('.')[1]
    return (ext === 'jpeg' || ext === 'png' || ext === 'jpg')
}
