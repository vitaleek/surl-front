import DS from 'ember-data';

export default DS.Model.extend({
	longLink: DS.attr(),
	shortLink: DS.attr(),
	description: DS.attr(),
	userLogin: DS.attr(),
	tags: DS.attr(),
	redirect: DS.attr()
	
	
  
});
