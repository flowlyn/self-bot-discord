const { Client } = require('discord.js-selfbot-v13');
const Database = require('better-sqlite3');
const db = new Database('clonagem.db');

const client = new Client();

const TOKEN = 'you token';
const PREFIX = '!';
const AUTO_MSG_CHANNEL_ID = 'CHANNEL_ID_HERE';

let isSpamming = false;
let ghostMode = false;

db.prepare(`CREATE TABLE IF NOT EXISTS clone_map (original_id TEXT PRIMARY KEY, cloned_id TEXT, type TEXT)`).run();

const rpGifs = {
    kiss: ['https://media.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif'],
    hug: ['https://media.tenor.com/a5rM_mQhZ_wAAAAC/anime-hug.gif'],
    slap: ['https://media.tenor.com/PeJyXy01fKkAAAAC/sao-sword-art-online.gif'],
    punch: ['https://media.tenor.com/BoYBoopIkBcAAAAC/anime-smash.gif'],
    pat: ['https://media.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif'],
    bite: ['https://media.tenor.com/E5EBeVbQ8N8AAAAC/anime-bite.gif'],
    shoot: ['https://media.tenor.com/kO3d_B09a3wAAAAC/anime-gun.gif'],
    dance: ['https://media.tenor.com/XqT-J9NstXAAAAAC/anime-dance.gif'],
    kill: ['https://media.tenor.com/X_vIn_6I_6gAAAAC/akame-ga-kill-anime.gif'],
    wave: ['https://media.tenor.com/97i543X5S_0AAAAC/anime-wave.gif'],
    poke: ['https://media.tenor.com/9mOPrDskv_AAAAAC/anime-poke.gif'],
    laugh: ['https://media.tenor.com/9eO672T-P78AAAAC/anime-laugh.gif']
};

const infoText = `\`\`\`log
Command List:
Admin: !ban, !kick, !clear, !clearmine, !wipe, !stop, !stopspam, !lock, !unlock, !slowmode
Info: !info, !list, !serverinfo, !avatar, !id, !ping, !whois, !guildid, !uptime
Anime: !kiss, !hug, !slap, !punch, !pat, !bite, !shoot, !dance, !kill, !wave, !poke, !laugh
Extra: !spam, !cloneserver, !getemoji, !setstatus, !say, !coinflip, !8ball, !reverse, !calculate, !poll, !ascii, !hack, !ghost, !nitro, !joke, !selfdestruct
Status: !online, !dnd, !idle, !invisible, !hypesquad

Warnings:
- Excessive spamming will trigger Discord's anti-fraud system.
- Self-bots are against Discord Terms of Service.
- Cloning large servers may take several minutes to bypass rate limits.
- !stopspam will immediately terminate any active spam loops.
\`\`\``;

