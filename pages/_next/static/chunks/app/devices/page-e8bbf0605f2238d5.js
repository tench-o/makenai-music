(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[348],{3909:function(e,n,i){Promise.resolve().then(i.bind(i,4716))},4716:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return c}});var r=i(7437),t=i(6615),u=i(4033);function c(){var e,n;let{device:i,isLoading:c,error:d}=(0,t.L)();return(null==d?void 0:d.message)==="Unauthorized"&&(0,u.redirect)("/api/auth"),(0,r.jsxs)("main",{children:[(0,r.jsx)("h1",{children:"利用するデバイスを選んで"}),i&&(null==i?void 0:null===(n=i.devices)||void 0===n?void 0:null===(e=n.devices)||void 0===e?void 0:e.map(e=>(0,r.jsx)("div",{children:(0,r.jsx)("a",{href:"/player?device_id=".concat(e.id),children:e.name})},e.id)))]})}},6615:function(e,n,i){"use strict";i.d(n,{L:function(){return u}});var r=i(5362);let t=e=>fetch(e).then(e=>{if(200!==e.status)throw Error(e.statusText);return e.json()}),u=()=>{let{data:e,error:n,isLoading:i}=(0,r.Z)("/api/devices",t);return{device:e,isLoading:i,error:n}}}},function(e){e.O(0,[120,971,596,744],function(){return e(e.s=3909)}),_N_E=e.O()}]);