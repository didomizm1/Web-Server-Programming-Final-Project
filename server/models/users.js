const data = require('../data/users.json');
const { connect, ObjectId } = require('./mongo');

const COLLECTION_NAME = 'exercises';

async function collection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getUsers() {
    const col = collection();
    const users = await col.find().toArray();
    return users;
}

function getUserByID(id) {
    return data.users.find(user => user.id === id);
}

function addUser(user) {
    user.id = data.users.length + 1;
    data.users.push(user);
}

function updateUser(user) {
    const index = data.users.findIndex(u => u.id === user.id);
    data.users[index] = user;
}

function deleteUser(id) {
    const index = data.users.findIndex(u => u.id === id);
    data.users.splice(index, 1);
}

function searchUsers(searchTerm) {
    return data.users.filter(user => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase())  ||
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase())  ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

module.exports = {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
    searchUsers
};
