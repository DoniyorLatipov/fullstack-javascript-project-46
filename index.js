import parse from './src/parse.js';
import getDiff from './src/getDiff.js';

export default function difference(filepath1, filepath2, { format }) {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const difference = getDiff(data1, data2, format);
  console.log(difference);
}
