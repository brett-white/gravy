!function(){function e(){I.value>0?(I.className="valid",k.className="is-closed",a()):(I.className="invalid",I.value=0)}function a(){localStorage.clear(),localStorage.storedRate=S.value,localStorage.storedRatio1=b.value,localStorage.storedRatio2=D.value,localStorage.storedRatio3=W.value,localStorage.storedRatio4=H.value,localStorage.storedRatio5=C.value,localStorage.storedTimeType=T.selectedIndex,localStorage.storedWorkDay=R.selectedIndex,localStorage.storedWorkWeek=w.selectedIndex,B.classList.contains("is-closed")&&(localStorage.helpClosed=!0),O=Math.ceil(S.value/100*b.value),Q=Math.ceil(S.value/100*D.value),U=Math.ceil(S.value/100*W.value),X=Math.ceil(S.value/100*H.value),Y=Math.ceil(S.value/100*C.value),F.value=O,P.value=Q,K.value=U,j.value=X,z.value=Y,document.getElementById("star5Val").innerHTML=Y,document.getElementById("star4Val").innerHTML=X,document.getElementById("star3Val").innerHTML=U,document.getElementById("star2Val").innerHTML=Q,document.getElementById("star1Val").innerHTML=O}function t(){"weeks"===T.value?_=w.value*R.value:"days"===T.value?_=R.value:"hours"===T.value&&(_="1"),localStorage.storedTimeType=T.selectedIndex}function l(){t(),p.value=Math.ceil(x.value*_*J),""===p.value&&(p.value=0)}function c(){p.value=0,Z=0,p.classList.remove("invalid")}function n(){t();var e,a,l;ee=Math.floor(x.value*_),ae=Math.floor(ee/R.value),te=Math.floor(ae/w.value),le=Math.floor(ae-te*w.value),ce=Math.floor(ee-ae*R.value),e=0===te||te>1?" weeks":" week",a=0===le||le>1?" days":" day",l=0===ce||ce>1?" hours":" hour",q.innerHTML=ee>=1?te+" "+e+" : "+le+" "+a+" : "+ce+" "+l:""}function s(){x.value>0&&("hours"===se&&"days"===T.value?(oe=ne/R.value,x.value=oe.toFixed(2)):"hours"===se&&"weeks"===T.value?(oe=ne/R.value/w.value,x.value=oe.toFixed(2)):"days"===se&&"hours"===T.value?(oe=ne*R.value,x.value=Math.floor(oe)):"days"===se&&"weeks"===T.value?(oe=ne/w.value,x.value=oe.toFixed(2)):"weeks"===se&&"days"===T.value?(oe=ne*w.value,x.value=oe.toFixed(2)):"weeks"===se&&"hours"===T.value&&(oe=ne*R.value*w.value,x.value=Math.floor(oe))),ne=x.value,se=T.value,t()}function o(){t(),x.value=Math.round(p.value/J*_),n(),""===x.value&&(x.value=0)}function d(){x.value=0,ee=0,_=1,q.innerHTML="",x.classList.remove("invalid")}function u(){F.checked&&(J=O,V.className="isRated",F.className="valid",P.className="",K.className="",j.className="",z.className=""),P.checked&&(J=Q,V.className="isRated",F.className="valid",P.className="valid",K.className="",j.className="",z.className=""),K.checked&&(J=U,V.className="isRated",F.className="valid",P.className="valid",K.className="valid",j.className="",z.className=""),j.checked&&(J=X,V.className="isRated",F.className="valid",P.className="valid",K.className="valid",j.className="valid",z.className=""),z.checked&&(J=Y,V.className="isRated",F.className="valid",P.className="valid",K.className="valid",j.className="valid",z.className="valid")}function i(){V.className="",F.className="",P.className="",K.className="",j.className="",z.className="",F.checked=!1,P.checked=!1,K.checked=!1,j.checked=!1,z.checked=!1}function v(){n(),J=Math.round(p.value/ee),i(),J>=O&&J<Q?F.checked=!0:J>=Q&&J<U?P.checked=!0:J>=U&&J<X?K.checked=!0:J>=X&&J<Y?j.checked=!0:J>=Y&&(z.checked=!0),u()}function r(){J=0,i()}function m(){c(),d(),r()}function g(){e(),u(),l()}var f=document.getElementById("logo"),E=document.getElementById("settings"),h=document.getElementById("settingsIcon"),y=document.getElementById("save"),L=document.getElementById("overlay"),k=document.getElementById("welcome"),N=document.getElementById("go"),I=document.getElementById("setRate"),S=document.getElementById("hourlyRate"),B=document.getElementById("helpPanel"),M=document.getElementById("gotIt"),R=document.getElementById("workDay"),w=document.getElementById("workWeek"),p=document.getElementById("cost"),x=document.getElementById("time"),T=document.getElementById("timeType"),q=document.querySelector(".times"),b=document.getElementById("ratio1"),D=document.getElementById("ratio2"),W=document.getElementById("ratio3"),H=document.getElementById("ratio4"),C=document.getElementById("ratio5"),V=document.getElementById("stars"),F=document.getElementById("star1"),P=document.getElementById("star2"),K=document.getElementById("star3"),j=document.getElementById("star4"),z=document.getElementById("star5"),A=document.getElementById("clearBtn"),G=document.getElementById("calcBtn"),J,O,Q,U,X,Y,Z,_,ee,ae,te,le,ce,ne,se,oe,de;p.value=0,x.value=0,J=0,ne=x.value,window.addEventListener("load",function(){window.scrollTo(0,0),document.body.classList.remove("loading")}),function(){localStorage.storedRate?(I.value=localStorage.storedRate,S.value=I.value,k.className="",E.className="",L.className="",b.value=localStorage.storedRatio1,D.value=localStorage.storedRatio2,W.value=localStorage.storedRatio3,H.value=localStorage.storedRatio4,C.value=localStorage.storedRatio5,T.selectedIndex=localStorage.storedTimeType,T.value=T[T.selectedIndex].value,se=T.value,R.selectedIndex=localStorage.storedWorkDay,w.selectedIndex=localStorage.storedWorkWeek,localStorage.helpClosed?B.classList.add("is-closed"):B.classList.remove("is-closed"),a()):(k.className="first-time",E.className="is-open",L.className="is-visible",I.value=0,T.selectedIndex=0,T.value="hours",se=T.value,R.selectedIndex=7,w.selectedIndex=4)}(),document.querySelector("#costLabel").addEventListener("click",function(){p.select()}),document.querySelector("#costIcon").addEventListener("click",function(){p.select()}),p.addEventListener("focus",function(){p.select()}),p.addEventListener("blur",function(){""===p.value&&(p.value=0)}),p.addEventListener("change",function(){p.value>=O&&x.value>=1&&J<O?v():p.value>=O&&J>=O?(t(),x.value=Math.ceil(p.value/J/_)):p.value>=O&&x.value<1&&J<O?(t(),K.checked=!0,u(),x.value=Math.ceil(p.value/J/_),l()):p.value<=O&&(p.value=O,x.value=1,F.checked=!0,J=O,u())}),document.querySelector("#timeIcon").addEventListener("click",function(){x.select()}),x.addEventListener("focus",function(){x.select()}),x.addEventListener("blur",function(){""===x.value&&(x.value=0)}),x.addEventListener("change",function(){if(de=Number(ee*Y),x.value>=1&&J>=O&&J<=Y)l();else if(p.value>=O&&x.value>1&&J<O)v();else if(x.value>0&&p.value<O&&J<O){var e=Math.ceil(x.value);x.value=e,n(),p.value=U*ee,K.checked=!0,J=U,u()}n()}),T.addEventListener("change",function(){ne=x.value,s()}),V.addEventListener("change",function(){u(),de=Number(ee*Y),x.value>=1&&J>=O&&J<=Y?l():p.value>=O&&p.value>=de&&J>=O?o():p.value<O&&x.value<1&&(x.value=1,n(),p.value=J*(x.value*_))}),document.querySelector("#welcomeRate").addEventListener("click",function(){I.select()}),I.addEventListener("focus",function(){I.select()}),I.addEventListener("blur",function(){""===I.value&&(I.value=0)}),I.addEventListener("change",function(){S.value=I.value,e(),u(),l()}),N.addEventListener("click",function(){e()}),M.addEventListener("click",function(){localStorage.helpClosed=!0,B.classList.add("is-closed")}),document.querySelector("#helpIcon").addEventListener("click",function(){console.log("HELP CLICKED"),B.classList.contains("is-closed")?B.classList.remove("is-closed"):B.classList.add("is-closed")}),f.addEventListener("click",function(){k.className="is-open"}),document.querySelector("#settingsRate").addEventListener("click",function(){S.select()}),S.addEventListener("focus",function(){S.select()}),S.addEventListener("blur",function(){(""===S.value||S.value<=0)&&(S.value=localStorage.storedRate)}),S.addEventListener("change",function(){I.value=S.value,localStorage.storedRate=S.value,a(),u(),l()}),G.addEventListener("click",function(e){e.preventDefault()}),A.addEventListener("click",function(e){e.preventDefault(),m()}),I.addEventListener("change",a),document.querySelector("#row1").addEventListener("click",function(){b.select()}),b.addEventListener("change",function(){g()}),document.querySelector("#row2").addEventListener("click",function(){D.select()}),D.addEventListener("change",function(){g()}),document.querySelector("#row3").addEventListener("click",function(){W.select()}),W.addEventListener("change",function(){g()}),document.querySelector("#row4").addEventListener("click",function(){H.select()}),H.addEventListener("change",function(){g()}),document.querySelector("#row5").addEventListener("click",function(){C.select()}),C.addEventListener("change",function(){g()}),R.addEventListener("change",function(){n(),localStorage.storedWorkDay=R.selectedIndex}),w.addEventListener("change",function(){n(),localStorage.storedWorkWeek=w.selectedIndex}),h.addEventListener("click",function(e){e.preventDefault(),E.classList.contains("is-open")?(E.className="is-closed",L.className="is-hidden"):(E.className="is-open",L.className="is-visible")}),y.addEventListener("click",function(e){e.preventDefault(),E.className="is-closed",L.className="is-hidden"}),L.addEventListener("click",function(e){e.preventDefault(),E.className="is-closed",L.className="is-hidden"})}();