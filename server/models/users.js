// const data = require('../data/users.json');
const jwt = require('jsonwebtoken');
const { connect, ObjectId } = require('./mongo');
const { env } = require('process');

const COLLECTION_NAME = 'users';

const data = [
    {
        "username": "testUser1",
        "password": "123456",
        "email": "testuser1@mail.com",
        "firstName": "Test",
        "lastName": "User1",
        "birthday": "5/5/1900",
        "friendsUserIDs": [],
        "role": "",
    },
    {
        "username": "testUser2",
        "password": "1234567",
        "email": "testuser2@mail.com",
        "firstName": "Test",
        "lastName": "User2",
        "birthday": "5/6/1900",
        "friendsUserIDs": [],
        "role": "",
    },
    {
        "username": "testUser3",
        "password": "12345678",
        "email": "testuser3@mail.com",
        "firstName": "Test",
        "lastName": "User3",
        "birthday": "5/7/1900",
        "friendsUserIDs": [],
        "role": "",
    },
]

async function collection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getAll(page = 1, pageSize = 30) {
    const col = await collection();
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments();
    return { items, total };
}

async function getById(id) {
    const col = await collection();
    const item = await col.findOne({ _id: new ObjectId(id) });
    return item;
}

async function add(item) {
    const col = await collection();

    const result = await col.insertOne(item);

    item._id = result.insertedId;
    return item;
}

async function update(item) {

    console.log(item);
    const col = await collection();
    const result = await col.findOneAndUpdate(
        { _id: new ObjectId(item.id) },
        { $set: item },
        { returnDocument: 'after' }
    );

    return result.value;
}

async function deleteItem(id) {
    const col = await collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

async function search(searchTerm, page = 1, pageSize = 30) {
    const col = await collection();
    const query = {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
        ]
    };

    const items = await col.find(query).skip((page - 1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(query);
    return { items, total };
}

async function seed() {
    const col = await collection();
    const result = await col.insertMany(data);
    return result.insertedCount;
}

async function login(email, password) {
    const col = await collection();
    const user = await col.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.password !== password) {
        throw new Error('Invalid password');
    }

    const cleanUser = { ...user, password: undefined };
    const token = await generateTokenAsync(cleanUser, '1d');

    return { user: cleanUser, token };
}

async function oAuthLogin(provider, accessToken) {
    
}

function generateTokenAsync(user, expiresIn) {
    return new Promise( (resolve, reject) => {
        jwt.sign(user, process.env.JWT_SECRET ?? "", { expiresIn }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

function verifyTokenAsync(token) {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}


module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteItem,
    search,
    seed,
    login,
    oAuthLogin,
    generateTokenAsync,
    verifyTokenAsync,
};
