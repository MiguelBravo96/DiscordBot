// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv'); //gets the dotenv information from the .env file
const { error } = require('node:console');
dotenv.config(); 
const {TOKEN} = process.env //all the information about the .env file


//import commands from the folder commands


const fs = require("node:fs") //module of node to use files
const path = require("node:path") //module of node to use paths

const commandsPath = path.join(__dirname, "commands") //name the folder where we are going to get commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")) //alocation of files, then filter to files that end with .js

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] })// Create a new client instance
client.commands = new Collection()




//for percorrer o array que tem os comandos a acabar em js
for (const file of commandFiles){
    const filePath = path.join(commandsPath, file) // passar o command path que tem nome de commands e os ficheiros
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else  {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
    } 
}

//Bot login
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(TOKEN); // Log in to Discord with your client's token//TOKEN from .env file


//interactions listenner with the bot
client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.isStringSelectMenu()){
        const selected = interaction.values[0]
        if (selected == "javascript"){
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python"){
            await interaction.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "csharp"){
            await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
        } else if (selected == "discordjs"){
            await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
    }
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } 
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!")
    }
})

