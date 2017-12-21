window.AlipayH5Share && window.AlipayH5Share.online || function () {
	var e = {};
	e.online = !0;
	var t, n = {
			title: "",
			imgUrl: "",
			link: "",
			desc: "",
			fromMeta: !1,
			ready: !1
		},
		i = {
			title: !1,
			link: !1,
			imgUrl: !1,
			desc: !1
		},
		r = {
			init: function (e) {
				var t = this;
				t.strict = "undefined" == typeof e || !!e, t.collectLink(), t.collectTitle(), t.collectDesc(), t.collectThumbnail()
			},
			collectLink: function () {
				var e = this,
					t = document.querySelector('meta[name="Alipay:link"]');
				t && t.getAttribute("content") && (n.fromMeta = !0, n.link = t.getAttribute("content")), i.link = !0, e.collectReady()
			},
			collectTitle: function () {
				var e = this,
					t = document.querySelector('meta[name="Alipay:title"]');
				if (t && t.getAttribute("content")) i.title = !0, n.title = t.getAttribute("content"), n.fromMeta = !0, e.collectReady();
				else if ("mp.weixin.qq.com" === window.location.hostname && "undefined" != typeof msg_title && msg_title) i.title = !0, n.title = e.htmlDecode(msg_title), e.collectReady();
				else if (document.title && "" !== document.title.trim()) n.title = e.contentTidy(document.title), i.title = !0, e.collectReady();
				else if (document.getElementsByTagName("H1").length > 0 && document.getElementsByTagName("H1")[0].textContent.length > 0) {
					var r = e.nodeStrFliter(document.getElementsByTagName("H1")[0]);
					e.getStrLen(r) <= 64 && r.length > 0 && (n.title = r, i.title = !0, e.collectReady())
				}
			},
			collectThumbnail: function () {
				var e = this,
					r = document.querySelector('meta[name="Alipay:imgUrl"]');
				if (r && r.getAttribute("content")) i.imgUrl = !0, n.imgUrl = e.getAbsoluteUrl(r.getAttribute("content")), n.fromMeta = !0, e.collectReady();
				else if ("mp.weixin.qq.com" === window.location.hostname && "undefined" != typeof msg_cdn_url && msg_cdn_url.match(/^http(s?):\/\/.*$/g)) i.imgUrl = !0, n.imgUrl = msg_cdn_url, e.collectReady();
				else if (i.imgUrl = !1, e.collectReady(), t = Array.prototype.slice.call(document.images), e.findImgUrl(1e4, 128e4), e.strict || ("" == n.imgUrl && e.findImgUrl(2500, 1e4), "" == n.imgUrl && e.findImgUrl(1024, 2500)), "" == n.imgUrl) {
					var l = document.querySelector('link[type="image/x-icon"]');
					l && l.getAttribute("href") && (i.imgUrl = !0, n.imgUrl = e.getAbsoluteUrl(l.getAttribute("href")), e.collectReady())
				}
			},
			findImgUrl: function (e, l) {
				var o = r;
				if (0 === t.length) return i.imgUrl = !0, void o.collectReady();
				var c = 99999,
					d = 99999;
				if (t.length > 0 && !i.imgUrl)
					for (var a = 0; a < t.length; a++) {
						var u = t[a];
						o.isHidden(u) || o.isBanner(u) || o.isBase64(u) || (u.complete || u.natureWidth) && u.naturalHeight * u.naturalWidth >= e && u.naturalHeight * u.naturalWidth < l && (u.y > 60 && u.y < c || u.y <= 60 && u.y > c || u.y === c && u.x < d) && (n.imgUrl = u.src, c = u.y || 0, d = u.x || 0, i.imgUrl = !0, o.collectReady())
					}
			},
			collectDesc: function () {
				var e = this,
					t = document.querySelector('meta[name="Alipay:desc"]');
				if (t && t.getAttribute("content") && (i.desc = !0, n.desc = t.getAttribute("content"), n.fromMeta = !0, e.collectReady()), !i.desc && "mp.weixin.qq.com" === window.location.hostname && "undefined" != typeof msg_desc && msg_desc && (i.desc = !0, n.desc = e.htmlDecode(msg_desc), e.collectReady()), i.desc || e.tarvelPtags(50, 2e3), i.desc || e.tarvelPtags(20, 50), i.desc || e.travelDocument(document.body, 50, 2e3), !i.desc) {
					var r = document.querySelector('meta[name="description"]');
					r && r.getAttribute("content") && (n.desc = e.contentTidy(r.getAttribute("content")), n.fromMeta = !0, i.desc = !0, e.collectReady())
				}
				if (e.strict || (i.desc || e.travelDocument(document.body, 20, 50), i.desc || e.tarvelPtags(10, 20), i.desc || e.travelDocument(document.body, 10, 20)), !i.desc) {
					var l = window.location.hostname;
					void 0 != l && "" != l && (n.desc = l, i.desc = !0, e.collectReady())
				}
				var o = window.location.href,
					c = n.desc ? n.desc : "",
					d = 280 - e.getStrLen(o);
				d <= e.getStrLen(c) && d >= 0 && (c = e.cutStr(c, Math.floor(d / 2))), n.desc = c
			},
			collectReady: function () {
				i.title && i.imgUrl && i.link && i.desc && (n.ready = !0)
			},
			tarvelPtags: function (e, t) {
				var r = this,
					l = Array.prototype.slice.call(document.getElementsByTagName("P"));
				if (l.length > 0)
					for (var o = 0; o < l.length; o++) {
						var c = l[o];
						if ("undefined" != typeof c && "Debug" != c.id && !r.isHidden(c)) {
							var d = c.textContent;
							if (r.getStrLen(d) >= e && r.getStrLen(d) < t && (d = r.nodeStrFliter(c, !1)), r.getStrLen(d) >= e && r.getStrLen(d) < t && (n.desc = d, i.desc = !0, r.collectReady()), i.desc) break
						}
					}
			},
			travelDocument: function (e, t, r) {
				if (void 0 != e && e.hasChildNodes()) {
					var l = this,
						o = e.childNodes;
					if (o && o.length > 0)
						for (var c = 0; c < o.length; c++) {
							var d = o[c];
							if ("undefined" != typeof d) {
								switch (d.nodeType) {
								case 1:
									l.isHidden(d) || "P" != d.nodeName && "SCRIPT" != d.nodeName && "STYLE" != d.nodeName && "AUDIO" != d.nodeName && "VIDEO" != d.nodeName && l.travelDocument(d, t, r);
									break;
								case 3:
									var a = d.nodeValue;
									l.getStrLen(a) >= t && l.getStrLen(a) < r && (a = l.contentTidy(a)), l.getStrLen(a) >= t && l.getStrLen(a) <= r && (n.desc = a, i.desc = !0, l.collectReady())
								}
								if (i.desc) break
							}
						}
				}
			},
			getStrLen: function (e) {
				return e.replace(/[^\x00-\xff]/g, "xx").length
			},
			cutStr: function (e, t) {
				for (var n = 0, i = 0; i < e.length; i++) {
					var r = e.charAt(i);
					if (n += encodeURI(r).length > 2 ? 1 : .5, n >= t) {
						var l = n == t ? i + 1 : i;
						return e.substr(0, l)
					}
				}
			},
			getAbsoluteUrl: function (e) {
				var t = document.createElement("A");
				return t.href = e, e = t.href
			},
			getCurrentStyle: function (e, t) {
				return window.getComputedStyle ? window.getComputedStyle(e, null).getPropertyValue(t) : e.currentStyle ? e.currentStyle[t] : null
			},
			isHidden: function (e) {
				var t = r,
					n = void 0 != e && void 0 != e.nodeType && "1" == e.nodeType && ("none" == t.getCurrentStyle(e, "display") || "hidden" == t.getCurrentStyle(e, "visibility"));
				return !!n || void 0 != e.parentNode && t.isHidden(e.parentNode)
			},
			isBanner: function (e) {
				var t = r,
					n = void 0 != e && void 0 != e.nodeType && "1" == e.nodeType && t.matchKeyword([e.className, e.id], ["banner", "baner"]);
				return !!n || void 0 != e.parentNode && t.isBanner(e.parentNode)
			},
			isBase64: function (e) {
				var t = r,
					n = void 0 != e && void 0 != e.nodeType && "1" == e.nodeType && 0 !== e.src.indexOf("http");
				return !!n || void 0 != e.parentNode && t.isBanner(e.parentNode)
			},
			matchKeyword: function (e, t) {
				e = e || [], t = t || [];
				for (var n = 0; n < e.length; n++)
					for (var i = 0; i < t.length; i++)
						if ((e[n] || "").indexOf(t[i]) > -1) return !0;
				return !1
			},
			getType: function (e) {
				return Object.prototype.toString.call(e).replace(/\[object (\w+)\]/, "$1").toLowerCase()
			},
			htmlDecode: function (e) {
				var t = document.createElement("div");
				return t.innerHTML = e, t.innerText || t.textContent
			},
			nodeStrFliter: function (e, t) {
				t = t || !0;
				var n = this,
					i = e.cloneNode(!0);
				return t && Array.prototype.forEach.call(i.querySelectorAll("img[alt]"), function (e) {
					e.parentNode.replaceChild(document.createTextNode(e.alt), e)
				}), Array.prototype.forEach.call(i.querySelectorAll("script,style,link"), function (e) {
					e.parentNode.replaceChild(document.createTextNode(""), e)
				}), i = n.contentTidy(i.textContent)
			},
			contentTidy: function (e) {
				return e.replace(/\s{4}/g, " ").replace(/(\r|\n)/g, "").trim()
			}
		};
	e.getShareContent = function (e) {
		return e = "undefined" == typeof e || !!e, r.init(e), JSON.stringify(n)
	}, document.addEventListener("JSPlugin_AlipayH5Share", function (e) {
		var t = "undefined" == typeof e.strict || !!e.strict;
		window.AlipayJSBridge && e.clientId && (r.init(t), window.AlipayJSBridge && e.clientId && setTimeout(function () {
			r.init(t), AlipayJSBridge.callback(e.clientId, n)
		}, 0), AlipayJSBridge.callback(e.clientId, n))
	}), window.AlipayH5Share = e
}();
