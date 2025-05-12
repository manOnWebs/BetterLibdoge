// Initialize a counter for unique notification IDs (optional)
var notificationCounter = 0;

// Updated showNotification function with stacking
var showNotification = function(message) {
  // Check if the notification container exists; if not, create it
  var container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px'; // Space between notifications
    container.style.zIndex = '1000000'; // Ensure it's on top
    document.body.appendChild(container);
  }

  // Optionally, assign a unique ID to each notification
  notificationCounter++;
  var notificationId = 'notification-' + notificationCounter;

  // Create the notification element
  var notification = document.createElement('div');
  notification.id = notificationId; // Assign unique ID
  notification.innerText = message;
  notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
  notification.style.color = '#fff';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.opacity = '1'; // Start fully opaque
  notification.style.transition = 'opacity 0.5s ease'; // Smooth fade-out

  // Append the notification to the container
  container.appendChild(notification);

  // Set a timeout to fade out and remove the notification
  setTimeout(function() {
    // Start fading out
    notification.style.opacity = '0';
    // After the transition duration, remove the notification
    setTimeout(function() {
      if (notification.parentElement) {
        container.removeChild(notification);
      }
      // If the container has no more notifications, remove it
      if (container.children.length === 0) {
        document.body.removeChild(container);
      }
    }, 500); // Match the CSS transition duration
  }, 2000); // Display duration
}
var util = (function() {
  var u = {};

  u.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  u.locate = function(id) {
    var element = document.getElementById(id);
    return {left : parseInt(element.style.left.replace('px', '')),
      bottom : parseInt(element.style.bottom.replace('px', '')),
      side : element.getAttribute('rel')};
  };

  u.flipElement = function(figure, rotation) {
    var properties = ['transform', 'WebkitTransform', 'msTransform',
      'MozTransform', 'OTransform'];

    var sides = {0 : 'bottom', 270 : 'right', 180 : 'top', 90 : 'left'};
    figure.setAttribute('rel', sides[rotation]);

    for(i in properties) {
      figure.style[properties[i]] = 'rotate(' + rotation + 'deg)';
    }
  };

  return u;
})();
var animation = (function() {
    var a = {};
  
    a.fadeOut = function(id, opacity) {
      opacity = (opacity > 1) ? 1 : parseFloat(opacity.toFixed(2));
      opacity = (opacity < 0) ? 0 : parseFloat(opacity.toFixed(2));
  
      var element = document.getElementById(id);
      element.style.opacity = opacity;
      if (opacity > 0) {
        setTimeout(function() { a.fadeOut(id, opacity-0.1); },100);
      }
      else {
        element.parentElement.removeChild(element);
      }
    };
  
    var moveRight = function(figure, location) {
      if (location.side == 'bottom') {
        if (location.left + figure.clientWidth >= window.innerWidth) {
          util.flipElement(figure, 270);
        }
        else {
          figure.style.left = (location.left + 1) + 'px';
        }
      }
      else if (location.side == 'right') {
        if (location.bottom + figure.clientWidth >= window.innerHeight) {
          util.flipElement(figure, 180);
        }
        else {
          figure.style.bottom = (location.bottom + 1) + 'px';
        }
      }
      else if (location.side == 'top') {
        if (location.left <= 0) {
          util.flipElement(figure, 90);
        }
        else {
          figure.style.left = (location.left - 1) + 'px';
        }
      }
      else if (location.side == 'left') {
        if (location.bottom <= 0) {
          util.flipElement(figure, 0);
        }
        else {
          figure.style.bottom = (location.bottom - 1) + 'px';
        }
      }
    };
  
    var moveLeft = function(figure, location) {
      if (location.side == 'bottom') {
        if (location.left == 0) {
          util.flipElement(figure, 90);
        }
        else {
          figure.style.left = (location.left - 1) + 'px';
        }
      }
      else if (location.side == 'left') {
        if (location.bottom + figure.clientWidth >= window.innerHeight) {
          util.flipElement(figure, 180);
        }
        else {
          figure.style.bottom = (location.bottom + 1) + 'px';
        }
      }
      else if (location.side == 'top') {
        if (location.left + figure.clientWidth >= window.innerWidth) {
          util.flipElement(figure, 270);
        }
        else {
          figure.style.left = (location.left + 1) + 'px';
        }
      }
      else if (location.side == 'right') {
        if (location.bottom <= 0) {
          util.flipElement(figure, 0);
        }
        else {
          figure.style.bottom = (location.bottom - 1) + 'px';
        }
      }
    };
  
    a.run = function(doge, distance, callback) {
      var location = doge.getLocation();
      var figure = doge.getFigure();
  
      if (doge.getDirection() == 'left') {
        moveLeft(figure, location);
      }
      else {
        moveRight(figure, location);
      }
  
      setTimeout(
        function() {
          if (distance <= 0) {
            callback();
          }
          else {
            a.run(doge, --distance, callback);
          }
        }, 1);
    };
  
    a.hide = function(doge, callback) {
      var location = doge.getLocation();
      var figure = doge.getFigure();
      var doge_hidden = false;
  
      if (location.side == 'bottom') {
        figure.style.bottom = (location.bottom - 1) + 'px';
        doge_hidden = ((location.bottom - 1) == -figure.clientHeight);
      }
      else if (location.side == 'right') {
        figure.style.left = (location.left + 1) + 'px';
        doge_hidden = ((location.left + 1) == window.innerWidth);
      }
      else if (location.side == 'top') {
        figure.style.bottom = (location.bottom + 1) + 'px';
        doge_hidden = ((location.bottom + 1) == window.innerHeight);
      }
      else if (location.side == 'left') {
        figure.style.left = (location.left - 1) + 'px';
        doge_hidden = ((location.left - 1) == -figure.clientHeight);
      }
  
      if (!doge_hidden) {
        setTimeout(function() {a.hide(doge, callback)}, 1);
      }
      else {
        callback();
      }
    };
  
    a.ambush = function(doge, callback) {
      var location = doge.getLocation();
      var figure = doge.getFigure();
      var doge_visible = false;
  
      if (location.side == 'bottom') {
        figure.style.bottom = (location.bottom + 1) + 'px';
        doge_visible = ((location.bottom + 1) == 0);
      }
      else if (location.side == 'right') {
        figure.style.left = (location.left - 1) + 'px';
        doge_visible = ((location.left - 1) == window.innerWidth - figure.clientHeight);
      }
      else if (location.side == 'top') {
        figure.style.bottom = (location.bottom - 1) + 'px';
        doge_visible = ((location.bottom - 1) == window.innerHeight - figure.clientHeight);
      }
      else if (location.side == 'left') {
        figure.style.left = (location.left + 1) + 'px';
        doge_visible = ((location.left + 1) == 0);
      }
  
      if (!doge_visible) {
        setTimeout(function() {a.ambush(doge, callback)}, 1);
      }
      else {
        callback();
      }
    };
  
    return a;
})();
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
var doge = function(name) {
    var d = {};
    var id;
    var figure;
    var max_statements = 6;
    var statementNmbr = 1;
    var statements = [];
    var doge_direction;
    var doge_directions = {
      'right' : 'https://raw.github.com/ljalonen/libdoge/master/img/doge.png',
      'left' : 'https://raw.github.com/ljalonen/libdoge/master/img/doge_r.png'
    };
  
    // constructor like function
    (function() {
      id = 'doge-' + name + '-' + (new Date().getTime());
  
      figure = document.createElement('img');
  
      figure.setAttribute('id', id);
  
      var possible_directions = ['left', 'right'];
      doge_direction =
        possible_directions[util.random(0, possible_directions.length-1)];
  
      figure.setAttribute(
        'src', doge_directions[doge_direction]);
      figure.setAttribute('rel', 'bottom');
      figure.style.position = 'fixed';
    
      figure.style.left = '0px';
      figure.style.bottom = '0px';
      figure.style.zIndex = 999999;
  
      document.body.appendChild(figure);
  
      setInterval(
        function() {
          d.bark();
        },
        util.random(300,500));
    })();
   
    d.getID = function() {
      return id;
    };
  
    d.getFigure = function() {
      return figure;
    };
  
    d.getLocation = function() {
      return {left : parseInt(figure.style.left.replace('px', '')), 
        bottom : parseInt(figure.style.bottom.replace('px', '')),
        side : figure.getAttribute('rel')};
    };
  
    d.bark = function() {
      if (statements.length >= max_statements) {
        return false;
      }
  
      var statement_id = id + '-statement-' + statementNmbr;
      statementNmbr++;
  
      var statement = document.createElement('div');
      statement.style.display = 'inline-block';
      statement.setAttribute('id', statement_id);
      statement.innerHTML = dataminer.getSentence();
  
      statements.push(statement_id);
      document.body.appendChild(statement);
  
      var widthBoundaries = {
        left : Math.floor(0.075*window.innerWidth),
        right : Math.floor((0.925*window.innerWidth) - statement.clientWidth)
      };
  
      var heightBoundaries = {
        bottom : Math.floor(0.075*window.innerHeight),
        top : Math.floor((0.925*window.innerHeight) - statement.clientHeight)
      };
  
      statement.style.position = 'fixed';
      statement.style.bottom = util.random(heightBoundaries.bottom,
        heightBoundaries.top) + 'px';
      statement.style.left = util.random(widthBoundaries.left,
        widthBoundaries.right) + 'px';
      statement.style.zIndex = 999999;
      statement.style.opacity = 1;
      statement.style.fontSize = '2.75em';
      statement.style.textShadow = '-2px 0px 2px rgba(0, 0, 0, 1)';
      statement.style.fontFamily = 'Comic Sans MS';
      statement.style.color = 'rgb(' + 
        util.random(0, 255) + ',' +
        util.random(0, 255) + ',' + 
        util.random(0, 255) + ')';
  
      var fadeOutIn = util.random(300, 1000);
      setTimeout(
        function() {
          animation.fadeOut(statement_id, 1);
          setTimeout(function() {
            statements.splice(statements.indexOf(statement_id), 1);
          }, fadeOutIn);
        },
        fadeOutIn);
    };
  
    d.plz = function() {
      if (Math.random() < 0.33) {
        d.turnAround();
      }
  
      if (Math.random() < 0.5) {
        var distance = util.random(500, 1000);
        d.run(distance);
      }
      else {
        d.hide();
      }
    };
  
    d.hide = function() {
      var callback = function() {
        setTimeout(function() {
          d.teleport(true);
          d.ambush();
        }, util.random(0, 2500));
      };
      animation.hide(this, callback);
    };
  
    d.teleport = function(is_hidden) {
      var sides = ['top', 'bottom', 'left', 'right'];
      var side = sides[util.random(0, sides.length-1)];
      figure.setAttribute('rel', side);
  
      if (is_hidden == null) {
        is_hidden = false;
      }
  
      if (side == 'top') {
        util.flipElement(figure, 180);
        var bottom = (is_hidden) ? 
          window.innerHeight : (window.innerHeight - figure.clientHeight);
        figure.style.bottom = bottom + 'px';
        figure.style.left = util.random(0, window.innerWidth - figure.clientWidth) + 'px';
      }
      else if (side == 'bottom') {
        util.flipElement(figure, 0);
        var bottom = (is_hidden) ? -figure.clientHeight : 0;
        figure.style.bottom = bottom + 'px';
        figure.style.left = util.random(0, window.innerWidth - figure.clientWidth) + 'px';
      }
      else if (side == 'left') {
        util.flipElement(figure, 90);
        figure.style.bottom = util.random(0, window.innerHeight - figure.clientWidth) + 'px';
        var left = (is_hidden) ? -figure.clientHeight : 0;
        figure.style.left = left + 'px';
      }
      else if (side == 'right') {
        util.flipElement(figure, 270);
        figure.style.bottom = util.random(0, window.innerHeight - figure.clientWidth) + 'px';
        var left = (is_hidden) ? window.innerWidth : (window.innerWidth - figure.clientHeight);
        figure.style.left = left + 'px';
      }
    };
  
    d.ambush = function() {
      var callback = function() {
        setTimeout(function() {
          d.plz();
        }, util.random(0, 2500));
      };
      animation.ambush(this, callback);
    };
  
    d.run = function(distance) {
      animation.run(this, distance, function() {d.plz();});
    };
  
    d.escape = function() {
      figure.parentNode.removeChild(figure);
      max_statements = 0;
    }
  
    d.getDirection = function() {
      return doge_direction;
    }
  
    d.turnAround = function() {
      if (doge_direction == 'right') {
        figure.src = doge_directions['left'];
        doge_direction = 'left';
      }
      else {
        figure.src = doge_directions['right'];
        doge_direction = 'right'
      }
    }
  
    return d;
};
var controller = (function() {
    var c = {};
    var doges = [];
    var name = 1;
  
    c.buyDoge = function() {
      var d = new doge(name++);
      var distance = util.random(500, 1000);
      d.run(distance);
      doges.push(d);
    };
  
    c.sellDoge = function() {
      if (doges.length == 0) {
        return;
      }
  
      var doge = doges.pop();
  
      // Y U NO SELL DOGE
      doge.escape();
      delete doge;
    };
  
    c.getDoges = function() {
      return doges;
    }
  
    return c;
})();
// Enhanced keybinds function
var keybinds = function(e) {
  switch(e.key) {
    case '+':
    case '=': // Handle both '+' and '=' for keyboards where '+' requires Shift
      e.preventDefault();
      controller.buyDoge();
      showNotification('Doge Bought!');
      break;
    case '-':
      if (controller.getDoges().length == 0) {
        return;
      }
      e.preventDefault();
      controller.sellDoge();
      showNotification('Doge Sold!');
      break;
    default:
      break;
  }
}
document.addEventListener('keydown', keybinds);
dataminer.store(); // we gotta do this at least _once_ so that doge datamines properly