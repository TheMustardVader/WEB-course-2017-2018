'use strict';
var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (d) {
	return typeof d;
} : function (d) {
	return d && 'function' == typeof Symbol && d.constructor === Symbol && d !== Symbol.prototype ? 'symbol' : typeof d;
};
Array.prototype.forEach || (Array.prototype.forEach = function (d) {
	var e, f;
	if (null == this)
		throw new TypeError('this is null or not defined');
	var g = Object(this), h = g.length >>> 0;
	if ('function' != typeof d)
		throw new TypeError(d + ' is not a function');
	for (1 < arguments.length && (e = arguments[1]), f = 0; f < h;) {
		var j;
		f in g && (j = g[f], d.call(e, j, f, g)), f++;
	}
}), window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = function (d, e) {
	e = e || window;
	for (var f = 0; f < this.length; f++)
		d.call(e, this[f], f, this);
});
var _get = function d(e, f, g) {
		null === e && (e = Function.prototype);
		var h = Object.getOwnPropertyDescriptor(e, f);
		if (h === void 0) {
			var j = Object.getPrototypeOf(e);
			return null === j ? void 0 : d(j, f, g);
		}
		if ('value' in h)
			return h.value;
		var l = h.get;
		return void 0 === l ? void 0 : l.call(g);
	}, _createClass = function () {
		function d(e, f) {
			for (var h, g = 0; g < f.length; g++)
				h = f[g], h.enumerable = h.enumerable || !1, h.configurable = !0, 'value' in h && (h.writable = !0), Object.defineProperty(e, h.key, h);
		}
		return function (e, f, g) {
			return f && d(e.prototype, f), g && d(e, g), e;
		};
	}();
function _possibleConstructorReturn(d, e) {
	if (!d)
		throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
	return e && ('object' === ('undefined' == typeof e ? 'undefined' : _typeof(e)) || 'function' == typeof e) ? e : d;
}
function _inherits(d, e) {
	if ('function' != typeof e && null !== e)
		throw new TypeError('Super expression must either be null or a function, not ' + ('undefined' == typeof e ? 'undefined' : _typeof(e)));
	d.prototype = Object.create(e && e.prototype, {
		constructor: {
			value: d,
			enumerable: !1,
			writable: !0,
			configurable: !0
		}
	}), e && (Object.setPrototypeOf ? Object.setPrototypeOf(d, e) : d.__proto__ = e);
}
function _classCallCheck(d, e) {
	if (!(d instanceof e))
		throw new TypeError('Cannot call a class as a function');
}
function isCalcSupported() {
	var f = document.createElement('div');
	return f.style.cssText = 'width:' + 'calc(10px);', !!f.style.length;
}
var Column = function () {
		function d(e, f) {
			_classCallCheck(this, d), this.x = e, this.w = f, this.h = 0, this.l = 0;
		}
		return _createClass(d, [
			{
				key: 'addRow',
				value: function (f) {
					if (f.style.position = 'absolute', f.style.left = this.x + 'px', 0 < this.h) {
						var g = window.getComputedStyle(f), h = g.marginBottom, j = parseInt(h.slice(0, h.length - 2));
						this.h += j;
					}
					f.style.top = this.h + 'px', this.h += f.offsetHeight, f.style.visibility = 'visible';
				}
			},
			{
				key: 'height',
				value: function () {
					return this.h;
				}
			},
			{
				key: 'left',
				value: function () {
					return this.x;
				}
			}
		]), d;
	}(), ColumnarSet = function () {
		function d(e) {
			if (_classCallCheck(this, d), this.columns = [], this.node = document.getElementById(e), !this.node)
				throw 'Could not construct columnar set. No DOM node with id=\'' + e + '\'.';
			this.node.style.position = 'relative';
		}
		return _createClass(d, [
			{
				key: 'addColumn',
				value: function (f) {
					this.columns.push(f);
				}
			},
			{
				key: 'width',
				value: function () {
					return this.node.offsetWidth;
				}
			},
			{
				key: 'setHeight',
				value: function () {
					var f = null;
					if (this.columns.forEach(function (g) {
							f ? (g.height() > f.height() || g.height() == f.height() && g.left() > f.left()) && (f = g) : f = g;
						}), !f)
						throw 'no columns available to set height';
					else
						this.node.style.height = f.h + 'px';
				}
			}
		]), d;
	}(), OrderedColumnarSet = function (d) {
		function e(f) {
			return _classCallCheck(this, e), _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f));
		}
		return _inherits(e, d), _createClass(e, [{
				key: 'addColumn',
				value: function (g) {
					_get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), 'addColumn', this).call(this, g), this.columns.sort(function (h, j) {
						return h.left() < j.left() ? -1 : h.left() > j.left() ? 1 : 0;
					});
				}
			}]), e;
	}(ColumnarSet), FlatOrderedColumnarSet = function (d) {
		function e(f) {
			return _classCallCheck(this, e), _possibleConstructorReturn(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, f));
		}
		return _inherits(e, d), _createClass(e, [
			{
				key: 'addColumn',
				value: function (g) {
					_get(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), 'addColumn', this).call(this, g);
				}
			},
			{
				key: 'grow',
				value: function (g) {
					if (!isCalcSupported()) {
						var h = 0.95 * document.body.offsetWidth / 3 + 'px';
						g.style.width = h;
						var j = g.getElementsByTagName('img')[0];
						j.style.width = h, j.style.height = h;
					}
					var l = null;
					if (this.columns.forEach(function (m) {
							l ? (m.height() < l.height() || m.height() == l.height() && m.left() < l.left()) && (l = m) : l = m;
						}), !l)
						throw 'no columns available to grow';
					else
						l.addRow(g);
				}
			},
			{
				key: 'autofill',
				value: function () {
					var g = this;
					this.node.childNodes.forEach(function (h) {
						switch (h.nodeType) {
						case Node.ELEMENT_NODE:
							g.grow(h);
						}
					}), this.setHeight();
				}
			}
		]), e;
	}(OrderedColumnarSet), ColumnarSetBuilder = function () {
		function d(e) {
			_classCallCheck(this, d), this.cs = new FlatOrderedColumnarSet(e), this.columns = [];
		}
		return _createClass(d, [
			{
				key: 'withFixedPercentSpacing',
				value: function (f) {
					return this.percentSpacing = f, this;
				}
			},
			{
				key: 'withWidthFromSelector',
				value: function (f) {
					var g = this.cs.node.querySelector(f);
					if (!g)
						throw 'Could not get width from selector \'' + f + '\'.';
					else {
						if (!isCalcSupported()) {
							var h = 0.95 * document.body.offsetWidth / 3 + 'px';
							g.style.width = h;
							var j = g.getElementsByTagName('img')[0];
							j.style.width = h, j.style.height = h;
						}
						var l = window.getComputedStyle(g).width, m = parseInt(l.slice(0, l.length - 2)), n = Math.floor(this.cs.node.offsetWidth / m), o = (this.cs.node.offsetWidth - m * n) / 2;
						'percentSpacing' in this && (o = this.percentSpacing * this.cs.node.offsetWidth / 100);
						var q = (this.cs.node.offsetWidth - m * n - o * (n - 1)) / 2;
						this.columns.length = 0;
						for (var r = 0; r < n; r += 1)
							this.columns.push(new Column(r * (m + o) + q, m));
					}
					return this;
				}
			},
			{
				key: 'build',
				value: function () {
					var f = this;
					return this.columns.forEach(function (g) {
						f.cs.addColumn(g);
					}), this.cs;
				}
			}
		]), d;
	}(), InfiniteScroll = {};
