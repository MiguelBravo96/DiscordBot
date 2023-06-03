const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("the best playlist on spotify"),

    async execute(interaction) {
        await interaction.reply("por aqui a playlist do spotify")
    }
}