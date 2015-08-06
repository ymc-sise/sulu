define(["services/husky/util","services/husky/mediator","sulucontact/models/contact","sulucontact/models/title","sulucontact/models/position","sulucategory/model/category","sulumedia/model/media"],function(a,b,c,d,e,f){"use strict";function g(){}var h=null,i=function(a){var d=$.Deferred(),e=c.findOrCreate({id:a});return e.destroy({success:function(){b.emit("sulu.contacts.contact.deleted",a),d.resolve()}.bind(this),error:function(){d.fail()}.bind(this)}),d},j=function(c,d){$.isArray(d)||(d=[d]);var e=[],f=$.Deferred();return a.each(d,function(a,b){e.push(k(c,b))}.bind(this)),$.when.apply(null,e).then(function(){b.emit("sulu.contacts.contact.documents.removed",c,mediaId),f.resolve()}.bind(this)),f},k=function(c,d){var e=$.Deferred();return a.ajax({url:"/admin/api/contacts/"+c+"/medias/"+d,data:{mediaId:d},type:"DELETE",success:function(){b.emit("sulu.contacts.contact.document.removed",c,d),e.resolve()}.bind(this)}),e},l=function(c,d){$.isArray(d)||(d=[d]);var e=[],f=$.Deferred();return a.each(d,function(a,b){e.push(m(c,b))}.bind(this)),$.when.apply(null,e).then(function(){b.emit("sulu.contacts.contact.documents.added",c,mediaId),f.resolve()}.bind(this)),f},m=function(c,d){var e=$.Deferred();return a.ajax({url:"/admin/api/contacts/"+c+"/medias",data:{mediaId:d},type:"POST",success:function(){b.emit("sulu.contacts.contact.document.added",c,d),e.resolve()}.bind(this)}),e};return g.prototype={loadOrNew:function(a){var d,e=$.Deferred();return a?(d=c.findOrCreate({id:a}),d.fetch({success:function(c){b.emit("sulu.contacts.contact.loaded",a),e.resolve(c.toJSON())}.bind(this),error:function(){e.fail()}.bind(this)})):(d=new c,b.emit("sulu.contacts.contact.created"),e.resolve(d.toJSON())),e},"delete":function(b){$.isArray(b)||(b=[b]);var c=[],d=$.Deferred();return a.each(b,function(a,b){c.push(i(b))}.bind(this)),$.when.apply(null,c).then(function(){d.resolve()}.bind(this)),d},save:function(d){var e=$.Deferred(),g=c.findOrCreate({id:d.id});return g.set(d),d.categories&&(g.get("categories").reset(),a.foreach(d.categories,function(a){var b=f.findOrCreate({id:a});g.get("categories").add(b)}.bind(this))),g.save(null,{success:function(a){b.emit("sulu.contacts.contact.saved",a.toJSON.id),e.resolve(a.toJSON())}.bind(this),error:function(){e.fail()}.bind(this)}),e},saveDocuments:function(a,b,c){var d=$.Deferred(),e=l.call(this,a,b),f=j.call(this,a,c);return $.when(f,e).then(function(){d.resolve()}.bind(this)),d},deleteTitle:function(a){var c=$.Deferred(),e=d.findOrCreate({id:a});return e.destroy({success:function(){b.emit("sulu.contacts.contacts.title.deleted",a),c.resolve()}.bind(this)}),c},saveTitles:function(c){var d=$.Deferred();return a.save("api/contact/titles","PATCH",c).then(function(a){b.emit("sulu.contacts.contacts.titles.saved"),d.resolve(a)}),d},deletePosition:function(a){var c=$.Deferred(),d=e.findOrCreate({id:a});return d.destroy({success:function(){b.emit("sulu.contacts.contacts.position.deleted",a),c.resolve()}.bind(this)}),c},savePositions:function(c){var d=$.Deferred();return a.save("api/contact/positions","PATCH",c).then(function(a){b.emit("sulu.contacts.contacts.positions.saved"),d.resolve(a)}),d}},g.getInstance=function(){return null===h&&(h=new g),h},g.getInstance()});