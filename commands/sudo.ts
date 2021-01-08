import { Message } from "discord.js";
import { CommandOutput } from "../structures/text";
import { cmds } from "../index";


export const run = async (msg: Message, a: string[]) => {
  const prompt = await msg.channel.send(CommandOutput(msg, `[sudo]: password for ${msg.author.username.toLowerCase().replace(/( |_)/g, "")}: \n\n\nThis prompt will timeout in 15 seconds.`));
  const passwdCollector = msg.channel.createMessageCollector(mc => mc.author.id == msg.author.id, { time: 15000 });
  const passwd = { correct: `toor`, has: false };
  passwdCollector.on("collect", m => {
    if (passwd.correct == m.content) { 
      prompt.edit(CommandOutput(msg, ""));
      passwdCollector.stop();
    } else {
      // @ts-ignore It works, okey?
      prompt.edit(CommandOutput(msg, a[1] ? `[sudo]: password for ${msg.author.username.toLowerCase().replace(/( |_)/g, "")}: ${cmds.get(a[1].toLowerCase())?.run(msg, a)}` :`[sudo]: password for ${msg.author.username.toLowerCase().replace(/( |_)/g, "")}: \n\nWhat command should I even run? Make sense, darnit`))
      passwdCollector.stop()
    }
  })
}
