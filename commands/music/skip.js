const { useQueue, useMainPlayer } = require('discord-player');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip song'),
        async execute(inter) {
            if(!inter.member.voice.channel) {
                const NotInVoiceChannelEmbed = new EmbedBuilder()
                .setAuthor({ name: `Yo cringe lord ur not in a voice channel`})

            return inter.reply({ embeds: [NotInVoiceChannelEmbed] });
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