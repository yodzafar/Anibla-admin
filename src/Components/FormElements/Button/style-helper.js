export const BUTTON = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
  LIGHT: 'light',
  DARK: 'dark',
  LINK: 'link',
}

export const getButtonStyle = ({buttonstyle}, obj) => {
  if (buttonstyle && obj[buttonstyle]) {
    return obj[buttonstyle]
  }
  return obj[BUTTON.PRIMARY]
}

export const getButtonColor = ({buttonstyle, variantstyle}) => {
  if (!variantstyle && (variantstyle !== 'outlined' || variantstyle !== 'outline-rounded')) {
    return buttonstyle === BUTTON.LIGHT ? '#212529' : '#fff'
  }

  return buttonstyle === BUTTON.LIGHT ? '#212529' : `var(--${buttonstyle})`
}

export const getButtonBackground = ({buttonstyle, variantstyle}) => {
  if (!variantstyle && variantstyle !== 'outlined') {
    return `var(--${buttonstyle})`
  }


  return 'transparent'
}

export const getBorderRadius = ({variantstyle}) => {
  if (variantstyle && (variantstyle === 'rounded' || variantstyle === 'outline-rounded')) {
    return 24
  }
  return 6
}