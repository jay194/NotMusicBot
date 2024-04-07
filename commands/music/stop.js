const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop music'),
        async execute(inter) {
            //might not check if its in the same channel as bot OOPS
            if(!inter.member.voice.channel) {
                const NotInVoiceChannelEmbed = new EmbedBuilder()
                .setAuthor({ name: `Yo cringe lord ur not in a voice channel`})

            return inter.reply({ embeds: [NotInVoiceChannelEmbed] });
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