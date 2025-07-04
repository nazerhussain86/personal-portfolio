var $e = ((e) => (typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, r) => (typeof require < "u" ? require : t)[r] }) : e))(function (e) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
});
var v = {
        HIGHLIGHT_COLOR: "#0da2e7",
        HIGHLIGHT_BG: "#0da2e71a",
        ALLOWED_ORIGINS: ["https://gptengineer.app", "http://localhost:3000", "https://lovable.dev"],
        DEBOUNCE_DELAY: 10,
        Z_INDEX: 1e4,
        TOOLTIP_OFFSET: 25,
        MAX_TOOLTIP_WIDTH: 200,
        SCROLL_DEBOUNCE: 420,
        FULL_WIDTH_TOOLTIP_OFFSET: "12px",
        HIGHLIGHT_STYLE: { FULL_WIDTH: { OFFSET: "-5px", STYLE: "solid" }, NORMAL: { OFFSET: "0", STYLE: "solid" } },
        SELECTED_ATTR: "data-lov-selected",
        HOVERED_ATTR: "data-lov-hovered",
        OVERRIDE_STYLESHEET_ID: "lovable-override",
    },
    _ = (e) => {
        v.ALLOWED_ORIGINS.forEach((t) => {
            try {
                if (!window.parent) return;
                if (!e || typeof e != "object") {
                    console.error("Invalid message format");
                    return;
                }
                window.parent.postMessage(e, t);
            } catch (r) {
                console.error(`Failed to send message to ${t}:`, r);
            }
        });
    },
    ur = () =>
        new Promise((e) => {
            if (document.readyState !== "loading") {
                e();
                return;
            }
            requestIdleCallback(() => {
                e();
            });
        }),
    Ct = async () => {
        await ur();
        let e = import.meta.hot;
        return (
            e &&
                (await new Promise((t) => {
                    let r = () => {
                        if (!e.data.pending) {
                            t();
                            return;
                        }
                        setTimeout(r, 50);
                    };
                    r();
                })),
            window.__REACT_SUSPENSE_DONE && (await window.__REACT_SUSPENSE_DONE),
            !0
        );
    },
    et = () =>
        new Promise((e) => {
            let t = document.getElementById("root");
            if (t && t.children.length > 0) {
                e();
                return;
            }
            new MutationObserver((n, o) => {
                let i = document.getElementById("root");
                i && i.children.length > 0 && (o.disconnect(), e());
            }).observe(document.body, { childList: !0, subtree: !0 });
        });
var fr = () => {
        let e = window.fetch;
        window.fetch = async function (...t) {
            let r = Date.now();
            try {
                let n;
                if (t?.[1]?.body)
                    try {
                        typeof t[1].body == "string"
                            ? (n = t[1].body)
                            : t[1].body instanceof FormData
                            ? (n =
                                  "FormData: " +
                                  Array.from(t[1].body.entries())
                                      .map(([i, l]) => `${i}=${l}`)
                                      .join("&"))
                            : t[1].body instanceof URLSearchParams
                            ? (n = t[1].body.toString())
                            : (n = JSON.stringify(t[1].body));
                    } catch {
                        n = "Could not serialize request body";
                    }
                let o = await e(...t);
                return (
                    _({
                        type: "NETWORK_REQUEST",
                        request: {
                            url: t?.[0] || o.url,
                            method: t?.[1]?.method || "GET",
                            status: o.status,
                            statusText: o.statusText,
                            responseBody: o?.clone?.() ? await o.clone().text() : void 0,
                            requestBody: n,
                            timestamp: new Date().toISOString(),
                            duration: Date.now() - r,
                            origin: window.location.origin,
                            headers: t?.[1]?.headers ? Object.fromEntries(new Headers(t?.[1]?.headers)) : {},
                        },
                    }),
                    o
                );
            } catch (n) {
                let o;
                if (t?.[1]?.body)
                    try {
                        typeof t[1].body == "string"
                            ? (o = t[1].body)
                            : t[1].body instanceof FormData
                            ? (o =
                                  "FormData: " +
                                  Array.from(t[1].body.entries())
                                      .map(([a, s]) => `${a}=${s}`)
                                      .join("&"))
                            : t[1].body instanceof URLSearchParams
                            ? (o = t[1].body.toString())
                            : (o = JSON.stringify(t[1].body));
                    } catch {
                        o = "Could not serialize request body";
                    }
                let i = {
                        url: t?.[0],
                        method: t?.[1]?.method || "GET",
                        origin: window.location.origin,
                        timestamp: new Date().toISOString(),
                        duration: Date.now() - r,
                        headers: t?.[1]?.headers ? Object.fromEntries(new Headers(t?.[1]?.headers)) : {},
                        requestBody: o,
                    },
                    l =
                        n instanceof TypeError
                            ? { ...i, error: { message: n?.message || "Unknown error", stack: n?.stack } }
                            : {
                                  ...i,
                                  error: {
                                      message: n && typeof n == "object" && "message" in n && typeof n.message == "string" ? n.message : "Unknown fetch error",
                                      stack: n && typeof n == "object" && "stack" in n && typeof n.stack == "string" ? n.stack : "Not available",
                                  },
                              };
                throw (_({ type: "NETWORK_REQUEST", request: l }), n);
            }
        };
    },
    pr = () => {
        let e = document.querySelector("div#root");
        return e ? e.childElementCount === 0 : !1;
    },
    St = (() => {
        let e = !1,
            t = ({ message: r, lineno: n, colno: o, filename: i, error: l }) => ({ message: r, lineno: n, colno: o, filename: i, stack: l?.stack });
        return () => {
            if (e) return;
            let r = new Set(),
                n = (l) => {
                    let { lineno: a, colno: s, filename: c, message: d } = l;
                    return `${d}|${c}|${a}|${s}`;
                };
            fr();
            let o = (l) => (r.has(l) ? !0 : (r.add(l), setTimeout(() => r.delete(l), 5e3), !1)),
                i = (l) => {
                    let a = n(l);
                    if (o(a)) return;
                    let s = t(l);
                    _({ type: "RUNTIME_ERROR", error: { ...s, blankScreen: pr() } });
                };
            window.addEventListener("error", i),
                window.addEventListener("unhandledrejection", (l) => {
                    if (!l.reason?.stack) return;
                    let a = l.reason?.stack || l.reason?.message || String(l.reason);
                    if (o(a)) return;
                    let s = { message: l.reason?.message || "Unhandled promise rejection", stack: l.reason?.stack || String(l.reason) };
                    _({ type: "UNHANDLED_PROMISE_REJECTION", error: s });
                }),
                (e = !0);
        };
    })();
var tt = class {
        constructor(t) {
            this.message = `[Circular Reference to ${t}]`;
        }
    },
    U = class {
        constructor(t, r) {
            (this._type = t), (this.value = r);
        }
    },
    mr = { maxDepth: 10, indent: 2, includeSymbols: !0, preserveTypes: !0, maxStringLength: 1e4, maxArrayLength: 100, maxObjectKeys: 100 };
function ae(e, t = {}, r = new WeakMap(), n = "root") {
    let o = { ...mr, ...t };
    if (n.split(".").length > o.maxDepth) return new U("MaxDepthReached", `[Max depth of ${o.maxDepth} reached]`);
    if (e === void 0) return new U("undefined", "undefined");
    if (e === null) return null;
    if (typeof e == "string") return e.length > o.maxStringLength ? new U("String", `${e.slice(0, o.maxStringLength)}... [${e.length - o.maxStringLength} more characters]`) : e;
    if (typeof e == "number") return Number.isNaN(e) ? new U("Number", "NaN") : Number.isFinite(e) ? e : new U("Number", e > 0 ? "Infinity" : "-Infinity");
    if (typeof e == "boolean") return e;
    if (typeof e == "bigint") return new U("BigInt", e.toString());
    if (typeof e == "symbol") return new U("Symbol", e.toString());
    if (typeof e == "function") return new U("Function", { name: e.name || "anonymous", stringValue: e.toString().slice(0, o.maxStringLength) });
    if (e && typeof e == "object") {
        if (r.has(e)) return new tt(r.get(e));
        r.set(e, n);
    }
    if (e instanceof Error) {
        let s = { name: e.name, message: e.message, stack: e.stack };
        for (let c of Object.getOwnPropertyNames(e)) s[c] || (s[c] = ae(e[c], o, r, `${n}.${c}`));
        return new U("Error", s);
    }
    if (e instanceof Date) return new U("Date", { iso: e.toISOString(), value: e.valueOf(), local: e.toString() });
    if (e instanceof RegExp) return new U("RegExp", { source: e.source, flags: e.flags, string: e.toString() });
    if (e instanceof Promise) return new U("Promise", "[Promise]");
    if (e instanceof WeakMap || e instanceof WeakSet) return new U(e.constructor.name, "[" + e.constructor.name + "]");
    if (e instanceof Set) {
        let s = Array.from(e);
        return s.length > o.maxArrayLength
            ? new U("Set", { values: s.slice(0, o.maxArrayLength).map((c, d) => ae(c, o, r, `${n}.Set[${d}]`)), truncated: s.length - o.maxArrayLength })
            : new U("Set", { values: s.map((c, d) => ae(c, o, r, `${n}.Set[${d}]`)) });
    }
    if (e instanceof Map) {
        let s = {},
            c = 0,
            d = 0;
        for (let [u, m] of e.entries()) {
            if (d >= o.maxObjectKeys) {
                c++;
                continue;
            }
            let h = typeof u == "object" ? JSON.stringify(ae(u, o, r, `${n}.MapKey`)) : String(u);
            (s[h] = ae(m, o, r, `${n}.Map[${h}]`)), d++;
        }
        return new U("Map", { entries: s, truncated: c || void 0 });
    }
    if (ArrayBuffer.isView(e)) {
        let s = e;
        return new U(e.constructor.name, { length: s.length, byteLength: s.byteLength, sample: Array.from(s.slice(0, 10)) });
    }
    if (Array.isArray(e))
        return e.length > o.maxArrayLength
            ? e
                  .slice(0, o.maxArrayLength)
                  .map((s, c) => ae(s, o, r, `${n}[${c}]`))
                  .concat([`... ${e.length - o.maxArrayLength} more items`])
            : e.map((s, c) => ae(s, o, r, `${n}[${c}]`));
    let i = {},
        l = [...Object.getOwnPropertyNames(e)];
    o.includeSymbols && l.push(...Object.getOwnPropertySymbols(e).map((s) => s.toString()));
    let a = 0;
    return (
        l.slice(0, o.maxObjectKeys).forEach((s) => {
            try {
                let c = e[s];
                i[s] = ae(c, o, r, `${n}.${s}`);
            } catch (c) {
                i[s] = new U("Error", `[Unable to serialize: ${c.message}]`);
            }
        }),
        l.length > o.maxObjectKeys && ((a = l.length - o.maxObjectKeys), (i["..."] = `${a} more properties`)),
        i
    );
}
var hr = { log: console.log, warn: console.warn, error: console.error },
    gr = { log: "info", warn: "warning", error: "error" },
    bt = (() => {
        let e = !1;
        return () => {
            if (e) return;
            let t = (r) => {
                console[r] = (...n) => {
                    hr[r].apply(console, n);
                    let o = null;
                    if (r === "warn" || r === "error") {
                        let l = new Error();
                        l.stack &&
                            (o = l.stack
                                .split(
                                    `
`
                                )
                                .slice(2).join(`
`));
                    }
                    let i = n.map((l) => ae(l, { maxDepth: 5, includeSymbols: !0, preserveTypes: !0 }));
                    _({
                        type: "CONSOLE_OUTPUT",
                        level: gr[r],
                        message:
                            i.map((l) => (typeof l == "string" ? l : JSON.stringify(l, null, 2))).join(" ") +
                            (o
                                ? `
` + o
                                : ""),
                        logged_at: new Date().toISOString(),
                        raw: i,
                    });
                };
            };
            t("log"), t("warn"), t("error"), (e = !0);
        };
    })();
