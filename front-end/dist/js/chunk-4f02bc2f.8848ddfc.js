(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f02bc2f"],{"10d0":function(e,t,i){},"10d2":function(e,t,i){"use strict";var s=i("8dd9");t["a"]=s["a"]},"1c87":function(e,t,i){"use strict";var s=i("2b0e"),n=i("5607"),r=i("80d2");t["a"]=s["a"].extend({name:"routable",directives:{Ripple:n["a"]},props:{activeClass:String,append:Boolean,disabled:Boolean,exact:{type:Boolean,default:void 0},exactActiveClass:String,link:Boolean,href:[String,Object],to:[String,Object],nuxt:Boolean,replace:Boolean,ripple:{type:[Boolean,Object],default:null},tag:String,target:String},data:()=>({isActive:!1,proxyClass:""}),computed:{classes(){const e={};return this.to||(this.activeClass&&(e[this.activeClass]=this.isActive),this.proxyClass&&(e[this.proxyClass]=this.isActive)),e},computedRipple(){var e;return null!=(e=this.ripple)?e:!this.disabled&&this.isClickable},isClickable(){return!this.disabled&&Boolean(this.isLink||this.$listeners.click||this.$listeners["!click"]||this.$attrs.tabindex)},isLink(){return this.to||this.href||this.link},styles:()=>({})},watch:{$route:"onRouteChange"},methods:{click(e){this.$emit("click",e)},generateRouteLink(){let e,t=this.exact;const i={attrs:{tabindex:"tabindex"in this.$attrs?this.$attrs.tabindex:void 0},class:this.classes,style:this.styles,props:{},directives:[{name:"ripple",value:this.computedRipple}],[this.to?"nativeOn":"on"]:{...this.$listeners,click:this.click},ref:"link"};if("undefined"===typeof this.exact&&(t="/"===this.to||this.to===Object(this.to)&&"/"===this.to.path),this.to){let s=this.activeClass,n=this.exactActiveClass||s;this.proxyClass&&(s=`${s} ${this.proxyClass}`.trim(),n=`${n} ${this.proxyClass}`.trim()),e=this.nuxt?"nuxt-link":"router-link",Object.assign(i.props,{to:this.to,exact:t,activeClass:s,exactActiveClass:n,append:this.append,replace:this.replace})}else e=(this.href?"a":this.tag)||"div","a"===e&&this.href&&(i.attrs.href=this.href);return this.target&&(i.attrs.target=this.target),{tag:e,data:i}},onRouteChange(){if(!this.to||!this.$refs.link||!this.$route)return;const e=`${this.activeClass} ${this.proxyClass||""}`.trim(),t="_vnode.data.class."+e;this.$nextTick(()=>{Object(r["l"])(this.$refs.link,t)&&this.toggle()})},toggle:()=>{}}})},"24b2":function(e,t,i){"use strict";var s=i("80d2"),n=i("2b0e");t["a"]=n["a"].extend({name:"measurable",props:{height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},computed:{measurableStyles(){const e={},t=Object(s["f"])(this.height),i=Object(s["f"])(this.minHeight),n=Object(s["f"])(this.minWidth),r=Object(s["f"])(this.maxHeight),o=Object(s["f"])(this.maxWidth),a=Object(s["f"])(this.width);return t&&(e.height=t),i&&(e.minHeight=i),n&&(e.minWidth=n),r&&(e.maxHeight=r),o&&(e.maxWidth=o),a&&(e.width=a),e}}})},"25a8":function(e,t,i){},5607:function(e,t,i){"use strict";i("7435");var s=i("80d2");const n=Symbol("rippleStop"),r=80;function o(e,t){e.style.transform=t,e.style.webkitTransform=t}function a(e,t){e.style.opacity=t.toString()}function c(e){return"TouchEvent"===e.constructor.name}function l(e){return"KeyboardEvent"===e.constructor.name}const p=(e,t,i={})=>{let s=0,n=0;if(!l(e)){const i=t.getBoundingClientRect(),r=c(e)?e.touches[e.touches.length-1]:e;s=r.clientX-i.left,n=r.clientY-i.top}let r=0,o=.3;t._ripple&&t._ripple.circle?(o=.15,r=t.clientWidth/2,r=i.center?r:r+Math.sqrt((s-r)**2+(n-r)**2)/4):r=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const a=(t.clientWidth-2*r)/2+"px",p=(t.clientHeight-2*r)/2+"px",u=i.center?a:s-r+"px",d=i.center?p:n-r+"px";return{radius:r,scale:o,x:u,y:d,centerX:a,centerY:p}},u={show(e,t,i={}){if(!t._ripple||!t._ripple.enabled)return;const s=document.createElement("span"),n=document.createElement("span");s.appendChild(n),s.className="v-ripple__container",i.class&&(s.className+=" "+i.class);const{radius:r,scale:c,x:l,y:u,centerX:d,centerY:h}=p(e,t,i),m=2*r+"px";n.className="v-ripple__animation",n.style.width=m,n.style.height=m,t.appendChild(s);const f=window.getComputedStyle(t);f&&"static"===f.position&&(t.style.position="relative",t.dataset.previousPosition="static"),n.classList.add("v-ripple__animation--enter"),n.classList.add("v-ripple__animation--visible"),o(n,`translate(${l}, ${u}) scale3d(${c},${c},${c})`),a(n,0),n.dataset.activated=String(performance.now()),setTimeout(()=>{n.classList.remove("v-ripple__animation--enter"),n.classList.add("v-ripple__animation--in"),o(n,`translate(${d}, ${h}) scale3d(1,1,1)`),a(n,.25)},0)},hide(e){if(!e||!e._ripple||!e._ripple.enabled)return;const t=e.getElementsByClassName("v-ripple__animation");if(0===t.length)return;const i=t[t.length-1];if(i.dataset.isHiding)return;i.dataset.isHiding="true";const s=performance.now()-Number(i.dataset.activated),n=Math.max(250-s,0);setTimeout(()=>{i.classList.remove("v-ripple__animation--in"),i.classList.add("v-ripple__animation--out"),a(i,0),setTimeout(()=>{const t=e.getElementsByClassName("v-ripple__animation");1===t.length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),i.parentNode&&e.removeChild(i.parentNode)},300)},n)}};function d(e){return"undefined"===typeof e||!!e}function h(e){const t={},i=e.currentTarget;if(i&&i._ripple&&!i._ripple.touched&&!e[n]){if(e[n]=!0,c(e))i._ripple.touched=!0,i._ripple.isTouch=!0;else if(i._ripple.isTouch)return;if(t.center=i._ripple.centered||l(e),i._ripple.class&&(t.class=i._ripple.class),c(e)){if(i._ripple.showTimerCommit)return;i._ripple.showTimerCommit=()=>{u.show(e,i,t)},i._ripple.showTimer=window.setTimeout(()=>{i&&i._ripple&&i._ripple.showTimerCommit&&(i._ripple.showTimerCommit(),i._ripple.showTimerCommit=null)},r)}else u.show(e,i,t)}}function m(e){const t=e.currentTarget;if(t&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),"touchend"===e.type&&t._ripple.showTimerCommit)return t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,void(t._ripple.showTimer=setTimeout(()=>{m(e)}));window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),u.hide(t)}}function f(e){const t=e.currentTarget;t&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let v=!1;function b(e){v||e.keyCode!==s["r"].enter&&e.keyCode!==s["r"].space||(v=!0,h(e))}function g(e){v=!1,m(e)}function y(e){!0===v&&(v=!1,m(e))}function _(e,t,i){const s=d(t.value);s||u.hide(e),e._ripple=e._ripple||{},e._ripple.enabled=s;const n=t.value||{};n.center&&(e._ripple.centered=!0),n.class&&(e._ripple.class=t.value.class),n.circle&&(e._ripple.circle=n.circle),s&&!i?(e.addEventListener("touchstart",h,{passive:!0}),e.addEventListener("touchend",m,{passive:!0}),e.addEventListener("touchmove",f,{passive:!0}),e.addEventListener("touchcancel",m),e.addEventListener("mousedown",h),e.addEventListener("mouseup",m),e.addEventListener("mouseleave",m),e.addEventListener("keydown",b),e.addEventListener("keyup",g),e.addEventListener("blur",y),e.addEventListener("dragstart",m,{passive:!0})):!s&&i&&x(e)}function x(e){e.removeEventListener("mousedown",h),e.removeEventListener("touchstart",h),e.removeEventListener("touchend",m),e.removeEventListener("touchmove",f),e.removeEventListener("touchcancel",m),e.removeEventListener("mouseup",m),e.removeEventListener("mouseleave",m),e.removeEventListener("keydown",b),e.removeEventListener("keyup",g),e.removeEventListener("dragstart",m),e.removeEventListener("blur",y)}function k(e,t,i){_(e,t,!1)}function C(e){delete e._ripple,x(e)}function w(e,t){if(t.value===t.oldValue)return;const i=d(t.oldValue);_(e,t,i)}const $={bind:k,unbind:C,update:w};t["a"]=$},"58df":function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var s=i("2b0e");function n(...e){return s["a"].extend({mixins:e})}},6544:function(e,t){e.exports=function(e,t){var i="function"===typeof e.exports?e.exports.extendOptions:e.options;for(var s in"function"===typeof e.exports&&(i.components=e.exports.options.components),i.components=i.components||{},t)i.components[s]=i.components[s]||t[s]}},7435:function(e,t,i){},7560:function(e,t,i){"use strict";i.d(t,"b",(function(){return r}));var s=i("2b0e");const n=s["a"].extend().extend({name:"themeable",provide(){return{theme:this.themeableProvide}},inject:{theme:{default:{isDark:!1}}},props:{dark:{type:Boolean,default:null},light:{type:Boolean,default:null}},data(){return{themeableProvide:{isDark:!1}}},computed:{appIsDark(){return this.$vuetify.theme.dark||!1},isDark(){return!0===this.dark||!0!==this.light&&this.theme.isDark},themeClasses(){return{"theme--dark":this.isDark,"theme--light":!this.isDark}},rootIsDark(){return!0===this.dark||!0!==this.light&&this.appIsDark},rootThemeClasses(){return{"theme--dark":this.rootIsDark,"theme--light":!this.rootIsDark}}},watch:{isDark:{handler(e,t){e!==t&&(this.themeableProvide.isDark=this.isDark)},immediate:!0}}});function r(e){const t={...e.props,...e.injections},i=n.options.computed.isDark.call(t);return n.options.computed.themeClasses.call({isDark:i})}t["a"]=n},"7e2b":function(e,t,i){"use strict";var s=i("2b0e");function n(e){return function(t,i){for(const s in i)Object.prototype.hasOwnProperty.call(t,s)||this.$delete(this.$data[e],s);for(const s in t)this.$set(this.$data[e],s,t[s])}}t["a"]=s["a"].extend({data:()=>({attrs$:{},listeners$:{}}),created(){this.$watch("$attrs",n("attrs$"),{immediate:!0}),this.$watch("$listeners",n("listeners$"),{immediate:!0})}})},"8dd9":function(e,t,i){"use strict";i("25a8");var s=i("7e2b"),n=i("a9ad"),r=i("c995"),o=i("24b2"),a=i("a236"),c=i("7560"),l=i("58df");t["a"]=Object(l["a"])(s["a"],n["a"],r["a"],o["a"],a["a"],c["a"]).extend({name:"v-sheet",props:{outlined:Boolean,shaped:Boolean,tag:{type:String,default:"div"}},computed:{classes(){return{"v-sheet":!0,"v-sheet--outlined":this.outlined,"v-sheet--shaped":this.shaped,...this.themeClasses,...this.elevationClasses,...this.roundedClasses}},styles(){return this.measurableStyles}},render(e){const t={class:this.classes,style:this.styles,on:this.listeners$};return e(this.tag,this.setBackgroundColor(this.color,t),this.$slots.default)}})},a236:function(e,t,i){"use strict";var s=i("2b0e");t["a"]=s["a"].extend({name:"roundable",props:{rounded:[Boolean,String],tile:Boolean},computed:{roundedClasses(){const e=[],t="string"===typeof this.rounded?String(this.rounded):!0===this.rounded;if(this.tile)e.push("rounded-0");else if("string"===typeof t){const i=t.split(" ");for(const t of i)e.push("rounded-"+t)}else t&&e.push("rounded");return e.length>0?{[e.join(" ")]:!0}:{}}}})},a9ad:function(e,t,i){"use strict";var s=i("2b0e"),n=i("d9bd"),r=i("7bc6");t["a"]=s["a"].extend({name:"colorable",props:{color:String},methods:{setBackgroundColor(e,t={}){return"string"===typeof t.style?(Object(n["b"])("style must be an object",this),t):"string"===typeof t.class?(Object(n["b"])("class must be an object",this),t):(Object(r["d"])(e)?t.style={...t.style,"background-color":""+e,"border-color":""+e}:e&&(t.class={...t.class,[e]:!0}),t)},setTextColor(e,t={}){if("string"===typeof t.style)return Object(n["b"])("style must be an object",this),t;if("string"===typeof t.class)return Object(n["b"])("class must be an object",this),t;if(Object(r["d"])(e))t.style={...t.style,color:""+e,"caret-color":""+e};else if(e){const[i,s]=e.toString().trim().split(" ",2);t.class={...t.class,[i+"--text"]:!0},s&&(t.class["text--"+s]=!0)}return t}}})},c1ae:function(e,t,i){"use strict";i("10d0")},c995:function(e,t,i){"use strict";var s=i("2b0e");t["a"]=s["a"].extend({name:"elevatable",props:{elevation:[Number,String]},computed:{computedElevation(){return this.elevation},elevationClasses(){const e=this.computedElevation;return null==e||isNaN(parseInt(e))?{}:{["elevation-"+this.elevation]:!0}}}})},deff:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"certification-text",domProps:{textContent:e._s("(인증하기) 버튼을 눌러 인증을 진행해주세요!")}}),i("v-btn",{staticClass:"signup-button",attrs:{block:"block","x-large":""},domProps:{textContent:e._s("인증하기")},on:{click:function(t){return e.handleCertificate()}}}),i("div",{staticClass:"verficaton-container"},[i("v-btn",{staticClass:"signup-button",attrs:{"x-large":""},domProps:{textContent:e._s("인증이 완료되었다면 클릭해주세요")},on:{click:function(t){return e.goToPayment()}}})],1),i("BaseDialog",{attrs:{"is-dialog-open":!e.isOpenDialog},scopedSlots:e._u([{key:"content",fn:function(){return[i("div",[e._v(" 휴대폰 인증을 완료해주세요!! ")])]},proxy:!0},{key:"footer",fn:function(){return[i("div",{on:{click:function(t){e.isOpenDialog=!0}}},[e._v(" 확인 ")])]},proxy:!0}])})],1)},n=[],r=i("1da1"),o=i("5530"),a=(i("96cf"),i("d3b7"),i("3ca3"),i("ddb0"),i("2f62")),c={name:"certification",components:{BaseDialog:function(){return i.e("chunk-02df99f9").then(i.bind(null,"45eb"))}},data:function(){return{isOpenDialog:!1,code:""}},computed:Object(o["a"])({},Object(a["d"])(["stateCode"])),methods:Object(o["a"])(Object(o["a"])({},Object(a["b"])(["postAuthCode","getUserData"])),{},{handleCertificate:function(){console.log(this.stateCode);var e="89358db6-c434-40fe-9ae2-a2254dc1506a",t=window.open("about:blank");t.location="https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id="+e+"&redirect_uri=http://localhost:3000/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0"},goToPayment:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.code=e.stateCode,e.code){t.next=5;break}e.isOpenDialog=!1,t.next=8;break;case 5:return t.next=7,e.$store.dispatch("getUserData");case 7:e.$router.push("/payment");case 8:case"end":return t.stop()}}),t)})))()}})},l=c,p=(i("c1ae"),i("2877")),u=i("6544"),d=i.n(u),h=i("8336"),m=Object(p["a"])(l,s,n,!1,null,"3d101ea4",null);t["default"]=m.exports;d()(m,{VBtn:h["a"]})},fe6c:function(e,t,i){"use strict";i.d(t,"b",(function(){return o}));var s=i("2b0e"),n=i("80d2");const r={absolute:Boolean,bottom:Boolean,fixed:Boolean,left:Boolean,right:Boolean,top:Boolean};function o(e=[]){return s["a"].extend({name:"positionable",props:e.length?Object(n["j"])(r,e):r})}t["a"]=o()}}]);
//# sourceMappingURL=chunk-4f02bc2f.8848ddfc.js.map