const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./sensitive/config.json');

const commands = [
	new SlashCommandBuilder().setName('help').setDescription('Help with the Bot'),
	new SlashCommandBuilder().setName('cmdlist').setDescription('All the commands you could want!'),
	new SlashCommandBuilder().setName('about').setDescription('About this app/bot!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);