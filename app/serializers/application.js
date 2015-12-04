import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(...args) {
    let [, , payload, id, requestType] = args;
    const data = { type: 'user', id, attributes: payload };
    const response = { data };
    args.splice(2, 1, response);

    switch (requestType) {
      case 'findRecord':
        return this.normalizeFindRecordResponse(...args);
      case 'queryRecord':
        return this.normalizeQueryRecordResponse(...args);
      case 'findAll':
        return this.normalizeFindAllResponse(...args);
      case 'findBelongsTo':
        return this.normalizeFindBelongsToResponse(...args);
      case 'findHasMany':
        return this.normalizeFindHasManyResponse(...args);
      case 'findMany':
        return this.normalizeFindManyResponse(...args);
      case 'query':
        return this.normalizeQueryResponse(...args);
      case 'createRecord':
        return this.normalizeCreateRecordResponse(...args);
      case 'deleteRecord':
        return this.normalizeDeleteRecordResponse(...args);
      case 'updateRecord':
        return this.normalizeUpdateRecordResponse(...args);
    }
  },

  extractAttributes: function (modelClass, resourceHash) {
    return resourceHash.attributes;
  }
});
