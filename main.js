// All necessary information for bot
const { Client, GatewayIntentBits, Message, messageLink, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const discord = require('discord.js');
const { token } = require('./sensitive/config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once('ready', () => {
    console.log(client.user.tag + "Now Online");
});

client.login(token);