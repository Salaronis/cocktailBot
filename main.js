// All necessary information for bot
const { GatewayIntentBits, messageLink } = require('discord.js')
const { REST } = require('@discordjs/rest')
const discord = require('discord.js')
const { token, apiHost, apiKey } = require('./sensitive/config.json')
const { Intents } = require('discord.js')
const client = new discord.Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds,  GatewayIntentBits.MessageContent]})
const axios = require("axios");
const prefix = 'cb';

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
            info = response.data.drinks[0];
            let string = '';
            const array = [
            info.strIngredient1,info.strMeasure1,
            info.strIngredient2,info.strMeasure2,
            info.strIngredient3,info.strMeasure3,
            info.strIngredient4,info.strMeasure4,
            info.strIngredient5,info.strMeasure5,
            info.strIngredient6,info.strMeasure6,
            info.strIngredient7,info.strMeasure7,
            info.strIngredient8,info.strMeasure8,
            info.strIngredient9,info.strMeasure9,
            info.strIngredient10,info.strMeasure10,
            info.strIngredient11,info.strMeasure11,
            info.strIngredient12,info.strMeasure12,
            info.strIngredient13,info.strMeasure13,
            info.strIngredient14,info.strMeasure14,
            info.strIngredient15,info.strMeasure15];
            for(let i = 0; i < array.length; i+=2){
                if(array[i] == null){
                    break;
                }else{
                    string = string.concat(array[i]+' '+ array[i+1]+ '\n');
                }
            }
            console.log(string);
            msg.reply(info.strDrinkThumb + '\n' +  info.strDrink + '\n' + info.strGlass + '\n'+ string + info.strInstructions);
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
        let drink = '';
        for(let i = 2; i < cmds.length; i++){
            drink = drink.concat(cmds[i] );
        }
        console.log(drink.trim());
        options.params.s = drink.trim();
        axios.request(options).then(function (response){
            axios.request(options).then(function (response) {
                info = response.data.drinks[0];
                let string = '';
                const array = [
                info.strIngredient1,info.strMeasure1,
                info.strIngredient2,info.strMeasure2,
                info.strIngredient3,info.strMeasure3,
                info.strIngredient4,info.strMeasure4,
                info.strIngredient5,info.strMeasure5,
                info.strIngredient6,info.strMeasure6,
                info.strIngredient7,info.strMeasure7,
                info.strIngredient8,info.strMeasure8,
                info.strIngredient9,info.strMeasure9,
                info.strIngredient10,info.strMeasure10,
                info.strIngredient11,info.strMeasure11,
                info.strIngredient12,info.strMeasure12,
                info.strIngredient13,info.strMeasure13,
                info.strIngredient14,info.strMeasure14,
                info.strIngredient15,info.strMeasure15];
                for(let i = 0; i < array.length; i+=2){
                    if(array[i] == null){
                        break;
                    }else{
                        string = string.concat(array[i]+' '+ array[i+1]+ '\n');
                    }
                }
                console.log(string);
                msg.reply(info.strDrinkThumb + '\n' +  info.strDrink + '\n' + info.strGlass + '\n'+ string + info.strInstructions);
            }).catch(function (error) {
                console.error(error);
            });
        })
    }

    //Request for Ingredient Specific Cocktails
    if(cmds[1] === 'ing'){
        options.url = 'https://the-cocktail-db.p.rapidapi.com/filter.php';
        options.params.i = cmds[2];
        let mult = cmds[3];
        axios.request(options).then(function (response){
            console.log(response.data);
            for(let i = ((mult == 0)? 0: 1*mult) ; i < 5*mult; i++){
                let info = response.data.drinks[i].strDrink;
                if(info == null){
                    break;
                }
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
        options.url = 'https://the-cocktail-db.p.rapidapi.com/list.php';
        options.params.i = 'list';
        axios.request(options).then(function (response) {
            if(cmds[2] == 1){
                start = 0;
                end = response.data.drinks.length/4;
            }else if(cmds[2] == 2){
                start = response.data.drinks.length/4;
                end = response.data.drinks.length/2; 
                start = response.data.drinks.length/2;
                end = 3*response.data.drinks.length/4;
            }else if(cmds[2] == 4){
                start = 3*response.data.drinks.length/4;
                end = response.data.drinks.length;
            }else{
                console.error();
            }
            console.log(response.data);
            let strIng = '';
            for(let i = start; i < end; i++){
                strIng = strIng.concat( response.data.drinks[i].strIngredient1, '\n');
            }
            msg.reply(strIng);
        }).catch(function (error) {
            console.error(error);
        });
    }

})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'help') {
		await interaction.reply('This Application allows you to request a cocktail Recipe, provided from TheCocktailDB! If you have any suggestions please let me know :D');
	}
    if(interaction.commandName === 'about'){
        await interaction.reply('This bot was made by Michael Xie and is using Discord.js, TheCocktailDB, RapidAPI, Node.js, and a lot of google searching and crying over JSON files :\'D')
    }
    if(interaction.commandName === 'cmdlist'){
        await interaction.reply(' cb : The Command Word \n random : Random Cocktail \n ct [string] : specific cocktail request \n ing [string] [int] : specific ingredient cocktails and page \n allIngredients [1-4] : Lists all Ingredients, separated into 4');
    }
})

client.login(token);