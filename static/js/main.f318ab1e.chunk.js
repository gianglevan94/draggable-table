(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{215:function(e,t,n){},216:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(75),i=n.n(o),c=(n(89),n(2)),l=n(3),s=n(5),u=n(4),d=n(6),m=n(11),h=n(82),f=n(83),p=n(31),g=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getStyle=function(e){var t=n.props.widths;return t[e]?{width:t[e]}:{}},n.renderColumn=function(e,t,a,o){return t.render&&"function"===typeof t.render?r.a.createElement("td",{className:t.className,style:n.getStyle(t.key),key:a},t.render(e[t.key],e,o)):r.a.createElement("td",{className:t.className,style:n.getStyle(t.key),key:a},e[t.key])},n.onDragEnd=function(e){(0,n.props.reorder)(e.source.index,e.destination.index)},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.data,a=t.schema;return t.draggable?r.a.createElement(p.a,{onDragEnd:this.onDragEnd},r.a.createElement(p.c,{droppableId:"droppableRow"},function(t){return r.a.createElement("tbody",{ref:t.innerRef},n.map(function(t,n){return r.a.createElement(p.b,{key:n,draggableId:t.id,index:n},function(o){return r.a.createElement("tr",Object.assign({ref:o.innerRef},o.draggableProps,o.dragHandleProps,{key:t.id}),a.map(function(a,r){return e.renderColumn(t,a,r,n)}))})}))})):r.a.createElement("tbody",null,n.map(function(t){return r.a.createElement("tr",null,a.map(function(n,a){return e.renderColumn(t,n,a)}))}))}}]),t}(a.PureComponent);g.defaultProps={reorder:function(){},widths:{}};var b=g,y=n(10),v=100,k=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={sortState:{}},n.columnRefs={},n.calcWidths=function(){setTimeout(function(){(0,n.props.setColumnWidth)(Object.keys(n.columnRefs).reduce(function(e,t){return Object(m.a)({},e,Object(y.a)({},t,n.columnRefs[t].getBoundingClientRect().width))},{}))},0)},n.onDragStart=function(e){return function(t){n.dragColumnIndex=e}},n.onDragEnter=function(e){return function(t){var a=n.props,r=a.reorder,o=a.schema[e];if(e!==n.dragColumnIndex){var i=n.columnRefs[o.key].getBoundingClientRect(),c=(i.right-i.left)/2,l=t.clientX-i.left;n.dragColumnIndex<e&&l<c||n.dragColumnIndex>e&&l>c||(r(n.dragColumnIndex,e),n.dragColumnIndex=e)}}},n.getStyle=function(e){var t={position:"relative",cursor:"default"},a=n.props.widths;return a[e]?Object(m.a)({},t,{width:a[e]}):t},n.onResizeStart=function(e){return function(t){t.preventDefault(),t.stopPropagation(),n.isResize=!0,n.key=e,n.clientX=t.clientX}},n.onResize=function(e){if(n.isResize&&n.key){var t=n.props,a=t.widths;(0,t.setColumnWidth)(Object(m.a)({},a,Object(y.a)({},n.key,Math.max(a[n.key]+(e.clientX-n.clientX),v)))),n.clientX=e.clientX}},n.onStopResize=function(e){n.isResize=!1,n.key=null},n.changeSortState=function(e){return function(t){var a;t.preventDefault();var r=n.state.sortState,o=n.props.onSort,i=(a={},Object(y.a)(a,void 0,w.ASC),Object(y.a)(a,w.ASC,w.DESC),Object(y.a)(a,w.DESC,w.ASC),a);n.setState({sortState:Object(y.a)({},e,i[r[e]])}),o(e,i[r[e]])}},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.calcWidths(),window.addEventListener("mousemove",this.onResize),window.addEventListener("mouseup",this.onStopResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("mousemove",this.onResize),window.removeEventListener("mouseup",this.onStopResize)}},{key:"render",value:function(){var e=this,t=this.props,n=t.schema,a=t.draggable,o=t.resizeable;return r.a.createElement("thead",null,r.a.createElement("tr",null,n.map(function(t,n){return r.a.createElement("th",{onClick:e.changeSortState(t.key),key:n,ref:function(n){return e.columnRefs[t.key]=n},onDragStart:e.onDragStart(n),onDragOver:e.onDragEnter(n),draggable:a,style:e.getStyle(t.key)},t.title,o&&r.a.createElement("div",{onMouseDown:e.onResizeStart(t.key),style:{height:"100%",display:"inline-block",width:8,cursor:"col-resize",position:"absolute",top:0,right:0}}))})))}}]),t}(a.PureComponent);k.defaultProps={reorder:function(){},setColumnWidth:function(){},widths:{},resizeable:!1,onSort:function(){}};var C=k,E=n(81),S=n.n(E),w={ASC:"asc",DESC:"desc"},O=function(e,t,n){var a=Array.from(e),r=a.splice(t,1),o=Object(f.a)(r,1)[0];return a.splice(n,0,o),a},j=function(e){function t(e){var n;Object(c.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).reorderColumn=function(e,t){var a=n.state.schema;n.setState({schema:O(a,e,t)})},n.reorderRow=function(e,t){var a=n.state.data;n.setState({data:O(a,e,t)})},n.setWidth=function(e){n.setState({widths:e})},n.hideColumn=function(e){var t=n.state.hideColumns;n.setState({hideColumns:t.concat(e),schema:n.getSchema(t.concat(e))})},n.showColumn=function(e){var t=n.state.hideColumns.filter(function(t){return t!==e});n.setState({hideColumns:t,schema:n.getSchema(t)})},n.onCheckBoxChange=function(e){e.target.checked?n.showColumn(e.target.name):n.hideColumn(e.target.name)},n.getSchema=function(e){return n.props.schema.filter(function(t){return!e.includes(t.key)})},n.sortData=function(e,t){var a=n.state.data;n.setState({data:S()(a,[e],[t])})};var a=n.props,r=a.data,o=a.hideColumns;return n.state={data:r,hideColumns:o,schema:n.getSchema(o),widths:{},sortState:{}},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentWillReceiveProps",value:function(e){var t=this.props,n=t.data,a=t.hideColumns;n!==e.data&&this.setState({data:e.data}),a!==e.hideColumns&&this.setState({hideColumns:e.hideColumns})}},{key:"render",value:function(){var e=this,t=this.state,n=t.data,a=t.widths,o=t.hideColumns,i=t.schema,c=this.props,l=c.columnDraggable,s=c.rowDraggable,u=c.resizeable;return r.a.createElement("div",null,r.a.createElement("table",{className:"scroll-table border-table"},r.a.createElement(C,{draggable:l,setColumnWidth:this.setWidth,widths:a,schema:i,reorder:this.reorderColumn,resizeable:u,onSort:this.sortData}),r.a.createElement(b,{widths:a,draggable:s,reorder:this.reorderRow,schema:i,data:n})),r.a.createElement("div",{className:"d-flex mt-3"},this.props.schema.map(function(t){return r.a.createElement("div",{key:t.key,className:"custom-control custom-checkbox mr-3"},r.a.createElement("input",{checked:!o.includes(t.key),type:"checkbox",name:t.key,className:"custom-control-input",id:"customCheck1_".concat(t.key),onChange:e.onCheckBoxChange}),r.a.createElement("label",{className:"custom-control-label",htmlFor:"customCheck1_".concat(t.key)},t.title))})))}}]),t}(a.PureComponent);j.defaultProps={data:[],schema:[],hideColumns:[],columnDraggable:!1,rowDraggable:!1,resizeable:!1};var R=j,D=(n(215),function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).removeBlinkClass=function(){n.div.classList.remove("blink")},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e,t,n){this.props.children!==e.children&&(this.div.classList.add("blink"),this.blinkTimeout=setTimeout(this.removeBlinkClass,1e3))}},{key:"componentWillUnmount",value:function(){clearTimeout(this.blinkTimeout)}},{key:"render",value:function(){var e=this,t=this.props.children;return r.a.createElement("div",{ref:function(t){return e.div=t},style:{display:"inline-block"}},t)}}]),t}(a.PureComponent)),x={index:"VN-Index",last:"Sunny Garton",change:"(288) 1417941",percentChange:"GMC",volume:"Savana 2500",value:"Yellow",buyVolume:"$99799.94",sellVolume:"2016-03-23",foreignNet:5,putThoughVol:2,putThoughValue:2},N=Object(h.a)(Array(10)).map(function(e,t){return Object(m.a)({id:t+1},x)}),z=[{key:"id",title:"ID"},{key:"index",title:"INDEX",render:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("i",{className:"icon-graph fs-10"}),e)}},{key:"last",title:"LAST",render:function(e,t,n){return r.a.createElement("div",{className:n%2===0?"text-s-color-5":"text-s-color-3"},e)}},{key:"change",title:"CHANGE"},{key:"percentChange",title:"% CHANGE"},{key:"volume",title:"VOLUME"},{key:"value",title:"VALUE"},{key:"buyVolume",title:"FR. BUY VOL"},{key:"sellVolume",title:"FR. SELL VOL"},{key:"foreignNet",title:"FOREIGN NET",render:function(e){return r.a.createElement(D,null,e)}},{key:"putThoughVol",title:"PUT THROUGH VOL"},{key:"putThoughValue",title:"PUT THROUGH VALUE"}],V=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={data:N},n.randomValue=function(){n.setState({data:N.map(function(e){return Object(m.a)({},e,{foreignNet:Math.floor(100*Math.random())})})})},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){setInterval(this.randomValue,2e3)}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(R,{data:this.state.data,schema:z,resizeable:!0,columnDraggable:!0,rowDraggable:!0,hideColumns:["change"]}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},84:function(e,t,n){e.exports=n(216)},89:function(e,t,n){}},[[84,1,2]]]);
//# sourceMappingURL=main.f318ab1e.chunk.js.map