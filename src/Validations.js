const { clientId } = require("../config.json");
const { EmbedBuilder } = require('discord.js');


//returns embed if not valid otherwise no return
const isInVoiceChatValidation = async (interaction) => {
            //might not check if its in the same channel as bot OOPS
            if(!interaction.member.voice.channel) {
                const NotInVoiceChannelEmbed = new EmbedBuilder()
                .setAuthor({ name: `Yo cringe lord ur not in a voice channel`})

            return NotInVoiceChannelEmbed;
            }

            //handles if bot is in the server but not in the same voice channel of the user that used the command
            let maper = await interaction.guild.channels.fetch();
            if(interaction.client.voice.adapters.has(interaction.guildId) && !maper.get(interaction.member.voice.channel.id).members.has(clientId)) {
                const NotInCorrectVoiceChannelEmbed = new EmbedBuilder()
                .setAuthor({ name: `Yo cringe lord ur not in the same voice channel as the bot`})

            return NotInCorrectVoiceChannelEmbed;
            }
}

module.exports = {isInVoiceChatValidation}