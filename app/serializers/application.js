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

  extractAttributes(modelClass, resourceHash) {
    return resourceHash.attributes;
  },

  serialize(snapshot, options) {
    let data = this._super(...arguments);
    return data.data;
  },

  serializeAttribute(snapshot, json, key, attribute) {
    var type = attribute.type;

    if (this._canSerialize(key)) {
      var value = snapshot.attr(key);
      if (type) {
        var transform = this.transformFor(type);
        value = transform.serialize(value);
      }

      // if provided, use the mapping provided by `attrs` in
      // the serializer
      var payloadKey =  this._getMappedKey(key, snapshot.type);

      if (payloadKey === key && this.keyForAttribute) {
        payloadKey = key; //this.keyForAttribute(key, 'serialize');
      }

      json[payloadKey] = value;
    }
  }
});
