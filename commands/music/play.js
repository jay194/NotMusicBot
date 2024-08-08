const { QueryType, useMainPlayer } = require('discord-player');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { isInVoiceChatValidation } = require('../../src/Validations');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song!')
        .addStringOption(option => 
            option
                .setName('song')
                .setDescription('pick a song retard')
                .setRequired(true)),
        async execute(inter) {
            try {

            //call validation
            const VoiceChatValidation = await isInVoiceChatValidation(inter);
            if(VoiceChatValidation != null) {
                return inter.reply({ embeds: [VoiceChatValidation], ephemeral: true });
            }

            const player = useMainPlayer()

            let song = inter.options.getString('song');

            const res = await player.search(song, {
                requestedBy: inter.member,
                searchEngine: QueryType.YOUTUBE
            });

            let songToQueue = res.tracks.find(x => !isNaN(x.raw.duration_ms))

            let songTitle = songToQueue.title

            let songSeconds = songToQueue.raw.duration_ms / 1000
            if (songSeconds > 10800) {
                const VidTooLong = new EmbedBuilder()
                .setAuthor({ name: `Video (${songTitle}) longer than 3 hours. Please update search or try another video`})
                return inter.reply({ embeds: [VidTooLong] });
            }

            console.log(songToQueue.title)

            //NO RESULTS FOUND RIP
            if (!res || !res.tracks.length) {
                const NoResultsEmbed = new EmbedBuilder()
                .setAuthor({ name: `no results found`})
                return inter.reply({ embeds: [NoResultsEmbed] });
            }

            if(songToQueue.playlist) {
                const PlayListResultEmbed = new EmbedBuilder()
                .setAuthor({ name: `Cannot support playlist yet`})
                return inter.reply({ embeds: [PlayListResultEmbed] });
            }

            const queue = await player.nodes.create(inter.guild, {
                metadata: inter.channel
            });

            try {
                if (!queue.connection) {
                    await queue.connect(inter.member.voice.channel);
                }
            } catch {
                //bad news here might need to use queue.tracks.clear() instead btw noob
                await player.deleteQueue(inter.guildId);

                const NoVoiceEmbed = new EmbedBuilder()
                    .setAuthor({ name: `I cant join voice chat`})

                return inter.reply({ embeds: [NoVoiceEmbed] });
            }

                const playEmbed = new EmbedBuilder()
                    .setAuthor({ name: `Added to queue: ${res.tracks[0].title}`})
                    
                await inter.reply({ embeds: [playEmbed] });


        
            //support for playlist??? check later otherwise just use queue.addTrack(res.tracks[0])
            // res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);
            queue.addTrack(songToQueue)

            if (!queue.isPlaying()) await queue.node.play();
        } catch (error){
            console.error("Big problem occured but im lazy so logging it instead", error);
            const BrokenEmbed = new EmbedBuilder()
                    .setAuthor({ name: `Possible gg, try again or let Jay know`})

                return inter.reply({ embeds: [BrokenEmbed] });
        }
        }
};