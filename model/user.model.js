const userList = require('../data/user.json');
const fs = require('fs');

exports.create = (user) => {
    userList.push(user);
    fs.writeFileSync('data/user.json', JSON.stringify(userList));
    return user;
}

exports.getAll = () => {
    return userList.map(user => { return { email: user.email } });
}

exports.getOne = (email) => {
    return userList.find(user => user.email === email);
}

exports.update = (email, user) => {
    const index = userList.findIndex(user => user.email === email);
    userList[index] = user;
    fs.writeFileSync('data/user.json', JSON.stringify(userList));
    return user;
}