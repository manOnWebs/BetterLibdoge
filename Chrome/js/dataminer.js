var dataminer = (function() {
  var m = {};

  var contentStopWords = {
    'a': true, 'able': true, 'about': true, 'across': true, 'after': true,
    'all': true, 'almost': true, 'also': true, 'am': true, 'among': true,
    'an': true, 'and': true, 'any': true, 'are': true, 'as': true,
    'at': true, 'be': true, 'because': true, 'been': true, 'but': true,
    'by': true, 'can': true, 'cannot': true, 'could': true, 'dear': true,
    'did': true, 'do': true, 'does': true, 'either': true, 'else': true,
    'ever': true, 'every': true, 'for': true, 'from': true, 'get': true,
    'got': true, 'had': true, 'has': true, 'have': true, 'he': true,
    'her': true, 'hers': true, 'him': true, 'his': true, 'how': true,
    'however': true, 'i': true, 'if': true, 'in': true, 'into': true,
    'is': true, 'it': true, 'its': true, 'just': true, 'least': true,
    'let': true, 'like': true, 'likely': true, 'may': true, 'me': true,
    'might': true, 'most': true, 'must': true, 'my': true, 'neither': true,
    'no': true, 'nor': true, 'not': true, 'of': true, 'off': true,
    'often': true, 'on': true, 'only': true, 'or': true, 'other': true,
    'our': true, 'own': true, 'rather': true, 'said': true, 'say': true,
    'says': true, 'she': true, 'should': true, 'since': true, 'so': true,
    'some': true, 'than': true, 'that': true, 'the': true, 'their': true,
    'them': true, 'then': true, 'there': true, 'these': true, 'they': true,
    'this': true, 'tis': true, 'to': true, 'too': true, 'twas': true,
    'us': true, 'wants': true, 'was': true, 'we': true, 'were': true,
    'what': true, 'when': true, 'where': true, 'which': true, 'while': true,
    'who': true, 'whom': true, 'why': true, 'will': true, 'with': true,
    'would': true, 'yet': true, 'you': true, 'your': true
  };

  var prefixes = ['wow', 'so', 'such', 'so much', 'very', 'many', 'lots',
    'most', 'beautiful', 'all the', 'the', 'very much', 'pretty', 'lol'];

  var suffixes = ['wow', 'plz', 'lol'];
  var presetWords = ['doge'];

  var filterWords = function(words) {
    var selected_words = {};
    var stopList = Object.assign({}, contentStopWords);

    prefixes.forEach(p => stopList[p] = true);
    suffixes.forEach(s => stopList[s] = true);

    for (let word of words) {
      if (word.length <= 2 || word.length > 20) continue;
      if (stopList[word]) continue;
      if (!isNaN(parseInt(word))) continue;

      selected_words[word] = (selected_words[word] || 0) + 1;
    }

    return Object.keys(selected_words);
  };

  var readMeta = function() {
    var strings = [document.title.trim()];
    var metadata = document.getElementsByTagName('meta');
    var interests = ['keywords', 'description', 'author'];

    for (let tag of metadata) {
      if (interests.includes(tag.name) && tag.content) {
        strings.push(tag.content.trim());
      }
    }

    let words = unescape(strings.join(' ').toLowerCase())
      .replace(/\W/g, ' ')
      .split(/[\s\/]+/g);

    return filterWords(words.concat(presetWords));
  };

  var readContent = function() {
    var content = document.createElement('div');
    content.innerHTML = document.body.innerHTML.replace(/>/g, '> ');

    ['script', 'style'].forEach(tag => {
      let nodes = content.getElementsByTagName(tag);
      for (let i = nodes.length - 1; i >= 0; i--) {
        nodes[i].remove();
      }
    });

    let words = unescape(content.textContent.toLowerCase().trim())
      .replace(/\W/g, ' ')
      .split(/[\s\/]+/g);

    return filterWords(words);
  };

  // Store data using browser.storage.local
  m.store = async function() {
    var newMeta = readMeta();
    var newContent = readContent();

    const { globaldictionary } = await browser.storage.local.get('globaldictionary');
    var dictionary = globaldictionary || { meta: [], content: [] };

    function mergeUnique(newWords, existingWords) {
      newWords.forEach(word => {
        if (!existingWords.includes(word)) existingWords.push(word);
      });
    }

    mergeUnique(newMeta, dictionary.meta);
    mergeUnique(newContent, dictionary.content);

    await browser.storage.local.set({ globaldictionary: dictionary });
  };

  m.getSentence = async function() {
    const { globaldictionary } = await browser.storage.local.get('globaldictionary');
    const dict = globaldictionary || { meta: [], content: [] };

    if (!dict.meta.length && !dict.content.length) {
      return "wow nothing to see here lol";
    }

    let text = [];
    let selectedDicts = [
      Math.random() < 0.5 ? dict.meta : dict.content
    ];

    if (Math.random() < 0.4) {
      selectedDicts.push(Math.random() < 0.5 ? dict.meta : dict.content);
    }

    let rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    text.push(rand(prefixes));

    let content = [];
    for (let d of selectedDicts) {
      let w = rand(d);
      if (!content.includes(w)) content.push(w);
    }

    text.push(content.join(' '));

    if (Math.random() <= 0.33) {
      text.push(rand(suffixes));
    }

    return text.join(' ');
  };

  return m;
})();