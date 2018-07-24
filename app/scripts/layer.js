/*! layer-v3.0.3 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */ ! function(e, t) {
	"use strict";
	var i, n, a = e.layui && layui.define,
		o = {
			getPath: function() {
				var e = document.scripts,
					t = e[e.length - 1],
					i = t.src;
				if(!t.getAttribute("merge")) return i.substring(0, i.lastIndexOf("/") + 1)
			}(),
			config: {},
			end: {},
			minIndex: 0,
			minLeft: [],
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			type: ["dialog", "page", "iframe", "loading", "tips"]
		},
		r = {
			v: "3.0.3",
			ie: function() {
				var t = navigator.userAgent.toLowerCase();
				return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11")
			}(),
			index: e.layer && e.layer.v ? 1e5 : 0,
			path: o.getPath,
			config: function(e, t) {
				return e = e || {}, r.cache = o.config = i.extend({}, o.config, e), r.path = o.config.path || r.path, "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && r.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : r.link("skin/" + e.extend), this) : this
			},
			link: function(t, n, a) {
				if(r.path) {
					var o = i("head")[0],
						s = document.createElement("link");
					"string" == typeof n && (a = n);
					var l = (a || t).replace(/\.|\//g, ""),
						f = "layuicss-" + l,
						c = 0;
					s.rel = "stylesheet", s.href = r.path + t, s.id = f, i("#" + f)[0] || o.appendChild(s), "function" == typeof n && ! function u() {
						return ++c > 80 ? e.console && console.error("layer.css: Invalid") : void(1989 === parseInt(i("#" + f).css("width")) ? n() : setTimeout(u, 100))
					}()
				}
			},
			ready: function(e) {
				var t = "skinlayercss",
					i = "303";
				return a ? layui.addcss("../styles/layer.css?v=" + r.v + i, e, t) : r.link("../styles/layer.css?v=" + r.v + i, e, t), this
			},
			alert: function(e, t, n) {
				var a = "function" == typeof t;
				return a && (n = t), r.open(i.extend({
					content: e,
					yes: n
				}, a ? {} : t))
			},
			confirm: function(e, t, n, a) {
				var s = "function" == typeof t;
				return s && (a = n, n = t), r.open(i.extend({
					content: e,
					btn: o.btn,
					yes: n,
					btn2: a
				}, s ? {} : t))
			},
			msg: function(e, n, a) {
				var s = "function" == typeof n,
					f = o.config.skin,
					c = (f ? f + " " + f + "-msg" : "") || "layui-layer-msg",
					u = l.anim.length - 1;
				return s && (a = n), r.open(i.extend({
					content: e,
					time: 3e3,
					shade: !1,
					skin: c,
					title: !1,
					closeBtn: !1,
					btn: !1,
					resize: !1,
					end: a
				}, s && !o.config.skin ? {
					skin: c + " layui-layer-hui",
					anim: u
				} : function() {
					return n = n || {}, (n.icon === -1 || n.icon === t && !o.config.skin) && (n.skin = c + " " + (n.skin || "layui-layer-hui")), n
				}()))
			},
			load: function(e, t) {
				return r.open(i.extend({
					type: 3,
					icon: e || 0,
					resize: !1,
					shade: .01
				}, t))
			},
			tips: function(e, t, n) {
				return r.open(i.extend({
					type: 4,
					content: [e, t],
					closeBtn: !1,
					time: 3e3,
					shade: !1,
					resize: !1,
					fixed: !1,
					maxWidth: 210
				}, n))
			}
		},
		s = function(e) {
			var t = this;
			t.index = ++r.index, t.config = i.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function() {
				t.creat()
			}, 30)
		};
	s.pt = s.prototype;
	var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
	l.anim = ["layer-anim", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], s.pt.config = {
		type: 0,
		shade: .3,
		fixed: !0,
		move: l[1],
		title: "&#x4FE1;&#x606F;",
		offset: "auto",
		area: "auto",
		closeBtn: 1,
		time: 0,
		zIndex: 19891014,
		maxWidth: 360,
		anim: 0,
		isOutAnim: !0,
		icon: -1,
		moveType: 1,
		resize: !0,
		scrollbar: !0,
		tips: 2
	}, s.pt.vessel = function(e, t) {
		var n = this,
			a = n.index,
			r = n.config,
			s = r.zIndex + a,
			f = "object" == typeof r.title,
			c = r.maxmin && (1 === r.type || 2 === r.type),
			u = r.title ? '<div class="layui-layer-title" style="' + (f ? r.title[1] : "") + '">' + (f ? r.title[0] : r.title) + "</div>" : "";
		return r.zIndex = s, t([r.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + a + '" times="' + a + '" style="' + ("z-index:" + (s - 1) + "; background-color:" + (r.shade[1] || "#000") + "; opacity:" + (r.shade[0] || r.shade) + "; filter:alpha(opacity=" + (100 * r.shade[0] || 100 * r.shade) + ");") + '"></div>' : "", '<div class="' + l[0] + (" layui-layer-" + o.type[r.type]) + (0 != r.type && 2 != r.type || r.shade ? "" : " layui-layer-border") + " " + (r.skin || "") + '" id="' + l[0] + a + '" type="' + o.type[r.type] + '" times="' + a + '" showtime="' + r.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + r.area[0] + ";height:" + r.area[1] + (r.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != r.type ? "" : u) + '<div id="' + (r.id || "") + '" class="layui-layer-content' + (0 == r.type && r.icon !== -1 ? " layui-layer-padding" : "") + (3 == r.type ? " layui-layer-loading" + r.icon : "") + '">' + (0 == r.type && r.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + r.icon + '"></i>' : "") + (1 == r.type && e ? "" : r.content || "") + '</div><span class="layui-layer-setwin">' + function() {
			var e = c ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
			return r.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (r.title ? r.closeBtn : 4 == r.type ? "1" : "2") + '" href="javascript:;"></a>'), e
		}() + "</span>" + (r.btn ? function() {
			var e = "";
			"string" == typeof r.btn && (r.btn = [r.btn]);
			for(var t = 0, i = r.btn.length; t < i; t++) e += '<a class="' + l[6] + t + '">' + r.btn[t] + "</a>";
			return '<div class="' + l[6] + " layui-layer-btn-" + (r.btnAlign || "") + '">' + e + "</div>"
		}() : "") + (r.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], u, i('<div class="layui-layer-move"></div>')), n
	}, s.pt.creat = function() {
		var e = this,
			t = e.config,
			a = e.index,
			s = t.content,
			f = "object" == typeof s,
			c = i("body");
		if(!t.id || !i("#" + t.id)[0]) {
			switch("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == r.ie && (t.fixed = !1), t.type) {
				case 0:
					t.btn = "btn" in t ? t.btn : o.btn[0], r.closeAll("dialog");
					break;
				case 2:
					var s = t.content = f ? t.content : [t.content, "auto"];
					t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
					break;
				case 3:
					delete t.title, delete t.closeBtn, t.icon === -1 && 0 === t.icon, r.closeAll("loading");
					break;
				case 4:
					f || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', delete t.title, t.tips = "object" == typeof t.tips ? t.tips : [t.tips, !0], t.tipsMore || r.closeAll("tips")
			}
			e.vessel(f, function(n, r, u) {
				c.append(n[0]), f ? function() {
					2 == t.type || 4 == t.type ? function() {
						i("body").append(n[1])
					}() : function() {
						s.parents("." + l[0])[0] || (s.data("display", s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + l[0] + a).find("." + l[5]).before(r))
					}()
				}() : c.append(n[1]), i(".layui-layer-move")[0] || c.append(o.moveElem = u), e.layero = i("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a)
			}).auto(a), 2 == t.type && 6 == r.ie && e.layero.find("iframe").attr("src", s[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function() {
				e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips()
			}), t.time <= 0 || setTimeout(function() {
				r.close(e.index)
			}, t.time), e.move().callback(), l.anim[t.anim] && e.layero.addClass(l.anim[t.anim]), t.isOutAnim && e.layero.data("isOutAnim", !0)
		}
	}, s.pt.auto = function(e) {
		function t(e) {
			e = s.find(e), e.height(f[1] - c - u - 2 * (0 | parseFloat(e.css("padding-top"))))
		}
		var a = this,
			o = a.config,
			s = i("#" + l[0] + e);
		"" === o.area[0] && o.maxWidth > 0 && (r.ie && r.ie < 8 && o.btn && s.width(s.innerWidth()), s.outerWidth() > o.maxWidth && s.width(o.maxWidth));
		var f = [s.innerWidth(), s.innerHeight()],
			c = s.find(l[1]).outerHeight() || 0,
			u = s.find("." + l[6]).outerHeight() || 0;
		switch(o.type) {
			case 2:
				t("iframe");
				break;
			default:
				"" === o.area[1] ? o.fixed && f[1] >= n.height() && (f[1] = n.height(), t("." + l[5])) : t("." + l[5])
		}
		return a
	}, s.pt.offset = function() {
		var e = this,
			t = e.config,
			i = e.layero,
			a = [i.outerWidth(), i.outerHeight()],
			o = "object" == typeof t.offset;
		e.offsetTop = (n.height() - a[1]) / 2, e.offsetLeft = (n.width() - a[0]) / 2, o ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : "auto" !== t.offset && ("t" === t.offset ? e.offsetTop = 0 : "r" === t.offset ? e.offsetLeft = n.width() - a[0] : "b" === t.offset ? e.offsetTop = n.height() - a[1] : "l" === t.offset ? e.offsetLeft = 0 : "lt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = 0) : "lb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = 0) : "rt" === t.offset ? (e.offsetTop = 0, e.offsetLeft = n.width() - a[0]) : "rb" === t.offset ? (e.offsetTop = n.height() - a[1], e.offsetLeft = n.width() - a[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? n.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? n.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += n.scrollTop(), e.offsetLeft += n.scrollLeft()), i.attr("minLeft") && (e.offsetTop = n.height() - (i.find(l[1]).outerHeight() || 0), e.offsetLeft = i.css("left")), i.css({
			top: e.offsetTop,
			left: e.offsetLeft
		})
	}, s.pt.tips = function() {
		var e = this,
			t = e.config,
			a = e.layero,
			o = [a.outerWidth(), a.outerHeight()],
			r = i(t.follow);
		r[0] || (r = i("body"));
		var s = {
				width: r.outerWidth(),
				height: r.outerHeight(),
				top: r.offset().top,
				left: r.offset().left
			},
			f = a.find(".layui-layer-TipsG"),
			c = t.tips[0];
		t.tips[1] || f.remove(), s.autoLeft = function() {
			s.left + o[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - o[0], f.css({
				right: 12,
				left: "auto"
			})) : s.tipLeft = s.left
		}, s.where = [function() {
			s.autoLeft(), s.tipTop = s.top - o[1] - 10, f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", t.tips[1])
		}, function() {
			s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", t.tips[1])
		}, function() {
			s.autoLeft(), s.tipTop = s.top + s.height + 10, f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", t.tips[1])
		}, function() {
			s.tipLeft = s.left - o[0] - 10, s.tipTop = s.top, f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", t.tips[1])
		}], s.where[c - 1](), 1 === c ? s.top - (n.scrollTop() + o[1] + 16) < 0 && s.where[2]() : 2 === c ? n.width() - (s.left + s.width + o[0] + 16) > 0 || s.where[3]() : 3 === c ? s.top - n.scrollTop() + s.height + o[1] + 16 - n.height() > 0 && s.where[0]() : 4 === c && o[0] + 16 - s.left > 0 && s.where[1](), a.find("." + l[5]).css({
			"background-color": t.tips[1],
			"padding-right": t.closeBtn ? "30px" : ""
		}), a.css({
			left: s.tipLeft - (t.fixed ? n.scrollLeft() : 0),
			top: s.tipTop - (t.fixed ? n.scrollTop() : 0)
		})
	}, s.pt.move = function() {
		var e = this,
			t = e.config,
			a = i(document),
			s = e.layero,
			l = s.find(t.move),
			f = s.find(".layui-layer-resize"),
			c = {};
		return t.move && l.css("cursor", "move"), l.on("mousedown", function(e) {
			e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(s.css("left")), e.clientY - parseFloat(s.css("top"))], o.moveElem.css("cursor", "move").show())
		}), f.on("mousedown", function(e) {
			e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [s.outerWidth(), s.outerHeight()], o.moveElem.css("cursor", "se-resize").show()
		}), a.on("mousemove", function(i) {
			if(c.moveStart) {
				var a = i.clientX - c.offset[0],
					o = i.clientY - c.offset[1],
					l = "fixed" === s.css("position");
				if(i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
					var f = n.width() - s.outerWidth() + c.stX,
						u = n.height() - s.outerHeight() + c.stY;
					a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u)
				}
				s.css({
					left: a,
					top: o
				})
			}
			if(t.resize && c.resizeStart) {
				var a = i.clientX - c.offset[0],
					o = i.clientY - c.offset[1];
				i.preventDefault(), r.style(e.index, {
					width: c.area[0] + a,
					height: c.area[1] + o
				}), c.isResize = !0, t.resizing && t.resizing(s)
			}
		}).on("mouseup", function(e) {
			c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(s)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide())
		}), e
	}, s.pt.callback = function() {
		function e() {
			var e = a.cancel && a.cancel(t.index, n);
			e === !1 || r.close(t.index)
		}
		var t = this,
			n = t.layero,
			a = t.config;
		t.openLayer(), a.success && (2 == a.type ? n.find("iframe").on("load", function() {
			a.success(n, t.index)
		}) : a.success(n, t.index)), 6 == r.ie && t.IE6(n), n.find("." + l[6]).children("a").on("click", function() {
			var e = i(this).index();
			if(0 === e) a.yes ? a.yes(t.index, n) : a.btn1 ? a.btn1(t.index, n) : r.close(t.index);
			else {
				var o = a["btn" + (e + 1)] && a["btn" + (e + 1)](t.index, n);
				o === !1 || r.close(t.index)
			}
		}), n.find("." + l[7]).on("click", e), a.shadeClose && i("#layui-layer-shade" + t.index).on("click", function() {
			r.close(t.index)
		}), n.find(".layui-layer-min").on("click", function() {
			var e = a.min && a.min(n);
			e === !1 || r.min(t.index, a)
		}), n.find(".layui-layer-max").on("click", function() {
			i(this).hasClass("layui-layer-maxmin") ? (r.restore(t.index), a.restore && a.restore(n)) : (r.full(t.index, a), setTimeout(function() {
				a.full && a.full(n)
			}, 100))
		}), a.end && (o.end[t.index] = a.end)
	}, o.reselect = function() {
		i.each(i("select"), function(e, t) {
			var n = i(this);
			n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null
		})
	}, s.pt.IE6 = function(e) {
		i("select").each(function(e, t) {
			var n = i(this);
			n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
				layer: "1"
			}).hide(), n = null
		})
	}, s.pt.openLayer = function() {
		var e = this;
		r.zIndex = e.config.zIndex, r.setTop = function(e) {
			var t = function() {
				r.zIndex++, e.css("z-index", r.zIndex + 1)
			};
			return r.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", t), r.zIndex
		}
	}, o.record = function(e) {
		var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
		e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
			area: t
		})
	}, o.rescollbar = function(e) {
		l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"))
	}, e.layer = r, r.getChildFrame = function(e, t) {
		return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e)
	}, r.getFrameIndex = function(e) {
		return i("#" + e).parents("." + l[4]).attr("times")
	}, r.iframeAuto = function(e) {
		if(e) {
			var t = r.getChildFrame("html", e).outerHeight(),
				n = i("#" + l[0] + e),
				a = n.find(l[1]).outerHeight() || 0,
				o = n.find("." + l[6]).outerHeight() || 0;
			n.css({
				height: t + a + o
			}), n.find("iframe").css({
				height: t
			})
		}
	}, r.iframeSrc = function(e, t) {
		i("#" + l[0] + e).find("iframe").attr("src", t)
	}, r.style = function(e, t, n) {
		var a = i("#" + l[0] + e),
			r = a.find(".layui-layer-content"),
			s = a.attr("type"),
			f = a.find(l[1]).outerHeight() || 0,
			c = a.find("." + l[6]).outerHeight() || 0;
		a.attr("minLeft");
		s !== o.type[3] && s !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(), s === o.type[2] ? a.find("iframe").css({
			height: parseFloat(t.height) - f - c
		}) : r.css({
			height: parseFloat(t.height) - f - c - parseFloat(r.css("padding-top")) - parseFloat(r.css("padding-bottom"))
		}))
	}, r.min = function(e, t) {
		var a = i("#" + l[0] + e),
			s = a.find(l[1]).outerHeight() || 0,
			f = a.attr("minLeft") || 181 * o.minIndex + "px",
			c = a.css("position");
		o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), r.style(e, {
			width: 180,
			height: s,
			left: f,
			top: n.height() - s,
			position: "fixed",
			overflow: "hidden"
		}, !0), a.find(".layui-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f)
	}, r.restore = function(e) {
		var t = i("#" + l[0] + e),
			n = t.attr("area").split(",");
		t.attr("type");
		r.style(e, {
			width: parseFloat(n[0]),
			height: parseFloat(n[1]),
			top: parseFloat(n[2]),
			left: parseFloat(n[3]),
			position: t.attr("position"),
			overflow: "visible"
		}, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e)
	}, r.full = function(e) {
		var t, a = i("#" + l[0] + e);
		o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function() {
			var t = "fixed" === a.css("position");
			r.style(e, {
				top: t ? 0 : n.scrollTop(),
				left: t ? 0 : n.scrollLeft(),
				width: n.width(),
				height: n.height()
			}, !0), a.find(".layui-layer-min").hide()
		}, 100)
	}, r.title = function(e, t) {
		var n = i("#" + l[0] + (t || r.index)).find(l[1]);
		n.html(e)
	}, r.close = function(e) {
		var t = i("#" + l[0] + e),
			n = t.attr("type"),
			a = "layer-anim-close";
		if(t[0]) {
			var s = "layui-layer-wrap",
				f = function() {
					if(n === o.type[1] && "object" === t.attr("conType")) {
						t.children(":not(." + l[5] + ")").remove();
						for(var a = t.find("." + s), r = 0; r < 2; r++) a.unwrap();
						a.css("display", a.data("display")).removeClass(s)
					} else {
						if(n === o.type[2]) try {
							var f = i("#" + l[4] + e)[0];
							f.contentWindow.document.write(""), f.contentWindow.close(), t.find("." + l[5])[0].removeChild(f)
						} catch(c) {}
						t[0].innerHTML = "", t.remove()
					}
					"function" == typeof o.end[e] && o.end[e](), delete o.end[e]
				};
			t.data("isOutAnim") && t.addClass(a), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 6 == r.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))), r.ie && r.ie < 10 || !t.data("isOutAnim") ? f() : setTimeout(function() {
				f()
			}, 200)
		}
	}, r.closeAll = function(e) {
		i.each(i("." + l[0]), function() {
			var t = i(this),
				n = e ? t.attr("type") === e : 1;
			n && r.close(t.attr("times")), n = null
		})
	};
	var f = r.cache || {},
		c = function(e) {
			return f.skin ? " " + f.skin + " " + f.skin + "-" + e : ""
		};
	r.prompt = function(e, t) {
		var a = "";
		if(e = e || {}, "function" == typeof e && (t = e), e.area) {
			var o = e.area;
			a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area
		}
		var s, l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + ">" + (e.value || "") + "</textarea>" : function() {
				return '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (e.value || "") + '">'
			}(),
			f = e.success;
		return delete e.success, r.open(i.extend({
			type: 1,
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			content: l,
			skin: "layui-layer-prompt" + c("prompt"),
			maxWidth: n.width(),
			success: function(e) {
				s = e.find(".layui-layer-input"), s.focus(), "function" == typeof f && f(e)
			},
			resize: !1,
			yes: function(i) {
				var n = s.val();
				"" === n ? s.focus() : n.length > (e.maxlength || 500) ? r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", s, {
					tips: 1
				}) : t && t(n, i, s)
			}
		}, e))
	}, r.tab = function(e) {
		e = e || {};
		var t = e.tab || {},
			n = e.success;
		return delete e.success, r.open(i.extend({
			type: 1,
			skin: "layui-layer-tab" + c("tab"),
			resize: !1,
			title: function() {
				var e = t.length,
					i = 1,
					n = "";
				if(e > 0)
					for(n = '<span class="layui-layer-tabnow">' + t[0].title + "</span>"; i < e; i++) n += "<span>" + t[i].title + "</span>";
				return n
			}(),
			content: '<ul class="layui-layer-tabmain">' + function() {
				var e = t.length,
					i = 1,
					n = "";
				if(e > 0)
					for(n = '<li class="layui-layer-tabli xubox_tab_layer">' + (t[0].content || "no content") + "</li>"; i < e; i++) n += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
				return n
			}() + "</ul>",
			success: function(t) {
				var a = t.find(".layui-layer-title").children(),
					o = t.find(".layui-layer-tabmain").children();
				a.on("mousedown", function(t) {
					t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
					var n = i(this),
						a = n.index();
					n.addClass("layui-layer-tabnow").siblings().removeClass("layui-layer-tabnow"), o.eq(a).show().siblings().hide(), "function" == typeof e.change && e.change(a)
				}), "function" == typeof n && n(t)
			}
		}, e))
	}, r.photos = function(t, n, a) {
		function o(e, t, i) {
			var n = new Image;
			return n.src = e, n.complete ? t(n) : (n.onload = function() {
				n.onload = null, t(n)
			}, void(n.onerror = function(e) {
				n.onerror = null, i(e)
			}))
		}
		var s = {};
		if(t = t || {}, t.photos) {
			var l = t.photos.constructor === Object,
				f = l ? t.photos : {},
				u = f.data || [],
				d = f.start || 0;
			s.imgIndex = (0 | d) + 1, t.img = t.img || "img";
			var y = t.success;
			if(delete t.success, l) {
				if(0 === u.length) return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
			} else {
				var p = i(t.photos),
					h = function() {
						u = [], p.find(t.img).each(function(e) {
							var t = i(this);
							t.attr("layer-index", e), u.push({
								alt: t.attr("alt"),
								pid: t.attr("layer-pid"),
								src: t.attr("layer-src") || t.attr("src"),
								thumb: t.attr("src")
							})
						})
					};
				if(h(), 0 === u.length) return;
				if(n || p.on("click", t.img, function() {
						var e = i(this),
							n = e.attr("layer-index");
						r.photos(i.extend(t, {
							photos: {
								start: n,
								data: u,
								tab: t.tab
							},
							full: t.full
						}), !0), h()
					}), !n) return
			}
			s.imgprev = function(e) {
				s.imgIndex--, s.imgIndex < 1 && (s.imgIndex = u.length), s.tabimg(e)
			}, s.imgnext = function(e, t) {
				s.imgIndex++, s.imgIndex > u.length && (s.imgIndex = 1, t) || s.tabimg(e)
			}, s.keyup = function(e) {
				if(!s.end) {
					var t = e.keyCode;
					e.preventDefault(), 37 === t ? s.imgprev(!0) : 39 === t ? s.imgnext(!0) : 27 === t && r.close(s.index)
				}
			}, s.tabimg = function(e) {
				if(!(u.length <= 1)) return f.start = s.imgIndex - 1, r.close(s.index), r.photos(t, !0, e)
			}, s.event = function() {
				s.bigimg.hover(function() {
					s.imgsee.show()
				}, function() {
					s.imgsee.hide()
				}), s.bigimg.find(".layui-layer-imgprev").on("click", function(e) {
					e.preventDefault(), s.imgprev()
				}), s.bigimg.find(".layui-layer-imgnext").on("click", function(e) {
					e.preventDefault(), s.imgnext()
				}), i(document).on("keyup", s.keyup)
			}, s.loadi = r.load(1, {
				shade: !("shade" in t) && .9,
				scrollbar: !1
			}), o(u[d].src, function(n) {
				r.close(s.loadi), s.index = r.open(i.extend({
					type: 1,
					id: "layui-layer-photos",
					area: function() {
						var a = [n.width, n.height],
							o = [i(e).width() - 100, i(e).height() - 100];
						if(!t.full && (a[0] > o[0] || a[1] > o[1])) {
							var r = [a[0] / o[0], a[1] / o[1]];
							r[0] > r[1] ? (a[0] = a[0] / r[0], a[1] = a[1] / r[0]) : r[0] < r[1] && (a[0] = a[0] / r[1], a[1] = a[1] / r[1])
						}
						return [a[0] + "px", a[1] + "px"]
					}(),
					title: !1,
					shade: .9,
					shadeClose: !0,
					closeBtn: !1,
					move: ".layui-layer-phimg img",
					moveType: 1,
					scrollbar: !1,
					moveOut: !0,
					isOutAnim: !1,
					skin: "layui-layer-photos" + c("photos"),
					content: '<div class="layui-layer-phimg"><img src="' + u[d].src + '" alt="' + (u[d].alt || "") + '" layer-pid="' + u[d].pid + '"><div class="layui-layer-imgsee">' + (u.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (u[d].alt || "") + "</a><em>" + s.imgIndex + "/" + u.length + "</em></span></div></div></div>",
					success: function(e, i) {
						s.bigimg = e.find(".layui-layer-phimg"), s.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), s.event(e), t.tab && t.tab(u[d], e), "function" == typeof y && y(e)
					},
					end: function() {
						s.end = !0, i(document).off("keyup", s.keyup)
					}
				}, t))
			}, function() {
				r.close(s.loadi), r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
					time: 3e4,
					btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
					yes: function() {
						u.length > 1 && s.imgnext(!0, !0)
					}
				})
			})
		}
	}, o.run = function(t) {
		i = t, n = i(e), l.html = i("html"), r.open = function(e) {
			var t = new s(e);
			return t.index
		}
	}, e.layui && layui.define ? (r.ready(), layui.define("jquery", function(t) {
		r.path = layui.cache.dir, o.run(layui.jquery), e.layer = r, t("layer", r)
	})) : "function" == typeof define && define.amd ? define(["jquery"], function() {
		return o.run(e.jQuery), r
	}) : function() {
		o.run(e.jQuery), r.ready()
	}()
}(window);
/*! ng-dialog - v1.2.0 (https://github.com/likeastore/ngDialog) */
! function(a, b) {
	"undefined" != typeof module && module.exports ? (b("undefined" == typeof angular ? require("angular") : angular), module.exports = "ngDialog") : "function" == typeof define && define.amd ? define(["angular"], b) : b(a.angular)
}(this, function(a) {
	"use strict";
	var b = a.module("ngDialog", []),
		c = a.element,
		d = a.isDefined,
		e = (document.body || document.documentElement).style,
		f = d(e.animation) || d(e.WebkitAnimation) || d(e.MozAnimation) || d(e.MsAnimation) || d(e.OAnimation),
		g = "animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend",
		h = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",
		i = "ngdialog-disabled-animation",
		j = {
			html: !1,
			body: !1
		},
		k = {},
		l = [],
		m = [],
		n = !1,
		o = !1,
		p = [],
		q = "legacy",
		r = "1.0.0+";
	return b.provider("ngDialog", function() {
		var b = this.defaults = {
			className: "ngdialog-theme-default",
			appendClassName: "",
			disableAnimation: !1,
			plain: !1,
			showClose: !0,
			closeByDocument: !0,
			closeByEscape: !0,
			closeByNavigation: !1,
			appendTo: !1,
			preCloseCallback: !1,
			onOpenCallback: !1,
			overlay: !0,
			cache: !0,
			trapFocus: !0,
			preserveFocus: !0,
			ariaAuto: !0,
			ariaRole: null,
			ariaLabelledById: null,
			ariaLabelledBySelector: null,
			ariaDescribedById: null,
			ariaDescribedBySelector: null,
			bodyClassName: "ngdialog-open",
			width: null,
			height: null
		};
		this.setForceHtmlReload = function(a) {
			j.html = a || !1
		}, this.setForceBodyReload = function(a) {
			j.body = a || !1
		}, this.setDefaults = function(c) {
			a.extend(b, c)
		}, this.setOpenOnePerName = function(a) {
			o = a || !1
		};
		var d, e = 0,
			s = 0,
			t = {};
		this.$get = ["$document", "$templateCache", "$compile", "$q", "$http", "$rootScope", "$timeout", "$window", "$controller", "$injector", function(u, v, w, x, y, z, A, B, C, D) {
			var E = [],
				F = {
					onDocumentKeydown: function(a) {
						27 === a.keyCode && G.close("$escape")
					},
					activate: function(a) {
						var b = a.data("$ngDialogOptions");
						b.trapFocus && (a.on("keydown", F.onTrapFocusKeydown), E.body.on("keydown", F.onTrapFocusKeydown))
					},
					deactivate: function(a) {
						a.off("keydown", F.onTrapFocusKeydown), E.body.off("keydown", F.onTrapFocusKeydown)
					},
					deactivateAll: function(b) {
						a.forEach(b, function(b) {
							var c = a.element(b);
							F.deactivate(c)
						})
					},
					setBodyPadding: function(a) {
						var b = parseInt(E.body.css("padding-right") || 0, 10);
						E.body.css("padding-right", b + a + "px"), E.body.data("ng-dialog-original-padding", b), z.$broadcast("ngDialog.setPadding", a)
					},
					resetBodyPadding: function() {
						var a = E.body.data("ng-dialog-original-padding");
						a ? E.body.css("padding-right", a + "px") : E.body.css("padding-right", ""), z.$broadcast("ngDialog.setPadding", 0)
					},
					performCloseDialog: function(a, b) {
						var c = a.data("$ngDialogOptions"),
							e = a.attr("id"),
							h = k[e];
						if(F.deactivate(a), h) {
							if("undefined" != typeof B.Hammer) {
								var i = h.hammerTime;
								i.off("tap", d), i.destroy && i.destroy(), delete h.hammerTime
							} else a.unbind("click");
							1 === s && E.body.unbind("keydown", F.onDocumentKeydown), a.hasClass("ngdialog-closing") || (s -= 1);
							var j = a.data("$ngDialogPreviousFocus");
							j && j.focus && j.focus(), z.$broadcast("ngDialog.closing", a, b), s = s < 0 ? 0 : s, f && !c.disableAnimation ? (h.$destroy(), a.unbind(g).bind(g, function() {
								F.closeDialogElement(a, b)
							}).addClass("ngdialog-closing")) : (h.$destroy(), F.closeDialogElement(a, b)), t[e] && (t[e].resolve({
								id: e,
								value: b,
								$dialog: a,
								remainingDialogs: s
							}), delete t[e]), k[e] && delete k[e], l.splice(l.indexOf(e), 1), l.length || (E.body.unbind("keydown", F.onDocumentKeydown), n = !1), 0 == s && (d = void 0)
						}
					},
					closeDialogElement: function(a, b) {
						var c = a.data("$ngDialogOptions");
						a.remove(), m.splice(m.indexOf(c.bodyClassName), 1), m.indexOf(c.bodyClassName) === -1 && (E.html.removeClass(c.bodyClassName), E.body.removeClass(c.bodyClassName)), 0 === s && F.resetBodyPadding(), z.$broadcast("ngDialog.closed", a, b)
					},
					closeDialog: function(b, c) {
						var d = b.data("$ngDialogPreCloseCallback");
						if(d && a.isFunction(d)) {
							var e = d.call(b, c);
							if(a.isObject(e)) e.closePromise ? e.closePromise.then(function() {
								F.performCloseDialog(b, c)
							}, function() {
								return !1
							}) : e.then(function() {
								F.performCloseDialog(b, c)
							}, function() {
								return !1
							});
							else {
								if(e === !1) return !1;
								F.performCloseDialog(b, c)
							}
						} else F.performCloseDialog(b, c)
					},
					onTrapFocusKeydown: function(b) {
						var c, d = a.element(b.currentTarget);
						if(d.hasClass("ngdialog")) c = d;
						else if(c = F.getActiveDialog(), null === c) return;
						var e = 9 === b.keyCode,
							f = b.shiftKey === !0;
						e && F.handleTab(c, b, f)
					},
					handleTab: function(a, b, c) {
						var d = F.getFocusableElements(a);
						if(0 === d.length) return void(document.activeElement && document.activeElement.blur && document.activeElement.blur());
						var e = document.activeElement,
							f = Array.prototype.indexOf.call(d, e),
							g = f === -1,
							h = 0 === f,
							i = f === d.length - 1,
							j = !1;
						c ? (g || h) && (d[d.length - 1].focus(), j = !0) : (g || i) && (d[0].focus(), j = !0), j && (b.preventDefault(), b.stopPropagation())
					},
					autoFocus: function(a) {
						var b = a[0],
							d = b.querySelector("*[autofocus]");
						if(null === d || (d.focus(), document.activeElement !== d)) {
							var e = F.getFocusableElements(a);
							if(e.length > 0) return void e[0].focus();
							var f = F.filterVisibleElements(b.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span"));
							if(f.length > 0) {
								var g = f[0];
								c(g).attr("tabindex", "-1").css("outline", "0"), g.focus()
							}
						}
					},
					getFocusableElements: function(a) {
						var b = a[0],
							c = b.querySelectorAll(h),
							d = F.filterTabbableElements(c);
						return F.filterVisibleElements(d)
					},
					filterTabbableElements: function(a) {
						for(var b = [], d = 0; d < a.length; d++) {
							var e = a[d];
							"-1" !== c(e).attr("tabindex") && b.push(e)
						}
						return b
					},
					filterVisibleElements: function(a) {
						for(var b = [], c = 0; c < a.length; c++) {
							var d = a[c];
							(d.offsetWidth > 0 || d.offsetHeight > 0) && b.push(d)
						}
						return b
					},
					getActiveDialog: function() {
						var a = document.querySelectorAll(".ngdialog");
						return 0 === a.length ? null : c(a[a.length - 1])
					},
					applyAriaAttributes: function(a, b) {
						if(b.ariaAuto) {
							if(!b.ariaRole) {
								var c = F.getFocusableElements(a).length > 0 ? "dialog" : "alertdialog";
								b.ariaRole = c
							}
							b.ariaLabelledBySelector || (b.ariaLabelledBySelector = "h1,h2,h3,h4,h5,h6"), b.ariaDescribedBySelector || (b.ariaDescribedBySelector = "article,section,p")
						}
						b.ariaRole && a.attr("role", b.ariaRole), F.applyAriaAttribute(a, "aria-labelledby", b.ariaLabelledById, b.ariaLabelledBySelector), F.applyAriaAttribute(a, "aria-describedby", b.ariaDescribedById, b.ariaDescribedBySelector)
					},
					applyAriaAttribute: function(a, b, d, e) {
						if(d) return void a.attr(b, d);
						if(e) {
							var f = a.attr("id"),
								g = a[0].querySelector(e);
							if(!g) return;
							var h = f + "-" + b;
							return c(g).attr("id", h), a.attr(b, h), h
						}
					},
					detectUIRouter: function() {
						return D.has("$transitions") ? r : !!D.has("$state") && q
					},
					getRouterLocationEventName: function() {
						return F.detectUIRouter() ? "$stateChangeStart" : "$locationChangeStart"
					}
				},
				G = {
					__PRIVATE__: F,
					open: function(f) {
						function g(b, c) {
							var c = c || {};
							return c.headers = c.headers || {}, a.extend(c.headers, {
								Accept: "text/html"
							}), z.$broadcast("ngDialog.templateLoading", b), y.get(b, c).then(function(a) {
								return z.$broadcast("ngDialog.templateLoaded", b), a.data || ""
							})
						}

						function h(b) {
							return b ? a.isString(b) && q.plain ? b : "boolean" != typeof q.cache || q.cache ? g(b, {
								cache: v
							}) : g(b, {
								cache: !1
							}) : "Empty template"
						}
						var j = null;
						if(f = f || {}, !(o && f.name && (j = f.name.toLowerCase().replace(/\s/g, "-") + "-dialog", this.isOpen(j)))) {
							var q = a.copy(b),
								r = ++e;
							j = j || "ngdialog" + r, l.push(j), "undefined" != typeof q.data && ("undefined" == typeof f.data && (f.data = {}), f.data = a.merge(a.copy(q.data), f.data)), a.extend(q, f);
							var u;
							t[j] = u = x.defer();
							var H;
							k[j] = H = a.isObject(q.scope) ? q.scope.$new() : z.$new();
							var I, J, K, L = a.extend({}, q.resolve);
							return a.forEach(L, function(b, c) {
								L[c] = a.isString(b) ? D.get(b) : D.invoke(b, null, null, c)
							}), x.all({
								template: h(q.template || q.templateUrl),
								locals: x.all(L)
							}).then(function(b) {
								var e = b.template,
									f = b.locals;
								q.showClose && (e += '<div aria-label="Dismiss" class="ngdialog-close"></div>');
								var g = q.overlay ? "" : " ngdialog-no-overlay";
								if(I = c('<div id="' + j + '" class="ngdialog' + g + '"></div>'), I.html(q.overlay ? '<div class="ngdialog-overlay"></div><div class="ngdialog-content" role="document">' + e + "</div>" : '<div class="ngdialog-content" role="document">' + e + "</div>"), I.data("$ngDialogOptions", q), H.ngDialogId = j, q.data && a.isString(q.data)) {
									var h = q.data.replace(/^\s*/, "")[0];
									H.ngDialogData = "{" === h || "[" === h ? a.fromJson(q.data) : new String(q.data), H.ngDialogData.ngDialogId = j
								} else q.data && a.isObject(q.data) && (H.ngDialogData = q.data, H.ngDialogData.ngDialogId = j);
								if(q.className && I.addClass(q.className), q.appendClassName && I.addClass(q.appendClassName), q.width && (K = I[0].querySelector(".ngdialog-content"), a.isString(q.width) ? K.style.width = q.width : K.style.width = q.width + "px"), q.height && (K = I[0].querySelector(".ngdialog-content"), a.isString(q.height) ? K.style.height = q.height : K.style.height = q.height + "px"), q.disableAnimation && I.addClass(i), J = q.appendTo && a.isString(q.appendTo) ? a.element(document.querySelector(q.appendTo)) : E.body, F.applyAriaAttributes(I, q), [{
										name: "$ngDialogPreCloseCallback",
										value: q.preCloseCallback
									}, {
										name: "$ngDialogOnOpenCallback",
										value: q.onOpenCallback
									}].forEach(function(b) {
										if(b.value) {
											var c;
											a.isFunction(b.value) ? c = b.value : a.isString(b.value) && H && (a.isFunction(H[b.value]) ? c = H[b.value] : H.$parent && a.isFunction(H.$parent[b.value]) ? c = H.$parent[b.value] : z && a.isFunction(z[b.value]) && (c = z[b.value])), c && I.data(b.name, c)
										}
									}), H.closeThisDialog = function(a) {
										F.closeDialog(I, a)
									}, q.controller && (a.isString(q.controller) || a.isArray(q.controller) || a.isFunction(q.controller))) {
									var k;
									q.controllerAs && a.isString(q.controllerAs) && (k = q.controllerAs);
									var l = C(q.controller, a.extend(f, {
										$scope: H,
										$element: I
									}), !0, k);
									q.bindToController && a.extend(l.instance, {
										ngDialogId: H.ngDialogId,
										ngDialogData: H.ngDialogData,
										closeThisDialog: H.closeThisDialog,
										confirm: H.confirm
									}), "function" == typeof l ? I.data("$ngDialogControllerController", l()) : I.data("$ngDialogControllerController", l)
								}
								if(A(function() {
										var b = document.querySelectorAll(".ngdialog");
										F.deactivateAll(b), w(I)(H);
										var c = B.innerWidth - E.body.prop("clientWidth");
										E.html.addClass(q.bodyClassName), E.body.addClass(q.bodyClassName), m.push(q.bodyClassName);
										var d = c - (B.innerWidth - E.body.prop("clientWidth"));
										d > 0 && F.setBodyPadding(d), J.append(I), F.activate(I), q.trapFocus && F.autoFocus(I), q.name ? z.$broadcast("ngDialog.opened", {
											dialog: I,
											name: q.name
										}) : z.$broadcast("ngDialog.opened", I);
										var e = I.data("$ngDialogOnOpenCallback");
										e && a.isFunction(e) && e.call(I)
									}), n || (E.body.bind("keydown", F.onDocumentKeydown), n = !0), q.closeByNavigation && p.push(I), q.preserveFocus && I.data("$ngDialogPreviousFocus", document.activeElement), d = function(a) {
										var b = !!q.closeByDocument && c(a.target).hasClass("ngdialog-overlay"),
											d = c(a.target).hasClass("ngdialog-close");
										(b || d) && G.close(I.attr("id"), d ? "$closeButton" : "$document")
									}, "undefined" != typeof B.Hammer) {
									var o = H.hammerTime = B.Hammer(I[0]);
									o.on("tap", d)
								} else I.bind("click", d);
								return s += 1, G
							}), {
								id: j,
								closePromise: u.promise,
								close: function(a) {
									F.closeDialog(I, a)
								}
							}
						}
					},
					openConfirm: function(d) {
						var e = x.defer(),
							f = a.copy(b);
						d = d || {}, "undefined" != typeof f.data && ("undefined" == typeof d.data && (d.data = {}), d.data = a.merge(a.copy(f.data), d.data)), a.extend(f, d), f.scope = a.isObject(f.scope) ? f.scope.$new() : z.$new(), f.scope.confirm = function(a) {
							e.resolve(a);
							var b = c(document.getElementById(g.id));
							F.performCloseDialog(b, a)
						};
						var g = G.open(f);
						if(g) return g.closePromise.then(function(a) {
							return a ? e.reject(a.value) : e.reject()
						}), e.promise
					},
					isOpen: function(a) {
						var b = c(document.getElementById(a));
						return b.length > 0
					},
					close: function(a, b) {
						var d = c(document.getElementById(a));
						if(d.length) F.closeDialog(d, b);
						else if("$escape" === a) {
							var e = l[l.length - 1];
							d = c(document.getElementById(e)), d.data("$ngDialogOptions").closeByEscape && F.closeDialog(d, "$escape")
						} else G.closeAll(b);
						return G
					},
					closeAll: function(a) {
						for(var b = document.querySelectorAll(".ngdialog"), d = b.length - 1; d >= 0; d--) {
							var e = b[d];
							F.closeDialog(c(e), a)
						}
					},
					getOpenDialogs: function() {
						return l
					},
					getDefaults: function() {
						return b
					}
				};
			a.forEach(["html", "body"], function(a) {
				if(E[a] = u.find(a), j[a]) {
					var b = F.getRouterLocationEventName();
					z.$on(b, function() {
						E[a] = u.find(a)
					})
				}
			});
			var H = F.detectUIRouter();
			if(H === r) {
				var I = D.get("$transitions");
				I.onStart({}, function(a) {
					for(; p.length > 0;) {
						var b = p.pop();
						if(F.closeDialog(b) === !1) return !1
					}
				})
			} else {
				var J = H === q ? "$stateChangeStart" : "$locationChangeStart";
				z.$on(J, function(a) {
					for(; p.length > 0;) {
						var b = p.pop();
						F.closeDialog(b) === !1 && a.preventDefault()
					}
				})
			}
			return G
		}]
	}), b.directive("ngDialog", ["ngDialog", function(b) {
		return {
			restrict: "A",
			scope: {
				ngDialogScope: "="
			},
			link: function(c, d, e) {
				d.on("click", function(d) {
					d.preventDefault();
					var f = a.isDefined(c.ngDialogScope) ? c.ngDialogScope : "noScope";
					a.isDefined(e.ngDialogClosePrevious) && b.close(e.ngDialogClosePrevious);
					var g = b.getDefaults();
					b.open({
						template: e.ngDialog,
						className: e.ngDialogClass || g.className,
						appendClassName: e.ngDialogAppendClass,
						controller: e.ngDialogController,
						controllerAs: e.ngDialogControllerAs,
						bindToController: e.ngDialogBindToController,
						disableAnimation: e.ngDialogDisableAnimation,
						scope: f,
						data: e.ngDialogData,
						showClose: "false" !== e.ngDialogShowClose && ("true" === e.ngDialogShowClose || g.showClose),
						closeByDocument: "false" !== e.ngDialogCloseByDocument && ("true" === e.ngDialogCloseByDocument || g.closeByDocument),
						closeByEscape: "false" !== e.ngDialogCloseByEscape && ("true" === e.ngDialogCloseByEscape || g.closeByEscape),
						overlay: "false" !== e.ngDialogOverlay && ("true" === e.ngDialogOverlay || g.overlay),
						preCloseCallback: e.ngDialogPreCloseCallback || g.preCloseCallback,
						onOpenCallback: e.ngDialogOnOpenCallback || g.onOpenCallback,
						bodyClassName: e.ngDialogBodyClass || g.bodyClassName
					})
				})
			}
		}
	}]), b
});

