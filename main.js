// All necessary information for bot
const { GatewayIntentBits, messageLink } = require('discord.js')
const { REST } = require('@discordjs/rest')
const discord = require('discord.js')
const { token, apiHost, apiKey } = require('./sensitive/config.json')
const { Intents } = require('discord.js')
const client = new discord.Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds,  GatewayIntentBits.MessageContent]})
const axios = require("axios");
const prefix = 'cb';
const maxIn = 5;

const options = {
    method: 'GET',
    url: "",
    params: {},
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
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

    function request(){
        axios.request(options).then(function (response) {
            info = response.data;
            msg.reply(info.drinks[0].strDrinkThumb + '\n' +  info.drinks[0].strDrink + '\n' + info.drinks[0].strGlass + '\n' + info.drinks[0].strIngredient1 + ' ' + info.drinks[0].strMeasure1 
             + '\n' + info.drinks[0].strIngredient2 + ' ' + info.drinks[0].strMeasure2 + '\n' + info.drinks[0].strIngredient3 + ' '+ info.drinks[0].strMeasure3 + '\n' + info.drinks[0].strInstructions);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const input = msg.content;
    const cmds = input.split(' ');

    if(!(cmds[0] === prefix) || msg.author.bot) return;

    var info = "";
    // Request for random Cocktail
    if(cmds[1] === 'random'){
        options.url = "https://the-cocktail-db.p.rapidapi.com/random.php";
        request();
    }
    // Specific Cocktail Request
    if(cmds[1] === 'ct'){
        options.url = "https://the-cocktail-db.p.rapidapi.com/search.php"
        options.params.i = cmds[2];
        request();
    }
    //Request for Ingredient Specific Cocktails
    if(cmds[1] === 'ing'){
        options.url = 'https://the-cocktail-db.p.rapidapi.com/filter.php';
        options.params.i = cmds[2];
        axios.request(options).then(function (response){
            console.log(response.data);
            for(let i = 0; i < 5; i++){
                let info = response.data.drinks[i].strDrink;
                msg.channel.send(info);
            }
        }).catch(function (error){
            console.error(error);
            msg.reply('something went wrong, please try again');
        });
    }
    //All Ingredients
    if(cmds[1] === 'allIngredients'){
        let start;
        let end; 
        if(cmds[2] == 1){
            start = 0;
            end = response.data.drinks.length/2;
        }else if(cmds[2] == 2){
            start = response.data.drinks.length/2;
            end = response.data.drinks.length;
        }else{
            console.error();
        }
        options.url = 'https://the-cocktail-db.p.rapidapi.com/list.php';
        options.params.i = 'list';
        axios.request(options).then(function (response) {
            console.log(response.data);
            let strIng = '';
            for(let i = start; i < end; i++){
                strIng = strIng.concat(response.data.drinks[i].strIngredient1);
            }
            msg.reply(strIng);
        }).catch(function (error) {
            console.error(error);
        });
    }
    if(cmds.length > maxIn){
        msg.reply('Too Many Words!, Please input '+ value +' words including the prefix: cb');
    }

})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'help') {
		await interaction.reply('This Application allows you to request a cocktail Recipe, provided from TheCocktailDB');
	}
    if(interaction.commandName === 'about'){
        await interaction.reply('')
    }
    if(interaction.commandName === 'cmdlist'){

    }
})

client.login(token);