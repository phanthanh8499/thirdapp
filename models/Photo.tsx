import { createRealmContext, Realm } from "@realm/react";

export class Photo {
    _id: Realm.BSON.ObjectId;
    note: string;
    path: string;
    createAt: Date;

    constructor({id = new Realm.BSON.ObjectId(), note, path, createAt}: any){
        this._id = id;
        this.note = note;
        this.path = path;
        this.createAt = createAt;
    }

    static schema = {
        name: 'Photo',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            note: 'string',
            path: 'string',
            createAt: 'date',
        }
    }
  }

  export const {useRealm, useQuery, RealmProvider} = createRealmContext({
      schema: [Photo.schema]
  })