import {Realm} from '@realm/react';

export class Note {
  _id: any;
  value: string;

  constructor({id = new Realm.BSON.ObjectId().toHexString(), value}: any) {
    this._id = id;
    this.value = value;
  }

  static schema = {
    name: 'Note',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      value: 'string',
    },
  };
}
