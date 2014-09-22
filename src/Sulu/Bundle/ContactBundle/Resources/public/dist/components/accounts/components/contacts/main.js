define(["mvc/relationalstore","text!sulucontact/components/accounts/components/contacts/contact-relation.form.html","text!sulucontact/components/accounts/components/contacts/contact.form.html"],function(a,b,c){"use strict";var d={relationFormSelector:"#contact-relation-form",contactSelector:"#contact-field",positionSelector:"#company-contact-position",newContactFormSelector:"#contact-form",contactListSelector:"#people-list"},e=null,f=function(){this.sandbox.on("husky.datagrid.item.click",function(a){this.sandbox.emit("sulu.contacts.contact.load",a),this.sandbox.emit("husky.navigation.select-item","contacts/contacts")},this),this.sandbox.on("sulu.list-toolbar.delete",function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){this.sandbox.emit("sulu.contacts.accounts.delete",a)}.bind(this))},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.contacts.accounts.list")},this),this.sandbox.on("sulu.contacts.accounts.contact.saved",function(a){this.sandbox.emit("husky.datagrid.record.add",a)},this),this.sandbox.on("sulu.contacts.accounts.contact.created",function(a){this.sandbox.emit("husky.datagrid.record.add",a)},this),this.sandbox.on("sulu.contacts.accounts.contacts.removed",function(a){this.sandbox.emit("husky.datagrid.record.remove",a)},this),this.sandbox.on("husky.datagrid.radio.selected",function(a){this.sandbox.emit("sulu.contacts.accounts.contacts.set-main",a)},this),this.sandbox.on("husky.select.company-position-select.selected.item",function(a){e=a},this),this.sandbox.dom.on("husky.datagrid.number.selections",function(a){a>0?this.sandbox.emit("husky.toolbar.contacts.item.enable","delete"):this.sandbox.emit("husky.toolbar.contacts.item.disable","delete")}.bind(this)),this.sandbox.on("sulu.contacts.accounts.set-form-of-address",function(a){this.formOfAddress=a}.bind(this)),this.sandbox.on("husky.overlay.new-contact.opened",function(){var a=this.sandbox.dom.find(d.newContactFormSelector,this.$el);this.sandbox.start(a),this.sandbox.form.create(d.newContactFormSelector)}.bind(this))},g=function(a){var b,e,f;a=this.sandbox.util.extend(!0,{},{translate:this.sandbox.translate,formOfAddress:this.formOfAddress},a),b=this.sandbox.util.template(c,a),e=this.sandbox.dom.createElement("<div />"),f=this.sandbox.dom.find(d.contactListSelector),this.sandbox.dom.append(f,e),this.sandbox.start([{name:"overlay@husky",options:{el:e,title:this.sandbox.translate("contact.accounts.add-new-contact-to-account"),openOnStart:!0,removeOnClose:!0,instanceName:"new-contact",data:b,skin:"wide",okCallback:h.bind(this)}}])},h=function(){if(this.sandbox.form.validate(d.newContactFormSelector)){var a=this.sandbox.form.getData(d.newContactFormSelector);return a.account=this.options.data,this.sandbox.emit("sulu.contacts.accounts.new.contact",a),!0}return!1},i=function(a){var c,e,f;a=this.sandbox.util.extend(!0,{},{translate:this.sandbox.translate},a),c=this.sandbox.util.template(b,a),e=this.sandbox.dom.createElement("<div />"),f=this.sandbox.dom.find("#people-list"),this.sandbox.dom.append(f,e),this.sandbox.start([{name:"overlay@husky",options:{el:e,title:this.sandbox.translate("contact.accounts.add-contact"),openOnStart:!0,removeOnClose:!0,instanceName:"contact-relation",data:c,okCallback:l.bind(this)}},{name:"auto-complete@husky",options:{el:d.contactSelector,remoteUrl:"/admin/api/contacts?flat=true&fields=id,fullName&searchFields=fullName",getParameter:"search",resultKey:"contacts",instanceName:"contact",valueKey:"fullName",noNewValues:!0}}]),this.sandbox.util.load("/admin/api/contact/positions").then(function(a){this.sandbox.start([{name:"select@husky",options:{el:d.positionSelector,instanceName:"company-position-select",valueName:"position",returnValue:"id",data:a._embedded.positions,noNewValues:!0}}])}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this)),this.data=a},j=function(){this.sandbox.emit("husky.datagrid.items.get-selected",function(a){a.length>0&&this.sandbox.emit("sulu.contacts.accounts.contacts.remove",a)}.bind(this))},k=function(){return[{id:"add",icon:"plus-circle","class":"highlight-white",position:1,title:this.sandbox.translate("sulu.list-toolbar.add"),items:[{id:"add-account-contact",title:this.sandbox.translate("contact.account.add-account-contact"),callback:i.bind(this)},{id:"add-new-contact-to-account",title:this.sandbox.translate("contact.accounts.add-new-contact-to-account"),callback:g.bind(this)}],callback:function(){this.sandbox.emit("sulu.list-toolbar.add")}.bind(this)},{id:"settings",icon:"gear",items:[{id:"delete",title:this.sandbox.translate("contact.accounts.contact-remove"),callback:j.bind(this),disabled:!0}]}]},l=function(){var a=this.sandbox.dom.find(d.contactSelector+" input",d.relationFormSelector),b=this.sandbox.dom.data(a,"id");b&&this.sandbox.emit("sulu.contacts.accounts.contact.save",b,e)};return{view:!0,layout:{sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},templates:["/admin/contact/template/contact/list"],initialize:function(){this.formOfAddress=null,this.render(),f.call(this),this.options.data&&this.options.data.id&&this.initSidebar("/admin/widget-groups/account-detail?account=",this.options.data.id),this.sandbox.emit("sulu.contacts.accounts.contacts.initialized")},initSidebar:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget",a+b)},render:function(){a.reset(),this.sandbox.emit("sulu.",this.options.account),this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/contact/template/contact/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"accountsContactsFields","/admin/api/contacts/fields?accountContacts=true",{el:this.$find("#list-toolbar-container"),instanceName:"contacts",inHeader:!0,template:k.call(this)},{el:this.sandbox.dom.find("#people-list",this.$el),url:"/admin/api/accounts/"+this.options.data.id+"/contacts?flat=true",searchInstanceName:"contacts",searchFields:["fullName"],resultKey:"contacts",contentFilters:{isMainContact:"radio"},viewOptions:{table:{selectItem:{type:"checkbox"},removeRow:!1}}})}}});