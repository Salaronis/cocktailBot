// All necessary information for bot
const { GatewayIntentBits } = require('discord.js')
const { REST } = require('@discordjs/rest')
const discord = require('discord.js')
const { token } = require('./sensitive/config.json')
const { Intents } = require('discord.js')
const client = new discord.Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds,  GatewayIntentBits.MessageContent]})

const prefix = 'cb';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('messageCreate', (msg) => {
    if(!msg.content.startsWith(prefix) || msg.author.bot == true){
        return;
    }  
    let actual = msg.content.substring(prefix.length + 1);
    console.log(actual);
    if(actual === 'margherita'){
        msg.reply('Here is a margherita recipe!');
    }
})

client.login(token);