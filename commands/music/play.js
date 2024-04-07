const { QueryType, useMainPlayer } = require('discord-player');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song!')
        .addStringOption(option => 
            option
                .setName('song')
                .setDescription('pick a song retard')
                .setRequired(true)),
    voiceChannel: true,
    async execute(inter) {
        const player = useMainPlayer()

        //search Song searchEngine -> set Youtube/spotifiy/etc...
        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.YOUTUBE
        });

        console.log(res.tracks[0])
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `no results found`})

        //NO RESULTS FOUND RIP
        if (!res || !res.tracks.length) {
            return inter.editReply({ embeds: [NoResultsEmbed] });
        }

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel
        });

        try {
            if (!queue.connection) {
                await queue.connect(inter.member.voice.channel);
            }
        } catch {
            await player.deleteQueue(inter.guildId);

            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({ name: `I cant join voice chat`})

            return inter.reply({ embeds: [NoVoiceEmbed] });
        }

            const playEmbed = new EmbedBuilder()
                .setAuthor({ name: `loading: ${res.tracks[0].title} to queue...`})
                
            await inter.reply({ embeds: [playEmbed] });


        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    }
};