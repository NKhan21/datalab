!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/assets/",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);var r="http://www.w3.org/1999/xhtml",o={svg:"http://www.w3.org/2000/svg",xhtml:r,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},s=function(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),o.hasOwnProperty(n)?{space:o[n],local:t}:t};var i=function(t){var n=s(t);return(n.local?function(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}:function(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===r&&n.documentElement.namespaceURI===r?n.createElement(t):n.createElementNS(e,t)}})(n)};function a(){}var c=function(t){return null==t?a:function(){return this.querySelector(t)}};function u(){return[]}var l=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var f=document.documentElement;if(!f.matches){var h=f.webkitMatchesSelector||f.msMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector;l=function(t){return function(){return h.call(this,t)}}}}var p=l,d=function(t){return new Array(t.length)};function _(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}_.prototype={constructor:_,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var v="$";function y(t,n,e,r,o,s){for(var i,a=0,c=n.length,u=s.length;a<u;++a)(i=n[a])?(i.__data__=s[a],r[a]=i):e[a]=new _(t,s[a]);for(;a<c;++a)(i=n[a])&&(o[a]=i)}function m(t,n,e,r,o,s,i){var a,c,u,l={},f=n.length,h=s.length,p=new Array(f);for(a=0;a<f;++a)(c=n[a])&&(p[a]=u=v+i.call(c,c.__data__,a,n),u in l?o[a]=c:l[u]=c);for(a=0;a<h;++a)(c=l[u=v+i.call(t,s[a],a,s)])?(r[a]=c,c.__data__=s[a],l[u]=null):e[a]=new _(t,s[a]);for(a=0;a<f;++a)(c=n[a])&&l[p[a]]===c&&(o[a]=c)}function g(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}var C=function(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView};function w(t){return t.trim().split(/^|\s+/)}function A(t){return t.classList||new x(t)}function x(t){this._node=t,this._names=w(t.getAttribute("class")||"")}function b(t,n){for(var e=A(t),r=-1,o=n.length;++r<o;)e.add(n[r])}function S(t,n){for(var e=A(t),r=-1,o=n.length;++r<o;)e.remove(n[r])}x.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function B(){this.textContent=""}function E(){this.innerHTML=""}function N(){this.nextSibling&&this.parentNode.appendChild(this)}function k(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function I(){return null}function M(){var t=this.parentNode;t&&t.removeChild(this)}function T(){return this.parentNode.insertBefore(this.cloneNode(!1),this.nextSibling)}function O(){return this.parentNode.insertBefore(this.cloneNode(!0),this.nextSibling)}var P={},L=null;"undefined"!=typeof document&&("onmouseenter"in document.documentElement||(P={mouseenter:"mouseover",mouseleave:"mouseout"}));function j(t,n,e){return t=q(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function q(t,n,e){return function(r){var o=L;L=r;try{t.call(this,this.__data__,n,e)}finally{L=o}}}function z(t){return function(){var n=this.__on;if(n){for(var e,r=0,o=-1,s=n.length;r<s;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++o]=e:this.removeEventListener(e.type,e.listener,e.capture);++o?n.length=o:delete this.__on}}}function D(t,n,e){var r=P.hasOwnProperty(t.type)?j:q;return function(o,s,i){var a,c=this.__on,u=r(n,s,i);if(c)for(var l=0,f=c.length;l<f;++l)if((a=c[l]).type===t.type&&a.name===t.name)return this.removeEventListener(a.type,a.listener,a.capture),this.addEventListener(a.type,a.listener=u,a.capture=e),void(a.value=n);this.addEventListener(t.type,u,e),a={type:t.type,name:t.name,value:n,listener:u,capture:e},c?c.push(a):this.__on=[a]}}function H(t,n,e){var r=C(t),o=r.CustomEvent;"function"==typeof o?o=new o(n,e):(o=r.document.createEvent("Event"),e?(o.initEvent(n,e.bubbles,e.cancelable),o.detail=e.detail):o.initEvent(n,!1,!1)),t.dispatchEvent(o)}var R=[null];function U(t,n){this._groups=t,this._parents=n}function V(){return new U([[document.documentElement]],R)}U.prototype=V.prototype={constructor:U,select:function(t){"function"!=typeof t&&(t=c(t));for(var n=this._groups,e=n.length,r=new Array(e),o=0;o<e;++o)for(var s,i,a=n[o],u=a.length,l=r[o]=new Array(u),f=0;f<u;++f)(s=a[f])&&(i=t.call(s,s.__data__,f,a))&&("__data__"in s&&(i.__data__=s.__data__),l[f]=i);return new U(r,this._parents)},selectAll:function(t){"function"!=typeof t&&(t=function(t){return null==t?u:function(){return this.querySelectorAll(t)}}(t));for(var n=this._groups,e=n.length,r=[],o=[],s=0;s<e;++s)for(var i,a=n[s],c=a.length,l=0;l<c;++l)(i=a[l])&&(r.push(t.call(i,i.__data__,l,a)),o.push(i));return new U(r,o)},filter:function(t){"function"!=typeof t&&(t=p(t));for(var n=this._groups,e=n.length,r=new Array(e),o=0;o<e;++o)for(var s,i=n[o],a=i.length,c=r[o]=[],u=0;u<a;++u)(s=i[u])&&t.call(s,s.__data__,u,i)&&c.push(s);return new U(r,this._parents)},data:function(t,n){if(!t)return p=new Array(this.size()),u=-1,this.each(function(t){p[++u]=t}),p;var e=n?m:y,r=this._parents,o=this._groups;"function"!=typeof t&&(t=function(t){return function(){return t}}(t));for(var s=o.length,i=new Array(s),a=new Array(s),c=new Array(s),u=0;u<s;++u){var l=r[u],f=o[u],h=f.length,p=t.call(l,l&&l.__data__,u,r),d=p.length,_=a[u]=new Array(d),v=i[u]=new Array(d);e(l,f,_,v,c[u]=new Array(h),p,n);for(var g,C,w=0,A=0;w<d;++w)if(g=_[w]){for(w>=A&&(A=w+1);!(C=v[A])&&++A<d;);g._next=C||null}}return(i=new U(i,r))._enter=a,i._exit=c,i},enter:function(){return new U(this._enter||this._groups.map(d),this._parents)},exit:function(){return new U(this._exit||this._groups.map(d),this._parents)},merge:function(t){for(var n=this._groups,e=t._groups,r=n.length,o=e.length,s=Math.min(r,o),i=new Array(r),a=0;a<s;++a)for(var c,u=n[a],l=e[a],f=u.length,h=i[a]=new Array(f),p=0;p<f;++p)(c=u[p]||l[p])&&(h[p]=c);for(;a<r;++a)i[a]=n[a];return new U(i,this._parents)},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,o=t[n],s=o.length-1,i=o[s];--s>=0;)(r=o[s])&&(i&&i!==r.nextSibling&&i.parentNode.insertBefore(r,i),i=r);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=g);for(var e=this._groups,r=e.length,o=new Array(r),s=0;s<r;++s){for(var i,a=e[s],c=a.length,u=o[s]=new Array(c),l=0;l<c;++l)(i=a[l])&&(u[l]=i);u.sort(n)}return new U(o,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],o=0,s=r.length;o<s;++o){var i=r[o];if(i)return i}return null},size:function(){var t=0;return this.each(function(){++t}),t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var o,s=n[e],i=0,a=s.length;i<a;++i)(o=s[i])&&t.call(o,o.__data__,i,s);return this},attr:function(t,n){var e=s(t);if(arguments.length<2){var r=this.node();return e.local?r.getAttributeNS(e.space,e.local):r.getAttribute(e)}return this.each((null==n?e.local?function(t){return function(){this.removeAttributeNS(t.space,t.local)}}:function(t){return function(){this.removeAttribute(t)}}:"function"==typeof n?e.local?function(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}:function(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}:e.local?function(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}:function(t,n){return function(){this.setAttribute(t,n)}})(e,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?function(t){return function(){this.style.removeProperty(t)}}:"function"==typeof n?function(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}:function(t,n,e){return function(){this.style.setProperty(t,n,e)}})(t,n,null==e?"":e)):function(t,n){return t.style.getPropertyValue(n)||C(t).getComputedStyle(t,null).getPropertyValue(n)}(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?function(t){return function(){delete this[t]}}:"function"==typeof n?function(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}:function(t,n){return function(){this[t]=n}})(t,n)):this.node()[t]},classed:function(t,n){var e=w(t+"");if(arguments.length<2){for(var r=A(this.node()),o=-1,s=e.length;++o<s;)if(!r.contains(e[o]))return!1;return!0}return this.each(("function"==typeof n?function(t,n){return function(){(n.apply(this,arguments)?b:S)(this,t)}}:n?function(t){return function(){b(this,t)}}:function(t){return function(){S(this,t)}})(e,n))},text:function(t){return arguments.length?this.each(null==t?B:("function"==typeof t?function(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}:function(t){return function(){this.textContent=t}})(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?E:("function"==typeof t?function(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}:function(t){return function(){this.innerHTML=t}})(t)):this.node().innerHTML},raise:function(){return this.each(N)},lower:function(){return this.each(k)},append:function(t){var n="function"==typeof t?t:i(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})},insert:function(t,n){var e="function"==typeof t?t:i(t),r=null==n?I:"function"==typeof n?n:c(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})},remove:function(){return this.each(M)},clone:function(t){return this.select(t?O:T)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var r,o,s=function(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}(t+""),i=s.length;if(!(arguments.length<2)){for(a=n?D:z,null==e&&(e=!1),r=0;r<i;++r)this.each(a(s[r],n,e));return this}var a=this.node().__on;if(a)for(var c,u=0,l=a.length;u<l;++u)for(r=0,c=a[u];r<i;++r)if((o=s[r]).type===c.type&&o.name===c.name)return c.value},dispatch:function(t,n){return this.each(("function"==typeof n?function(t,n){return function(){return H(this,t,n.apply(this,arguments))}}:function(t,n){return function(){return H(this,t,n)}})(t,n))}};var W=function(t){return"string"==typeof t?new U([[document.querySelector(t)]],[document.documentElement]):new U([[t]],R)},X=0;function $(){this._="@"+(++X).toString(36)}$.prototype=function(){return new $}.prototype={constructor:$,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};e.d(n,"anecdoteInit",function(){return et});var F={select:W,selectAll:function(t){return"string"==typeof t?new U([document.querySelectorAll(t)],[document.documentElement]):new U([null==t?[]:t],R)}},G={anecdoteClass:"anecdote",closeButtonClass:"anecdote__close",closeButtonIconClass:"fas fa-times",contentsClass:"anecdote__contents",contentsClassActive:"anecdote__contents--active",dotsClass:"anecdote__dots",dotsContainerClass:"anecdote__dots--container",dotClass:"anecdote__dot",dotClassActive:"anecdote__dot--active",dotTextClass:"anecdote__dots--text",infoIcon:{class:"anecdote__icon",src:"assets/icons/anecdote.svg",alt:"anecdote icon"},linkCtaContainerClass:"anecdote__cta--container",linkButtonClass:"link-button anecdote__link--button",linkButtonText:"What does this mean to me?",panesClass:"anecdote__panes",paneClass:"anecdote__pane",paneClassActive:"anecdote__pane--active"},J={};function K(t,n){Q(t,n),Z(t,n),Y(t,n+1)}function Q(t,n){var e=J.dotClass||G.dotClass,r=J.dotClassActive||G.dotClassActive,o=t.selectAll(".".concat(e)),s=r;o.classed(s,!1),o.filter(function(t,e){return e===n}).classed(s,!0)}function Y(t,n){var e=J.dotTextClass||G.dotTextClass,r=J.paneClass||G.paneClass,o=t.selectAll(".".concat(r)).size();t.select(".".concat(e)).html("".concat(n," of ").concat(o))}function Z(t,n){var e=J.paneClass||G.paneClass,r=J.paneClassActive||G.paneClassActive,o=t.selectAll(".".concat(e));o.classed(r,!1),o.filter(function(t,e){return e===n}).classed(r,!0)}function tt(t){var n=J.closeButtonClass||G.closeButtonClass,e=J.contentsClass||G.contentsClass,r=J.contentsClassActive||G.contentsClassActive,o=t.select(".".concat(e)),s=o.classed(r);o.classed(r,!s),s||(!function(t){var n,e=J.paneClass||G.paneClass,r=J.panesClass||G.panesClass,o=0;t.selectAll(".".concat(e)).each(function(){var t=this.getBoundingClientRect().height;o=t>o?t:o}),n=Math.ceil(o)+"px",t.select(".".concat(r)).attr("style","height: ".concat(n))}(t),function(t){var n=J.paneClass||G.paneClass,e=J.panesClass||G.panesClass,r=J.paneClassActive||G.paneClassActive,o=t.select(".".concat(e)),s=o.selectAll(".".concat(n)),i=s.size();o.on("click",function(){var n=0;s.each(function(t,e){F.select(this).classed(r)&&(n=e+1)}),n>=i&&(n=0),K(t,n)})}(t),t.select("."+n).on("click",function(){tt(t)}))}function nt(){var t=F.select(this);!function(t){var n=G.infoIcon.class,e=G.infoIcon.src,r=G.infoIcon.alt;J.infoIcon&&(n=J.infoIcon.class||n,e=J.infoIcon.src||e,r=J.infoIcon.alt||r),t.insert("img").classed(n,!0).lower().attr("src",e).attr("alt",r)}(t),function(t){var n=J.closeButtonClass||G.closeButtonClass,e=J.closeButtonIconClass||G.closeButtonIconClass;t.insert("button").classed(n,!0).lower().append("i").classed(e,!0)}(t),function(t){var n=J.contentsClass||G.contentsClass,e=t.node().innerHTML;t.selectAll("*").remove(),t.append("div").classed(n,!0).html(e)}(t),function(t){var n=J.linkButtonClass||G.linkButtonClass,e=J.linkButtonText||G.linkButtonText,r=t.append("button").classed(n,!0).text(e);r.lower(),r.on("click",function(){tt(t)})}(t),Z(t,0),function(t){var n=J.contentsClass||G.contentsClass,e=J.dotsClass||G.dotsClass,r=J.dotsContainerClass||G.dotsContainerClass,o=J.dotClass||G.dotClass,s=J.dotTextClass||G.dotTextClass,i=J.linkCtaContainerClass||G.linkCtaContainerClass,a=J.paneClass||G.paneClass,c=t.selectAll(".".concat(a)).size(),u=t.select(".".concat(n)).insert("div",".".concat(i)).classed(r,!0),l=u.append("div").classed(e,!0),f=new Array(c);l.selectAll(".".concat(o)).data(f).enter().append("div").classed(o,!0).on("click",function(n,e){K(t,e)}),u.append("div").classed(s,!0)}(t),Q(t,0),Y(t,1)}function et(t){t&&(J=t);var n=J.anecdoteClass||G.anecdoteClass;F.selectAll(".".concat(n)).each(nt)}et()}]);