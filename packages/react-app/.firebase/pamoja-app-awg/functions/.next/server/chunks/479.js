exports.id=479,exports.ids=[479],exports.modules={681:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{Z:()=>Header});var r=s(997),l=s(9435),n=s(5116),c=s(3735),i=s(6921),o=s(6577),d=s.n(o),m=s(9097),x=s.n(m),h=s(6689),p=s(8998),b=s(9263),u=e([i,p,b]);function Header(){let[e,t]=(0,h.useState)(!1),{connect:s}=(0,p.useConnect)();return(0,h.useEffect)(()=>{window.ethereum&&window.ethereum.isMiniPay&&(t(!0),s({connector:(0,b.injected)({target:"metaMask"})}))},[]),r.jsx(l.p,{as:"nav",className:"border-b border-white bg-pa_one",children:({open:t})=>(0,r.jsxs)(r.Fragment,{children:[r.jsx("div",{className:"mx-auto max-w-7xl px-2 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"relative flex h-16 justify-between",children:[r.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center sm:hidden",children:(0,r.jsxs)(l.p.Button,{className:"inline-flex items-center justify-center rounded-md p-2 text-pa_one bg-pa_two",children:[r.jsx("span",{className:"sr-only",children:"Open main menu"}),t?r.jsx(n.Z,{className:"block h-6 w-6","aria-hidden":"true"}):r.jsx(c.Z,{className:"block h-6 w-6","aria-hidden":"true"})]})}),(0,r.jsxs)("div",{className:"flex flex-1 items-center justify-center sm:items-stretch sm:justify-start",children:[r.jsx("div",{className:"flex flex-shrink-0 items-center",children:r.jsx(d(),{className:"block h-16 w-auto sm:block lg:block",src:"/logo_dark.svg",priority:!0,width:"16",height:"16",alt:"Celo Logo"})}),(0,r.jsxs)("div",{className:"hidden sm:ml-6 sm:flex sm:space-x-8",children:[r.jsx(x(),{href:"/",className:"inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-pa_two",children:"Home"}),r.jsx(x(),{href:"/welcome",className:"inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-pa_two",children:"About"}),r.jsx(x(),{href:"/balance",className:"inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-pa_two",children:"Balance"})]})]}),r.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0",children:!e&&r.jsx(i.ConnectButton,{showBalance:{smallScreen:!0,largeScreen:!1}})})]})}),r.jsx(l.p.Panel,{className:"sm:hidden",children:(0,r.jsxs)("div",{className:"space-y-1 pt-2 pb-4",children:[r.jsx(l.p.Button,{as:"a",href:"/",className:"block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two",children:"Home"}),r.jsx(l.p.Button,{as:"a",href:"/welcome",className:"block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two",children:"Welcome"}),r.jsx(l.p.Button,{as:"a",href:"/balance",className:"block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two",children:"Balance"}),r.jsx(l.p.Button,{as:"a",href:"/send_cusd",className:"block border-l-4 border-white py-2 pl-3 pr-4 text-base font-medium text-pa_two",children:"Send CUSD"})]})})]})})}[i,p,b]=u.then?(await u)():u,a()}catch(e){a(e)}})},369:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.d(t,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var r=s(997),l=s(681),n=e([l]);l=(n.then?(await n)():n)[0];let __WEBPACK_DEFAULT_EXPORT__=({children:e})=>r.jsx(r.Fragment,{children:(0,r.jsxs)("div",{className:"bg-pa_three overflow-hidden flex flex-col min-h-screen",children:[r.jsx(l.Z,{}),r.jsx("div",{className:"py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8",children:e})]})});a()}catch(e){a(e)}})},5479:(e,t,s)=>{"use strict";s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var r=s(997),l=s(6921),n=s(7045);s(7258);var c=s(8998);s(5748);var i=s(7697),o=s(9752),d=s(369),m=e([l,n,c,i,o,d]);[l,n,c,i,o,d]=m.then?(await m)():m;let x=(0,l.connectorsForWallets)([{groupName:"Recommended",wallets:[n.injectedWallet]}],{appName:"Pamoja App AWG",projectId:"044601f65212332475a09bc14ceb3c34"}),h=(0,c.createConfig)({connectors:x,chains:[i.celo,i.celoAlfajores],transports:{[i.celo.id]:(0,c.http)(),[i.celoAlfajores.id]:(0,c.http)()}}),p=new o.QueryClient,__WEBPACK_DEFAULT_EXPORT__=function({Component:e,pageProps:t}){return r.jsx(c.WagmiProvider,{config:h,children:r.jsx(o.QueryClientProvider,{client:p,children:r.jsx(l.RainbowKitProvider,{children:r.jsx(d.Z,{children:r.jsx(e,{...t})})})})})};a()}catch(e){a(e)}})},5748:()=>{}};