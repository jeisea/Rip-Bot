let ranking = (deathCount) => {
  if (deathCount == 0) {
    return ["The GOAT", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/220px-Michael_Jordan_in_2014.jpg"];
  } else if (deathCount < 5) {
    return ["Thicc J U G G", "https://d1u5p3l4wpay3k.cloudfront.net/pathofexile_gamepedia/a/a0/Juggernaut_Ascendant_passive_icon.png"];
  } else if (deathCount < 10) {
    return ["Mathil Fan", "https://i.imgur.com/6tPRr6K.png"];
  } else if (deathCount < 15) {
    return ["Chicken Subscriber", "https://static-cdn.jtvnw.net/jtv_user_pictures/bakedchicken-profile_image-b3646643799493da-300x300.png"];
  } else {
    return ["Pokimane top donator", "https://i.imgur.com/BoFJGhU.png"];
  }
};

exports.run = (client, message, args, sql) => {
    sql.get(`SELECT * FROM deaths WHERE userId ="${message.author.id}"`).then(row => {
      let embed = {
        color: 0xea6fd1,
        title: "Rip Stats",
        fields: [{
            name: "Rank",
            value: ""
          }
        ],
        image: {
          url: "https://cdn.discordapp.com/embed/avatars/0.png"
        }
      };
      if (!row || row.deaths === 0) {
        let rank = ranking(0);
        embed.description = `You have never died ${message.author.username}. You are the Michael Jordan of PoE!`;
        embed.fields[0].value = rank[0];
        embed.image = {
          url: rank[1]
        };
        message.channel.send({embed: embed}).catch(console.error);
      } else {
        let timeStr = row.deaths === 1 ? "time" : "times";
        let rank = ranking(row.deaths);
        embed.description = `Yikes! You've died ${row.deaths} ${timeStr}.`;
        embed.fields[0].value = rank[0];
        embed.image = {
          url: rank[1],
          height: 200,
          width: 200
        };
        message.channel.send({embed: embed}).catch(console.error);
        message.channel.send(row.clip).catch(console.error);
      }
    }).catch(() => {
      console.error;
      sql.run("CREATE TABLE IF NOT EXISTS deaths (userId TEXT, deaths INTEGER, clip TEXT)");
    });
}
