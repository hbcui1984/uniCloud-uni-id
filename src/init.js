import {
    userCollectionName
} from './config.json'


const db = uniCloud.database();

const userCollection = db.collection(userCollectionName)

export default userCollection