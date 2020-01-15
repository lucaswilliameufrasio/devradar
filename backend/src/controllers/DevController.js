const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const getDevInformation = require('../utils/getDevInformation');

//index: quando quero mostrar uma lista, show: quando quero mostrar um único registro, store: quando quero criar um registro, update: alterar registro,
//destroy: deletar um registro
module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        const user = await getDevInformation(github_username);

        console.log(user.data);
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            // const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            // const { name = login, avatar_url, bio } = apiResponse.data;

            const apiResponse = await getDevInformation(github_username);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return res.json(dev);
    },
    async update(req, res) {
        //Atualizar nome, avatar, bio e localização
        const { latitude, longitude } = req.body;

        const { dev_id } = req.params;

        let dev = await Dev.findById(dev_id);

        if (!dev) {
            return res.json({ message: 'User not found!' });
        }

        const { github_username } = dev;

        const apiResponse = await getDevInformation(github_username);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        await dev.updateOne({
            $set: {
                name: name,
                avatar_url: avatar_url,
                bio: bio,
                location: location
            }
        });

        dev = await Dev.findById(dev_id);

        return res.json(dev);
    },
    async destroy(req, res) {
        const { dev_id } = req.params;

        const dev = await Dev.findById(dev_id);

        if (!dev) {
            return res.json({ message: 'User not found!' });
        }

        await Dev.deleteOne({ _id: dev_id });

        return res.json({ message: 'User deleted successfully!'})
    }
};