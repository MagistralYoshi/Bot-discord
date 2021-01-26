const Discord = require('discord.js'),

    client = new Discord.Client({

        fetchAllMembers: true

    }),

    config = require('./config.json'),

    fs = require('fs')

 

client.login(porcess.env.TOKEN)

client.commands = new Discord.Collection()

 

fs.readdir('./commands', (err, files) => {

    if (err) throw err

    files.forEach(file => {

        if (!file.endsWith('.js')) return

        const command = require(`./commands/${file}`)

        client.commands.set(command.name, command)

    })

})

 

client.on('message', message => {

    if (message.type !== 'DEFAULT' || message.author.bot) return

 

    const args = message.content.trim().split(/ +/g)

    const commandName = args.shift().toLowerCase()

    if (!commandName.startsWith(config.prefix)) return

    const command = client.commands.get(commandName.slice(config.prefix.length))

    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('cette commande est dédié a un seul et même serveur.')
    command.run(message, args, client)

})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get[config.greeting.channel].send(new Discord.MessageEmbed()
    .setDescription(`${member} a rejoint le serveur. Nous sommee désormais ${member.guild.membercount} !  🎉`)
    .setColor('#00ff00'))
    
})

client.on('guildMemberRemove', member =>{
    member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
    .setDescription((`${member.user.tag} A quitté le serveur ... nous sommes désormais ${member.guild.memberCount} 😢`))
    .setColor('#ff0004'))
})


client.on('ready', () => {
    const statuses = [
        () => `${client.guilds.cache.size} serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'PLAYING'})
        i = ++i % statuses.lentght
    }, 1e4)
})