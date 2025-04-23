export function getFooterCopy(isIndex) {
  if (isIndex === true) {
    return "Holberton School";
  }
  return "Holberton School main dashboard";
}

export function getFooterCopy(isIndex) {
  return isIndex ? "Holberton School" : "Holberton School main dashboard";
}