(function () {
	this.attach = function (e) {
		var f = !1, g = document.getElementById('next');
		if (null != g && g.hasAttribute('href')) {
			g.style.display = 'none';
			var h = debounce(function () {
				if (!f) {
					var j = document.getElementById('next');
					if (null != j && j.hasAttribute('href')) {
						var l = document.body, m = document.documentElement, n = Math.max(l.scrollHeight, l.offsetHeight, m.clientHeight, m.scrollHeight, m.offsetHeight);
						if ((1 + 0.25) * (window.innerHeight + window.scrollY) >= n) {
							f = !0;
							var o = new XMLHttpRequest();
							o.onreadystatechange = function () {
								if (4 == o.readyState) {
									if (200 == o.status) {
										var q = JSON.parse(o.responseText);
										j = document.getElementById('next'), null == j ? window.removeEventListener('scroll', h) : 'nextURL' in q ? j.href = q.nextURL : j.parentNode.removeChild(j), e(q) || window.removeEventListener('scroll', h);
									} else
										window.removeEventListener('scroll', h);
									f = !1;
								}
							}, o.open('GET', j.href, !0), o.setRequestHeader('Accept', 'application/json'), o.send();
						}
					} else
						window.removeEventListener('scroll', h);
				}
			}, 50);
			window.addEventListener('scroll', h);
		}
	};
}.apply(InfiniteScroll));
function debounce(d, e, f) {
	var g;
	return function () {
		var h = this, j = arguments;
		clearTimeout(g), f && !g && d.apply(h, j), g = setTimeout(function () {
			g = null, f || d.apply(h, j);
		}, e);
	};
}
function aev(d, e, f) {
	var g = new XMLHttpRequest();
	g.open('POST', 'https://www.nitch.com/analytics', !0), g.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'), g.send('a=' + encodeURIComponent(e) + '&c=' + encodeURIComponent(f) + '&id=' + encodeURIComponent(d) + '&r=' + encodeURIComponent(document.URL));
}
var cs = null;
window.addEventListener('load', function () {
	var e = document.getElementById('posts');
	null != e && (cs = new ColumnarSetBuilder('posts').withFixedPercentSpacing(1.5).withWidthFromSelector('.grid-item').build(), cs.autofill(), window.onresize = debounce(function () {
		cs = new ColumnarSetBuilder('posts').withFixedPercentSpacing(1.5).withWidthFromSelector('.grid-item').build(), cs.autofill();
	}, 150), InfiniteScroll.attach(function (f) {
		if ('posts' in f && f.posts instanceof Array) {
			var g = document.getElementById('posts');
			if (null == g)
				return;
			var h = [], j = document.createDocumentFragment();
			return f.posts.forEach(function (l) {
				var m = document.createElement('article');
				m.className = 'grid-item', m.style.visibility = 'hidden';
				var n = document.createElement('div'), o = document.createElement('a');
				o.href = l.url, o.target = '_blank';
				var q = document.createElement('img');
				if (q.onload = function () {
						cs.grow(m);
					}, q.src = l.smallImageURL, q.alt = l.caption, o.appendChild(q), n.appendChild(o), 'social' in l) {
					var r = document.createElement('footer');
					r.className = 'social';
					var o = document.createElement('a');
					o.className = 'facebook', o.href = l.social.facebookURL, o.target = '_blank', o.title = 'Share on Facebook', o.onclick = function () {
						aev(l.id, 'click', 'facebook');
					};
					var q = document.createElement('img');
					q.src = '/static/images/facebook.svg', q.alt = 'facebook', o.appendChild(q), r.appendChild(o);
					var o = document.createElement('a');
					o.className = 'twitter', o.href = l.social.twitterURL, o.target = '_blank', o.title = 'Tweet', o.onclick = function () {
						aev(l.id, 'click', 'twitter');
					};
					var q = document.createElement('img');
					q.src = '/static/images/twitter.svg', q.alt = 'facebook', o.appendChild(q), r.appendChild(o);
					var o = document.createElement('a');
					o.className = 'tumblr', o.href = l.social.tumblrURL, o.target = '_blank', o.title = 'Post to Tumblr', o.onclick = function () {
						aev(l.id, 'click', 'tumblr');
					};
					var q = document.createElement('img');
					q.src = '/static/images/tumblr.svg', q.alt = 'facebook', o.appendChild(q), r.appendChild(o);
					var o = document.createElement('a');
					o.className = 'email', o.href = l.social.emailURL, o.target = '_blank', o.title = 'Email', o.onclick = function () {
						aev(l.id, 'click', 'email');
					};
					var q = document.createElement('img');
					q.src = '/static/images/email.svg', q.alt = 'facebook', o.appendChild(q), r.appendChild(o), n.appendChild(r);
				}
				m.appendChild(n);
				var s = document.createElement('p'), t = document.createTextNode(l.caption);
				s.appendChild(t), m.appendChild(s), h.push(m), j.appendChild(m);
			}), g.insertBefore(j, g.querySelector('.next')), !0;
		}
		return !1;
	}));
	var e = document.getElementById('notes');
	null != e && InfiniteScroll.attach(function (f) {
		if ('notes' in f && f.notes instanceof Array) {
			var g = document.getElementById('notes');
			if (null == g)
				return;
			var h = [], j = document.createDocumentFragment();
			return f.notes.forEach(function (l) {
				var m = document.createElement('article');
				m.className = 'note';
				var n = document.createElement('h1'), o = document.createTextNode(l.title);
				if (n.appendChild(o), m.appendChild(n), m.insertAdjacentHTML('beforeend', l.content), 'social' in l) {
					var q = document.createElement('footer');
					q.className = 'social';
					var r = document.createElement('a');
					r.className = 'facebook', r.href = l.social.facebookURL, r.target = '_blank', r.title = 'Share on Facebook', r.onclick = function () {
						aev(l.id, 'click', 'facebook');
					};
					var s = document.createElement('img');
					s.src = '/static/images/facebook.svg', s.alt = 'facebook', r.appendChild(s), q.appendChild(r);
					var r = document.createElement('a');
					r.className = 'twitter', r.href = l.social.twitterURL, r.target = '_blank', r.title = 'Tweet', r.onclick = function () {
						aev(l.id, 'click', 'twitter');
					};
					var s = document.createElement('img');
					s.src = '/static/images/twitter.svg', s.alt = 'facebook', r.appendChild(s), q.appendChild(r);
					var r = document.createElement('a');
					r.className = 'tumblr', r.href = l.social.tumblrURL, r.target = '_blank', r.title = 'Post to Tumblr', r.onclick = function () {
						aev(l.id, 'click', 'tumblr');
					};
					var s = document.createElement('img');
					s.src = '/static/images/tumblr.svg', s.alt = 'facebook', r.appendChild(s), q.appendChild(r);
					var r = document.createElement('a');
					r.className = 'email', r.href = l.social.emailURL, r.target = '_blank', r.title = 'Email', r.onclick = function () {
						aev(l.id, 'click', 'email');
					};
					var s = document.createElement('img');
					s.src = '/static/images/email.svg', s.alt = 'facebook', r.appendChild(s), q.appendChild(r), m.appendChild(q);
				}
				h.push(m), j.appendChild(m);
			}), g.insertBefore(j, g.querySelector('.next')), !0;
		}
		return !1;
	});
});