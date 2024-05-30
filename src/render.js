import _ from 'lodash';

function stylishRender(data) {
  if (data.length === 0) {
    console.log('{}');
  }

  const iter = (data, depth) => {
    const res = data.map(([symbol, key, value]) => {
      return `${symbol} ${key}: ${_.isArray(value) ? iter(value, depth + 1) : value}`;
    });

    const space = ' '.repeat(depth * 2);
    const endSpace = depth > 1 ? space : '';
    return `{\n${space}${res.join(`,\n${space}`)}\n${endSpace}}`;
  };

  console.log(iter(data, 1));
}

export default function render(data, format) {
  switch (format) {
    case 'stylish':
      stylishRender(data);
      break;
    default:
      throw new Error(`unknown format, used ${format}`);
  }
}
