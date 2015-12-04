import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  battleNetId: attr('number'),
  pointsEarned: attr('number'),
  pointsSpent: attr('number'),
  role: attr('number'),
  created: attr('string')
});
