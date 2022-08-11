// All necessary information for bot
const { GatewayIntentBits } = require('discord.js')
const { REST } = require('@discordjs/rest')
const discord = require('discord.js')
const { token } = require('./sensitive/config.json')
const { Intents } = require('discord.js')
const client = new discord.Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds,  GatewayIntentBits.MessageContent]})

const prefix = 'cb';
const maxIn = 5;

const options = {
    method: 'GET',
    headers: {
        'Key': "1'"
    }
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('messageCreate', (msg) => {
    const input = msg.content;
    const cmds = input.split(' ');
    console.log(cmds);
    if(!(cmds[0] === prefix) || msg.author.bot) return;

    if(cmds[1] === 'random'){
        msg.reply('Here\'s a recipe I think you\'ll like');

        fetch('www.thecocktaildb.com/api/json/v1/1/random.php', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
    if(cmds[1] === 'margarita'){
        msg.reply('Here is a margarita recipe');
    }
    if(cmds.length > maxIn){
        msg.reply('Too Many Words!, Please input '+ value +' words including the prefix: cb');
    }
    /*
    if(cmds[0] === 'margarita'){
        msg.reply('Here is a margarita recipe!');
    }
    */
})
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
})

client.login(token);