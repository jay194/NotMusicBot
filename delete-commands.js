const { REST, Routes } = require('discord.js');
const { clientId, DISCORD_TOKEN } = require('./config.json');

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// for global commands

//applicationCommands(clientId) for global???
//applicationGuildCommands(clientId,guildId) for guildIds???
(async () => {
    await rest.put(Routes.applicationCommands(clientId), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
})();