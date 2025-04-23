export function getFooterCopy(isIndex) {
  if (isIndex) {
    return "Holberton School";
  }
  return "Holberton School main dashboard";
}

export function getFooterCopy(isIndex) {
  return isIndex ? "Holberton School" : "Holberton School main dashboard";
}
