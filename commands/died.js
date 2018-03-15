const ytdl = require('ytdl-core');
exports.run = (client, message, args, sql) => {
    let clipUrl = "";
    if (args.length > 1 && args[1].indexOf("https://clips.twitch.tv/") == 0) {
      clipUrl = args[1];
    }

    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
      voiceChannel.join()
      .then(connection => {
        const streamOptions = { seek: 12, volume: 1 };
        const stream = ytdl("https://www.youtube.com/watch?v=upkYQqbrjSc", { filter : "audioonly" });
        const dispatcher = connection.playStream(stream, streamOptions);
        dispatcher.setBitrate(480);
        setTimeout(() => dispatcher.end(), 13000);
      })
      .catch(console.error);
    }
    sql.get(`SELECT * FROM deaths WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) {
        sql.run("INSERT INTO deaths (userId, deaths, clip) VALUES (?, ?, ?)", [message.author.id, 1, clipUrl]);
      } else {
        if (clipUrl.length > 0) {
          sql.run(`UPDATE deaths SET deaths = ${row.deaths + 1}, clip = '${clipUrl}' WHERE userId = ${message.author.id}`);
        } else {
          sql.run(`UPDATE deaths SET deaths = ${row.deaths + 1} WHERE userId = ${message.author.id}`);
        }
      }
      message.channel.send("Your rip stats have been updated!").catch(console.error);
    }).catch(() => {
      console.error;
      sql.run("CREATE TABLE IF NOT EXISTS deaths (userId TEXT, deaths INTEGER, clip TEXT)").then(() => {
        sql.run("INSERT INTO deaths (userId, deaths, clip) VALUES (?, ?, ?)", [message.author.id, 1, clipUrl]);
      });
    });
}
