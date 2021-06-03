import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.controller.events({
  'click #gotoHome'(e) {
    e.preventDefault()
    Meteor.call('gotoHome')
  },

  'click #gotoLeft'(e) {
    e.preventDefault()
    Meteor.call('gotoLeft')
  }
})
