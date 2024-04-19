const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');
const { isInVoiceChatValidation } = require('../../src/Validations');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop music'),
        async execute(inter) {
            //call validation
            const VoiceChatValidation = await isInVoiceChatValidation(inter);
            if(VoiceChatValidation != null) {
                return inter.reply({ embeds: [VoiceChatValidation] });
            }

            const player = useMainPlayer()
            const queue = useQueue(inter.guild);

            if (!queue || !queue.isPlaying()) return inter.reply({ content:`NO MUSIC PLAYING HUH???`});

            queue.delete();

            const StopEmbed = new EmbedBuilder()
            .setAuthor({name: `WHO TF CLEARED THE QUEUE?` })

            return inter.reply({ embeds: [StopEmbed] });

        },
};