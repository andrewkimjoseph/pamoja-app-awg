(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9118],{6166:function(e,c,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/balance",function(){return n(6023)}])},6023:function(e,c,n){"use strict";n.r(c);var a=n(2322),t=n(2784),r=n(4265),l=n(5740),s=n(6542),i=n(2942),o=n(8735),u=n(6933),h=n(5627);async function checkCUSDBalance(e){let c=(0,r.v)({chain:o.$,transport:(0,l.d)()}),n=(0,s.uN)({address:"0x874069fa1eb16d44d622f2e0ca25eea172369bc1",abi:u.cS,client:c}),a=await n.read.balanceOf([e]);return(0,i.d)(a)}c.default=()=>{let[e,c]=(0,t.useState)(null),{address:n}=(0,h.m)();(0,t.useEffect)(()=>{let fetchBalance=async()=>{try{let e=await checkCUSDBalance(n);c(e)}catch(e){console.error("Error fetching CUSD balance:",e)}};fetchBalance()},[]);let handleClick=async()=>{try{let e=await checkCUSDBalance(n);c(e)}catch(e){console.error("Error fetching CUSD balance:",e)}};return(0,a.jsxs)("div",{className:"flex justify-center items-center h-screen flex-col",children:[e&&(0,a.jsx)("button",{className:"bg-prosperity hover:bg-prosperity text-white font-bold py-2 px-4 rounded mb-4",onClick:handleClick,children:"Check CUSD Balance"}),e&&(0,a.jsxs)("div",{className:"text-center",children:["Your CUSD balance: ",e," CUSD"]})]})}}},function(e){e.O(0,[8902,9774,2888,179],function(){return e(e.s=6166)}),_N_E=e.O()}]);