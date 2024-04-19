const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { useQueue  } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Queue of Songs'),
        async execute(inter) {
            const queue = useQueue(inter.guild);

            if (!queue) return inter.reply({ content: `not even playing music huh? ${inter.member} ??? `, ephemeral: true });

            if (!queue.tracks.toArray()[0]) return  inter.reply({ content: `No songs in queue`, ephemeral: true });

            const songs = queue.tracks.size;

            const footer = `Songs queued up: **${songs}**`;

            const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} (${track.requestedBy.username})`)

            const embed = new EmbedBuilder()
            .setAuthor({name: `Server queue - ${inter.guild.name}`})
            .setDescription(`Current: ${queue.currentTrack.title}\n\n${tracks.join('\n')}\n\n${footer}`)

            return inter.reply({ embeds: [embed] });
        },
};