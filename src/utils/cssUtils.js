export const getWidth = ({ maxWidth }) => {
  switch (maxWidth) {
  case 'sm':
    return 600;
  case 'md':
    return 960;
  default:
    return 600;
  }
}