client.on('ready', () => {
    console.clear();
    console.log('╔══════════════════════════════════════════════╗');
    console.log(`║ SYSTEM STATUS: ONLINE                        ║`);
    console.log(`║ LOGGED AS: ${client.user.tag.padEnd(33)} ║`);
    console.log(`║ PREFIX: ${PREFIX.padEnd(36)} ║`);
    console.log('╚══════════════════════════════════════════════╝');
    
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(AUTO_MSG_CHANNEL_ID);
            if (channel) await channel.send('hi');
        } catch (e) {}
    }, 5 * 60 * 1000);
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== client.user.id || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`[${new Date().toLocaleTimeString()}] [EXEC] ${command.toUpperCase()} | Server: ${message.guild?.name || 'DM'}`);

    if (ghostMode && command !== 'ghost') {
        setTimeout(() => message.delete().catch(() => {}), 2000);
    }

    if (rpGifs[command]) {
        const target = message.mentions.users.first() || args[0] || "everyone";
        const gif = rpGifs[command][Math.floor(Math.random() * rpGifs[command].length)];
        return message.edit(`**${client.user.username}** ${command}s **${target}**\n${gif}\n${infoText}`);
    }

    switch (command) {
        case 'info':
        case 'list':
            await message.edit(infoText);
            break;

        case 'ghost':
            ghostMode = !ghostMode;
            await message.edit(`👻 **Ghost Mode:** \`${ghostMode ? 'ENABLED' : 'DISABLED'}\``);
            break;

        case 'stop':
            await message.edit('🛑 **Shutting down...**');
            process.exit();
            break;

        case 'stopspam':
            isSpamming = false;
            await message.edit('🛑 **Spam loop stopped.**');
            break;

        case 'ping':
            await message.edit(`🏓 **Latency:** \`${client.ws.ping}ms\`\n${infoText}`);
            break;

        case 'uptime':
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            await message.edit(`⏲️ **Uptime:** \`${days}d ${hours}h ${minutes}m\``);
            break;

        case 'spam': {
            const qtd = parseInt(args[0]);
            const timeRaw = args[1];
            const text = args.slice(2).join(' ');
            if (isNaN(qtd) || !timeRaw || !text) return message.edit("❌ Usage: !spam <count> <time s/m> <message>");
            let ms = timeRaw.endsWith('s') ? parseFloat(timeRaw) * 1000 : parseFloat(timeRaw) * 60000;
            isSpamming = true;
            if (!ghostMode) message.delete().catch(() => {});
            for (let i = 0; i < qtd; i++) {
                if (!isSpamming) break;
                await message.channel.send(text).catch(() => {});
                await new Promise(r => setTimeout(r, ms));
            }
            isSpamming = false;
            break;
        }

        case 'clear':
        case 'purge': {
            const num = parseInt(args[0]);
            if (isNaN(num)) return message.edit("❌ Provide a number.");
            const msgs = await message.channel.messages.fetch({ limit: num + 1 });
            for (const m of msgs.values()) await m.delete().catch(() => {});
            break;
        }

        case 'clearmine': {
            const num = parseInt(args[0]);
            if (isNaN(num)) return message.edit("❌ Provide a number.");
            const msgs = await message.channel.messages.fetch({ limit: 100 });
            const mine = msgs.filter(m => m.author.id === client.user.id).first(num + 1);
            for (const m of mine) await m.delete().catch(() => {});
            break;
        }

        case 'avatar': {
            const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => client.user);
            await message.edit(`🖼️ **Avatar of ${user.tag}**\n${user.displayAvatarURL({ dynamic: true, size: 2048 })}\n${infoText}`);
            break;
        }

        case 'serverinfo': {
            const g = message.guild;
            if (!g) return;
            await message.edit(`📊 **Server Info**\nName: \`${g.name}\`\nMembers: \`${g.memberCount}\`\nID: \`${g.id}\`\n${infoText}`);
            break;
        }

        case 'whois': {
            const user = message.mentions.users.first() || client.user;
            await message.edit(`👤 **User Info**\nTag: \`${user.tag}\`\nID: \`${user.id}\`\nCreated: \`${user.createdAt.toDateString()}\``);
            break;
        }

        case 'id':
            const target = message.mentions.users.first() || message.author;
            await message.edit(`🆔 **ID:** \`${target.id}\``);
            break;

        case 'guildid':
            await message.edit(`🆔 **Guild ID:** \`${message.guild.id}\``);
            break;

        case 'say':
            const txt = args.join(' ');
            if (txt) await message.edit(txt);
            break;

        case 'coinflip':
            await message.edit(`🪙 **Result:** \`${Math.random() > 0.5 ? 'HEADS' : 'TAILS'}\``);
            break;

        case 'joke':
            const jokes = ["I'm on a seafood diet. I see food and I eat it.", "Why don't skeletons fight each other? They don't have the guts."];
            await message.edit(`😂 ${jokes[Math.floor(Math.random() * jokes.length)]}`);
            break;

        case '8ball':
            const answers = ["Yes", "No", "Maybe", "Definitely"];
            await message.edit(`🔮 **8Ball:** ${answers[Math.floor(Math.random() * answers.length)]}`);
            break;

        case 'reverse':
            await message.edit(args.join(' ').split('').reverse().join(''));
            break;

        case 'calculate':
            try { await message.edit(`🧮 **Result:** \`${eval(args.join(' '))}\``); } catch (e) { await message.edit("❌ Error."); }
            break;

        case 'nitro':
            await message.edit('https://discord.gift/' + Math.random().toString(36).substring(2, 18));
            break;

        case 'selfdestruct':
            await message.edit('💣 **Self-destructing in 3... 2... 1...**');
            setTimeout(() => message.delete(), 3000);
            break;

        case 'lock':
            await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });
            await message.edit('🔒 **Locked.**');
            break;

        case 'unlock':
            await message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true });
            await message.edit('🔓 **Unlocked.**');
            break;

        case 'slowmode':
            await message.channel.setRateLimitPerUser(parseInt(args[0]) || 0);
            await message.edit(`⏲️ **Slowmode:** ${args[0]}s`);
            break;

        case 'online': client.user.setStatus('online'); await message.edit('🟢 **Online**'); break;
        case 'dnd': client.user.setStatus('dnd'); await message.edit('🔴 **DND**'); break;
        case 'idle': client.user.setStatus('idle'); await message.edit('🟡 **Idle**'); break;
        case 'invisible': client.user.setStatus('invisible'); await message.edit('⚪ **Invisible**'); break;

        case 'hypesquad':
            const h = args[0]?.toLowerCase();
            const houses = { bravery: 1, brilliance: 2, balance: 3 };
            if (houses[h]) {
                await client.user.setHypeSquad(houses[h]);
                await message.edit(`🚩 **Hypesquad:** ${h}`);
            }
            break;

        case 'ban':
            const bId = message.mentions.users.first()?.id || args[0];
            await message.guild.members.ban(bId).catch(() => {});
            await message.edit('🔨 **Banned.**');
            break;

        case 'kick':
            const kId = message.mentions.users.first()?.id || args[0];
            const km = await message.guild.members.fetch(kId);
            await km.kick().catch(() => {});
            await message.edit('👞 **Kicked.**');
            break;

        case 'wipe':
            await message.edit("☢️ **WIPING...**");
            for (const c of message.guild.channels.cache.values()) await c.delete().catch(() => {});
            for (const r of message.guild.roles.cache.values()) { if (!r.managed && r.id !== message.guild.id) await r.delete().catch(() => {}); }
            db.prepare('DELETE FROM clone_map').run();
            break;

        case 'cloneserver':
            const origin = await client.guilds.fetch(args[0]);
            const dest = message.guild;
            await message.edit("🧬 **Cloning...**");
            const roles = [...origin.roles.cache.values()].sort((a, b) => a.position - b.position);
            for (const r of roles) {
                if (r.managed || r.id === origin.id) continue;
                const nr = await dest.roles.create({ name: r.name, color: r.color, permissions: r.permissions }).catch(() => {});
                if (nr) db.prepare('INSERT INTO clone_map VALUES (?, ?, ?)').run(r.id, nr.id, 'role');
            }
            const chans = [...origin.channels.cache.values()].sort((a, b) => a.position - b.position);
            for (const c of chans) {
                const parent = db.prepare('SELECT cloned_id FROM clone_map WHERE original_id = ?').get(c.parentId);
                const nc = await dest.channels.create(c.name, { type: c.type, parent: parent?.cloned_id }).catch(() => {});
                if (nc) db.prepare('INSERT INTO clone_map VALUES (?, ?, ?)').run(c.id, nc.id, 'channel');
                await new Promise(r => setTimeout(r, 1000));
            }
            await message.edit("✅ **Done.**");
            break;

        case 'getemoji':
            const targetG = await client.guilds.fetch(args[0]);
            for (const e of targetG.emojis.cache.values()) await message.guild.emojis.create(e.url, e.name).catch(() => {});
            await message.edit("📁 **Emojis Copied.**");
            break;

        case 'setstatus':
            client.user.setActivity(args.join(' '));
            await message.edit(`⚙️ **Status:** ${args.join(' ')}`);
            break;
            
        case 'hack':
            await message.edit(`💻 Hacking ${args[0] || 'Server'}...`);
            await new Promise(r => setTimeout(r, 1000));
            await message.edit(`💉 Injecting... 45%`);
            await new Promise(r => setTimeout(r, 1000));
            await message.edit(`✅ **Success.**`);
            break;
    }
});

client.login(TOKEN);