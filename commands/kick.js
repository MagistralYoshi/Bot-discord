module.exports = {
run: (message, args) => {
     if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
     const member = message.mentions.firts()
     if (!member) return message.channel.send('veuillez mentionner le membre à exlcure.')
     if (member.id === message.guild.ownerID) return message.channel.send('vous ne pouvez pas exclure le propriétaire du serveur.')
     if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('vaous ne pouvez pas exclure ce membre.')
     
},
name: 'kick',
guildOnly: true
}