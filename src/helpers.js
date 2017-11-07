export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function getFunName() {
  const adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 'worried'];

  const nouns = ['wookies', 'ewoks', 'destroyers', 'walkers', 'ithorians', 'dragons', 'hutts', 'hunters', 'bounties', 'stormtroopers', 'speeders', 'cruisers', 'fighters', 'rancors', 'sith', 'lightsabers', 'blasters', 'wizards', 'rebels', 'jawas', 'aqualish', 'dewbacks', 'dianogas', 'gamorreans', 'gundarks', 'mynocks', 'rodians', 'niktos', 'neimodians', 'tauntauns', 'raiders', 'weequays'];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
