// All necessary information for bot
const { GatewayIntentBits } = require('discord.js')
const { REST } = require('@discordjs/rest')
const discord = require('discord.js')
const { token } = require('./sensitive/config.json')
const { Intents } = require('discord.js')
const client = new discord.Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds,  GatewayIntentBits.MessageContent]})
const axios = require("axios");
const prefix = 'cb';
const maxIn = 5;


const options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
  params: {i: 'Gin'},
  headers: {
    'X-RapidAPI-Key': '7e9d60ad24msh3331a3ff8a0940ap112b3djsn599d0014be83',
    'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
  }
};

/*
axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

*/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.on('messageCreate', (msg) => {
    const input = msg.content;
    const cmds = input.split(' ');
    console.log(cmds);
    if(!(cmds[0] === prefix) || msg.author.bot) return;

    const info = "";
    if(cmds[1] === 'random'){
        msg.reply('Here\'s a recipe I think you\'ll like');

        options.url = "https://the-cocktail-db.p.rapidapi.com/random.php";
        axios.request(options).then(function (response) {
            console.log(response.data);
            info = JSON.parse(response.data);
            msg.reply(info.strDrink);
        }).catch(function (error) {
            console.error(error);
        });
    }
    if(cmds[1] === 'ing')
        options.url = 'https://the-cocktail-db.p.rapidapi.com/filter.php';
        options.params.i = cmds[2];
    if(cmds.length > maxIn){
        msg.reply('Too Many Words!, Please input '+ value +' words including the prefix: cb');
    }

})
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'help') {
		await interaction.reply('This Application allows you to request a cocktail Recipe, provided from TheCocktailDB');
	}
    if(interaction.commandName === ''){

    }
})

client.login(token);