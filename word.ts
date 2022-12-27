function createWordWrap(text: string, limit: number | string): string {
  const regex = /[бвгджзйклмнпрстфхцчшщ]+[аеёиоуыэюя][бвгджзйклмнпрстфхцчшщ](?=[бвгджзйклмнпрстфхцчшщьъ ])[ьъй]?|[бвгджзйклмнпрстфхцчшщ]+[аеёиоуыэюя][й]?|[аеёиоуыэюя][бвгджзйклмнпрстфхцчшщ](?=[бвгджзйклмнпрстфхцчшщьъ ])[ъь]?|[аеёиоуыэюя](?=[а-я]{2})|(?<= +)[^\s]+(?= +|$)/gmi;
  let out = '';
  let offset = 0; 
  let prev = 0;
  let pass = false;
  let matches = text.matchAll(regex);
  for (const m of matches) {
    if (m.index) {
      if (m.index - offset > limit) {
        let hyphen = text[prev - 1] == ' ' ? '' : '-';
        out += text.substring(offset, prev) + hyphen + '\n';
        offset = prev;
      }

      if (!pass) prev = m.index;
      pass = m[0].length < 2;
    }
  }

  out += text.substring(offset);
  return out;
}