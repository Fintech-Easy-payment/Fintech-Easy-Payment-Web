(function(e){function n(n){for(var r,a,c=n[0],i=n[1],f=n[2],s=0,l=[];s<c.length;s++)a=c[s],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(n);while(l.length)l.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==o[c]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},o={app:0},u=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0cd55476":"501eac84","chunk-2d2302d2":"493e6e46","chunk-b0ebf6fe":"82508dcb","chunk-1b72b3f8":"4f926120","chunk-2d0daf06":"e7c992c9","chunk-28033df9":"6e1e51a7"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-0cd55476":1,"chunk-b0ebf6fe":1,"chunk-1b72b3f8":1,"chunk-28033df9":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-0cd55476":"547121af","chunk-2d2302d2":"31d6cfe0","chunk-b0ebf6fe":"e4085314","chunk-1b72b3f8":"866e99f8","chunk-2d0daf06":"31d6cfe0","chunk-28033df9":"13d926ec"}[e]+".css",o=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var f=u[c],s=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(s===r||s===o))return n()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){f=l[c],s=f.getAttribute("data-href");if(s===r||s===o)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],d.parentNode.removeChild(d),t(u)},d.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var u=new Promise((function(n,t){r=o[e]=[n,t]}));n.push(r[2]=u);var f,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=c(e);var l=new Error;f=function(n){s.onerror=s.onload=null,clearTimeout(d);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,t[1](l)}o[e]=void 0}};var d=setTimeout((function(){f({type:"timeout",target:s})}),12e4);s.onerror=s.onload=f,document.head.appendChild(s)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],s=f.push.bind(f);f.push=n,f=f.slice();for(var l=0;l<f.length;l++)n(f[l]);var d=s;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("router-view")},o=[],u={name:"App",data:function(){return{}}},c=u,i=t("2877"),f=Object(i["a"])(c,a,o,!1,null,null,null),s=f.exports,l=t("a18c"),d=t("94ea"),p=t("1da1"),h=(t("96cf"),t("b0c0"),t("7338")),m=t.n(h),b=window,v=b.applicationSettings,g=v.DB_ENDPOINT,k={signup:function(e){return m.a.post("".concat(g,"/api/signup"),e)},signin:function(e){return m.a.post("".concat(g,"/api/signin"),e)}};r["a"].use(d["a"]);var y=new d["a"].Store({state:{accessToken:null},getters:{},mutations:{LOGIN:function(e,n){var t=n.accessToken;e.accessToken=t}},actions:{handleSignup:function(e,n){return Object(p["a"])(regeneratorRuntime.mark((function t(){var r,a,o,u,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=e.commit,a=n.name,o=n.password,u=n.email,c=n.phone,k.signup(n).then((function(e){var n=e.data;return r("LOGIN",n)})),console.log(a,o,u,c);case 4:case"end":return t.stop()}}),t)})))()}}}),w=t("f309");r["a"].use(w["a"]);var O=new w["a"]({});r["a"].config.productionTip=!1,new r["a"]({vuetify:O,render:function(e){return e(s)},router:l["a"],store:y,Vuex:d["a"]}).$mount("#app")},a18c:function(e,n,t){"use strict";t("d3b7"),t("3ca3"),t("ddb0");var r=t("2b0e"),a=t("4af9");r["a"].use(a["a"]);var o={template:"<div>Not Found</div>"},u=new a["a"]({mode:"history",routes:[{path:"/",name:"Home",component:function(){return Promise.all([t.e("chunk-0cd55476"),t.e("chunk-b0ebf6fe"),t.e("chunk-1b72b3f8"),t.e("chunk-2d0daf06")]).then(t.bind(null,"6e78"))}},{path:"/auth",name:"AuthMain",component:function(){return Promise.all([t.e("chunk-0cd55476"),t.e("chunk-b0ebf6fe"),t.e("chunk-1b72b3f8")]).then(t.bind(null,"b398"))}},{path:"/payment",name:"PaymentMain",component:function(){return Promise.all([t.e("chunk-0cd55476"),t.e("chunk-b0ebf6fe"),t.e("chunk-28033df9")]).then(t.bind(null,"38a2"))}},{path:"/payment-result",name:"PaymentResult",component:function(){return Promise.all([t.e("chunk-0cd55476"),t.e("chunk-2d2302d2")]).then(t.bind(null,"eabb"))}},{path:"*",component:o}]});n["a"]=u}});
//# sourceMappingURL=app.ac774dfe.js.map