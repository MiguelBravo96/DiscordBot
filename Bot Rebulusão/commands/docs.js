const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, Component } = require("discord.js")

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Select technology")
            .addOptions({
                label: "javascript",
                description: "See Javascript documentation",
                value: "javascript"
                },
                {
                    label: "python",
                    description: "See Python documentation",
                    value: "python"
                },
                {
                    label: "C#",
                    description: "See C# documentation",
                    value: "csharp"
                },
                {
                    label: "discord.js",
                    description: "See discord.js documentation",
                    value: "discordjs"
                }
            )
    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação da tecnologia que quiser"),

    async execute(interaction) {
        await interaction.reply({content: "Selecione uma das techs abaixo:", components: [row]})
    }
}