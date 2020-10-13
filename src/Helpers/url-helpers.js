export const generateTitle = (title) => {
  return {
    TITLE:title,
    TITLE_PLURAL: `${title}lar`,
    TITLE_ADD: `${title} qo'shish`,
    TITLE_EDIT: `${title} tahrirlash`
  }
}

export const generateUrl = (basicUrl) => {
  return {
    LIST: basicUrl,
    ADD: `${basicUrl}/add`,
    EDIT: `${basicUrl}/edit`
  }
}