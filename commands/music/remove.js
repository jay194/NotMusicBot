const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { useQueue  } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove a song from the queue')
        .addNumberOption(option =>
            option
                .setName('number')
                .setDescription('place in queue where the song is')
                .setRequired(true)),
        async execute(inter) {
            const number =  inter.options.getNumber('number')

            const queue = useQueue(inter.guild);

            if (!queue || !queue.isPlaying()) return inter.reply({ content: `No songs in queue`, ephemeral: true });

            const BaseEmbed = new EmbedBuilder()

            const index = number - 1
            try {
                const trackname = queue.tracks.toArray()[index].title.length > 0 ? queue.tracks.toArray()[index].title : null  

                queue.removeTrack(index);

                BaseEmbed.setAuthor({name: `removed from queue: ${trackname}` })

                return inter.reply({ embeds: [BaseEmbed] });
            } catch {
                return inter.reply({ content: `number of song is not in queue ${inter.member}`, ephemeral: true });
            }

        }
};