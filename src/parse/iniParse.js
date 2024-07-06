import ini from 'js-ini';

export default function (iniData) {
  return JSON.parse(JSON.stringify(ini.parse(iniData)));
}
