(this.webpackJsonpatlas=this.webpackJsonpatlas||[]).push([[0],{92:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(25),o=n.n(i),s=n(18),a=n(26),l=n(9),u=n(2),b=n.n(u),d=n(46),j=n(5),f=n(39),h=n(45),p="https://zvwrqklvkomshwpkxepe.supabase.co",x="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2d3Jxa2x2a29tc2h3cGt4ZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcwOTg3MjgsImV4cCI6MTk2MjY3NDcyOH0.ZZMKNhlYSsvC0VB6fU1b1Xyp1Fn9WFS9Gpd8pVCaZCE",O=Object(h.a)(p,x),m=n(21),g=n(40),v=n(41),k=n(4),w=function(e){var t=e.str,n=e.substr,c=void 0===n?"":n,r=t.indexOf(c);if(!c||!c.trim())return Object(k.jsx)(f.c,{fontSize:["sm","sm","md"],children:t});if(r>-1){var i=t.slice(0,r),o=t.slice(r+c.length,t.length);return Object(k.jsxs)(f.c,{fontSize:["sm","sm","md"],children:[i,Object(k.jsx)(f.c,{as:"span",fontWeight:600,color:"Keppel",children:c}),o]})}return Object(k.jsx)(f.c,{fontSize:["sm","sm","md"],color:"gray.400",children:t})},y=function(e){var t=e.url,n=e.inputTerm;return Object(k.jsx)(f.b,{m:[1,1,2],onClick:function(){0===t.indexOf("http://")||0===t.indexOf("https://")?window.open(t,"_blank"):window.open("http://".concat(t),"_blank")},_hover:{cursor:"pointer",fontWeight:600,color:"Keppel"},children:Object(k.jsx)(w,{str:t,substr:n})})},I=function(e){e.category;var t=e.links,n=e.inputTerm;return t?Object(k.jsx)(f.b,{direction:"row",flexWrap:"wrap",justify:"center",align:"center",overflowY:"scroll",overflowX:"hidden",pb:20,children:t.map((function(e){return Object(k.jsx)(y,{url:e.url,inputTerm:n},e.id)}))}):null},S=function(e){var t=e.user,n=Object(c.useRef)(),r=Object(c.useState)(null),i=Object(l.a)(r,2),o=i[0],s=i[1],u=Object(c.useState)(!1),d=Object(l.a)(u,2),j=d[0],h=d[1],p=Object(c.useState)(null),x=Object(l.a)(p,2),w=x[0],y=x[1],S=function(){var e=Object(a.a)(b.a.mark((function e(){var t,n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.from("links").select("*").order("id",{ascending:!0});case 2:t=e.sent,n=t.data,(c=t.error)?console.log("error",c):y(n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){var e=Object(a.a)(b.a.mark((function e(){var n,c,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o){e.next=2;break}return e.abrupt("return");case 2:return h(!0),e.next=5,O.from("links").insert({url:o,user_id:t.id}).single();case 5:n=e.sent,c=n.data,(r=n.error)?(console.log(r),h(!1)):(y([].concat(Object(m.a)(w),[c])),s(null),h(!1));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){w||S()}),[w]),Object(k.jsxs)(f.b,{direction:"column",bg:"paper",height:"100vh",overflowY:"hidden",children:[Object(k.jsxs)(f.b,{direction:"column",width:"100%",justify:"flex-start",pl:5,children:[Object(k.jsx)(f.c,{color:"softBlack",fontWeight:"black",fontSize:["3xl","3xl","4xl"],pt:2,children:"Atlas"}),Object(k.jsx)(f.c,{color:"gray.400",fontWeight:"black",fontSize:["xl","xl","2xl"],mt:-2,children:"\u30a2\u30c8\u30e9\u30b9"})]}),Object(k.jsx)(f.b,{direction:"column",alignItems:"center",width:"100%",height:"100%",children:Object(k.jsxs)(f.b,{direction:"column",justify:"center",align:"center",width:"100vw",px:3,children:[Object(k.jsxs)(f.b,{direction:"column",pb:[4,4,8],pt:4,width:["95vw","95vw","65vw"],children:[Object(k.jsx)(g.b,{justifySelf:"center",children:Object(k.jsx)(g.a,{type:"text",placeholder:"Enter link...",value:o||"",onChange:function(e){return s(e.target.value)},disabled:j})}),Object(k.jsx)(v.a,{pt:3,alignSelf:"flex-end",variant:"link",color:"OrientalPink",onClick:C,disabled:!o||j,_hover:{textDecoration:"none"},children:"Add"})]}),Object(k.jsx)(f.b,{direction:"column",width:"100%",height:"calc(100vh - 105px - 75px)",overflowY:"scroll",pt:5,children:Object(k.jsx)(I,{category:null,links:w,inputTerm:o})})]})}),Object(k.jsx)(v.a,{zIndex:100,position:"absolute",bottom:[5,5,10],left:[5,5,10],bg:"Terracotta",onClick:function(){O.auth.signOut()},children:"Logout"}),Object(k.jsxs)(f.a,{zIndex:100,position:"absolute",bottom:[5,5,10],right:[5,5,10],children:[Object(k.jsx)("input",{type:"file",ref:n,style:{display:"none"}}),Object(k.jsx)(v.a,{onClick:function(){return n.current.click()},bg:"HalfBaked",disabled:!0,children:"Import"})]})]})},C=function(){return Object(k.jsx)(f.b,{direction:"column",bg:"paper",height:"100vh",children:Object(k.jsx)(f.b,{align:"center",justify:"center",direction:"row",width:"100%",height:"100%",children:Object(k.jsxs)(f.b,{direction:"column",align:"center",children:[Object(k.jsx)(f.c,{color:"softBlack",fontWeight:700,fontSize:"6xl",pb:5,children:"Atlas"}),Object(k.jsx)(v.a,{color:"black",bg:"Terracotta",onClick:function(){O.auth.signIn({provider:"github"},{redirectTo:"https://rynpatk.github.io/atlas"})},children:"Login with Github"})]})})})},B=function(){var e=Object(c.useState)(null),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Boolean(n);return Object(c.useEffect)((function(){var e,t=O.auth.session();r(null!==(e=null===t||void 0===t?void 0:t.user)&&void 0!==e?e:null);var n=O.auth.onAuthStateChange(function(){var e=Object(a.a)(b.a.mark((function e(t,n){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=null===n||void 0===n?void 0:n.user,r(null!==c&&void 0!==c?c:null);case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),c=n.data;return function(){null===c||void 0===c||c.unsubscribe()}}),[n]),Object(k.jsx)(d.a,{basename:"/atlas",children:Object(k.jsxs)(j.c,{children:[Object(k.jsx)(j.a,{exact:!0,path:"/",element:i?Object(k.jsx)(S,{user:n}):Object(k.jsx)(C,{})}),Object(k.jsx)(j.a,{element:Object(k.jsx)(f.c,{children:"Oops!"}),status:404})]})})},z={Terracotta:"#E27D60",HalfBaked:"#85CDCB",Tacao:"#E8A87C",OrientalPink:"#C38D9E",Keppel:"#41B3A3",softBlack:"#282425",softPink:"#f15152ff","primary-focus":"#e86f68","primary-content":"#282425",softBlue:"#a4cbb4","secondary-focus":"#84b89a","secondary-content":"#282425",softYellow:"#ebdc99","accent-focus":"#e2cd6e",neutral:"#7d7259","neutral-focus":"#454035",paper:"#fbfbf8","base-100":"#e4d8b4","base-200":"#d2c59d","base-300":"#c6b386","base-content":"#282425",info:"#2094f3",success:"#009485",warning:"#ff9900",error:"#ff5724"},T=Object(s.b)({colors:z,fonts:{heading:"Sora",body:"Sora"}});n(92);o.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(s.a,{theme:T,children:Object(k.jsx)(B,{})})}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.780dba17.chunk.js.map