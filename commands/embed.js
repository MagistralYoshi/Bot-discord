const Discord = require('discord.js')

module.exports = {
    run: message => {
     message.channel.send(new Discord.MessageEmbed()
     .setTitle('mon titre')
     .setDescription('la description de mon embed')
     .setColor('RAMDOM')
     .setAuthor('Yoshi')
     .setImage()
     .setThumbnail()
     .setFooter('Bot crée part Yoshi', ""))
     
    },

    name: 'embed'
}