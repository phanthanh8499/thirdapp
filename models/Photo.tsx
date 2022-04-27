import { createRealmContext, Realm } from "@realm/react";
import { Note } from "./Note";

export class PhotoI {
    _id: any;
    note: string;
    path: string;
    createAt: Date;

    constructor({note, path, createAt}: any){
        this._id = new Realm.BSON.ObjectId().toHexString();
        this.note = note;
        this.path = path;
        this.createAt = createAt;
    }

    static schema = {
        name: 'PhotoI',
        primaryKey: '_id',
        properties: {
            _id: 'string',
            note: 'string',
            path: 'string',
            createAt: 'date',
        }
    }
  }

  export const {useRealm, useQuery, RealmProvider} = createRealmContext({
      schema: [Note.schema, PhotoI.schema, ]
  })