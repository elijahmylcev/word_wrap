const items = document.querySelectorAll('.wrapper__item')

const text = 'Правила переноса слов рекомендуют переносить слова с одной строки на другую по слогам с учетом морфемного строения. В письменной речи слова переносятся с одной строки на другую в соответствии с определенными правилами переноса.'

const regex = /[бвгджзйклмнпрстфхцчшщ]+[аеёиоуыэюя][бвгджзйклмнпрстфхцчшщ](?=[бвгджзйклмнпрстфхцчшщьъ ])[ьъй]?|[бвгджзйклмнпрстфхцчшщ]+[аеёиоуыэюя][й]?|[аеёиоуыэюя][бвгджзйклмнпрстфхцчшщ](?=[бвгджзйклмнпрстфхцчшщьъ ])[ъь]?|[аеёиоуыэюя](?=[а-я]{2})|(?<= +)[^\s]+(?= +|$)/gmi;

function wordWrap(text, element) {
  fz = window.getComputedStyle(element).fontSize
  width = +fz.substring(0, fz.length - 2)
  limit = element.clientWidth / width * 2

  let out = '';
  let offset = 0; 
  let prev = 0;
  let pass = false;
  let matches = text.matchAll(regex);
  for (const m of matches) {
    if (m.index - offset > limit) {
      let hyphen = text[prev - 1] == ' ' ? '' : '-';
      out += text.substring(offset, prev) + hyphen + '\n';
      offset = prev;
    }

    if (!pass) prev = m.index;
    pass = m[0].length < 2;
  }

  out += text.substring(offset);
  return out;
}


items.forEach(element => {
  element.innerText = wordWrap(text, element)
})