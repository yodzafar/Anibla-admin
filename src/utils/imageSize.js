export const readFileAsDataURL = async (file) => {
    const base64Url = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
    return base64Url;
}

export const imgObgj = async (base64Url) => {
    const image = new Image()
    image.src = base64Url

    image.onload = () => image

    return image
}

export const validateImage = (base64Url, numb) => {
    const image = new Image()
    image.src = base64Url
    image.onload = () => {
        const width = image.naturalWidth
        const height = image.naturalHeight
        return width / height >= numb
    }
}
