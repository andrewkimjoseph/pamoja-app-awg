(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6007],{9472:function(t,e,n){"use strict";n.d(e,{Z:function(){return Spinner}});var i=n(2322);n(2784);var a=n(6159),r=n.n(a);function Spinner(){return(0,i.jsx)("div",{style:{width:"50px",margin:"auto",display:"block"},children:(0,i.jsx)(r(),{className:"bg-pa_two",size:50})})}},8797:function(t,e,n){"use strict";n.d(e,{k:function(){return getContributionsOfContributor}});var i=n(694),a=n(1777),r=n(4510),u=n(5408);let getContributionsOfContributor=async t=>{if(window.ethereum){let e=new i.Q(window.ethereum),n=e.getSigner(t),s=new a.CH(u.z,r.Y,n),o=await s.callStatic.getContributionsOfContributor(t),p=[];for(let t=0;t<o.length;t++){let e=o[t],n={_index:t,_amount:parseInt(e.toString())};p.push(n)}return p}return[]}},4510:function(t,e,n){"use strict";n.d(e,{Y:function(){return i}});let i=[{inputs:[{internalType:"string",name:"_username",type:"string"},{internalType:"address",name:"_contributorAddress",type:"address"}],name:"addContributorToDirectory",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_amount",type:"uint256"},{internalType:"address",name:"_creatingContributor",type:"address"}],name:"createAmountInSaving",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"makeWithdrawalToRecipientContributor",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"},{internalType:"address",name:"_creatingContributor",type:"address"},{internalType:"address",name:"_newContributor",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"updateContributorInSaving",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"updateSavingAfterWithdrawal",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"checkIfContributorExists",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"},{internalType:"address",name:"_checkingContributor",type:"address"}],name:"checkIfContributorExistsInSaving",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"getAllContributors",outputs:[{components:[{internalType:"uint256",name:"_id",type:"uint256"},{internalType:"address",name:"_address",type:"address"},{internalType:"string",name:"_username",type:"string"}],internalType:"struct Contributor[]",name:"",type:"tuple[]"}],stateMutability:"view",type:"function"},{inputs:[],name:"getAllSavings",outputs:[{components:[{internalType:"uint256",name:"_id",type:"uint256"},{internalType:"address",name:"_creatingContributor",type:"address"}],internalType:"struct Saving[]",name:"",type:"tuple[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getContributionsOfContributor",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"getContributionsOfSaving",outputs:[{internalType:"uint256[]",name:"",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getContributor",outputs:[{components:[{internalType:"uint256",name:"_id",type:"uint256"},{internalType:"address",name:"_address",type:"address"},{internalType:"string",name:"_username",type:"string"}],internalType:"struct Contributor",name:"",type:"tuple"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getContributorIdFromDirectory",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getContributorIndex",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"getCreatingContributor",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"getCurrentRoundOfSaving",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getNumberOfContributionsOfContributor",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getNumberOfContributorSavings",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_creatingContributor",type:"address"}],name:"getNumberOfSavingsCreatedByContributor",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"getRecipientContributorAddressOfSaving",outputs:[{internalType:"address",name:"_recipientContributor",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"},{internalType:"address",name:"_savingCreator",type:"address"}],name:"getSaving",outputs:[{components:[{internalType:"uint256",name:"_id",type:"uint256"},{internalType:"address",name:"_creatingContributor",type:"address"}],internalType:"struct Saving",name:"",type:"tuple"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"},{internalType:"address",name:"_creatingContributor",type:"address"}],name:"getSavingIndex",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_creatingContributor",type:"address"}],name:"getSavingsCreatedByContributor",outputs:[{components:[{internalType:"uint256",name:"_id",type:"uint256"},{internalType:"address",name:"_creatingContributor",type:"address"}],internalType:"struct Saving[]",name:"",type:"tuple[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_contributorAddress",type:"address"}],name:"getTotalAmountOfContributionsOfContributor",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_savingId",type:"uint256"}],name:"getWithdrawalAmountFromSaving",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}]},5408:function(t,e,n){"use strict";n.d(e,{z:function(){return i}});let i="0x37059A2E49654D22604266a583E9da73B46A1B77"},6159:function(t,e,n){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},a=this&&this.__createBinding||(Object.create?function(t,e,n,i){void 0===i&&(i=n);var a=Object.getOwnPropertyDescriptor(e,n);(!a||("get"in a?!e.__esModule:a.writable||a.configurable))&&(a={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(t,i,a)}:function(t,e,n,i){void 0===i&&(i=n),t[i]=e[n]}),r=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),u=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.prototype.hasOwnProperty.call(t,n)&&a(e,t,n);return r(e,t),e},s=this&&this.__rest||function(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&0>e.indexOf(i)&&(n[i]=t[i]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,i=Object.getOwnPropertySymbols(t);a<i.length;a++)0>e.indexOf(i[a])&&Object.prototype.propertyIsEnumerable.call(t,i[a])&&(n[i[a]]=t[i[a]]);return n};Object.defineProperty(e,"__esModule",{value:!0});var o=u(n(2784)),p=n(8261),d=(0,n(9722).createAnimation)("ClipLoader","0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}","clip");e.default=function(t){var e=t.loading,n=t.color,a=void 0===n?"#000000":n,r=t.speedMultiplier,u=t.cssOverride,y=t.size,l=void 0===y?35:y,c=s(t,["loading","color","speedMultiplier","cssOverride","size"]),m=i({background:"transparent !important",width:(0,p.cssValue)(l),height:(0,p.cssValue)(l),borderRadius:"100%",border:"2px solid",borderTopColor:a,borderBottomColor:"transparent",borderLeftColor:a,borderRightColor:a,display:"inline-block",animation:"".concat(d," ").concat(.75/(void 0===r?1:r),"s 0s infinite linear"),animationFillMode:"both"},void 0===u?{}:u);return void 0===e||e?o.createElement("span",i({style:m},c)):null}},9722:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createAnimation=void 0,e.createAnimation=function(t,e,n){var i="react-spinners-".concat(t,"-").concat(n);if("undefined"==typeof window||!window.document)return i;var a=document.createElement("style");document.head.appendChild(a);var r=a.sheet,u="\n    @keyframes ".concat(i," {\n      ").concat(e,"\n    }\n  ");return r&&r.insertRule(u,0),i}},8261:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssValue=e.parseLengthAndUnit=void 0;var n={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function parseLengthAndUnit(t){if("number"==typeof t)return{value:t,unit:"px"};var e,i=(t.match(/^[0-9.]*/)||"").toString();e=i.includes(".")?parseFloat(i):parseInt(i,10);var a=(t.match(/[^0-9]*$/)||"").toString();return n[a]?{value:e,unit:a}:(console.warn("React Spinners: ".concat(t," is not a valid css value. Defaulting to ").concat(e,"px.")),{value:e,unit:"px"})}e.parseLengthAndUnit=parseLengthAndUnit,e.cssValue=function(t){var e=parseLengthAndUnit(t);return"".concat(e.value).concat(e.unit)}},3196:function(){}}]);