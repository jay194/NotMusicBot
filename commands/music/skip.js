const { useQueue, useMainPlayer } = require('discord-player');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { isInVoiceChatValidation } = require('../../src/Validations');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip song'),
        async execute(inter) {

            //call validation
            const VoiceChatValidation = await isInVoiceChatValidation(inter);
            if(VoiceChatValidation != null) {
                return inter.reply({ embeds: [VoiceChatValidation] });
            }

            const player = useMainPlayer()
            const queue = useQueue(inter.guild);



            if (!queue || !queue.isPlaying()) return inter.reply({ content:`no music in queue`});

            const success = queue.node.skip();

            const SkipEmbed = new EmbedBuilder()
            .setAuthor({name: success ? `${queue.currentTrack.title} skipped` : `NOT GOOD CALL IT` })

            return inter.reply({ embeds: [SkipEmbed] });
        }
    }