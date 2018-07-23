export function smartTrim(str, maxLength, separator = ' ') {
  if (str.length <= maxLength) return str;
  const pos = str.lastIndexOf(separator, maxLength);
  return [str.substr(0, pos), str.substr(pos + 1)];
}
