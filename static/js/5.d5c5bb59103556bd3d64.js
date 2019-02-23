webpackJsonp([5],{"+YAd":function(e,t){},XTxT:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("woOf"),l=a.n(r),o=a("YtJ0"),i=a("mtWM"),n=a.n(i),s={name:"AutomobileInfMng",store:o.a,data:function(){return{pagesize:10,currentPage:1,id:"",filters:{name:"",brand:"",category:""},automobileCategorys:[{label:"轿车",value:"car"},{label:"SUV",value:"suv"},{label:"MPV",value:"mpv"},{label:"跑车",value:"sportscar"},{label:"皮卡",value:"pickup"},{label:"微面",value:"minivan"},{label:"微卡",value:"minitruck"},{label:"轻客",value:"lightbus"}],filterAutomobileInfs:[],formVisible:!1,formData:{},addOrEdit:0,automobileInfs:[],formRules:{name:[{required:!0,pattern:/^[\s\S]*.*[^\s][\s\S]*$/,message:"请输入汽车名称",trigger:"blur"}],price:[{pattern:/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/,message:"请输入大于0并且小数点最多两位的数字",trigger:"blur"}]}}},mounted:function(){var e=this;n.a.get("https://www.easy-mock.com/mock/5c702a27d3044d1448586d67/amKnow/automobile").then(function(t){e.automobileInfs=t.data,e.filterAutomobile()}).catch(function(t){e.$message({message:"网络错误,请稍后再试",type:"error"})})},computed:{getShow:function(){return this.$store.state.isShow},showTable:function(){return this.filterAutomobileInfs.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)}},methods:{searchAutomobile:function(){this.currentPage=1,this.filterAutomobile()},filterAutomobile:function(){var e=this.filters.name.trim(),t=this.filters.brand.trim(),a=this.filters.category,r=this.automobileInfs.filter(function(r){var l=!0,o=!0,i=!0;return 0!=e.length&&(l=-1!=r.name.indexOf(e)),0!=t.length&&(o=r.brand==t),0!=a.length&&(i=r.category==a),l&&o&&i});this.filterAutomobileInfs=r},handleCurrentChange:function(e){this.currentPage=e},handleAdd:function(){this.formVisible=!0,this.addOrEdit=0,this.formData={name:"",brand:"",category:"",engine:"",gearbox:"",drivingMode:0,energy:null,seatNumber:5,yearStyle:"",price:null}},handleEdit:function(e,t){this.formVisible=!0,this.addOrEdit=1,this.formData=l()({},t),this.id=t.id},handleDelete:function(e,t){var a=this;this.$confirm("确认删除该记录吗?","提示",{cancelButtonClass:"btn-custom-cancel",type:"warning"}).then(function(){var e=a.automobileInfs;for(var r in e)if(e[r].id==t.id){e.splice(r,1);break}a.filterAutomobile(),a.$message({message:"删除成功",type:"success"})}).catch(function(){})},addSubmit:function(){var e=this;this.$refs.formData.validate(function(t){t&&e.$confirm("确认提交吗？","提示",{cancelButtonClass:"btn-custom-cancel"}).then(function(){e.formData.id=e.getGuid();var t=l()({},e.formData);e.automobileInfs.push(t),e.filterAutomobile(),e.$message({message:"添加成功",type:"success"}),e.$refs.formData.resetFields(),e.formVisible=!1}).catch(function(){})})},editSubmit:function(){var e=this;this.$refs.formData.validate(function(t){t&&e.$confirm("确认提交吗？","提示",{cancelButtonClass:"btn-custom-cancel"}).then(function(){var t=e.automobileInfs,a=l()({},e.formData);for(var r in t)if(t[r].id==e.id){t.splice(r,1,a);break}e.filterAutomobile(),e.$message({message:"修改成功",type:"success"}),e.$refs.formData.resetFields(),e.id="",e.formVisible=!1}).catch(function(){})})},closeDialog:function(){this.id="",this.$refs.formData.resetFields()},handleClose:function(){this.id="",this.formVisible=!1,this.$refs.formData.resetFields()},getGuid:function(){function e(){return(65536*(1+Math.random())|0).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},formatName:function(e){return e.name.trim()},formatBrand:function(e){return 0==e.brand.length?"未知":0==e.brand.trim().length?"未知":e.brand.trim()},formatCategory:function(e){var t=void 0;switch(e.category){case"car":t="轿车";break;case"suv":t="SUV";break;case"mpv":t="MPV";break;case"sportscar":t="跑车";break;case"pickup":t="皮卡";break;case"minivan":t="微面";break;case"minitruck":t="微卡";break;case"lightbus":t="轻客";break;default:t="未知"}return t},formatEngine:function(e){return 0==e.engine.length?"未知":0==e.engine.trim().length?"未知":e.engine.trim()},formatGearbox:function(e){return 0==e.gearbox.length?"未知":0==e.gearbox.trim().length?"未知":e.gearbox.trim()},formatDrivingMode:function(e){return 0===e.drivingMode?"两驱":1==e.drivingMode?"四驱":"未知"},formatEnergy:function(e){return 0===e.energy?"汽油":1==e.energy?"柴油":2==e.energy?"纯电动":3==e.energy?"油电混合":"未知"},formatSeatNumber:function(e){return e.seatNumber.toString()+"座"},formatYearStyle:function(e){return 0==e.yearStyle.length?"未知":0==e.yearStyle.trim().length?"未知":e.yearStyle.trim()},formatPrice:function(e){return null==e.price?"未知":e.price.toString()+"万"}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[a("el-form",{attrs:{inline:!0,model:e.filters}},[a("el-form-item",[a("el-input",{class:1==e.getShow?"normal-input":2==e.getShow?"middle-input":"small-input",attrs:{placeholder:3==e.getShow?"名称":"汽车名称"},model:{value:e.filters.name,callback:function(t){e.$set(e.filters,"name",t)},expression:"filters.name"}})],1),e._v(" "),a("el-form-item",[a("el-input",{class:1==e.getShow?"normal-input":2==e.getShow?"middle-input":"small-input",attrs:{placeholder:3==e.getShow?"品牌":"汽车品牌"},model:{value:e.filters.brand,callback:function(t){e.$set(e.filters,"brand",t)},expression:"filters.brand"}})],1),e._v(" "),a("el-form-item",[a("el-select",{class:1==e.getShow?"normal-select":2==e.getShow?"middle-select":"small-select",attrs:{placeholder:3==e.getShow?"类别":"汽车类别"},model:{value:e.filters.category,callback:function(t){e.$set(e.filters,"category",t)},expression:"filters.category"}},[a("el-option",{attrs:{value:""}},[e._v("请选择")]),e._v(" "),e._l(e.automobileCategorys,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2)],1),e._v(" "),a("el-form-item",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.getShow,expression:"getShow == 1"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.searchAutomobile}},[e._v("查询")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1!=e.getShow,expression:"getShow != 1"}],attrs:{type:"primary",icon:"el-icon-search",title:"查询",circle:""},on:{click:e.searchAutomobile}})],1),e._v(" "),a("el-form-item",{staticClass:"add-button"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.getShow,expression:"getShow == 1"}],attrs:{type:"success",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1!=e.getShow,expression:"getShow != 1"}],attrs:{type:"success",icon:"el-icon-plus",title:"新增",circle:""},on:{click:e.handleAdd}})],1)],1)],1),e._v(" "),a("el-table",{staticStyle:{border:"1px solid #dfe6ec"},attrs:{data:e.showTable,"header-cell-style":{background:"#eef1f6",color:"#606266"},"highlight-current-row":"",height:"400"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"60",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"汽车名称",width:"92",align:"center",formatter:e.formatName}}),e._v(" "),a("el-table-column",{attrs:{prop:"brand",label:"品牌",width:"92",align:"center",formatter:e.formatBrand}}),e._v(" "),a("el-table-column",{attrs:{prop:"category",label:"类别",width:"92",align:"center",formatter:e.formatCategory}}),e._v(" "),a("el-table-column",{attrs:{prop:"engine",label:"发动机",width:"92",align:"center",formatter:e.formatEngine}}),e._v(" "),a("el-table-column",{attrs:{prop:"gearbox",label:"变速箱",width:"120",align:"center",formatter:e.formatGearbox}}),e._v(" "),a("el-table-column",{attrs:{prop:"drivingMode",label:"驱动方式",width:"92",align:"center",formatter:e.formatDrivingMode}}),e._v(" "),a("el-table-column",{attrs:{prop:"energy",label:"能源",width:"92",align:"center",formatter:e.formatEnergy}}),e._v(" "),a("el-table-column",{attrs:{prop:"seatNumber",label:"座位数",width:"92",align:"center",formatter:e.formatSeatNumber}}),e._v(" "),a("el-table-column",{attrs:{prop:"yearStyle",label:"年代款",width:"92",align:"center",formatter:e.formatYearStyle}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"售价",width:"92",align:"center",formatter:e.formatPrice}}),e._v(" "),a("el-table-column",{attrs:{label:"操作","min-width":"200",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",icon:"el-icon-edit"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-col",{staticClass:"toolbar",staticStyle:{"text-align":"center"},attrs:{span:24}},[a("el-pagination",{attrs:{layout:"total, prev, pager, next","page-size":e.pagesize,total:this.filterAutomobileInfs.length},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:0==e.addOrEdit?"新增":"编辑",visible:e.formVisible,"close-on-click-modal":!1,"custom-class":"dialog-minwidth"},on:{"update:visible":function(t){e.formVisible=t},close:e.closeDialog}},[a("el-form",{ref:"formData",attrs:{model:e.formData,"label-width":"80px",rules:e.formRules}},[a("el-row",{staticClass:"row-padding-bottom"},[a("el-col",{staticClass:"col-position",attrs:{span:12}},[a("el-form-item",{attrs:{label:"汽车名称",prop:"name"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"品牌"}},[a("el-input",{model:{value:e.formData.brand,callback:function(t){e.$set(e.formData,"brand",t)},expression:"formData.brand"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"row-padding-bottom"},[a("el-col",{staticClass:"col-position",attrs:{span:12}},[a("el-form-item",{attrs:{label:"类别"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.formData.category,callback:function(t){e.$set(e.formData,"category",t)},expression:"formData.category"}},e._l(e.automobileCategorys,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"发动机"}},[a("el-input",{model:{value:e.formData.engine,callback:function(t){e.$set(e.formData,"engine",t)},expression:"formData.engine"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"row-padding-bottom"},[a("el-col",{staticClass:"col-position",attrs:{span:12}},[a("el-form-item",{attrs:{label:"变速箱"}},[a("el-input",{model:{value:e.formData.gearbox,callback:function(t){e.$set(e.formData,"gearbox",t)},expression:"formData.gearbox"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"驱动方式"}},[a("el-radio-group",{model:{value:e.formData.drivingMode,callback:function(t){e.$set(e.formData,"drivingMode",t)},expression:"formData.drivingMode"}},[a("el-radio",{staticClass:"radio",attrs:{label:0}},[e._v("两驱")]),e._v(" "),a("el-radio",{staticClass:"radio",attrs:{label:1}},[e._v("四驱")])],1)],1)],1)],1),e._v(" "),a("el-row",{staticClass:"row-padding-bottom"},[a("el-col",{staticClass:"col-position",attrs:{span:12}},[a("el-form-item",{attrs:{label:"能源"}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.formData.energy,callback:function(t){e.$set(e.formData,"energy",t)},expression:"formData.energy"}},[a("el-option",{attrs:{label:"汽油",value:0}}),e._v(" "),a("el-option",{attrs:{label:"柴油",value:1}}),e._v(" "),a("el-option",{attrs:{label:"纯电动",value:2}}),e._v(" "),a("el-option",{attrs:{label:"油电混合",value:3}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"座位数"}},[a("el-input-number",{attrs:{min:2,max:70},model:{value:e.formData.seatNumber,callback:function(t){e.$set(e.formData,"seatNumber",t)},expression:"formData.seatNumber"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"col-position",attrs:{span:12}},[a("el-form-item",{attrs:{label:"年代款"}},[a("el-input",{model:{value:e.formData.yearStyle,callback:function(t){e.$set(e.formData,"yearStyle",t)},expression:"formData.yearStyle"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"售价",prop:"price"}},[a("el-input",{attrs:{placeholder:"万/辆"},model:{value:e.formData.price,callback:function(t){e.$set(e.formData,"price",t)},expression:"formData.price"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:0==e.addOrEdit,expression:"addOrEdit == 0"}],attrs:{type:"primary"},nativeOn:{click:function(t){return e.addSubmit(t)}}},[e._v("提交")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.addOrEdit,expression:"addOrEdit == 1"}],attrs:{type:"primary"},nativeOn:{click:function(t){return e.editSubmit(t)}}},[e._v("提交")]),e._v(" "),a("el-button",{nativeOn:{click:function(t){return e.handleClose(t)}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(s,c,!1,function(e){a("+YAd")},null,null);t.default=m.exports}});
//# sourceMappingURL=5.d5c5bb59103556bd3d64.js.map