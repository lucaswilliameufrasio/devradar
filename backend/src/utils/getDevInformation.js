const axios = require('axios');

module.exports = async function getDevInformation(username) {
    return axios.get(`https://api.github.com/users/${username}`);
}