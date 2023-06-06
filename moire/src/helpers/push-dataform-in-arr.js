export default function pushDataformInArr(obj) {
  const arr = [];
  for (let key in obj) {
    if (obj[key]) arr.push(key);
  }
  return arr;
}
