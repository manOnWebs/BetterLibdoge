var util = (function() {
    var a = {};
    a.random = function(c, b) {
        return Math.floor(Math.random() * (b - c + 1)) + c
    };
    a.locate = function(c) {
        var b = document.getElementById(c);
        return {
            left: parseInt(b.style.left.replace("px", "")),
            bottom: parseInt(b.style.bottom.replace("px", "")),
            side: b.getAttribute("rel")
        }
    };
    a.flipElement = function(b, d) {
        var c = ["transform", "WebkitTransform", "msTransform", "MozTransform", "OTransform"];
        var e = {
            0: "bottom",
            270: "right",
            180: "top",
            90: "left"
        };
        b.setAttribute("rel", e[d]);
        for (i in c) {
            b.style[c[i]] = "rotate(" + d + "deg)"
        }
    };
    return a
})();
var animation = (function() {
    var b = {};
    b.fadeOut = function(f, a) {
        a = (a > 1) ? 1 : parseFloat(a.toFixed(2));
        a = (a < 0) ? 0 : parseFloat(a.toFixed(2));
        var e = document.getElementById(f);
        e.style.opacity = a;
        if (a > 0) {
            setTimeout(function() {
                b.fadeOut(f, a - 0.1)
            }, 100)
        } else {
            e.parentElement.removeChild(e)
        }
    };
    var c = function(a, e) {
        if (e.side == "bottom") {
            if (e.left + a.clientWidth >= window.innerWidth) {
                util.flipElement(a, 270)
            } else {
                a.style.left = (e.left + 1) + "px"
            }
        } else {
            if (e.side == "right") {
                if (e.bottom + a.clientWidth >= window.innerHeight) {
                    util.flipElement(a, 180)
                } else {
                    a.style.bottom = (e.bottom + 1) + "px"
                }
            } else {
                if (e.side == "top") {
                    if (e.left <= 0) {
                        util.flipElement(a, 90)
                    } else {
                        a.style.left = (e.left - 1) + "px"
                    }
                } else {
                    if (e.side == "left") {
                        if (e.bottom <= 0) {
                            util.flipElement(a, 0)
                        } else {
                            a.style.bottom = (e.bottom - 1) + "px"
                        }
                    }
                }
            }
        }
    };
    var d = function(a, e) {
        if (e.side == "bottom") {
            if (e.left == 0) {
                util.flipElement(a, 90)
            } else {
                a.style.left = (e.left - 1) + "px"
            }
        } else {
            if (e.side == "left") {
                if (e.bottom + a.clientWidth >= window.innerHeight) {
                    util.flipElement(a, 180)
                } else {
                    a.style.bottom = (e.bottom + 1) + "px"
                }
            } else {
                if (e.side == "top") {
                    if (e.left + a.clientWidth >= window.innerWidth) {
                        util.flipElement(a, 270)
                    } else {
                        a.style.left = (e.left + 1) + "px"
                    }
                } else {
                    if (e.side == "right") {
                        if (e.bottom <= 0) {
                            util.flipElement(a, 0)
                        } else {
                            a.style.bottom = (e.bottom - 1) + "px"
                        }
                    }
                }
            }
        }
    };
    b.run = function(f, h, g) {
        var e = f.getLocation();
        var a = f.getFigure();
        if (f.getDirection() == "left") {
            d(a, e)
        } else {
            c(a, e)
        }
        setTimeout(function() {
            if (h <= 0) {
                g()
            } else {
                b.run(f, --h, g)
            }
        }, 1)
    };
    b.hide = function(g, h) {
        var e = g.getLocation();
        var a = g.getFigure();
        var f = false;
        if (e.side == "bottom") {
            a.style.bottom = (e.bottom - 1) + "px";
            f = ((e.bottom - 1) == -a.clientHeight)
        } else {
            if (e.side == "right") {
                a.style.left = (e.left + 1) + "px";
                f = ((e.left + 1) == window.innerWidth)
            } else {
                if (e.side == "top") {
                    a.style.bottom = (e.bottom + 1) + "px";
                    f = ((e.bottom + 1) == window.innerHeight)
                } else {
                    if (e.side == "left") {
                        a.style.left = (e.left - 1) + "px";
                        f = ((e.left - 1) == -a.clientHeight)
                    }
                }
            }
        }
        if (!f) {
            setTimeout(function() {
                b.hide(g, h)
            }, 1)
        } else {
            h()
        }
    };
    b.ambush = function(g, h) {
        var f = g.getLocation();
        var e = g.getFigure();
        var a = false;
        if (f.side == "bottom") {
            e.style.bottom = (f.bottom + 1) + "px";
            a = ((f.bottom + 1) == 0)
        } else {
            if (f.side == "right") {
                e.style.left = (f.left - 1) + "px";
                a = ((f.left - 1) == window.innerWidth - e.clientHeight)
            } else {
                if (f.side == "top") {
                    e.style.bottom = (f.bottom - 1) + "px";
                    a = ((f.bottom - 1) == window.innerHeight - e.clientHeight)
                } else {
                    if (f.side == "left") {
                        e.style.left = (f.left + 1) + "px";
                        a = ((f.left + 1) == 0)
                    }
                }
            }
        }
        if (!a) {
            setTimeout(function() {
                b.ambush(g, h)
            }, 1)
        } else {
            h()
        }
    };
    return b
})();
var dataminer = (function() {
    var a = {};
    var c = {
        a: true,
        able: true,
        about: true,
        across: true,
        after: true,
        all: true,
        almost: true,
        also: true,
        am: true,
        among: true,
        an: true,
        and: true,
        any: true,
        are: true,
        as: true,
        at: true,
        be: true,
        because: true,
        been: true,
        but: true,
        by: true,
        can: true,
        cannot: true,
        could: true,
        dear: true,
        did: true,
        "do": true,
        does: true,
        either: true,
        "else": true,
        ever: true,
        every: true,
        "for": true,
        from: true,
        get: true,
        got: true,
        had: true,
        has: true,
        have: true,
        he: true,
        her: true,
        hers: true,
        him: true,
        his: true,
        how: true,
        however: true,
        i: true,
        "if": true,
        "in": true,
        into: true,
        is: true,
        it: true,
        its: true,
        just: true,
        least: true,
        let: true,
        like: true,
        likely: true,
        may: true,
        me: true,
        might: true,
        most: true,
        must: true,
        my: true,
        neither: true,
        no: true,
        nor: true,
        not: true,
        of: true,
        off: true,
        often: true,
        on: true,
        only: true,
        or: true,
        other: true,
        our: true,
        own: true,
        rather: true,
        said: true,
        say: true,
        says: true,
        she: true,
        should: true,
        since: true,
        so: true,
        some: true,
        than: true,
        that: true,
        the: true,
        their: true,
        them: true,
        then: true,
        there: true,
        these: true,
        they: true,
        "this": true,
        tis: true,
        to: true,
        too: true,
        twas: true,
        us: true,
        wants: true,
        was: true,
        we: true,
        were: true,
        what: true,
        when: true,
        where: true,
        which: true,
        "while": true,
        who: true,
        whom: true,
        why: true,
        will: true,
        "with": true,
        would: true,
        yet: true,
        you: true,
        your: true
    };
    var b = ["wow", "so", "such", "so much", "very", "many", "lots", "most", "beautiful", "all the", "the", "very much", "pretty", "lol"];
    var h = ["wow", "plz", "lol"];
    var d = ["doge"];
    var g = {
        meta: null,
        contetn: null
    };
    var f = function() {
        var n;
        var k = [];
        k.push(document.title.trim());
        var m = ["keywords", "description", "author"];
        var l = document.getElementsByTagName("meta");
        for (i in l) {
            if (m.indexOf(l[i].name) != -1 && typeof l[i].content != "undefined") {
                k.push(l[i].content.trim())
            }
        }
        n = unescape(k.join(" ").toLowerCase()).replace(/\W/g, " ").split(/[\s\/]+/g);
        n = n.concat(d);
        return e(n)
    };
    var j = function() {
        var m = document.createElement("div");
        m.innerHTML = document.body.innerHTML.replace(/>/g, "> ");
        var n = ["script", "style"];
        for (l in n) {
            var k = m.getElementsByTagName(n[l]);
            for (var l = (k.length - 1); l >= 0; l--) {
                k[l].parentElement.removeChild(k[l])
            }
        }
        var o = unescape(m.textContent.toLowerCase().trim()).replace(/\W/g, " ").split(/[\s\/]+/g);
        return e(o)
    };
    var e = function(m) {
        var l = {};
        var k = c;
        for (i in b) {
            k[b[i]] = true
        }
        for (i in h) {
            k[h[i]] = true
        }
        for (i in m) {
            if (m[i].length <= 2 || m[i].length > 20) {
                continue
            }
            if (m[i] in k) {
                continue
            }
            if (m[i] in l) {
                l[m[i]]++;
                continue
            }
            if (parseInt(m[i]).toString() == m[i]) {
                continue
            }
            l[m[i]] = 1
        }
        return Object.keys(l)
    };
    g = {
        meta: f(),
        content: j()
    };
    a.getSentence = function() {
        var n = [];
        var k = [];
        k.push((Math.random() < 0.5) ? g.content : g.meta);
        if (Math.random() < 0.4) {
            k.push((Math.random() < 0.5) ? g.content : g.meta)
        }
        n.push(b[util.random(0, b.length - 1)]);
        var l = [];
        for (i in k) {
            var m = util.random(0, k[i].length - 1);
            if (l.indexOf(k[i][m]) == -1) {
                l.push(k[i][m])
            }
        }
        n.push(l.join(" "));
        if (Math.random() <= 0.33) {
            n.push(h[util.random(0, h.length - 1)])
        }
        return n.join(" ")
    };
    return a
}());
var doge = function(a) {
    var g = {};
    var b;
    var h;
    var e = 6;
    var k = 1;
    var f = [];
    var j;
    var c = {
        right: "https://raw.github.com/ljalonen/libdoge/master/img/doge.png",
        left: "https://raw.github.com/ljalonen/libdoge/master/img/doge_r.png"
    };
    (function() {
        b = "doge-" + a + "-" + (new Date().getTime());
        h = document.createElement("img");
        h.setAttribute("id", b);
        var d = ["left", "right"];
        j = d[util.random(0, d.length - 1)];
        h.setAttribute("src", c[j]);
        h.setAttribute("rel", "bottom");
        h.style.position = "fixed";
        h.style.left = "0px";
        h.style.bottom = "0px";
        h.style.zIndex = 999999;
        document.body.appendChild(h);
        setInterval(function() {
            g.bark()
        }, util.random(300, 500))
    })();
    g.getID = function() {
        return b
    };
    g.getFigure = function() {
        return h
    };
    g.getLocation = function() {
        return {
            left: parseInt(h.style.left.replace("px", "")),
            bottom: parseInt(h.style.bottom.replace("px", "")),
            side: h.getAttribute("rel")
        }
    };
    g.bark = function() {
        if (f.length >= e) {
            return false
        }
        var m = b + "-statement-" + k;
        k++;
        var o = document.createElement("div");
        o.style.display = "inline-block";
        o.setAttribute("id", m);
        o.innerHTML = dataminer.getSentence();
        f.push(m);
        document.body.appendChild(o);
        var n = {
            left: Math.floor(0.075 * window.innerWidth),
            right: Math.floor((0.925 * window.innerWidth) - o.clientWidth)
        };
        var l = {
            bottom: Math.floor(0.075 * window.innerHeight),
            top: Math.floor((0.925 * window.innerHeight) - o.clientHeight)
        };
        o.style.position = "fixed";
        o.style.bottom = util.random(l.bottom, l.top) + "px";
        o.style.left = util.random(n.left, n.right) + "px";
        o.style.zIndex = 999999;
        o.style.opacity = 1;
        o.style.fontSize = "2.75em";
        o.style.textShadow = "-2px 0px 2px rgba(0, 0, 0, 1)";
        o.style.fontFamily = "Comic Sans MS";
        o.style.color = "rgb(" + util.random(0, 255) + "," + util.random(0, 255) + "," + util.random(0, 255) + ")";
        var d = util.random(300, 1000);
        setTimeout(function() {
            animation.fadeOut(m, 1);
            setTimeout(function() {
                f.splice(f.indexOf(m), 1)
            }, d)
        }, d)
    };
    g.plz = function() {
        if (Math.random() < 0.33) {
            g.turnAround()
        }
        if (Math.random() < 0.5) {
            var d = util.random(500, 1000);
            g.run(d)
        } else {
            g.hide()
        }
    };
    g.hide = function() {
        var d = function() {
            setTimeout(function() {
                g.teleport(true);
                g.ambush()
            }, util.random(0, 2500))
        };
        animation.hide(this, d)
    };
    g.teleport = function(n) {
        var m = ["top", "bottom", "left", "right"];
        var l = m[util.random(0, m.length - 1)];
        h.setAttribute("rel", l);
        if (n == null) {
            n = false
        }
        if (l == "top") {
            util.flipElement(h, 180);
            var d = (n) ? window.innerHeight : (window.innerHeight - h.clientHeight);
            h.style.bottom = d + "px";
            h.style.left = util.random(0, window.innerWidth - h.clientWidth) + "px"
        } else {
            if (l == "bottom") {
                util.flipElement(h, 0);
                var d = (n) ? -h.clientHeight : 0;
                h.style.bottom = d + "px";
                h.style.left = util.random(0, window.innerWidth - h.clientWidth) + "px"
            } else {
                if (l == "left") {
                    util.flipElement(h, 90);
                    h.style.bottom = util.random(0, window.innerHeight - h.clientWidth) + "px";
                    var o = (n) ? -h.clientHeight : 0;
                    h.style.left = o + "px"
                } else {
                    if (l == "right") {
                        util.flipElement(h, 270);
                        h.style.bottom = util.random(0, window.innerHeight - h.clientWidth) + "px";
                        var o = (n) ? window.innerWidth : (window.innerWidth - h.clientHeight);
                        h.style.left = o + "px"
                    }
                }
            }
        }
    };
    g.ambush = function() {
        var d = function() {
            setTimeout(function() {
                g.plz()
            }, util.random(0, 2500))
        };
        animation.ambush(this, d)
    };
    g.run = function(d) {
        animation.run(this, d, function() {
            g.plz()
        })
    };
    g.escape = function() {
        h.parentNode.removeChild(h);
        e = 0
    };
    g.getDirection = function() {
        return j
    };
    g.turnAround = function() {
        if (j == "right") {
            h.src = c.left;
            j = "left"
        } else {
            h.src = c.right;
            j = "right"
        }
    };
    return g
};
var controller = (function() {
    var d = {};
    var b = [];
    var a = 1;
    d.buyDoge = function() {
        var c = new doge(a++);
        var e = util.random(500, 1000);
        c.run(e);
        b.push(c)
    };
    d.sellDoge = function() {
        if (b.length == 0) {
            return
        }
        var c = b.pop();
        c.escape();
        delete c
    };
    d.getDoges = function() {
        return b
    };
    return d
})();
var keybinds = function(a) {
    switch (a.which) {
        case 43:
            controller.buyDoge();
            break;
        case 45:
            controller.sellDoge();
            break;
        default:
            break
    }
};
document.onkeypress = keybinds;