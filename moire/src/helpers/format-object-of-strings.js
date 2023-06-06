export default function formatObjectOfStrings(obj, propName) {
  for (let item of obj) {
    item[propName] = formatString(item[propName]);
  }
  return obj;
}

function formatString(string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.length)}`;
}