var vt = () => {
    let e = (t) => {
        !t?.origin || !t?.data?.type || !v.ALLOWED_ORIGINS.includes(t.origin) || (t.data.type === "NAVIGATE" && (t.data.direction === "back" ? window.history.back() : t.data.direction === "forward" && window.history.forward()));
    };
    window.addEventListener("message", e);
};
var At = () => {
    let e = () => {
        let t = document.location.href,
            r = document.querySelector("body"),
            n = new MutationObserver(() => {
                t !== document.location.href &&
                    ((t = document.location.href),
                    window.top && (window.top.postMessage({ type: "URL_CHANGED", url: document.location.href }, "https://lovable.dev"), window.top.postMessage({ type: "URL_CHANGED", url: document.location.href }, "http://localhost:3000")));
            });
        r && n.observe(r, { childList: !0, subtree: !0 });
    };
    window.addEventListener("load", e);
};
var Z;
(function (e) {
    (e[(e.Document = 0)] = "Document"), (e[(e.DocumentType = 1)] = "DocumentType"), (e[(e.Element = 2)] = "Element"), (e[(e.Text = 3)] = "Text"), (e[(e.CDATA = 4)] = "CDATA"), (e[(e.Comment = 5)] = "Comment");
})(Z || (Z = {}));
function yr(e) {
    return e.nodeType === e.ELEMENT_NODE;
}
function ge(e) {
    var t = e?.host;
    return t?.shadowRoot === e;
}
function me(e) {
    return Object.prototype.toString.call(e) === "[object ShadowRoot]";
}
function Ir(e) {
    return e.includes(" background-clip: text;") && !e.includes(" -webkit-background-clip: text;") && (e = e.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;")), e;
}
function rt(e) {
    try {
        var t = e.rules || e.cssRules;
        return t ? Ir(Array.from(t).map(nt).join("")) : null;
    } catch {
        return null;
    }
}
function nt(e) {
    var t = e.cssText;
    if (Cr(e))
        try {
            t = rt(e.styleSheet) || t;
        } catch {}
    return t;
}
function Cr(e) {
    return "styleSheet" in e;
}
var wt = (function () {
    function e() {
        (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
    return (
        (e.prototype.getId = function (t) {
            var r;
            if (!t) return -1;
            var n = (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id;
            return n ?? -1;
        }),
        (e.prototype.getNode = function (t) {
            return this.idNodeMap.get(t) || null;
        }),
        (e.prototype.getIds = function () {
            return Array.from(this.idNodeMap.keys());
        }),
        (e.prototype.getMeta = function (t) {
            return this.nodeMetaMap.get(t) || null;
        }),
        (e.prototype.removeNodeFromMap = function (t) {
            var r = this,
                n = this.getId(t);
            this.idNodeMap.delete(n),
                t.childNodes &&
                    t.childNodes.forEach(function (o) {
                        return r.removeNodeFromMap(o);
                    });
        }),
        (e.prototype.has = function (t) {
            return this.idNodeMap.has(t);
        }),
        (e.prototype.hasNode = function (t) {
            return this.nodeMetaMap.has(t);
        }),
        (e.prototype.add = function (t, r) {
            var n = r.id;
            this.idNodeMap.set(n, t), this.nodeMetaMap.set(t, r);
        }),
        (e.prototype.replace = function (t, r) {
            var n = this.getNode(t);
            if (n) {
                var o = this.nodeMetaMap.get(n);
                o && this.nodeMetaMap.set(r, o);
            }
            this.idNodeMap.set(t, r);
        }),
        (e.prototype.reset = function () {
            (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
        }),
        e
    );
})();
function kt() {
    return new wt();
}
function ke(e) {
    var t = e.maskInputOptions,
        r = e.tagName,
        n = e.type,
        o = e.value,
        i = e.maskInputFn,
        l = o || "";
    return (t[r.toLowerCase()] || t[n]) && (i ? (l = i(l)) : (l = "*".repeat(l.length))), l;
}
var Et = "__rrweb_original__";
function Sr(e) {
    var t = e.getContext("2d");
    if (!t) return !0;
    for (var r = 50, n = 0; n < e.width; n += r)
        for (var o = 0; o < e.height; o += r) {
            var i = t.getImageData,
                l = Et in i ? i[Et] : i,
                a = new Uint32Array(l.call(t, n, o, Math.min(r, e.width - n), Math.min(r, e.height - o)).data.buffer);
            if (
                a.some(function (s) {
                    return s !== 0;
                })
            )
                return !1;
        }
    return !0;
}
var br = 1,
    vr = new RegExp("[^a-z0-9-_:]"),
    he = -2;
function ot() {
    return br++;
}
function Ar(e) {
    if (e instanceof HTMLFormElement) return "form";
    var t = e.tagName.toLowerCase().trim();
    return vr.test(t) ? "div" : t;
}
function Er(e) {
    return e.cssRules
        ? Array.from(e.cssRules)
              .map(function (t) {
                  return t.cssText || "";
              })
              .join("")
        : "";
}
function Tr(e) {
    var t = "";
    return e.indexOf("//") > -1 ? (t = e.split("/").slice(0, 3).join("/")) : (t = e.split("/")[0]), (t = t.split("?")[0]), t;
}
var Se,
    Tt,
    wr = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
    kr = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
    Lr = /^(data:)([^,]*),(.*)/i;
function xe(e, t) {
    return (e || "").replace(wr, function (r, n, o, i, l, a) {
        var s = o || l || a,
            c = n || i || "";
        if (!s) return r;
        if (!kr.test(s) || Lr.test(s)) return "url(".concat(c).concat(s).concat(c, ")");
        if (s[0] === "/")
            return "url("
                .concat(c)
                .concat(Tr(t) + s)
                .concat(c, ")");
        var d = t.split("/"),
            u = s.split("/");
        d.pop();
        for (var m = 0, h = u; m < h.length; m++) {
            var p = h[m];
            p !== "." && (p === ".." ? d.pop() : d.push(p));
        }
        return "url(".concat(c).concat(d.join("/")).concat(c, ")");
    });
}
var Nr = /^[^ \t\n\r\u000c]+/,
    Rr = /^[, \t\n\r\u000c]+/;
function Mr(e, t) {
    if (t.trim() === "") return t;
    var r = 0;
    function n(c) {
        var d,
            u = c.exec(t.substring(r));
        return u ? ((d = u[0]), (r += d.length), d) : "";
    }
    for (var o = []; n(Rr), !(r >= t.length); ) {
        var i = n(Nr);
        if (i.slice(-1) === ",") (i = be(e, i.substring(0, i.length - 1))), o.push(i);
        else {
            var l = "";
            i = be(e, i);
            for (var a = !1; ; ) {
                var s = t.charAt(r);
                if (s === "") {
                    o.push((i + l).trim());
                    break;
                } else if (a) s === ")" && (a = !1);
                else if (s === ",") {
                    (r += 1), o.push((i + l).trim());
                    break;
                } else s === "(" && (a = !0);
                (l += s), (r += 1);
            }
        }
    }
    return o.join(", ");
}
function be(e, t) {
    if (!t || t.trim() === "") return t;
    var r = e.createElement("a");
    return (r.href = t), r.href;
}
function Or(e) {
    return !!(e.tagName === "svg" || e.ownerSVGElement);
}
function it() {
    var e = document.createElement("a");
    return (e.href = ""), e.href;
}
function st(e, t, r, n) {
    return r === "src" || (r === "href" && n && !(t === "use" && n[0] === "#")) || (r === "xlink:href" && n && n[0] !== "#") || (r === "background" && n && (t === "table" || t === "td" || t === "th"))
        ? be(e, n)
        : r === "srcset" && n
        ? Mr(e, n)
        : r === "style" && n
        ? xe(n, it())
        : t === "object" && r === "data" && n
        ? be(e, n)
        : n;
}
function xr(e, t, r) {
    if (typeof t == "string") {
        if (e.classList.contains(t)) return !0;
    } else
        for (var n = e.classList.length; n--; ) {
            var o = e.classList[n];
            if (t.test(o)) return !0;
        }
    return r ? e.matches(r) : !1;
}
function we(e, t, r) {
    if (!e) return !1;
    if (e.nodeType !== e.ELEMENT_NODE) return r ? we(e.parentNode, t, r) : !1;
    for (var n = e.classList.length; n--; ) {
        var o = e.classList[n];
        if (t.test(o)) return !0;
    }
    return r ? we(e.parentNode, t, r) : !1;
}
function at(e, t, r) {
    var n = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
    if (n === null) return !1;
    if (typeof t == "string") {
        if (n.classList.contains(t) || n.closest(".".concat(t))) return !0;
    } else if (we(n, t, !0)) return !0;
    return !!(r && (n.matches(r) || n.closest(r)));
}
function Dr(e, t, r) {
    var n = e.contentWindow;
    if (n) {
        var o = !1,
            i;
        try {
            i = n.document.readyState;
        } catch {
            return;
        }
        if (i !== "complete") {
            var l = setTimeout(function () {
                o || (t(), (o = !0));
            }, r);
            e.addEventListener("load", function () {
                clearTimeout(l), (o = !0), t();
            });
            return;
        }
        var a = "about:blank";
        if (n.location.href !== a || e.src === a || e.src === "") return setTimeout(t, 0), e.addEventListener("load", t);
        e.addEventListener("load", t);
    }
}
function Fr(e, t, r) {
    var n = !1,
        o;
    try {
        o = e.sheet;
    } catch {
        return;
    }
    if (!o) {
        var i = setTimeout(function () {
            n || (t(), (n = !0));
        }, r);
        e.addEventListener("load", function () {
            clearTimeout(i), (n = !0), t();
        });
    }
}
function _r(e, t) {
    var r = t.doc,
        n = t.mirror,
        o = t.blockClass,
        i = t.blockSelector,
        l = t.maskTextClass,
        a = t.maskTextSelector,
        s = t.inlineStylesheet,
        c = t.maskInputOptions,
        d = c === void 0 ? {} : c,
        u = t.maskTextFn,
        m = t.maskInputFn,
        h = t.dataURLOptions,
        p = h === void 0 ? {} : h,
        S = t.inlineImages,
        b = t.recordCanvas,
        A = t.keepIframeSrcFn,
        g = t.newlyAddedElement,
        y = g === void 0 ? !1 : g,
        R = Wr(r, n);
    switch (e.nodeType) {
        case e.DOCUMENT_NODE:
            return e.compatMode !== "CSS1Compat" ? { type: Z.Document, childNodes: [], compatMode: e.compatMode } : { type: Z.Document, childNodes: [] };
        case e.DOCUMENT_TYPE_NODE:
            return { type: Z.DocumentType, name: e.name, publicId: e.publicId, systemId: e.systemId, rootId: R };
        case e.ELEMENT_NODE:
            return Gr(e, { doc: r, blockClass: o, blockSelector: i, inlineStylesheet: s, maskInputOptions: d, maskInputFn: m, dataURLOptions: p, inlineImages: S, recordCanvas: b, keepIframeSrcFn: A, newlyAddedElement: y, rootId: R });
        case e.TEXT_NODE:
            return Br(e, { maskTextClass: l, maskTextSelector: a, maskTextFn: u, rootId: R });
        case e.CDATA_SECTION_NODE:
            return { type: Z.CDATA, textContent: "", rootId: R };
        case e.COMMENT_NODE:
            return { type: Z.Comment, textContent: e.textContent || "", rootId: R };
        default:
            return !1;
    }
}
function Wr(e, t) {
    if (t.hasNode(e)) {
        var r = t.getId(e);
        return r === 1 ? void 0 : r;
    }
}
function Br(e, t) {
    var r,
        n = t.maskTextClass,
        o = t.maskTextSelector,
        i = t.maskTextFn,
        l = t.rootId,
        a = e.parentNode && e.parentNode.tagName,
        s = e.textContent,
        c = a === "STYLE" ? !0 : void 0,
        d = a === "SCRIPT" ? !0 : void 0;
    if (c && s) {
        try {
            e.nextSibling || e.previousSibling || (!((r = e.parentNode.sheet) === null || r === void 0) && r.cssRules && (s = Er(e.parentNode.sheet)));
        } catch (u) {
            console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(u), e);
        }
        s = xe(s, it());
    }
    return d && (s = "SCRIPT_PLACEHOLDER"), !c && !d && s && at(e, n, o) && (s = i ? i(s) : s.replace(/[\S]/g, "*")), { type: Z.Text, textContent: s || "", isStyle: c, rootId: l };
}
function Gr(e, t) {
    for (
        var r = t.doc,
            n = t.blockClass,
            o = t.blockSelector,
            i = t.inlineStylesheet,
            l = t.maskInputOptions,
            a = l === void 0 ? {} : l,
            s = t.maskInputFn,
            c = t.dataURLOptions,
            d = c === void 0 ? {} : c,
            u = t.inlineImages,
            m = t.recordCanvas,
            h = t.keepIframeSrcFn,
            p = t.newlyAddedElement,
            S = p === void 0 ? !1 : p,
            b = t.rootId,
            A = xr(e, n, o),
            g = Ar(e),
            y = {},
            R = e.attributes.length,
            P = 0;
        P < R;
        P++
    ) {
        var H = e.attributes[P];
        y[H.name] = st(r, g, H.name, H.value);
    }
    if (g === "link" && i) {
        var f = Array.from(r.styleSheets).find(function ($) {
                return $.href === e.href;
            }),
            C = null;
        f && (C = rt(f)), C && (delete y.rel, delete y.href, (y._cssText = xe(C, f.href)));
    }
    if (g === "style" && e.sheet && !(e.innerText || e.textContent || "").trim().length) {
        var C = rt(e.sheet);
        C && (y._cssText = xe(C, it()));
    }
    if (g === "input" || g === "textarea" || g === "select") {
        var M = e.value,
            I = e.checked;
        y.type !== "radio" && y.type !== "checkbox" && y.type !== "submit" && y.type !== "button" && M ? (y.value = ke({ type: y.type, tagName: g, value: M, maskInputOptions: a, maskInputFn: s })) : I && (y.checked = I);
    }
    if ((g === "option" && (e.selected && !a.select ? (y.selected = !0) : delete y.selected), g === "canvas" && m)) {
        if (e.__context === "2d") Sr(e) || (y.rr_dataURL = e.toDataURL(d.type, d.quality));
        else if (!("__context" in e)) {
            var k = e.toDataURL(d.type, d.quality),
                T = document.createElement("canvas");
            (T.width = e.width), (T.height = e.height);
            var N = T.toDataURL(d.type, d.quality);
            k !== N && (y.rr_dataURL = k);
        }
    }
    if (g === "img" && u) {
        Se || ((Se = r.createElement("canvas")), (Tt = Se.getContext("2d")));
        var D = e,
            X = D.crossOrigin;
        D.crossOrigin = "anonymous";
        var te = function () {
            try {
                (Se.width = D.naturalWidth), (Se.height = D.naturalHeight), Tt.drawImage(D, 0, 0), (y.rr_dataURL = Se.toDataURL(d.type, d.quality));
            } catch ($) {
                console.warn("Cannot inline img src=".concat(D.currentSrc, "! Error: ").concat($));
            }
            X ? (y.crossOrigin = X) : D.removeAttribute("crossorigin");
        };
        D.complete && D.naturalWidth !== 0 ? te() : (D.onload = te);
    }
    if (
        ((g === "audio" || g === "video") && ((y.rr_mediaState = e.paused ? "paused" : "played"), (y.rr_mediaCurrentTime = e.currentTime)),
        S || (e.scrollLeft && (y.rr_scrollLeft = e.scrollLeft), e.scrollTop && (y.rr_scrollTop = e.scrollTop)),
        A)
    ) {
        var ie = e.getBoundingClientRect(),
            le = ie.width,
            J = ie.height;
        y = { class: y.class, rr_width: "".concat(le, "px"), rr_height: "".concat(J, "px") };
    }
    return g === "iframe" && !h(y.src) && (e.contentDocument || (y.rr_src = y.src), delete y.src), { type: Z.Element, tagName: g, attributes: y, childNodes: [], isSVG: Or(e) || void 0, needBlock: A, rootId: b };
}
function x(e) {
    return e === void 0 ? "" : e.toLowerCase();
}
function Ur(e, t) {
    if (t.comment && e.type === Z.Comment) return !0;
    if (e.type === Z.Element) {
        if (
            t.script &&
            (e.tagName === "script" ||
                (e.tagName === "link" && e.attributes.rel === "preload" && e.attributes.as === "script") ||
                (e.tagName === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && e.attributes.href.endsWith(".js")))
        )
            return !0;
        if (
            t.headFavicon &&
            ((e.tagName === "link" && e.attributes.rel === "shortcut icon") ||
                (e.tagName === "meta" &&
                    (x(e.attributes.name).match(/^msapplication-tile(image|color)$/) ||
                        x(e.attributes.name) === "application-name" ||
                        x(e.attributes.rel) === "icon" ||
                        x(e.attributes.rel) === "apple-touch-icon" ||
                        x(e.attributes.rel) === "shortcut icon")))
        )
            return !0;
        if (e.tagName === "meta") {
            if (t.headMetaDescKeywords && x(e.attributes.name).match(/^description|keywords$/)) return !0;
            if (t.headMetaSocial && (x(e.attributes.property).match(/^(og|twitter|fb):/) || x(e.attributes.name).match(/^(og|twitter):/) || x(e.attributes.name) === "pinterest")) return !0;
            if (t.headMetaRobots && (x(e.attributes.name) === "robots" || x(e.attributes.name) === "googlebot" || x(e.attributes.name) === "bingbot")) return !0;
            if (t.headMetaHttpEquiv && e.attributes["http-equiv"] !== void 0) return !0;
            if (
                t.headMetaAuthorship &&
                (x(e.attributes.name) === "author" ||
                    x(e.attributes.name) === "generator" ||
                    x(e.attributes.name) === "framework" ||
                    x(e.attributes.name) === "publisher" ||
                    x(e.attributes.name) === "progid" ||
                    x(e.attributes.property).match(/^article:/) ||
                    x(e.attributes.property).match(/^product:/))
            )
                return !0;
            if (
                t.headMetaVerification &&
                (x(e.attributes.name) === "google-site-verification" ||
                    x(e.attributes.name) === "yandex-verification" ||
                    x(e.attributes.name) === "csrf-token" ||
                    x(e.attributes.name) === "p:domain_verify" ||
                    x(e.attributes.name) === "verify-v1" ||
                    x(e.attributes.name) === "verification" ||
                    x(e.attributes.name) === "shopify-checkout-api-token")
            )
                return !0;
        }
    }
    return !1;
}
function pe(e, t) {
    var r = t.doc,
        n = t.mirror,
        o = t.blockClass,
        i = t.blockSelector,
        l = t.maskTextClass,
        a = t.maskTextSelector,
        s = t.skipChild,
        c = s === void 0 ? !1 : s,
        d = t.inlineStylesheet,
        u = d === void 0 ? !0 : d,
        m = t.maskInputOptions,
        h = m === void 0 ? {} : m,
        p = t.maskTextFn,
        S = t.maskInputFn,
        b = t.slimDOMOptions,
        A = t.dataURLOptions,
        g = A === void 0 ? {} : A,
        y = t.inlineImages,
        R = y === void 0 ? !1 : y,
        P = t.recordCanvas,
        H = P === void 0 ? !1 : P,
        f = t.onSerialize,
        C = t.onIframeLoad,
        M = t.iframeLoadTimeout,
        I = M === void 0 ? 5e3 : M,
        k = t.onStylesheetLoad,
        T = t.stylesheetLoadTimeout,
        N = T === void 0 ? 5e3 : T,
        D = t.keepIframeSrcFn,
        X =
            D === void 0
                ? function () {
                      return !1;
                  }
                : D,
        te = t.newlyAddedElement,
        ie = te === void 0 ? !1 : te,
        le = t.preserveWhiteSpace,
        J = le === void 0 ? !0 : le,
        $ = _r(e, {
            doc: r,
            mirror: n,
            blockClass: o,
            blockSelector: i,
            maskTextClass: l,
            maskTextSelector: a,
            inlineStylesheet: u,
            maskInputOptions: h,
            maskTextFn: p,
            maskInputFn: S,
            dataURLOptions: g,
            inlineImages: R,
            recordCanvas: H,
            keepIframeSrcFn: X,
            newlyAddedElement: ie,
        });
    if (!$) return console.warn(e, "not serialized"), null;
    var de;
    n.hasNode(e) ? (de = n.getId(e)) : Ur($, b) || (!J && $.type === Z.Text && !$.isStyle && !$.textContent.replace(/^\s+|\s+$/gm, "").length) ? (de = he) : (de = ot());
    var G = Object.assign($, { id: de });
    if ((n.add(e, G), de === he)) return null;
    f && f(e);
    var re = !c;
    if (G.type === Z.Element) {
        (re = re && !G.needBlock), delete G.needBlock;
        var se = e.shadowRoot;
        se && me(se) && (G.isShadowHost = !0);
    }
    if ((G.type === Z.Document || G.type === Z.Element) && re) {
        b.headWhitespace && G.type === Z.Element && G.tagName === "head" && (J = !1);
        for (
            var Ce = {
                    doc: r,
                    mirror: n,
                    blockClass: o,
                    blockSelector: i,
                    maskTextClass: l,
                    maskTextSelector: a,
                    skipChild: c,
                    inlineStylesheet: u,
                    maskInputOptions: h,
                    maskTextFn: p,
                    maskInputFn: S,
                    slimDOMOptions: b,
                    dataURLOptions: g,
                    inlineImages: R,
                    recordCanvas: H,
                    preserveWhiteSpace: J,
                    onSerialize: f,
                    onIframeLoad: C,
                    iframeLoadTimeout: I,
                    onStylesheetLoad: k,
                    stylesheetLoadTimeout: N,
                    keepIframeSrcFn: X,
                },
                E = 0,
                z = Array.from(e.childNodes);
            E < z.length;
            E++
        ) {
            var Q = z[E],
                F = pe(Q, Ce);
            F && G.childNodes.push(F);
        }
        if (yr(e) && e.shadowRoot)
            for (var ee = 0, O = Array.from(e.shadowRoot.childNodes); ee < O.length; ee++) {
                var Q = O[ee],
                    F = pe(Q, Ce);
                F && (me(e.shadowRoot) && (F.isShadow = !0), G.childNodes.push(F));
            }
    }
    return (
        e.parentNode && ge(e.parentNode) && me(e.parentNode) && (G.isShadow = !0),
        G.type === Z.Element &&
            G.tagName === "iframe" &&
            Dr(
                e,
                function () {
                    var j = e.contentDocument;
                    if (j && C) {
                        var Te = pe(j, {
                            doc: j,
                            mirror: n,
                            blockClass: o,
                            blockSelector: i,
                            maskTextClass: l,
                            maskTextSelector: a,
                            skipChild: !1,
                            inlineStylesheet: u,
                            maskInputOptions: h,
                            maskTextFn: p,
                            maskInputFn: S,
                            slimDOMOptions: b,
                            dataURLOptions: g,
                            inlineImages: R,
                            recordCanvas: H,
                            preserveWhiteSpace: J,
                            onSerialize: f,
                            onIframeLoad: C,
                            iframeLoadTimeout: I,
                            onStylesheetLoad: k,
                            stylesheetLoadTimeout: N,
                            keepIframeSrcFn: X,
                        });
                        Te && C(e, Te);
                    }
                },
                I
            ),
        G.type === Z.Element &&
            G.tagName === "link" &&
            G.attributes.rel === "stylesheet" &&
            Fr(
                e,
                function () {
                    if (k) {
                        var j = pe(e, {
                            doc: r,
                            mirror: n,
                            blockClass: o,
                            blockSelector: i,
                            maskTextClass: l,
                            maskTextSelector: a,
                            skipChild: !1,
                            inlineStylesheet: u,
                            maskInputOptions: h,
                            maskTextFn: p,
                            maskInputFn: S,
                            slimDOMOptions: b,
                            dataURLOptions: g,
                            inlineImages: R,
                            recordCanvas: H,
                            preserveWhiteSpace: J,
                            onSerialize: f,
                            onIframeLoad: C,
                            iframeLoadTimeout: I,
                            onStylesheetLoad: k,
                            stylesheetLoadTimeout: N,
                            keepIframeSrcFn: X,
                        });
                        j && k(e, j);
                    }
                },
                N
            ),
        G
    );
}
function Lt(e, t) {
    var r = t || {},
        n = r.mirror,
        o = n === void 0 ? new wt() : n,
        i = r.blockClass,
        l = i === void 0 ? "rr-block" : i,
        a = r.blockSelector,
        s = a === void 0 ? null : a,
        c = r.maskTextClass,
        d = c === void 0 ? "rr-mask" : c,
        u = r.maskTextSelector,
        m = u === void 0 ? null : u,
        h = r.inlineStylesheet,
        p = h === void 0 ? !0 : h,
        S = r.inlineImages,
        b = S === void 0 ? !1 : S,
        A = r.recordCanvas,
        g = A === void 0 ? !1 : A,
        y = r.maskAllInputs,
        R = y === void 0 ? !1 : y,
        P = r.maskTextFn,
        H = r.maskInputFn,
        f = r.slimDOM,
        C = f === void 0 ? !1 : f,
        M = r.dataURLOptions,
        I = r.preserveWhiteSpace,
        k = r.onSerialize,
        T = r.onIframeLoad,
        N = r.iframeLoadTimeout,
        D = r.onStylesheetLoad,
        X = r.stylesheetLoadTimeout,
        te = r.keepIframeSrcFn,
        ie =
            te === void 0
                ? function () {
                      return !1;
                  }
                : te,
        le =
            R === !0
                ? { color: !0, date: !0, "datetime-local": !0, email: !0, month: !0, number: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0, textarea: !0, select: !0, password: !0 }
                : R === !1
                ? { password: !0 }
                : R,
        J =
            C === !0 || C === "all"
                ? { script: !0, comment: !0, headFavicon: !0, headWhitespace: !0, headMetaDescKeywords: C === "all", headMetaSocial: !0, headMetaRobots: !0, headMetaHttpEquiv: !0, headMetaAuthorship: !0, headMetaVerification: !0 }
                : C === !1
                ? {}
                : C;
    return pe(e, {
        doc: e,
        mirror: o,
        blockClass: l,
        blockSelector: s,
        maskTextClass: d,
        maskTextSelector: m,
        skipChild: !1,
        inlineStylesheet: p,
        maskInputOptions: le,
        maskTextFn: P,
        maskInputFn: H,
        slimDOMOptions: J,
        dataURLOptions: M,
        inlineImages: b,
        recordCanvas: g,
        preserveWhiteSpace: I,
        onSerialize: k,
        onIframeLoad: T,
        iframeLoadTimeout: N,
        onStylesheetLoad: D,
        stylesheetLoadTimeout: X,
        keepIframeSrcFn: ie,
        newlyAddedElement: !1,
    });
}
var Hr = /([^\\]):hover/,
    Sn = new RegExp(Hr.source, "g");
function K(e, t, r = document) {
    let n = { capture: !0, passive: !0 };
    return r.addEventListener(e, t, n), () => r.removeEventListener(e, t, n);
}
var ve = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`,
    Nt = {
        map: {},
        getId() {
            return console.error(ve), -1;
        },
        getNode() {
            return console.error(ve), null;
        },
        removeNodeFromMap() {
            console.error(ve);
        },
        has() {
            return console.error(ve), !1;
        },
        reset() {
            console.error(ve);
        },
    };
typeof window < "u" &&
    window.Proxy &&
    window.Reflect &&
    (Nt = new Proxy(Nt, {
        get(e, t, r) {
            return t === "map" && console.error(ve), Reflect.get(e, t, r);
        },
    }));
function Ae(e, t, r = {}) {
    let n = null,
        o = 0;
    return function (...i) {
        let l = Date.now();
        !o && r.leading === !1 && (o = l);
        let a = t - (l - o),
            s = this;
        a <= 0 || a > t
            ? (n && (clearTimeout(n), (n = null)), (o = l), e.apply(s, i))
            : !n &&
              r.trailing !== !1 &&
              (n = setTimeout(() => {
                  (o = r.leading === !1 ? 0 : Date.now()), (n = null), e.apply(s, i);
              }, a));
    };
}
function ye(e, t, r, n, o = window) {
    let i = o.Object.getOwnPropertyDescriptor(e, t);
    return (
        o.Object.defineProperty(
            e,
            t,
            n
                ? r
                : {
                      set(l) {
                          setTimeout(() => {
                              r.set.call(this, l);
                          }, 0),
                              i && i.set && i.set.call(this, l);
                      },
                  }
        ),
        () => ye(e, t, i || {}, !0)
    );
}
function ne(e, t, r) {
    try {
        if (!(t in e)) return () => {};
        let n = e[t],
            o = r(n);
        return (
            typeof o == "function" && ((o.prototype = o.prototype || {}), Object.defineProperties(o, { __rrweb_original__: { enumerable: !1, value: n } })),
            (e[t] = o),
            () => {
                e[t] = n;
            }
        );
    } catch {
        return () => {};
    }
}
function Fe() {
    return window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || (document.body && document.body.clientHeight);
}
function _e() {
    return window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || (document.body && document.body.clientWidth);
}
function W(e, t, r, n) {
    if (!e) return !1;
    let o = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
    if (!o) return !1;
    if (typeof t == "string") {
        if (o.classList.contains(t) || (n && o.closest("." + t) !== null)) return !0;
    } else if (we(o, t, n)) return !0;
    return !!(r && (e.matches(r) || (n && o.closest(r) !== null)));
}
function Rt(e, t) {
    return t.getId(e) !== -1;
}
function We(e, t) {
    return t.getId(e) === he;
}
function lt(e, t) {
    if (ge(e)) return !1;
    let r = t.getId(e);
    return t.has(r) ? (e.parentNode && e.parentNode.nodeType === e.DOCUMENT_NODE ? !1 : e.parentNode ? lt(e.parentNode, t) : !0) : !0;
}
function ct(e) {
    return !!e.changedTouches;
}
function Mt(e = window) {
    "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach),
        "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach),
        Node.prototype.contains ||
            (Node.prototype.contains = (...t) => {
                let r = t[0];
                if (!(0 in t)) throw new TypeError("1 argument is required");
                do if (this === r) return !0;
                while ((r = r && r.parentNode));
                return !1;
            });
}
function Be(e, t) {
    return !!(e.nodeName === "IFRAME" && t.getMeta(e));
}
function Ge(e, t) {
    return !!(e.nodeName === "LINK" && e.nodeType === e.ELEMENT_NODE && e.getAttribute && e.getAttribute("rel") === "stylesheet" && t.getMeta(e));
}
function Ue(e) {
    return !!e?.shadowRoot;
}
var De = class {
    constructor() {
        (this.id = 1), (this.styleIDMap = new WeakMap()), (this.idStyleMap = new Map());
    }
    getId(t) {
        var r;
        return (r = this.styleIDMap.get(t)) !== null && r !== void 0 ? r : -1;
    }
    has(t) {
        return this.styleIDMap.has(t);
    }
    add(t, r) {
        if (this.has(t)) return this.getId(t);
        let n;
        return r === void 0 ? (n = this.id++) : (n = r), this.styleIDMap.set(t, n), this.idStyleMap.set(n, t), n;
    }
    getStyle(t) {
        return this.idStyleMap.get(t) || null;
    }
    reset() {
        (this.styleIDMap = new WeakMap()), (this.idStyleMap = new Map()), (this.id = 1);
    }
    generateId() {
        return this.id++;
    }
};
var L = ((e) => (
        (e[(e.DomContentLoaded = 0)] = "DomContentLoaded"),
        (e[(e.Load = 1)] = "Load"),
        (e[(e.FullSnapshot = 2)] = "FullSnapshot"),
        (e[(e.IncrementalSnapshot = 3)] = "IncrementalSnapshot"),
        (e[(e.Meta = 4)] = "Meta"),
        (e[(e.Custom = 5)] = "Custom"),
        (e[(e.Plugin = 6)] = "Plugin"),
        e
    ))(L || {}),
    w = ((e) => (
        (e[(e.Mutation = 0)] = "Mutation"),
        (e[(e.MouseMove = 1)] = "MouseMove"),
        (e[(e.MouseInteraction = 2)] = "MouseInteraction"),
        (e[(e.Scroll = 3)] = "Scroll"),
        (e[(e.ViewportResize = 4)] = "ViewportResize"),
        (e[(e.Input = 5)] = "Input"),
        (e[(e.TouchMove = 6)] = "TouchMove"),
        (e[(e.MediaInteraction = 7)] = "MediaInteraction"),
        (e[(e.StyleSheetRule = 8)] = "StyleSheetRule"),
        (e[(e.CanvasMutation = 9)] = "CanvasMutation"),
        (e[(e.Font = 10)] = "Font"),
        (e[(e.Log = 11)] = "Log"),
        (e[(e.Drag = 12)] = "Drag"),
        (e[(e.StyleDeclaration = 13)] = "StyleDeclaration"),
        (e[(e.Selection = 14)] = "Selection"),
        (e[(e.AdoptedStyleSheet = 15)] = "AdoptedStyleSheet"),
        e
    ))(w || {}),
    He = ((e) => (
        (e[(e.MouseUp = 0)] = "MouseUp"),
        (e[(e.MouseDown = 1)] = "MouseDown"),
        (e[(e.Click = 2)] = "Click"),
        (e[(e.ContextMenu = 3)] = "ContextMenu"),
        (e[(e.DblClick = 4)] = "DblClick"),
        (e[(e.Focus = 5)] = "Focus"),
        (e[(e.Blur = 6)] = "Blur"),
        (e[(e.TouchStart = 7)] = "TouchStart"),
        (e[(e.TouchMove_Departed = 8)] = "TouchMove_Departed"),
        (e[(e.TouchEnd = 9)] = "TouchEnd"),
        (e[(e.TouchCancel = 10)] = "TouchCancel"),
        e
    ))(He || {}),
    ce = ((e) => ((e[(e["2D"] = 0)] = "2D"), (e[(e.WebGL = 1)] = "WebGL"), (e[(e.WebGL2 = 2)] = "WebGL2"), e))(ce || {});
function Ot(e) {
    return "__ln" in e;
}
var dt = class {
        constructor() {
            (this.length = 0), (this.head = null);
        }
        get(t) {
            if (t >= this.length) throw new Error("Position outside of list range");
            let r = this.head;
            for (let n = 0; n < t; n++) r = r?.next || null;
            return r;
        }
        addNode(t) {
            let r = { value: t, previous: null, next: null };
            if (((t.__ln = r), t.previousSibling && Ot(t.previousSibling))) {
                let n = t.previousSibling.__ln.next;
                (r.next = n), (r.previous = t.previousSibling.__ln), (t.previousSibling.__ln.next = r), n && (n.previous = r);
            } else if (t.nextSibling && Ot(t.nextSibling) && t.nextSibling.__ln.previous) {
                let n = t.nextSibling.__ln.previous;
                (r.previous = n), (r.next = t.nextSibling.__ln), (t.nextSibling.__ln.previous = r), n && (n.next = r);
            } else this.head && (this.head.previous = r), (r.next = this.head), (this.head = r);
            this.length++;
        }
        removeNode(t) {
            let r = t.__ln;
            this.head && (r.previous ? ((r.previous.next = r.next), r.next && (r.next.previous = r.previous)) : ((this.head = r.next), this.head && (this.head.previous = null)), t.__ln && delete t.__ln, this.length--);
        }
    },
    xt = (e, t) => `${e}@${t}`,
    Ve = class {
        constructor() {
            (this.frozen = !1),
                (this.locked = !1),
                (this.texts = []),
                (this.attributes = []),
                (this.removes = []),
                (this.mapRemoves = []),
                (this.movedMap = {}),
                (this.addedSet = new Set()),
                (this.movedSet = new Set()),
                (this.droppedSet = new Set()),
                (this.processMutations = (t) => {
                    t.forEach(this.processMutation), this.emit();
                }),
                (this.emit = () => {
                    if (this.frozen || this.locked) return;
                    let t = [],
                        r = new dt(),
                        n = (a) => {
                            let s = a,
                                c = he;
                            for (; c === he; ) (s = s && s.nextSibling), (c = s && this.mirror.getId(s));
                            return c;
                        },
                        o = (a) => {
                            var s, c, d, u;
                            let m = null;
                            ((c = (s = a.getRootNode) === null || s === void 0 ? void 0 : s.call(a)) === null || c === void 0 ? void 0 : c.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && a.getRootNode().host && (m = a.getRootNode().host);
                            let h = m;
                            for (; ((u = (d = h?.getRootNode) === null || d === void 0 ? void 0 : d.call(h)) === null || u === void 0 ? void 0 : u.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && h.getRootNode().host; )
                                h = h.getRootNode().host;
                            let p = !this.doc.contains(a) && (!h || !this.doc.contains(h));
                            if (!a.parentNode || p) return;
                            let S = ge(a.parentNode) ? this.mirror.getId(m) : this.mirror.getId(a.parentNode),
                                b = n(a);
                            if (S === -1 || b === -1) return r.addNode(a);
                            let A = pe(a, {
                                doc: this.doc,
                                mirror: this.mirror,
                                blockClass: this.blockClass,
                                blockSelector: this.blockSelector,
                                maskTextClass: this.maskTextClass,
                                maskTextSelector: this.maskTextSelector,
                                skipChild: !0,
                                newlyAddedElement: !0,
                                inlineStylesheet: this.inlineStylesheet,
                                maskInputOptions: this.maskInputOptions,
                                maskTextFn: this.maskTextFn,
                                maskInputFn: this.maskInputFn,
                                slimDOMOptions: this.slimDOMOptions,
                                dataURLOptions: this.dataURLOptions,
                                recordCanvas: this.recordCanvas,
                                inlineImages: this.inlineImages,
                                onSerialize: (g) => {
                                    Be(g, this.mirror) && this.iframeManager.addIframe(g), Ge(g, this.mirror) && this.stylesheetManager.trackLinkElement(g), Ue(a) && this.shadowDomManager.addShadowRoot(a.shadowRoot, this.doc);
                                },
                                onIframeLoad: (g, y) => {
                                    this.iframeManager.attachIframe(g, y), this.shadowDomManager.observeAttachShadow(g);
                                },
                                onStylesheetLoad: (g, y) => {
                                    this.stylesheetManager.attachLinkElement(g, y);
                                },
                            });
                            A && t.push({ parentId: S, nextId: b, node: A });
                        };
                    for (; this.mapRemoves.length; ) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                    for (let a of Array.from(this.movedSet.values())) (Dt(this.removes, a, this.mirror) && !this.movedSet.has(a.parentNode)) || o(a);
                    for (let a of Array.from(this.addedSet.values())) (!Ft(this.droppedSet, a) && !Dt(this.removes, a, this.mirror)) || Ft(this.movedSet, a) ? o(a) : this.droppedSet.add(a);
                    let i = null;
                    for (; r.length; ) {
                        let a = null;
                        if (i) {
                            let s = this.mirror.getId(i.value.parentNode),
                                c = n(i.value);
                            s !== -1 && c !== -1 && (a = i);
                        }
                        if (!a)
                            for (let s = r.length - 1; s >= 0; s--) {
                                let c = r.get(s);
                                if (c) {
                                    let d = this.mirror.getId(c.value.parentNode);
                                    if (n(c.value) === -1) continue;
                                    if (d !== -1) {
                                        a = c;
                                        break;
                                    } else {
                                        let m = c.value;
                                        if (m.parentNode && m.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                            let h = m.parentNode.host;
                                            if (this.mirror.getId(h) !== -1) {
                                                a = c;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        if (!a) {
                            for (; r.head; ) r.removeNode(r.head.value);
                            break;
                        }
                        (i = a.previous), r.removeNode(a.value), o(a.value);
                    }
                    let l = {
                        texts: this.texts.map((a) => ({ id: this.mirror.getId(a.node), value: a.value })).filter((a) => this.mirror.has(a.id)),
                        attributes: this.attributes.map((a) => ({ id: this.mirror.getId(a.node), attributes: a.attributes })).filter((a) => this.mirror.has(a.id)),
                        removes: this.removes,
                        adds: t,
                    };
                    (!l.texts.length && !l.attributes.length && !l.removes.length && !l.adds.length) ||
                        ((this.texts = []), (this.attributes = []), (this.removes = []), (this.addedSet = new Set()), (this.movedSet = new Set()), (this.droppedSet = new Set()), (this.movedMap = {}), this.mutationCb(l));
                }),
                (this.processMutation = (t) => {
                    if (!We(t.target, this.mirror))
                        switch (t.type) {
                            case "characterData": {
                                let r = t.target.textContent;
                                !W(t.target, this.blockClass, this.blockSelector, !1) &&
                                    r !== t.oldValue &&
                                    this.texts.push({ value: at(t.target, this.maskTextClass, this.maskTextSelector) && r ? (this.maskTextFn ? this.maskTextFn(r) : r.replace(/[\S]/g, "*")) : r, node: t.target });
                                break;
                            }
                            case "attributes": {
                                let r = t.target,
                                    n = t.target.getAttribute(t.attributeName);
                                if (
                                    (t.attributeName === "value" && (n = ke({ maskInputOptions: this.maskInputOptions, tagName: t.target.tagName, type: t.target.getAttribute("type"), value: n, maskInputFn: this.maskInputFn })),
                                    W(t.target, this.blockClass, this.blockSelector, !1) || n === t.oldValue)
                                )
                                    return;
                                let o = this.attributes.find((i) => i.node === t.target);
                                if (r.tagName === "IFRAME" && t.attributeName === "src" && !this.keepIframeSrcFn(n))
                                    if (!r.contentDocument) t.attributeName = "rr_src";
                                    else return;
                                if ((o || ((o = { node: t.target, attributes: {} }), this.attributes.push(o)), t.attributeName === "style")) {
                                    let i = this.doc.createElement("span");
                                    t.oldValue && i.setAttribute("style", t.oldValue), (o.attributes.style === void 0 || o.attributes.style === null) && (o.attributes.style = {});
                                    let l = o.attributes.style;
                                    for (let a of Array.from(r.style)) {
                                        let s = r.style.getPropertyValue(a),
                                            c = r.style.getPropertyPriority(a);
                                        (s !== i.style.getPropertyValue(a) || c !== i.style.getPropertyPriority(a)) && (c === "" ? (l[a] = s) : (l[a] = [s, c]));
                                    }
                                    for (let a of Array.from(i.style)) r.style.getPropertyValue(a) === "" && (l[a] = !1);
                                } else o.attributes[t.attributeName] = st(this.doc, r.tagName, t.attributeName, n);
                                break;
                            }
                            case "childList": {
                                if (W(t.target, this.blockClass, this.blockSelector, !0)) return;
                                t.addedNodes.forEach((r) => this.genAdds(r, t.target)),
                                    t.removedNodes.forEach((r) => {
                                        let n = this.mirror.getId(r),
                                            o = ge(t.target) ? this.mirror.getId(t.target.host) : this.mirror.getId(t.target);
                                        W(t.target, this.blockClass, this.blockSelector, !1) ||
                                            We(r, this.mirror) ||
                                            !Rt(r, this.mirror) ||
                                            (this.addedSet.has(r)
                                                ? (ut(this.addedSet, r), this.droppedSet.add(r))
                                                : (this.addedSet.has(t.target) && n === -1) ||
                                                  lt(t.target, this.mirror) ||
                                                  (this.movedSet.has(r) && this.movedMap[xt(n, o)] ? ut(this.movedSet, r) : this.removes.push({ parentId: o, id: n, isShadow: ge(t.target) && me(t.target) ? !0 : void 0 })),
                                            this.mapRemoves.push(r));
                                    });
                                break;
                            }
                        }
                }),
                (this.genAdds = (t, r) => {
                    if (this.mirror.hasNode(t)) {
                        if (We(t, this.mirror)) return;
                        this.movedSet.add(t);
                        let n = null;
                        r && this.mirror.hasNode(r) && (n = this.mirror.getId(r)), n && n !== -1 && (this.movedMap[xt(this.mirror.getId(t), n)] = !0);
                    } else this.addedSet.add(t), this.droppedSet.delete(t);
                    W(t, this.blockClass, this.blockSelector, !1) || t.childNodes.forEach((n) => this.genAdds(n));
                });
        }
        init(t) {
            [
                "mutationCb",
                "blockClass",
                "blockSelector",
                "maskTextClass",
                "maskTextSelector",
                "inlineStylesheet",
                "maskInputOptions",
                "maskTextFn",
                "maskInputFn",
                "keepIframeSrcFn",
                "recordCanvas",
                "inlineImages",
                "slimDOMOptions",
                "dataURLOptions",
                "doc",
                "mirror",
                "iframeManager",
                "stylesheetManager",
                "shadowDomManager",
                "canvasManager",
            ].forEach((r) => {
                this[r] = t[r];
            });
        }
        freeze() {
            (this.frozen = !0), this.canvasManager.freeze();
        }
        unfreeze() {
            (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
        }
        isFrozen() {
            return this.frozen;
        }
        lock() {
            (this.locked = !0), this.canvasManager.lock();
        }
        unlock() {
            (this.locked = !1), this.canvasManager.unlock(), this.emit();
        }
        reset() {
            this.shadowDomManager.reset(), this.canvasManager.reset();
        }
    };
function ut(e, t) {
    e.delete(t), t.childNodes.forEach((r) => ut(e, r));
}
function Dt(e, t, r) {
    return e.length === 0 ? !1 : _t(e, t, r);
}
function _t(e, t, r) {
    let { parentNode: n } = t;
    if (!n) return !1;
    let o = r.getId(n);
    return e.some((i) => i.id === o) ? !0 : _t(e, n, r);
}
function Ft(e, t) {
    return e.size === 0 ? !1 : Wt(e, t);
}
function Wt(e, t) {
    let { parentNode: r } = t;
    return r ? (e.has(r) ? !0 : Wt(e, r)) : !1;
}
var fe = [],
    Ut = typeof CSSGroupingRule < "u",
    Ht = typeof CSSMediaRule < "u",
    Vt = typeof CSSSupportsRule < "u",
    Pt = typeof CSSConditionRule < "u";
function Le(e) {
    try {
        if ("composedPath" in e) {
            let t = e.composedPath();
            if (t.length) return t[0];
        } else if ("path" in e && e.path.length) return e.path[0];
        return e.target;
    } catch {
        return e.target;
    }
}
function ft(e, t) {
    var r, n;
    let o = new Ve();
    fe.push(o), o.init(e);
    let i = window.MutationObserver || window.__rrMutationObserver,
        l = (n = (r = window?.Zone) === null || r === void 0 ? void 0 : r.__symbol__) === null || n === void 0 ? void 0 : n.call(r, "MutationObserver");
    l && window[l] && (i = window[l]);
    let a = new i(o.processMutations.bind(o));
    return a.observe(t, { attributes: !0, attributeOldValue: !0, characterData: !0, characterDataOldValue: !0, childList: !0, subtree: !0 }), a;
}
function Vr({ mousemoveCb: e, sampling: t, doc: r, mirror: n }) {
    if (t.mousemove === !1) return () => {};
    let o = typeof t.mousemove == "number" ? t.mousemove : 50,
        i = typeof t.mousemoveCallback == "number" ? t.mousemoveCallback : 500,
        l = [],
        a,
        s = Ae((u) => {
            let m = Date.now() - a;
            e(
                l.map((h) => ((h.timeOffset -= m), h)),
                u
            ),
                (l = []),
                (a = null);
        }, i),
        c = Ae(
            (u) => {
                let m = Le(u),
                    { clientX: h, clientY: p } = ct(u) ? u.changedTouches[0] : u;
                a || (a = Date.now()), l.push({ x: h, y: p, id: n.getId(m), timeOffset: Date.now() - a }), s(typeof DragEvent < "u" && u instanceof DragEvent ? w.Drag : u instanceof MouseEvent ? w.MouseMove : w.TouchMove);
            },
            o,
            { trailing: !1 }
        ),
        d = [K("mousemove", c, r), K("touchmove", c, r), K("drag", c, r)];
    return () => {
        d.forEach((u) => u());
    };
}
function Pr({ mouseInteractionCb: e, doc: t, mirror: r, blockClass: n, blockSelector: o, sampling: i }) {
    if (i.mouseInteraction === !1) return () => {};
    let l = i.mouseInteraction === !0 || i.mouseInteraction === void 0 ? {} : i.mouseInteraction,
        a = [],
        s = (c) => (d) => {
            let u = Le(d);
            if (W(u, n, o, !0)) return;
            let m = ct(d) ? d.changedTouches[0] : d;
            if (!m) return;
            let h = r.getId(u),
                { clientX: p, clientY: S } = m;
            e({ type: He[c], id: h, x: p, y: S });
        };
    return (
        Object.keys(He)
            .filter((c) => Number.isNaN(Number(c)) && !c.endsWith("_Departed") && l[c] !== !1)
            .forEach((c) => {
                let d = c.toLowerCase(),
                    u = s(c);
                a.push(K(d, u, t));
            }),
        () => {
            a.forEach((c) => c());
        }
    );
}
function pt({ scrollCb: e, doc: t, mirror: r, blockClass: n, blockSelector: o, sampling: i }) {
    let l = Ae((a) => {
        let s = Le(a);
        if (!s || W(s, n, o, !0)) return;
        let c = r.getId(s);
        if (s === t) {
            let d = t.scrollingElement || t.documentElement;
            e({ id: c, x: d.scrollLeft, y: d.scrollTop });
        } else e({ id: c, x: s.scrollLeft, y: s.scrollTop });
    }, i.scroll || 100);
    return K("scroll", l, t);
}
function Zr({ viewportResizeCb: e }) {
    let t = -1,
        r = -1,
        n = Ae(() => {
            let o = Fe(),
                i = _e();
            (t !== o || r !== i) && (e({ width: Number(i), height: Number(o) }), (t = o), (r = i));
        }, 200);
    return K("resize", n, window);
}
function Bt(e, t) {
    let r = Object.assign({}, e);
    return t || delete r.userTriggered, r;
}
var Kr = ["INPUT", "TEXTAREA", "SELECT"],
    Gt = new WeakMap();
function zr({ inputCb: e, doc: t, mirror: r, blockClass: n, blockSelector: o, ignoreClass: i, maskInputOptions: l, maskInputFn: a, sampling: s, userTriggeredOnInput: c }) {
    function d(A) {
        let g = Le(A),
            y = A.isTrusted;
        if ((g && g.tagName === "OPTION" && (g = g.parentElement), !g || !g.tagName || Kr.indexOf(g.tagName) < 0 || W(g, n, o, !0))) return;
        let R = g.type;
        if (g.classList.contains(i)) return;
        let P = g.value,
            H = !1;
        R === "radio" || R === "checkbox" ? (H = g.checked) : (l[g.tagName.toLowerCase()] || l[R]) && (P = ke({ maskInputOptions: l, tagName: g.tagName, type: R, value: P, maskInputFn: a })),
            u(g, Bt({ text: P, isChecked: H, userTriggered: y }, c));
        let f = g.name;
        R === "radio" &&
            f &&
            H &&
            t.querySelectorAll(`input[type="radio"][name="${f}"]`).forEach((C) => {
                C !== g && u(C, Bt({ text: C.value, isChecked: !H, userTriggered: !1 }, c));
            });
    }
    function u(A, g) {
        let y = Gt.get(A);
        if (!y || y.text !== g.text || y.isChecked !== g.isChecked) {
            Gt.set(A, g);
            let R = r.getId(A);
            e(Object.assign(Object.assign({}, g), { id: R }));
        }
    }
    let h = (s.input === "last" ? ["change"] : ["input", "change"]).map((A) => K(A, d, t)),
        p = t.defaultView;
    if (!p)
        return () => {
            h.forEach((A) => A());
        };
    let S = p.Object.getOwnPropertyDescriptor(p.HTMLInputElement.prototype, "value"),
        b = [
            [p.HTMLInputElement.prototype, "value"],
            [p.HTMLInputElement.prototype, "checked"],
            [p.HTMLSelectElement.prototype, "value"],
            [p.HTMLTextAreaElement.prototype, "value"],
            [p.HTMLSelectElement.prototype, "selectedIndex"],
            [p.HTMLOptionElement.prototype, "selected"],
        ];
    return (
        S &&
            S.set &&
            h.push(
                ...b.map((A) =>
                    ye(
                        A[0],
                        A[1],
                        {
                            set() {
                                d({ target: this });
                            },
                        },
                        !1,
                        p
                    )
                )
            ),
        () => {
            h.forEach((A) => A());
        }
    );
}
function Pe(e) {
    let t = [];
    function r(n, o) {
        if ((Ut && n.parentRule instanceof CSSGroupingRule) || (Ht && n.parentRule instanceof CSSMediaRule) || (Vt && n.parentRule instanceof CSSSupportsRule) || (Pt && n.parentRule instanceof CSSConditionRule)) {
            let l = Array.from(n.parentRule.cssRules).indexOf(n);
            o.unshift(l);
        } else if (n.parentStyleSheet) {
            let l = Array.from(n.parentStyleSheet.cssRules).indexOf(n);
            o.unshift(l);
        }
        return o;
    }
    return r(e, t);
}
function ue(e, t, r) {
    let n, o;
    return e ? (e.ownerNode ? (n = t.getId(e.ownerNode)) : (o = r.getId(e)), { styleId: o, id: n }) : {};
}
function Yr({ styleSheetRuleCb: e, mirror: t, stylesheetManager: r }, { win: n }) {
    let o = n.CSSStyleSheet.prototype.insertRule;
    n.CSSStyleSheet.prototype.insertRule = function (d, u) {
        let { id: m, styleId: h } = ue(this, t, r.styleMirror);
        return ((m && m !== -1) || (h && h !== -1)) && e({ id: m, styleId: h, adds: [{ rule: d, index: u }] }), o.apply(this, [d, u]);
    };
    let i = n.CSSStyleSheet.prototype.deleteRule;
    n.CSSStyleSheet.prototype.deleteRule = function (d) {
        let { id: u, styleId: m } = ue(this, t, r.styleMirror);
        return ((u && u !== -1) || (m && m !== -1)) && e({ id: u, styleId: m, removes: [{ index: d }] }), i.apply(this, [d]);
    };
    let l;
    n.CSSStyleSheet.prototype.replace &&
        ((l = n.CSSStyleSheet.prototype.replace),
        (n.CSSStyleSheet.prototype.replace = function (d) {
            let { id: u, styleId: m } = ue(this, t, r.styleMirror);
            return ((u && u !== -1) || (m && m !== -1)) && e({ id: u, styleId: m, replace: d }), l.apply(this, [d]);
        }));
    let a;
    n.CSSStyleSheet.prototype.replaceSync &&
        ((a = n.CSSStyleSheet.prototype.replaceSync),
        (n.CSSStyleSheet.prototype.replaceSync = function (d) {
            let { id: u, styleId: m } = ue(this, t, r.styleMirror);
            return ((u && u !== -1) || (m && m !== -1)) && e({ id: u, styleId: m, replaceSync: d }), a.apply(this, [d]);
        }));
    let s = {};
    Ut ? (s.CSSGroupingRule = n.CSSGroupingRule) : (Ht && (s.CSSMediaRule = n.CSSMediaRule), Pt && (s.CSSConditionRule = n.CSSConditionRule), Vt && (s.CSSSupportsRule = n.CSSSupportsRule));
    let c = {};
    return (
        Object.entries(s).forEach(([d, u]) => {
            (c[d] = { insertRule: u.prototype.insertRule, deleteRule: u.prototype.deleteRule }),
                (u.prototype.insertRule = function (m, h) {
                    let { id: p, styleId: S } = ue(this.parentStyleSheet, t, r.styleMirror);
                    return ((p && p !== -1) || (S && S !== -1)) && e({ id: p, styleId: S, adds: [{ rule: m, index: [...Pe(this), h || 0] }] }), c[d].insertRule.apply(this, [m, h]);
                }),
                (u.prototype.deleteRule = function (m) {
                    let { id: h, styleId: p } = ue(this.parentStyleSheet, t, r.styleMirror);
                    return ((h && h !== -1) || (p && p !== -1)) && e({ id: h, styleId: p, removes: [{ index: [...Pe(this), m] }] }), c[d].deleteRule.apply(this, [m]);
                });
        }),
        () => {
            (n.CSSStyleSheet.prototype.insertRule = o),
                (n.CSSStyleSheet.prototype.deleteRule = i),
                l && (n.CSSStyleSheet.prototype.replace = l),
                a && (n.CSSStyleSheet.prototype.replaceSync = a),
                Object.entries(s).forEach(([d, u]) => {
                    (u.prototype.insertRule = c[d].insertRule), (u.prototype.deleteRule = c[d].deleteRule);
                });
        }
    );
}
function mt({ mirror: e, stylesheetManager: t }, r) {
    var n, o, i;
    let l = null;
    r.nodeName === "#document" ? (l = e.getId(r)) : (l = e.getId(r.host));
    let a = r.nodeName === "#document" ? ((n = r.defaultView) === null || n === void 0 ? void 0 : n.Document) : (i = (o = r.ownerDocument) === null || o === void 0 ? void 0 : o.defaultView) === null || i === void 0 ? void 0 : i.ShadowRoot,
        s = Object.getOwnPropertyDescriptor(a?.prototype, "adoptedStyleSheets");
    return l === null || l === -1 || !a || !s
        ? () => {}
        : (Object.defineProperty(r, "adoptedStyleSheets", {
              configurable: s.configurable,
              enumerable: s.enumerable,
              get() {
                  var c;
                  return (c = s.get) === null || c === void 0 ? void 0 : c.call(this);
              },
              set(c) {
                  var d;
                  let u = (d = s.set) === null || d === void 0 ? void 0 : d.call(this, c);
                  if (l !== null && l !== -1)
                      try {
                          t.adoptStyleSheets(c, l);
                      } catch {}
                  return u;
              },
          }),
          () => {
              Object.defineProperty(r, "adoptedStyleSheets", { configurable: s.configurable, enumerable: s.enumerable, get: s.get, set: s.set });
          });
}
function Jr({ styleDeclarationCb: e, mirror: t, ignoreCSSAttributes: r, stylesheetManager: n }, { win: o }) {
    let i = o.CSSStyleDeclaration.prototype.setProperty;
    o.CSSStyleDeclaration.prototype.setProperty = function (a, s, c) {
        var d;
        if (r.has(a)) return i.apply(this, [a, s, c]);
        let { id: u, styleId: m } = ue((d = this.parentRule) === null || d === void 0 ? void 0 : d.parentStyleSheet, t, n.styleMirror);
        return ((u && u !== -1) || (m && m !== -1)) && e({ id: u, styleId: m, set: { property: a, value: s, priority: c }, index: Pe(this.parentRule) }), i.apply(this, [a, s, c]);
    };
    let l = o.CSSStyleDeclaration.prototype.removeProperty;
    return (
        (o.CSSStyleDeclaration.prototype.removeProperty = function (a) {
            var s;
            if (r.has(a)) return l.apply(this, [a]);
            let { id: c, styleId: d } = ue((s = this.parentRule) === null || s === void 0 ? void 0 : s.parentStyleSheet, t, n.styleMirror);
            return ((c && c !== -1) || (d && d !== -1)) && e({ id: c, styleId: d, remove: { property: a }, index: Pe(this.parentRule) }), l.apply(this, [a]);
        }),
        () => {
            (o.CSSStyleDeclaration.prototype.setProperty = i), (o.CSSStyleDeclaration.prototype.removeProperty = l);
        }
    );
}
function Qr({ mediaInteractionCb: e, blockClass: t, blockSelector: r, mirror: n, sampling: o }) {
    let i = (a) =>
            Ae((s) => {
                let c = Le(s);
                if (!c || W(c, t, r, !0)) return;
                let { currentTime: d, volume: u, muted: m, playbackRate: h } = c;
                e({ type: a, id: n.getId(c), currentTime: d, volume: u, muted: m, playbackRate: h });
            }, o.media || 500),
        l = [K("play", i(0)), K("pause", i(1)), K("seeked", i(2)), K("volumechange", i(3)), K("ratechange", i(4))];
    return () => {
        l.forEach((a) => a());
    };
}
function jr({ fontCb: e, doc: t }) {
    let r = t.defaultView;
    if (!r) return () => {};
    let n = [],
        o = new WeakMap(),
        i = r.FontFace;
    r.FontFace = function (s, c, d) {
        let u = new i(s, c, d);
        return o.set(u, { family: s, buffer: typeof c != "string", descriptors: d, fontSource: typeof c == "string" ? c : JSON.stringify(Array.from(new Uint8Array(c))) }), u;
    };
    let l = ne(t.fonts, "add", function (a) {
        return function (s) {
            return (
                setTimeout(() => {
                    let c = o.get(s);
                    c && (e(c), o.delete(s));
                }, 0),
                a.apply(this, [s])
            );
        };
    });
    return (
        n.push(() => {
            r.FontFace = i;
        }),
        n.push(l),
        () => {
            n.forEach((a) => a());
        }
    );
}
function qr(e) {
    let { doc: t, mirror: r, blockClass: n, blockSelector: o, selectionCb: i } = e,
        l = !0,
        a = () => {
            let s = t.getSelection();
            if (!s || (l && s?.isCollapsed)) return;
            l = s.isCollapsed || !1;
            let c = [],
                d = s.rangeCount || 0;
            for (let u = 0; u < d; u++) {
                let m = s.getRangeAt(u),
                    { startContainer: h, startOffset: p, endContainer: S, endOffset: b } = m;
                W(h, n, o, !0) || W(S, n, o, !0) || c.push({ start: r.getId(h), startOffset: p, end: r.getId(S), endOffset: b });
            }
            i({ ranges: c });
        };
    return a(), K("selectionchange", a);
}
function Xr(e, t) {
    let { mutationCb: r, mousemoveCb: n, mouseInteractionCb: o, scrollCb: i, viewportResizeCb: l, inputCb: a, mediaInteractionCb: s, styleSheetRuleCb: c, styleDeclarationCb: d, canvasMutationCb: u, fontCb: m, selectionCb: h } = e;
    (e.mutationCb = (...p) => {
        t.mutation && t.mutation(...p), r(...p);
    }),
        (e.mousemoveCb = (...p) => {
            t.mousemove && t.mousemove(...p), n(...p);
        }),
        (e.mouseInteractionCb = (...p) => {
            t.mouseInteraction && t.mouseInteraction(...p), o(...p);
        }),
        (e.scrollCb = (...p) => {
            t.scroll && t.scroll(...p), i(...p);
        }),
        (e.viewportResizeCb = (...p) => {
            t.viewportResize && t.viewportResize(...p), l(...p);
        }),
        (e.inputCb = (...p) => {
            t.input && t.input(...p), a(...p);
        }),
        (e.mediaInteractionCb = (...p) => {
            t.mediaInteaction && t.mediaInteaction(...p), s(...p);
        }),
        (e.styleSheetRuleCb = (...p) => {
            t.styleSheetRule && t.styleSheetRule(...p), c(...p);
        }),
        (e.styleDeclarationCb = (...p) => {
            t.styleDeclaration && t.styleDeclaration(...p), d(...p);
        }),
        (e.canvasMutationCb = (...p) => {
            t.canvasMutation && t.canvasMutation(...p), u(...p);
        }),
        (e.fontCb = (...p) => {
            t.font && t.font(...p), m(...p);
        }),
        (e.selectionCb = (...p) => {
            t.selection && t.selection(...p), h(...p);
        });
}
function Zt(e, t = {}) {
    let r = e.doc.defaultView;
    if (!r) return () => {};
    Xr(e, t);
    let n = ft(e, e.doc),
        o = Vr(e),
        i = Pr(e),
        l = pt(e),
        a = Zr(e),
        s = zr(e),
        c = Qr(e),
        d = Yr(e, { win: r }),
        u = mt(e, e.doc),
        m = Jr(e, { win: r }),
        h = e.collectFonts ? jr(e) : () => {},
        p = qr(e),
        S = [];
    for (let b of e.plugins) S.push(b.observer(b.callback, r, b.options));
    return () => {
        fe.forEach((b) => b.reset()), n.disconnect(), o(), i(), l(), a(), s(), c(), d(), u(), m(), h(), p(), S.forEach((b) => b());
    };
}
var Ne = class {
    constructor(t) {
        (this.generateIdFn = t), (this.iframeIdToRemoteIdMap = new WeakMap()), (this.iframeRemoteIdToIdMap = new WeakMap());
    }
    getId(t, r, n, o) {
        let i = n || this.getIdToRemoteIdMap(t),
            l = o || this.getRemoteIdToIdMap(t),
            a = i.get(r);
        return a || ((a = this.generateIdFn()), i.set(r, a), l.set(a, r)), a;
    }
    getIds(t, r) {
        let n = this.getIdToRemoteIdMap(t),
            o = this.getRemoteIdToIdMap(t);
        return r.map((i) => this.getId(t, i, n, o));
    }
    getRemoteId(t, r, n) {
        let o = n || this.getRemoteIdToIdMap(t);
        if (typeof r != "number") return r;
        let i = o.get(r);
        return i || -1;
    }
    getRemoteIds(t, r) {
        let n = this.getRemoteIdToIdMap(t);
        return r.map((o) => this.getRemoteId(t, o, n));
    }
    reset(t) {
        if (!t) {
            (this.iframeIdToRemoteIdMap = new WeakMap()), (this.iframeRemoteIdToIdMap = new WeakMap());
            return;
        }
        this.iframeIdToRemoteIdMap.delete(t), this.iframeRemoteIdToIdMap.delete(t);
    }
    getIdToRemoteIdMap(t) {
        let r = this.iframeIdToRemoteIdMap.get(t);
        return r || ((r = new Map()), this.iframeIdToRemoteIdMap.set(t, r)), r;
    }
    getRemoteIdToIdMap(t) {
        let r = this.iframeRemoteIdToIdMap.get(t);
        return r || ((r = new Map()), this.iframeRemoteIdToIdMap.set(t, r)), r;
    }
};
var Ze = class {
    constructor(t) {
        (this.iframes = new WeakMap()),
            (this.crossOriginIframeMap = new WeakMap()),
            (this.crossOriginIframeMirror = new Ne(ot)),
            (this.mutationCb = t.mutationCb),
            (this.wrappedEmit = t.wrappedEmit),
            (this.stylesheetManager = t.stylesheetManager),
            (this.recordCrossOriginIframes = t.recordCrossOriginIframes),
            (this.crossOriginIframeStyleMirror = new Ne(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror))),
            (this.mirror = t.mirror),
            this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
    }
    addIframe(t) {
        this.iframes.set(t, !0), t.contentWindow && this.crossOriginIframeMap.set(t.contentWindow, t);
    }
    addLoadListener(t) {
        this.loadListener = t;
    }
    attachIframe(t, r) {
        var n;
        this.mutationCb({ adds: [{ parentId: this.mirror.getId(t), nextId: null, node: r }], removes: [], texts: [], attributes: [], isAttachIframe: !0 }),
            (n = this.loadListener) === null || n === void 0 || n.call(this, t),
            t.contentDocument && t.contentDocument.adoptedStyleSheets && t.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(t.contentDocument.adoptedStyleSheets, this.mirror.getId(t.contentDocument));
    }
    handleMessage(t) {
        if (t.data.type === "rrweb") {
            if (!t.source) return;
            let n = this.crossOriginIframeMap.get(t.source);
            if (!n) return;
            let o = this.transformCrossOriginEvent(n, t.data.event);
            o && this.wrappedEmit(o, t.data.isCheckout);
        }
    }
    transformCrossOriginEvent(t, r) {
        var n;
        switch (r.type) {
            case L.FullSnapshot:
                return (
                    this.crossOriginIframeMirror.reset(t),
                    this.crossOriginIframeStyleMirror.reset(t),
                    this.replaceIdOnNode(r.data.node, t),
                    {
                        timestamp: r.timestamp,
                        type: L.IncrementalSnapshot,
                        data: { source: w.Mutation, adds: [{ parentId: this.mirror.getId(t), nextId: null, node: r.data.node }], removes: [], texts: [], attributes: [], isAttachIframe: !0 },
                    }
                );
            case L.Meta:
            case L.Load:
            case L.DomContentLoaded:
                return !1;
            case L.Plugin:
                return r;
            case L.Custom:
                return this.replaceIds(r.data.payload, t, ["id", "parentId", "previousId", "nextId"]), r;
            case L.IncrementalSnapshot:
                switch (r.data.source) {
                    case w.Mutation:
                        return (
                            r.data.adds.forEach((o) => {
                                this.replaceIds(o, t, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(o.node, t);
                            }),
                            r.data.removes.forEach((o) => {
                                this.replaceIds(o, t, ["parentId", "id"]);
                            }),
                            r.data.attributes.forEach((o) => {
                                this.replaceIds(o, t, ["id"]);
                            }),
                            r.data.texts.forEach((o) => {
                                this.replaceIds(o, t, ["id"]);
                            }),
                            r
                        );
                    case w.Drag:
                    case w.TouchMove:
                    case w.MouseMove:
                        return (
                            r.data.positions.forEach((o) => {
                                this.replaceIds(o, t, ["id"]);
                            }),
                            r
                        );
                    case w.ViewportResize:
                        return !1;
                    case w.MediaInteraction:
                    case w.MouseInteraction:
                    case w.Scroll:
                    case w.CanvasMutation:
                    case w.Input:
                        return this.replaceIds(r.data, t, ["id"]), r;
                    case w.StyleSheetRule:
                    case w.StyleDeclaration:
                        return this.replaceIds(r.data, t, ["id"]), this.replaceStyleIds(r.data, t, ["styleId"]), r;
                    case w.Font:
                        return r;
                    case w.Selection:
                        return (
                            r.data.ranges.forEach((o) => {
                                this.replaceIds(o, t, ["start", "end"]);
                            }),
                            r
                        );
                    case w.AdoptedStyleSheet:
                        return (
                            this.replaceIds(r.data, t, ["id"]),
                            this.replaceStyleIds(r.data, t, ["styleIds"]),
                            (n = r.data.styles) === null ||
                                n === void 0 ||
                                n.forEach((o) => {
                                    this.replaceStyleIds(o, t, ["styleId"]);
                                }),
                            r
                        );
                }
        }
    }
    replace(t, r, n, o) {
        for (let i of o) (!Array.isArray(r[i]) && typeof r[i] != "number") || (Array.isArray(r[i]) ? (r[i] = t.getIds(n, r[i])) : (r[i] = t.getId(n, r[i])));
        return r;
    }
    replaceIds(t, r, n) {
        return this.replace(this.crossOriginIframeMirror, t, r, n);
    }
    replaceStyleIds(t, r, n) {
        return this.replace(this.crossOriginIframeStyleMirror, t, r, n);
    }
    replaceIdOnNode(t, r) {
        this.replaceIds(t, r, ["id"]),
            "childNodes" in t &&
                t.childNodes.forEach((n) => {
                    this.replaceIdOnNode(n, r);
                });
    }
};
var Ke = class {
    constructor(t) {
        (this.shadowDoms = new WeakSet()), (this.restorePatches = []), (this.mutationCb = t.mutationCb), (this.scrollCb = t.scrollCb), (this.bypassOptions = t.bypassOptions), (this.mirror = t.mirror);
        let r = this;
        this.restorePatches.push(
            ne(Element.prototype, "attachShadow", function (n) {
                return function (o) {
                    let i = n.call(this, o);
                    return this.shadowRoot && r.addShadowRoot(this.shadowRoot, this.ownerDocument), i;
                };
            })
        );
    }
    addShadowRoot(t, r) {
        me(t) &&
            (this.shadowDoms.has(t) ||
                (this.shadowDoms.add(t),
                ft(Object.assign(Object.assign({}, this.bypassOptions), { doc: r, mutationCb: this.mutationCb, mirror: this.mirror, shadowDomManager: this }), t),
                pt(Object.assign(Object.assign({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: t, mirror: this.mirror })),
                setTimeout(() => {
                    t.adoptedStyleSheets && t.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(t.adoptedStyleSheets, this.mirror.getId(t.host)),
                        mt({ mirror: this.mirror, stylesheetManager: this.bypassOptions.stylesheetManager }, t);
                }, 0)));
    }
    observeAttachShadow(t) {
        if (t.contentWindow) {
            let r = this;
            this.restorePatches.push(
                ne(t.contentWindow.HTMLElement.prototype, "attachShadow", function (n) {
                    return function (o) {
                        let i = n.call(this, o);
                        return this.shadowRoot && r.addShadowRoot(this.shadowRoot, t.contentDocument), i;
                    };
                })
            );
        }
    }
    reset() {
        this.restorePatches.forEach((t) => t()), (this.shadowDoms = new WeakSet());
    }
};
function Kt(e, t) {
    var r = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
        for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++) t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
    return r;
}
function zt(e, t, r, n) {
    function o(i) {
        return i instanceof r
            ? i
            : new r(function (l) {
                  l(i);
              });
    }
    return new (r || (r = Promise))(function (i, l) {
        function a(d) {
            try {
                c(n.next(d));
            } catch (u) {
                l(u);
            }
        }
        function s(d) {
            try {
                c(n.throw(d));
            } catch (u) {
                l(u);
            }
        }
        function c(d) {
            d.done ? i(d.value) : o(d.value).then(a, s);
        }
        c((n = n.apply(e, t || [])).next());
    });
}
var Ee = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    $r = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (Re = 0; Re < Ee.length; Re++) $r[Ee.charCodeAt(Re)] = Re;
var Re,
    Yt = function (e) {
        var t = new Uint8Array(e),
            r,
            n = t.length,
            o = "";
        for (r = 0; r < n; r += 3) (o += Ee[t[r] >> 2]), (o += Ee[((t[r] & 3) << 4) | (t[r + 1] >> 4)]), (o += Ee[((t[r + 1] & 15) << 2) | (t[r + 2] >> 6)]), (o += Ee[t[r + 2] & 63]);
        return n % 3 === 2 ? (o = o.substring(0, o.length - 1) + "=") : n % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="), o;
    };
var Jt = new Map();
function en(e, t) {
    let r = Jt.get(e);
    return r || ((r = new Map()), Jt.set(e, r)), r.has(t) || r.set(t, []), r.get(t);
}
var ht = (e, t, r) => {
    if (!e || !(Qt(e, t) || typeof e == "object")) return;
    let n = e.constructor.name,
        o = en(r, n),
        i = o.indexOf(e);
    return i === -1 && ((i = o.length), o.push(e)), i;
};
function ze(e, t, r) {
    if (e instanceof Array) return e.map((n) => ze(n, t, r));
    if (e === null) return e;
    if (
        e instanceof Float32Array ||
        e instanceof Float64Array ||
        e instanceof Int32Array ||
        e instanceof Uint32Array ||
        e instanceof Uint8Array ||
        e instanceof Uint16Array ||
        e instanceof Int16Array ||
        e instanceof Int8Array ||
        e instanceof Uint8ClampedArray
    )
        return { rr_type: e.constructor.name, args: [Object.values(e)] };
    if (e instanceof ArrayBuffer) {
        let n = e.constructor.name,
            o = Yt(e);
        return { rr_type: n, base64: o };
    } else {
        if (e instanceof DataView) return { rr_type: e.constructor.name, args: [ze(e.buffer, t, r), e.byteOffset, e.byteLength] };
        if (e instanceof HTMLImageElement) {
            let n = e.constructor.name,
                { src: o } = e;
            return { rr_type: n, src: o };
        } else if (e instanceof HTMLCanvasElement) {
            let n = "HTMLImageElement",
                o = e.toDataURL();
            return { rr_type: n, src: o };
        } else {
            if (e instanceof ImageData) return { rr_type: e.constructor.name, args: [ze(e.data, t, r), e.width, e.height] };
            if (Qt(e, t) || typeof e == "object") {
                let n = e.constructor.name,
                    o = ht(e, t, r);
                return { rr_type: n, index: o };
            }
        }
    }
    return e;
}
var Ye = (e, t, r) => [...e].map((n) => ze(n, t, r)),
    Qt = (e, t) =>
        !![
            "WebGLActiveInfo",
            "WebGLBuffer",
            "WebGLFramebuffer",
            "WebGLProgram",
            "WebGLRenderbuffer",
            "WebGLShader",
            "WebGLShaderPrecisionFormat",
            "WebGLTexture",
            "WebGLUniformLocation",
            "WebGLVertexArrayObject",
            "WebGLVertexArrayObjectOES",
        ]
            .filter((o) => typeof t[o] == "function")
            .find((o) => e instanceof t[o]);
function jt(e, t, r, n) {
    let o = [],
        i = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
    for (let l of i)
        try {
            if (typeof t.CanvasRenderingContext2D.prototype[l] != "function") continue;
            let a = ne(t.CanvasRenderingContext2D.prototype, l, function (s) {
                return function (...c) {
                    return (
                        W(this.canvas, r, n, !0) ||
                            setTimeout(() => {
                                let d = Ye([...c], t, this);
                                e(this.canvas, { type: ce["2D"], property: l, args: d });
                            }, 0),
                        s.apply(this, c)
                    );
                };
            });
            o.push(a);
        } catch {
            let s = ye(t.CanvasRenderingContext2D.prototype, l, {
                set(c) {
                    e(this.canvas, { type: ce["2D"], property: l, args: [c], setter: !0 });
                },
            });
            o.push(s);
        }
    return () => {
        o.forEach((l) => l());
    };
}
function gt(e, t, r) {
    let n = [];
    try {
        let o = ne(e.HTMLCanvasElement.prototype, "getContext", function (i) {
            return function (l, ...a) {
                return W(this, t, r, !0) || "__context" in this || (this.__context = l), i.apply(this, [l, ...a]);
            };
        });
        n.push(o);
    } catch {
        console.error("failed to patch HTMLCanvasElement.prototype.getContext");
    }
    return () => {
        n.forEach((o) => o());
    };
}
function qt(e, t, r, n, o, i, l) {
    let a = [],
        s = Object.getOwnPropertyNames(e);
    for (let c of s)
        if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(c))
            try {
                if (typeof e[c] != "function") continue;
                let d = ne(e, c, function (u) {
                    return function (...m) {
                        let h = u.apply(this, m);
                        if ((ht(h, l, this), !W(this.canvas, n, o, !0))) {
                            let p = Ye([...m], l, this),
                                S = { type: t, property: c, args: p };
                            r(this.canvas, S);
                        }
                        return h;
                    };
                });
                a.push(d);
            } catch {
                let u = ye(e, c, {
                    set(m) {
                        r(this.canvas, { type: t, property: c, args: [m], setter: !0 });
                    },
                });
                a.push(u);
            }
    return a;
}
function Xt(e, t, r, n, o) {
    let i = [];
    return (
        i.push(...qt(t.WebGLRenderingContext.prototype, ce.WebGL, e, r, n, o, t)),
        typeof t.WebGL2RenderingContext < "u" && i.push(...qt(t.WebGL2RenderingContext.prototype, ce.WebGL2, e, r, n, o, t)),
        () => {
            i.forEach((l) => l());
        }
    );
}
var yt = null;
try {
    ($t =
        (typeof module < "u" && typeof module.require == "function" && module.require("worker_threads")) ||
        (typeof __non_webpack_require__ == "function" && __non_webpack_require__("worker_threads")) ||
        (typeof $e == "function" && $e("worker_threads"))),
        (yt = $t.Worker);
} catch {}
var $t;
function tn(e, t) {
    return Buffer.from(e, "base64").toString(t ? "utf16" : "utf8");
}
function er(e, t, r) {
    var n = t === void 0 ? null : t,
        o = r === void 0 ? !1 : r,
        i = tn(e, o),
        l =
            i.indexOf(
                `
`,
                10
            ) + 1,
        a = i.substring(l) + (n ? "//# sourceMappingURL=" + n : "");
    return function (c) {
        return new yt(a, Object.assign({}, c, { eval: !0 }));
    };
}
function rn(e, t) {
    var r = atob(e);
    if (t) {
        for (var n = new Uint8Array(r.length), o = 0, i = r.length; o < i; ++o) n[o] = r.charCodeAt(o);
        return String.fromCharCode.apply(null, new Uint16Array(n.buffer));
    }
    return r;
}
function nn(e, t, r) {
    var n = t === void 0 ? null : t,
        o = r === void 0 ? !1 : r,
        i = rn(e, o),
        l =
            i.indexOf(
                `
`,
                10
            ) + 1,
        a = i.substring(l) + (n ? "//# sourceMappingURL=" + n : ""),
        s = new Blob([a], { type: "application/javascript" });
    return URL.createObjectURL(s);
}
function tr(e, t, r) {
    var n;
    return function (i) {
        return (n = n || nn(e, t, r)), new Worker(n, i);
    };
}
var on = Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]";
function rr() {
    return on;
}
function nr(e, t, r) {
    return rr() ? er(e, t, r) : tr(e, t, r);
}
var or = nr(
    "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55DQogICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLg0KDQogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkNCiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsDQogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1INCiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SDQogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqLw0KDQogICAgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikgew0KICAgICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7DQogICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfQ0KICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpOw0KICAgICAgICB9KTsNCiAgICB9CgogICAgLyoKICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj4KICAgICAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+CiAgICAgKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZQogICAgICovCiAgICB2YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7CiAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguCiAgICB2YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpOwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykgewogICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7CiAgICB9CiAgICB2YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7CiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykgewogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JzsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGJhc2U2NDsKICAgIH07CgogICAgY29uc3QgbGFzdEJsb2JNYXAgPSBuZXcgTWFwKCk7DQogICAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGZ1bmN0aW9uIGdldFRyYW5zcGFyZW50QmxvYkZvcih3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucykgew0KICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgICAgICAgICAgY29uc3QgaWQgPSBgJHt3aWR0aH0tJHtoZWlnaHR9YDsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50QmxvYk1hcC5oYXMoaWQpKQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwYXJlbnRCbG9iTWFwLmdldChpZCk7DQogICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsNCiAgICAgICAgICAgICAgICBvZmZzY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0geWllbGQgYmxvYi5hcnJheUJ1ZmZlcigpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7DQogICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZTY0Ow0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICcnOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgY29uc3Qgd29ya2VyID0gc2VsZjsNCiAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgYml0bWFwLCB3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucyB9ID0gZS5kYXRhOw0KICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IG9mZnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpOw0KICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYml0bWFwLCAwLCAwKTsNCiAgICAgICAgICAgICAgICBiaXRtYXAuY2xvc2UoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9iLnR5cGU7DQogICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSB5aWVsZCBibG9iLmFycmF5QnVmZmVyKCk7DQogICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZW5jb2RlKGFycmF5QnVmZmVyKTsNCiAgICAgICAgICAgICAgICBpZiAoIWxhc3RCbG9iTWFwLmhhcyhpZCkgJiYgKHlpZWxkIHRyYW5zcGFyZW50QmFzZTY0KSA9PT0gYmFzZTY0KSB7DQogICAgICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkIH0pOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgaWQsDQogICAgICAgICAgICAgICAgICAgIHR5cGUsDQogICAgICAgICAgICAgICAgICAgIGJhc2U2NCwNCiAgICAgICAgICAgICAgICAgICAgd2lkdGgsDQogICAgICAgICAgICAgICAgICAgIGhlaWdodCwNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfTsKCn0pKCk7Cgo=",
    null,
    !1
);
var Je = class {
    constructor(t) {
        (this.pendingCanvasMutations = new Map()),
            (this.rafStamps = { latestId: 0, invokeId: null }),
            (this.frozen = !1),
            (this.locked = !1),
            (this.processMutation = (s, c) => {
                ((this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId),
                    this.pendingCanvasMutations.has(s) || this.pendingCanvasMutations.set(s, []),
                    this.pendingCanvasMutations.get(s).push(c);
            });
        let { sampling: r = "all", win: n, blockClass: o, blockSelector: i, recordCanvas: l, dataURLOptions: a } = t;
        (this.mutationCb = t.mutationCb), (this.mirror = t.mirror), l && r === "all" && this.initCanvasMutationObserver(n, o, i), l && typeof r == "number" && this.initCanvasFPSObserver(r, n, o, i, { dataURLOptions: a });
    }
    reset() {
        this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
    }
    freeze() {
        this.frozen = !0;
    }
    unfreeze() {
        this.frozen = !1;
    }
    lock() {
        this.locked = !0;
    }
    unlock() {
        this.locked = !1;
    }
    initCanvasFPSObserver(t, r, n, o, i) {
        let l = gt(r, n, o),
            a = new Map(),
            s = new or();
        s.onmessage = (p) => {
            let { id: S } = p.data;
            if ((a.set(S, !1), !("base64" in p.data))) return;
            let { base64: b, type: A, width: g, height: y } = p.data;
            this.mutationCb({
                id: S,
                type: ce["2D"],
                commands: [
                    { property: "clearRect", args: [0, 0, g, y] },
                    { property: "drawImage", args: [{ rr_type: "ImageBitmap", args: [{ rr_type: "Blob", data: [{ rr_type: "ArrayBuffer", base64: b }], type: A }] }, 0, 0] },
                ],
            });
        };
        let c = 1e3 / t,
            d = 0,
            u,
            m = () => {
                let p = [];
                return (
                    r.document.querySelectorAll("canvas").forEach((S) => {
                        W(S, n, o, !0) || p.push(S);
                    }),
                    p
                );
            },
            h = (p) => {
                if (d && p - d < c) {
                    u = requestAnimationFrame(h);
                    return;
                }
                (d = p),
                    m().forEach((S) =>
                        zt(this, void 0, void 0, function* () {
                            var b;
                            let A = this.mirror.getId(S);
                            if (a.get(A)) return;
                            if ((a.set(A, !0), ["webgl", "webgl2"].includes(S.__context))) {
                                let y = S.getContext(S.__context);
                                ((b = y?.getContextAttributes()) === null || b === void 0 ? void 0 : b.preserveDrawingBuffer) === !1 && y?.clear(y.COLOR_BUFFER_BIT);
                            }
                            let g = yield createImageBitmap(S);
                            s.postMessage({ id: A, bitmap: g, width: S.width, height: S.height, dataURLOptions: i.dataURLOptions }, [g]);
                        })
                    ),
                    (u = requestAnimationFrame(h));
            };
        (u = requestAnimationFrame(h)),
            (this.resetObservers = () => {
                l(), cancelAnimationFrame(u);
            });
    }
    initCanvasMutationObserver(t, r, n) {
        this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
        let o = gt(t, r, n),
            i = jt(this.processMutation.bind(this), t, r, n),
            l = Xt(this.processMutation.bind(this), t, r, n, this.mirror);
        this.resetObservers = () => {
            o(), i(), l();
        };
    }
    startPendingCanvasMutationFlusher() {
        requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    startRAFTimestamping() {
        let t = (r) => {
            (this.rafStamps.latestId = r), requestAnimationFrame(t);
        };
        requestAnimationFrame(t);
    }
    flushPendingCanvasMutations() {
        this.pendingCanvasMutations.forEach((t, r) => {
            let n = this.mirror.getId(r);
            this.flushPendingCanvasMutationFor(r, n);
        }),
            requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    flushPendingCanvasMutationFor(t, r) {
        if (this.frozen || this.locked) return;
        let n = this.pendingCanvasMutations.get(t);
        if (!n || r === -1) return;
        let o = n.map((l) => Kt(l, ["type"])),
            { type: i } = n[0];
        this.mutationCb({ id: r, type: i, commands: o }), this.pendingCanvasMutations.delete(t);
    }
};
var Qe = class {
    constructor(t) {
        (this.trackedLinkElements = new WeakSet()), (this.styleMirror = new De()), (this.mutationCb = t.mutationCb), (this.adoptedStyleSheetCb = t.adoptedStyleSheetCb);
    }
    attachLinkElement(t, r) {
        "_cssText" in r.attributes && this.mutationCb({ adds: [], removes: [], texts: [], attributes: [{ id: r.id, attributes: r.attributes }] }), this.trackLinkElement(t);
    }
    trackLinkElement(t) {
        this.trackedLinkElements.has(t) || (this.trackedLinkElements.add(t), this.trackStylesheetInLinkElement(t));
    }
    adoptStyleSheets(t, r) {
        if (t.length === 0) return;
        let n = { id: r, styleIds: [] },
            o = [];
        for (let i of t) {
            let l;
            if (this.styleMirror.has(i)) l = this.styleMirror.getId(i);
            else {
                l = this.styleMirror.add(i);
                let a = Array.from(i.rules || CSSRule);
                o.push({ styleId: l, rules: a.map((s, c) => ({ rule: nt(s), index: c })) });
            }
            n.styleIds.push(l);
        }
        o.length > 0 && (n.styles = o), this.adoptedStyleSheetCb(n);
    }
    reset() {
        this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
    }
    trackStylesheetInLinkElement(t) {}
};
function V(e) {
    return Object.assign(Object.assign({}, e), { timestamp: Date.now() });
}
var B,
    je,
    It,
    qe = !1,
    oe = kt();
function Ie(e = {}) {
    let {
            emit: t,
            checkoutEveryNms: r,
            checkoutEveryNth: n,
            blockClass: o = "rr-block",
            blockSelector: i = null,
            ignoreClass: l = "rr-ignore",
            maskTextClass: a = "rr-mask",
            maskTextSelector: s = null,
            inlineStylesheet: c = !0,
            maskAllInputs: d,
            maskInputOptions: u,
            slimDOMOptions: m,
            maskInputFn: h,
            maskTextFn: p,
            hooks: S,
            packFn: b,
            sampling: A = {},
            dataURLOptions: g = {},
            mousemoveWait: y,
            recordCanvas: R = !1,
            recordCrossOriginIframes: P = !1,
            userTriggeredOnInput: H = !1,
            collectFonts: f = !1,
            inlineImages: C = !1,
            plugins: M,
            keepIframeSrcFn: I = () => !1,
            ignoreCSSAttributes: k = new Set([]),
        } = e,
        T = P ? window.parent === window : !0,
        N = !1;
    if (!T)
        try {
            window.parent.document, (N = !1);
        } catch {
            N = !0;
        }
    if (T && !t) throw new Error("emit function is required");
    y !== void 0 && A.mousemove === void 0 && (A.mousemove = y), oe.reset();
    let D =
            d === !0
                ? { color: !0, date: !0, "datetime-local": !0, email: !0, month: !0, number: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0, textarea: !0, select: !0, password: !0 }
                : u !== void 0
                ? u
                : { password: !0 },
        X =
            m === !0 || m === "all"
                ? { script: !0, comment: !0, headFavicon: !0, headWhitespace: !0, headMetaSocial: !0, headMetaRobots: !0, headMetaHttpEquiv: !0, headMetaVerification: !0, headMetaAuthorship: m === "all", headMetaDescKeywords: m === "all" }
                : m || {};
    Mt();
    let te,
        ie = 0,
        le = (E) => {
            for (let z of M || []) z.eventProcessor && (E = z.eventProcessor(E));
            return b && (E = b(E)), E;
        };
    B = (E, z) => {
        var Q;
        if ((!((Q = fe[0]) === null || Q === void 0) && Q.isFrozen() && E.type !== L.FullSnapshot && !(E.type === L.IncrementalSnapshot && E.data.source === w.Mutation) && fe.forEach((F) => F.unfreeze()), T)) t?.(le(E), z);
        else if (N) {
            let F = { type: "rrweb", event: le(E), isCheckout: z };
            window.parent.postMessage(F, "*");
        }
        if (E.type === L.FullSnapshot) (te = E), (ie = 0);
        else if (E.type === L.IncrementalSnapshot) {
            if (E.data.source === w.Mutation && E.data.isAttachIframe) return;
            ie++;
            let F = n && ie >= n,
                ee = r && E.timestamp - te.timestamp > r;
            (F || ee) && je(!0);
        }
    };
    let J = (E) => {
            B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.Mutation }, E) }));
        },
        $ = (E) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.Scroll }, E) })),
        de = (E) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.CanvasMutation }, E) })),
        G = (E) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.AdoptedStyleSheet }, E) })),
        re = new Qe({ mutationCb: J, adoptedStyleSheetCb: G }),
        se = new Ze({ mirror: oe, mutationCb: J, stylesheetManager: re, recordCrossOriginIframes: P, wrappedEmit: B });
    for (let E of M || []) E.getMirror && E.getMirror({ nodeMirror: oe, crossOriginIframeMirror: se.crossOriginIframeMirror, crossOriginIframeStyleMirror: se.crossOriginIframeStyleMirror });
    It = new Je({ recordCanvas: R, mutationCb: de, win: window, blockClass: o, blockSelector: i, mirror: oe, sampling: A.canvas, dataURLOptions: g });
    let Ce = new Ke({
        mutationCb: J,
        scrollCb: $,
        bypassOptions: {
            blockClass: o,
            blockSelector: i,
            maskTextClass: a,
            maskTextSelector: s,
            inlineStylesheet: c,
            maskInputOptions: D,
            dataURLOptions: g,
            maskTextFn: p,
            maskInputFn: h,
            recordCanvas: R,
            inlineImages: C,
            sampling: A,
            slimDOMOptions: X,
            iframeManager: se,
            stylesheetManager: re,
            canvasManager: It,
            keepIframeSrcFn: I,
        },
        mirror: oe,
    });
    je = (E = !1) => {
        var z, Q, F, ee, O, j;
        B(V({ type: L.Meta, data: { href: window.location.href, width: _e(), height: Fe() } }), E), re.reset(), fe.forEach((Y) => Y.lock());
        let Te = Lt(document, {
            mirror: oe,
            blockClass: o,
            blockSelector: i,
            maskTextClass: a,
            maskTextSelector: s,
            inlineStylesheet: c,
            maskAllInputs: D,
            maskTextFn: p,
            slimDOM: X,
            dataURLOptions: g,
            recordCanvas: R,
            inlineImages: C,
            onSerialize: (Y) => {
                Be(Y, oe) && se.addIframe(Y), Ge(Y, oe) && re.trackLinkElement(Y), Ue(Y) && Ce.addShadowRoot(Y.shadowRoot, document);
            },
            onIframeLoad: (Y, Xe) => {
                se.attachIframe(Y, Xe), Ce.observeAttachShadow(Y);
            },
            onStylesheetLoad: (Y, Xe) => {
                re.attachLinkElement(Y, Xe);
            },
            keepIframeSrcFn: I,
        });
        if (!Te) return console.warn("Failed to snapshot the document");
        B(
            V({
                type: L.FullSnapshot,
                data: {
                    node: Te,
                    initialOffset: {
                        left:
                            window.pageXOffset !== void 0
                                ? window.pageXOffset
                                : document?.documentElement.scrollLeft ||
                                  ((Q = (z = document?.body) === null || z === void 0 ? void 0 : z.parentElement) === null || Q === void 0 ? void 0 : Q.scrollLeft) ||
                                  ((F = document?.body) === null || F === void 0 ? void 0 : F.scrollLeft) ||
                                  0,
                        top:
                            window.pageYOffset !== void 0
                                ? window.pageYOffset
                                : document?.documentElement.scrollTop ||
                                  ((O = (ee = document?.body) === null || ee === void 0 ? void 0 : ee.parentElement) === null || O === void 0 ? void 0 : O.scrollTop) ||
                                  ((j = document?.body) === null || j === void 0 ? void 0 : j.scrollTop) ||
                                  0,
                    },
                },
            })
        ),
            fe.forEach((Y) => Y.unlock()),
            document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && re.adoptStyleSheets(document.adoptedStyleSheets, oe.getId(document));
    };
    try {
        let E = [];
        E.push(
            K("DOMContentLoaded", () => {
                B(V({ type: L.DomContentLoaded, data: {} }));
            })
        );
        let z = (F) => {
            var ee;
            return Zt(
                {
                    mutationCb: J,
                    mousemoveCb: (O, j) => B(V({ type: L.IncrementalSnapshot, data: { source: j, positions: O } })),
                    mouseInteractionCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.MouseInteraction }, O) })),
                    scrollCb: $,
                    viewportResizeCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.ViewportResize }, O) })),
                    inputCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.Input }, O) })),
                    mediaInteractionCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.MediaInteraction }, O) })),
                    styleSheetRuleCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.StyleSheetRule }, O) })),
                    styleDeclarationCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.StyleDeclaration }, O) })),
                    canvasMutationCb: de,
                    fontCb: (O) => B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.Font }, O) })),
                    selectionCb: (O) => {
                        B(V({ type: L.IncrementalSnapshot, data: Object.assign({ source: w.Selection }, O) }));
                    },
                    blockClass: o,
                    ignoreClass: l,
                    maskTextClass: a,
                    maskTextSelector: s,
                    maskInputOptions: D,
                    inlineStylesheet: c,
                    sampling: A,
                    recordCanvas: R,
                    inlineImages: C,
                    userTriggeredOnInput: H,
                    collectFonts: f,
                    doc: F,
                    maskInputFn: h,
                    maskTextFn: p,
                    keepIframeSrcFn: I,
                    blockSelector: i,
                    slimDOMOptions: X,
                    dataURLOptions: g,
                    mirror: oe,
                    iframeManager: se,
                    stylesheetManager: re,
                    shadowDomManager: Ce,
                    canvasManager: It,
                    ignoreCSSAttributes: k,
                    plugins:
                        ((ee = M?.filter((O) => O.observer)) === null || ee === void 0
                            ? void 0
                            : ee.map((O) => ({ observer: O.observer, options: O.options, callback: (j) => B(V({ type: L.Plugin, data: { plugin: O.name, payload: j } })) }))) || [],
                },
                S
            );
        };
        se.addLoadListener((F) => {
            E.push(z(F.contentDocument));
        });
        let Q = () => {
            je(), E.push(z(document)), (qe = !0);
        };
        return (
            document.readyState === "interactive" || document.readyState === "complete"
                ? Q()
                : E.push(
                      K(
                          "load",
                          () => {
                              B(V({ type: L.Load, data: {} })), Q();
                          },
                          window
                      )
                  ),
            () => {
                E.forEach((F) => F()), (qe = !1);
            }
        );
    } catch (E) {
        console.warn(E);
    }
}
Ie.addCustomEvent = (e, t) => {
    if (!qe) throw new Error("please add custom event after start recording");
    B(V({ type: L.Custom, data: { tag: e, payload: t } }));
};
Ie.freezePage = () => {
    fe.forEach((e) => e.freeze());
};
Ie.takeFullSnapshot = (e) => {
    if (!qe) throw new Error("please take full snapshot after start recording");
    je(e);
};
Ie.mirror = oe;
var ir = [],
    sr = () => {
        let e = Ie({
            emit(t) {
                ir.push(t), window.parent.postMessage({ type: "RRWEB_EVENT", event: t }, "*");
            },
            maskInputOptions: { password: !0 },
            maskTextSelector: "input, textarea",
            ignoreClass: "rrweb-ignore",
        });
        return (
            setInterval(() => {
                ir = [];
            }, 6e4),
            e
        );
    };
var an = (e) => {
        let t = (r) => {
            let o = { type: "node", children: [], attrs: [...r.attributes].reduce((i, l) => ((i[l.name] = l.value), i), {}), tagName: r.tagName, data: Oe(r) };
            return (
                [...r.childNodes].forEach((i) => {
                    i instanceof HTMLElement ? o.children.push(t(i)) : i instanceof Text && o.children.push({ type: "text", textContent: i.textContent || "" });
                }),
                o
            );
        };
        return t(e);
    },
    ar = async () => {
        await Ct();
        let e = an(document.querySelector("#root"));
        _({ type: "COMPONENT_TREE", payload: { tree: e } });
    };
var lr = () => {
    window.addEventListener(
        "keydown",
        (e) => {
            let t = [];
            e.metaKey && t.push("Meta"), e.ctrlKey && t.push("Ctrl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift");
            let r = e.key !== "Meta" && e.key !== "Control" && e.key !== "Alt" && e.key !== "Shift" ? e.key : "",
                n = [...t, r].filter(Boolean).join("+");
            ["Meta+z", "Meta+Backspace", "Meta+d"].includes(n) && e.preventDefault(),
                n && _({ type: "KEYBIND", payload: { compositeKey: n, rawEvent: { key: e.key, code: e.code, metaKey: e.metaKey, ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey }, timestamp: Date.now() } });
        },
        { passive: !0 }
    );
};
window.LOV_SELECTOR_SCRIPT_VERSION = "1.0.5";
var Me = (e) => e.hasAttribute("data-lov-id") || e.hasAttribute("data-component-path"),
    cr = (e) => {
        if (!e) return {};
        let [t, r, n] = e.split(":");
        return { filePath: t, lineNumber: parseInt(r || "0", 10), col: parseInt(n || "0", 10) };
    },
    q = (e) => {
        let t = e.getAttribute("data-lov-id") || "";
        if (t) {
            let { filePath: o, lineNumber: i, col: l } = cr(t);
            return { filePath: o || "", lineNumber: i || 0, col: l || 0 };
        }
        let r = e.getAttribute("data-component-path") || "",
            n = e.getAttribute("data-component-line") || "";
        return { filePath: r || "", lineNumber: parseInt(n, 10) || 0, col: 0 };
    },
    Oe = (e) => {
        let t = e.getAttribute("data-lov-id") || "",
            { filePath: r, lineNumber: n, col: o } = cr(t),
            i = e.tagName.toLowerCase(),
            l = e.getAttribute("data-component-content") || null,
            a = Array.from(e.children)
                .filter((s) => Me(s) && q(s).filePath !== r)
                .filter((s, c, d) => c === d.findIndex((u) => q(u).filePath === q(s).filePath))
                .map((s) => ({
                    id: s.getAttribute("data-lov-id") || "",
                    filePath: q(s).filePath,
                    fileName: q(s).filePath?.split?.("/").pop() || "",
                    lineNumber: q(s).lineNumber,
                    col: q(s).col,
                    elementType: s.tagName.toLowerCase(),
                    content: s.getAttribute("data-component-content") || "",
                    className: s.getAttribute("class") || "",
                    textContent: s.innerText,
                    attrs: { src: s.getAttribute("src") || "" },
                }));
        return {
            id: e.getAttribute("data-lov-id") || "",
            filePath: q(e).filePath,
            fileName: q(e).filePath?.split?.("/").pop() || "",
            lineNumber: q(e).lineNumber,
            col: q(e).col,
            elementType: i,
            content: l || "",
            children: a,
            className: e.getAttribute("class") || "",
            textContent: e.innerText,
            attrs: { src: e.getAttribute("src") || "" },
        };
    },
    dr = () => {
        class e {
            constructor() {
                (this.hoveredElement = null), (this.isActive = !1), (this.tooltip = null), (this.scrollTimeout = null), (this.mouseX = 0), (this.mouseY = 0), (this.styleElement = null);
            }
            reset() {
                (this.hoveredElement = null), (this.scrollTimeout = null);
            }
        }
        let t = new e(),
            r = (f, C) => {
                let M = null;
                return (...I) => {
                    M && clearTimeout(M), (M = setTimeout(() => f(...I), C));
                };
            };
        lr();
        let n = () => {
                (t.tooltip = document.createElement("div")), (t.tooltip.className = "gpt-selector-tooltip"), t.tooltip.setAttribute("role", "tooltip"), document.body.appendChild(t.tooltip);
                let f = document.createElement("style");
                (f.textContent = `
        .gpt-selector-tooltip {
          position: fixed;
          z-index: ${v.Z_INDEX};
          pointer-events: none;
          background-color: ${v.HIGHLIGHT_COLOR};
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: bold;
          line-height: 1;
          white-space: nowrap;
          display: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: opacity 0.2s ease-in-out;
          margin: 0;
        }
        [${v.HOVERED_ATTR}] {
          position: relative;
        }
        [${v.HOVERED_ATTR}]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          outline: 1px dashed ${v.HIGHLIGHT_COLOR} !important;
          outline-offset: ${v.HIGHLIGHT_STYLE.NORMAL.OFFSET} !important;
          background-color: ${v.HIGHLIGHT_BG} !important;
          z-index: ${v.Z_INDEX};
          pointer-events: none;
        }

        [${v.SELECTED_ATTR}] {
          position: relative;
        }
        [${v.SELECTED_ATTR}]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          outline: 1px dashed ${v.HIGHLIGHT_COLOR} !important;
          outline-offset: 3px !important;
          transition: outline-offset 0.2s ease-in-out;
          z-index: ${v.Z_INDEX};
          pointer-events: none;
        }

        [${v.SELECTED_ATTR}][contenteditable] {
          outline: none !important;
        }

        [${v.HOVERED_ATTR}][data-full-width]::before,
        [${v.SELECTED_ATTR}][data-full-width]::before {
          outline-offset: ${v.HIGHLIGHT_STYLE.FULL_WIDTH.OFFSET} !important;
        }
      `),
                    document.head.appendChild(f);
            },
            o = (f) => {
                if (!(!t.tooltip || !f))
                    try {
                        let C = f.getBoundingClientRect(),
                            M = f.tagName.toLowerCase(),
                            I = Math.abs(C.width - window.innerWidth) < 5;
                        if (((t.tooltip.style.maxWidth = `${v.MAX_TOOLTIP_WIDTH}px`), I)) (t.tooltip.style.left = v.FULL_WIDTH_TOOLTIP_OFFSET), (t.tooltip.style.top = v.FULL_WIDTH_TOOLTIP_OFFSET);
                        else {
                            let k = Math.max(0, C.top - v.TOOLTIP_OFFSET);
                            (t.tooltip.style.left = `${Math.max(0, C.left)}px`), (t.tooltip.style.top = `${k}px`);
                        }
                        t.tooltip.textContent = M;
                    } catch (C) {
                        console.error("Error updating tooltip:", C), d();
                    }
            },
            i = (f) => {
                let C = Math.abs(f.getBoundingClientRect().width - window.innerWidth) < 5;
                f.setAttribute(v.HOVERED_ATTR, "true"), C && f.setAttribute("data-full-width", "true");
            },
            l = (f) => {
                f.removeAttribute(v.HOVERED_ATTR), f.removeAttribute("data-full-width"), (f.style.cursor = "");
            },
            a = (f) => {
                let C = f.tagName.toLowerCase() === "svg",
                    M = f.closest("svg") !== null;
                return !C && M;
            },
            s = r((f) => {
                if (!t.isActive || !Me(f.target) || f.target.tagName.toLowerCase() === "html" || a(f.target)) return;
                t.hoveredElement &&
                    b(q(t.hoveredElement)).forEach((I) => {
                        I.classList.contains("gpt-selected-element") || l(I);
                    }),
                    (t.hoveredElement = f.target),
                    (t.hoveredElement && b(q(t.hoveredElement)))?.forEach((M) => {
                        M.classList.contains("gpt-selected-element") || i(M);
                    }),
                    o(t.hoveredElement),
                    t.tooltip && ((t.tooltip.style.display = "block"), (t.tooltip.style.opacity = "1"));
            }, v.DEBOUNCE_DELAY),
            c = r(() => {
                t.isActive &&
                    (t.hoveredElement &&
                        ((t.hoveredElement && b(q(t.hoveredElement)))?.forEach((C) => {
                            C.removeAttribute(v.HOVERED_ATTR), C.hasAttribute(v.SELECTED_ATTR) || l(C);
                        }),
                        (t.hoveredElement = null)),
                    d());
            }, v.DEBOUNCE_DELAY),
            d = () => {
                t.tooltip && ((t.tooltip.style.opacity = "0"), (t.tooltip.style.display = "none"));
            },
            u = () => {
                t.scrollTimeout && clearTimeout(t.scrollTimeout),
                    d(),
                    t.hoveredElement && !t.hoveredElement.classList.contains("gpt-selected-element") && l(t.hoveredElement),
                    (t.scrollTimeout = setTimeout(() => {
                        t.scrollTimeout = null;
                        let f = document.elementFromPoint(t.mouseX, t.mouseY);
                        f && t.isActive && s({ target: f });
                    }, v.SCROLL_DEBOUNCE));
            },
            m = (f) => {
                t.isActive && f.target && f.target instanceof HTMLElement && ["input", "textarea", "select"].includes(f.target.tagName.toLowerCase()) && f.preventDefault();
            },
            h = (f) => {
                if (t.isActive) return f.preventDefault(), f.stopPropagation(), !1;
            },
            p = () => {
                document.addEventListener("mouseover", s),
                    document.addEventListener("mouseout", c),
                    document.addEventListener("click", P, !0),
                    document.addEventListener("dblclick", H, !0),
                    window.addEventListener("scroll", u, { passive: !0 }),
                    document.addEventListener("mousedown", m, !0);
                let f = document.createElement("style");
                (f.textContent = `
        * {
          scroll-behavior: auto !important;
        }
      `),
                    document.head.appendChild(f),
                    (t.styleElement = f),
                    document.addEventListener("click", h, !0),
                    document.addEventListener("submit", h, !0),
                    document.addEventListener("touchstart", h, !0),
                    document.addEventListener("touchend", h, !0);
            },
            S = () => {
                document.removeEventListener("mouseover", s),
                    document.removeEventListener("mouseout", c),
                    document.removeEventListener("click", P),
                    window.removeEventListener("scroll", u),
                    document.removeEventListener("mousedown", m, !0),
                    document.removeEventListener("click", h, !0),
                    document.removeEventListener("submit", h, !0),
                    document.removeEventListener("touchstart", h, !0),
                    document.removeEventListener("touchend", h, !0),
                    t.styleElement && (t.styleElement.remove(), (t.styleElement = null)),
                    (document.body.style.cursor = ""),
                    (document.body.style.userSelect = ""),
                    (document.body.style.msUserSelect = ""),
                    (document.body.style.mozUserSelect = ""),
                    t.hoveredElement && (t.hoveredElement.hasAttribute(v.SELECTED_ATTR) || l(t.hoveredElement), (t.hoveredElement = null)),
                    d();
            },
            b = (f) => {
                let C = `[data-lov-id="${f.filePath}:${f.lineNumber}:${f.col || "0"}"]`,
                    M = document.querySelectorAll(C);
                if (M.length > 0) return M;
                let I = `[data-component-path="${f.filePath}"][data-component-line="${f.lineNumber}"]`;
                return document.querySelectorAll(I);
            },
            A = (f) => {
                try {
                    if (!f?.origin || !f?.data?.type || !v.ALLOWED_ORIGINS.includes(f.origin)) return;
                    switch (f.data.type) {
                        case "TOGGLE_SELECTOR":
                            let C = !!f.data.payload;
                            t.isActive !== C &&
                                ((t.isActive = C),
                                t.isActive
                                    ? (p(),
                                      et().then(() => {
                                          document.querySelectorAll("button[disabled]").forEach((I) => {
                                              I.removeAttribute("disabled"), I.setAttribute("data-lov-disabled", "");
                                          });
                                      }))
                                    : (S(),
                                      document.querySelectorAll("[data-lov-disabled]").forEach((k) => {
                                          k.removeAttribute("data-lov-disabled"), k.setAttribute("disabled", "");
                                      }),
                                      document.querySelectorAll(`[${v.HOVERED_ATTR}], [data-full-width]`).forEach((k) => {
                                          k.hasAttribute(v.SELECTED_ATTR) || (l(k), k instanceof HTMLElement && (k.style.cursor = ""));
                                      }),
                                      t.reset()));
                            break;
                        case "UPDATE_SELECTED_ELEMENTS":
                            if (!Array.isArray(f.data.payload)) {
                                console.error("Invalid payload for UPDATE_SELECTED_ELEMENTS");
                                return;
                            }
                            document.querySelectorAll(`[${v.SELECTED_ATTR}], [${v.HOVERED_ATTR}]`).forEach((I) => {
                                I.removeAttribute(v.SELECTED_ATTR), I.removeAttribute(v.HOVERED_ATTR), I.removeAttribute("data-full-width");
                            }),
                                f.data.payload.forEach((I) => {
                                    if (!I?.filePath || !I?.lineNumber) {
                                        console.error("Invalid element data:", I);
                                        return;
                                    }
                                    b({ filePath: I.filePath, lineNumber: I.lineNumber, col: I.col }).forEach((T) => {
                                        T.setAttribute(v.SELECTED_ATTR, "true"), Math.abs(T.getBoundingClientRect().width - window.innerWidth) < 5 && T.setAttribute("data-full-width", "true");
                                    });
                                });
                            break;
                        case "GET_SELECTOR_STATE":
                            _({ type: "SELECTOR_STATE_RESPONSE", payload: { isActive: t.isActive } });
                            break;
                        case "SET_ELEMENT_CONTENT":
                            {
                                let { id: I, content: k } = f.data.payload;
                                b({ filePath: I.path, lineNumber: I.line }).forEach((N) => {
                                    N.innerHTML = k;
                                });
                            }
                            break;
                        case "SET_ELEMENT_ATTRS":
                            {
                                let { id: I, attrs: k } = f.data.payload;
                                b({ filePath: I.path, lineNumber: I.line }).forEach((N) => {
                                    Object.keys(k).forEach((D) => {
                                        N.setAttribute(D, k[D]);
                                    });
                                });
                            }
                            break;
                        case "DUPLICATE_ELEMENT_REQUESTED": {
                            let { id: I } = f.data.payload;
                            b({ filePath: I.path, lineNumber: I.line }).forEach((T) => {
                                let N = T.cloneNode(!0);
                                N.setAttribute("data-lov-id", "x"), N.setAttribute("data-lov-tmp", "true"), T.parentElement?.appendChild(N);
                            });
                            break;
                        }
                        case "SET_STYLESHEET": {
                            let { stylesheet: I } = f.data.payload,
                                k = document.getElementById(v.OVERRIDE_STYLESHEET_ID);
                            if (k) k.innerHTML = I;
                            else {
                                let T = document.getElementsByTagName("head")[0],
                                    N = document.createElement("style");
                                (N.id = v.OVERRIDE_STYLESHEET_ID), (N.innerHTML = I), T.appendChild(N);
                            }
                            break;
                        }
                        case "EDIT_TEXT_REQUESTED": {
                            let { id: I } = f.data.payload;
                            b({ filePath: I.path, lineNumber: I.line }).forEach((T) => {
                                if (!(T instanceof HTMLElement)) return;
                                T.setAttribute("contenteditable", "true"), T.focus();
                                let N = () => {
                                        _({ type: "ELEMENT_TEXT_UPDATED", payload: { id: I, content: T.innerText } });
                                    },
                                    D = () => {
                                        T.removeAttribute("contenteditable"), T.removeEventListener("input", N), T.removeEventListener("blur", D);
                                    };
                                T.addEventListener("input", N), T.addEventListener("blur", D);
                            });
                            break;
                        }
                        case "HOVER_ELEMENT_REQUESTED": {
                            let { id: I } = f.data.payload;
                            document.querySelectorAll(`[${v.HOVERED_ATTR}]`).forEach((T) => {
                                T.removeAttribute(v.HOVERED_ATTR);
                            }),
                                b({ filePath: I.path, lineNumber: I.line }).forEach((T) => {
                                    T.setAttribute(v.HOVERED_ATTR, "true");
                                });
                            break;
                        }
                        case "UNHOVER_ELEMENT_REQUESTED": {
                            let { id: I } = f.data.payload;
                            b({ filePath: I.path, lineNumber: I.line }).forEach((T) => {
                                T.removeAttribute(v.HOVERED_ATTR);
                            });
                            break;
                        }
                        case "GET_PARENT_ELEMENT": {
                            let { id: I } = f.data.payload,
                                N = b({ filePath: I.path, lineNumber: I.line })[0].parentElement;
                            !N || N.id === "root" || ["HTML", "BODY"].includes(N.tagName) ? _({ type: "PARENT_ELEMENT", payload: null }) : _({ type: "PARENT_ELEMENT", payload: Oe(N) });
                            break;
                        }
                        case "REQUEST_COMPONENT_TREE":
                            ar();
                            break;
                        default:
                            console.warn("Unknown message type:", f.data.type);
                    }
                } catch (C) {
                    console.error("Error handling message:", C), S(), t.reset();
                }
            },
            g = (f) => {
                (t.mouseX = f.clientX), (t.mouseY = f.clientY);
            },
            y = () => {
                _({ type: "REQUEST_PICKER_STATE" }), _({ type: "REQUEST_SELECTED_ELEMENTS" });
            };
        (() => {
            try {
                n(),
                    window.addEventListener("message", A),
                    document.addEventListener("mousemove", g),
                    _({ type: "SELECTOR_SCRIPT_LOADED", payload: { version: window.LOV_SELECTOR_SCRIPT_VERSION } }),
                    et().then(() => {
                        y();
                    });
            } catch (f) {
                console.error("Failed to initialize selector script:", f);
            }
        })();
        let P = (f) => {
                if (t.isActive && !(!Me(f.target) || f.target.tagName.toLowerCase() === "html" || a(f.target)) && (f.preventDefault(), f.stopPropagation(), t.hoveredElement)) {
                    let C = Oe(t.hoveredElement);
                    t.hoveredElement.setAttribute(v.SELECTED_ATTR, "true"),
                        Math.abs(t.hoveredElement.getBoundingClientRect().width - window.innerWidth) < 5 && t.hoveredElement.setAttribute("data-full-width", "true"),
                        _({ type: "ELEMENT_CLICKED", payload: C, isMultiSelect: f.metaKey || f.ctrlKey });
                }
            },
            H = (f) => {
                if (!t.isActive || !Me(f.target) || f.target.tagName.toLowerCase() === "html" || a(f.target)) return;
                f.preventDefault(), f.stopPropagation();
                let C = Oe(f.target);
                _({ type: "ELEMENT_DOUBLE_CLICKED", payload: C });
            };
    };
var ln = () => {
    if (window.location.search.includes("lov-override-script")) {
        let t = "http://localhost:8001/gptengineer.js";
        console.log("Overriding gptengineer.js script with:", t);
        let r = document.createElement("script");
        (r.type = "module"), (r.src = t), document.body.appendChild(r);
        return;
    }
    if (window.top === window.self) return;
    At(), vt(), St(), bt(), dr();
    let e = sr();
    window.addEventListener("unload", () => {
        e && e();
    });
};
ln();
/*! Bundled license information:

rrweb/es/rrweb/ext/tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
