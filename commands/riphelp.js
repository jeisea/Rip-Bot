exports.run = (client, message, args) => {
  let embed = {
    color: 0xea6fd1,
    title: "Commands",
    fields: [{
        name: "!died (optional twitch clip)",
        value: "Increases your death count and saves a twitch clip of your death if you want"
      },
      {
        name: "!deaths",
        value: "Shows your profile and death clip"
      }
    ]
  };

  message.channel.send({embed: embed}).catch(console.error);
}
