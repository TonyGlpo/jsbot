const Discord = require('discord.js'),
client = new Discord.Client();
const Enmap = require('enmap'), fs = require('fs-extra');
client.commands = new Enmap();
require('dotenv').config();

const init = async () => {
        const commandFiles = await fs.readdir('./commands');
        console.log(`Carregando o total de ${commandFiles.length} comandos.`);
        commandFiles.shift();
        commandFiles.forEach(file => {
            try {
                const props = require(`./commands/${file}`);
                if(file.split('.').slice(1)[0] !== 'js') return;
                if (props.init) {
                    props.init(client);
                }
                client.commands.set(props.command.name, props);
            } catch (error) {
                console.log(`[#ERROR] Impossivel executar comando ${file}: ${error}`);
            }
        })
        const eventFiles = await fs.readdir('./events');
        console.log(`Carregando o total de ${eventFiles.length} eventos.`);
        eventFiles.forEach(file => {
            const eventName = file.split('.')[0];
            const event = require(`./events/${file}`);
            client.on(eventName, event.bind(null, client));
        })
}

module.exports = client.commands;

client.login(process.env.TOKEN)
console.log('Bot is running!')
init();