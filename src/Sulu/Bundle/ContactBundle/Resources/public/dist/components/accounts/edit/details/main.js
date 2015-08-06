define(["config","widget-groups","services/sulucontact/account-manager"],function(a,b,c){"use strict";var d={headline:"contact.accounts.title"},e=["urls","emails","faxes","phones","notes","addresses"],f={tagsId:"#tags",addressAddId:"#address-add",addAddressWrapper:".grid-row",bankAccountsId:"#bankAccounts",bankAccountAddSelector:".bank-account-add",editFormSelector:"#contact-edit-form"},g={addBankAccountsIcon:['<div class="grid-row">','    <div class="grid-col-12">','       <span id="bank-account-add" class="fa-plus-circle icon bank-account-add clickable pointer m-left-140"></span>',"   </div>","</div>"].join("")};return{view:!0,layout:function(){return{content:{width:"fixed"},sidebar:{width:"max",cssClasses:"sidebar-padding-50"}}},templates:["/admin/contact/template/account/form"],customTemplates:{addAddressesIcon:['<div class="grid-row">','    <div class="grid-col-12">','       <span id="address-add" class="fa-plus-circle icon address-add clickable pointer m-left-140"></span>',"   </div>","</div>"].join("")},initialize:function(){this.options=this.sandbox.util.extend(!0,{},d,this.options),this.form="#contact-form",this.formContactFields="#contact-fields",this.autoCompleteInstanceName="contacts-",this.dfdListenForChange=this.sandbox.data.deferred(),this.dfdFormIsSet=this.sandbox.data.deferred(),c.loadOrNew(this.options.id).then(function(a){this.data=a,this.render(),this.listenForChange(),this.data&&this.data.id&&b.exists("account-detail")&&this.initSidebar("/admin/widget-groups/account-detail?account=",this.data.id)}.bind(this))},initSidebar:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget",a+b)},render:function(){var b,c,d;this.sandbox.once("sulu.contacts.set-defaults",this.setDefaults.bind(this)),this.sandbox.once("sulu.contacts.set-types",this.setTypes.bind(this)),this.html(this.renderTemplate("/admin/contact/template/account/form")),this.titleField=this.$find("#name"),b=this.initContactData(),c=[],this.data.id&&c.push({id:this.data.id}),d=a.get("sulucontact.components.autocomplete.default.account"),d.el="#company",d.value=b.parent?b.parent:null,d.instanceName="companyAccount"+b.id,this.sandbox.start([{name:"auto-complete@husky",options:d},{name:"input@husky",options:{el:"#vat",instanceName:"vat-input",value:b.uid?b.uid:""}}]),this.initForm(b),this.setTags(),this.bindCustomEvents(),this.bindTagEvents(b)},setTags:function(){var a=this.sandbox.util.uniqueId();this.data.id&&(a+="-"+this.data.id),this.autoCompleteInstanceName+=a,this.dfdFormIsSet.then(function(){this.sandbox.start([{name:"auto-complete-list@husky",options:{el:"#tags",instanceName:this.autoCompleteInstanceName,getParameter:"search",itemsKey:"tags",remoteUrl:"/admin/api/tags?flat=true&sortBy=name&searchFields=name",completeIcon:"tag",noNewTags:!0}}])}.bind(this))},bindTagEvents:function(a){a.tags&&a.tags.length>0?(this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".initialized",function(){this.sandbox.emit("husky.auto-complete-list."+this.autoCompleteInstanceName+".set-tags",a.tags)}.bind(this)),this.sandbox.on("husky.auto-complete-list."+this.autoCompleteInstanceName+".items-added",function(){this.dfdListenForChange.resolve()}.bind(this))):this.dfdListenForChange.resolve()},setDefaults:function(a){this.defaultTypes=a},setTypes:function(a){this.fieldTypes=a},fillFields:function(a,b,c){var d,e=-1,f=a.length;for(b>f&&(f=b);++e<f;)d=e+1>b?{}:{permanent:!0},a[e]?a[e].attributes=d:(a.push(c),a[a.length-1].attributes=d);return a},initContactData:function(){var a=this.data;return this.sandbox.util.foreach(e,function(b){a.hasOwnProperty(b)||(a[b]=[])}),this.fillFields(a.urls,1,{id:null,url:"",urlType:this.defaultTypes.urlType}),this.fillFields(a.emails,1,{id:null,email:"",emailType:this.defaultTypes.emailType}),this.fillFields(a.phones,1,{id:null,phone:"",phoneType:this.defaultTypes.phoneType}),this.fillFields(a.faxes,1,{id:null,fax:"",faxType:this.defaultTypes.faxType}),this.fillFields(a.notes,1,{id:null,value:""}),a},initForm:function(a){this.numberOfAddresses=a.addresses.length,this.updateAddressesAddIcon(this.numberOfAddresses),this.sandbox.on("sulu.contact-form.initialized",function(){var b=this.sandbox.form.create(this.form);b.initialized.then(function(){this.formInitializedHandler(a)}.bind(this))}.bind(this)),this.sandbox.start([{name:"contact-form@sulucontact",options:{el:f.editFormSelector,fieldTypes:this.fieldTypes,defaultTypes:this.defaultTypes}}])},formInitializedHandler:function(a){this.setFormData(a)},setFormData:function(a){this.sandbox.emit("sulu.contact-form.add-collectionfilters",this.form),this.numberOfBankAccounts=a.bankAccounts?a.bankAccounts.length:0,this.updateBankAccountAddIcon(this.numberOfBankAccounts),this.sandbox.form.setData(this.form,a).then(function(){this.sandbox.start(this.formContactFields),this.sandbox.emit("sulu.contact-form.add-required",["email"]),this.sandbox.emit("sulu.contact-form.content-set"),this.dfdFormIsSet.resolve()}.bind(this))},updateAddressesAddIcon:function(a){var b,c=this.sandbox.dom.find(f.addressAddId);a&&a>0&&0===c.length?(b=this.sandbox.dom.createElement(this.customTemplates.addAddressesIcon),this.sandbox.dom.after(this.sandbox.dom.find("#addresses"),b)):0===a&&c.length>0&&this.sandbox.dom.remove(this.sandbox.dom.closest(c,f.addAddressWrapper))},bindCustomEvents:function(){this.sandbox.on("sulu.contact-form.added.address",function(){this.numberOfAddresses++,this.updateAddressesAddIcon(this.numberOfAddresses)},this),this.sandbox.on("sulu.contact-form.removed.address",function(){this.numberOfAddresses--,this.updateAddressesAddIcon(this.numberOfAddresses)},this),this.sandbox.on("sulu.tab.save",this.save,this),this.sandbox.on("sulu.contact-form.added.bank-account",function(){this.numberOfBankAccounts++,this.updateBankAccountAddIcon(this.numberOfBankAccounts)},this),this.sandbox.on("sulu.contact-form.removed.bank-account",function(){this.numberOfBankAccounts--,this.updateBankAccountAddIcon(this.numberOfBankAccounts)},this),this.sandbox.on("sulu.router.navigate",this.cleanUp.bind(this))},cleanUp:function(){this.sandbox.stop(f.editFormSelector)},copyArrayOfObjects:function(a){var b=[];return this.sandbox.util.foreach(a,function(a){b.push(this.sandbox.util.extend(!0,{},a))}.bind(this)),b},save:function(){if(this.sandbox.form.validate(this.form)){var a=this.sandbox.form.getData(this.form);a.id||delete a.id,a.tags=this.sandbox.dom.data(this.$find(f.tagsId),"tags"),a.parent={id:this.sandbox.dom.attr("#company input","data-id")},this.sandbox.emit("sulu.tab.saving"),c.save(a).then(function(a){this.data=a,this.initContactData(),this.setFormData(this.data),this.sandbox.emit("sulu.tab.saved",a)}.bind(this))}},listenForChange:function(){this.dfdListenForChange.then(function(){this.sandbox.dom.on("#contact-form","change",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.dom.on("#contact-form","keyup",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.on("sulu.contact-form.changed",function(){this.sandbox.emit("sulu.tab.dirty")}.bind(this))}.bind(this))},updateBankAccountAddIcon:function(a){var b,c=this.sandbox.dom.find(f.bankAccountAddSelector,this.$el);a&&a>0&&0===c.length?(b=this.sandbox.dom.createElement(g.addBankAccountsIcon),this.sandbox.dom.after(this.sandbox.dom.find(f.bankAccountsId),b)):0===a&&c.length>0&&this.sandbox.dom.remove(this.sandbox.dom.closest(c,f.addBankAccountsWrapper))}}});