(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9118],{6166:function(e,c,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/balance",function(){return a(6023)}])},6023:function(e,c,a){"use strict";a.r(c);var n=a(2322),t=a(2784),l=a(4265),r=a(5740),s=a(6542),i=a(2942),o=a(8735),u=a(6933),f=a(5627);async function checkCUSDBalance(e){let c=(0,l.v)({chain:o.$,transport:(0,r.d)()}),a=(0,s.uN)({address:"0x874069fa1eb16d44d622f2e0ca25eea172369bc1",abi:u.cS,client:c}),n=await a.read.balanceOf([e]);return(0,i.d)(n)}c.default=()=>{let[e,c]=(0,t.useState)(null),{address:a}=(0,f.m)();(0,t.useEffect)(()=>{let fetchBalance=async()=>{try{let e=await checkCUSDBalance(a);c(e)}catch(e){console.error("Error fetching CUSD balance:",e)}};fetchBalance()},[]);let handleClick=async()=>{try{let e=await checkCUSDBalance(a);c(e)}catch(e){console.error("Error fetching CUSD balance:",e)}};return(0,n.jsxs)("div",{className:"flex justify-center items-center h-screen flex-col",children:[e&&(0,n.jsx)("button",{className:"bg-pa_one text-pa_two font-bold py-2 px-4 rounded mb-4",onClick:handleClick,children:"Check CUSD Balance"}),e&&(0,n.jsxs)("div",{className:"text-center",children:["Your CUSD balance: ",e," CUSD"]})]})}}},function(e){e.O(0,[8902,9774,2888,179],function(){return e(e.s=6166)}),_N_E=e.O()}]);