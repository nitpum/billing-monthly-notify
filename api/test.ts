import { NowRequest, NowResponse } from "@vercel/node";
import { Airtable } from "../src/modules/Airtable";
import Discord from "../src/modules/Discord";

export default async (req: NowRequest, res: NowResponse) => {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const users = process.env.DISCORD_USERS.split(",");
  const amount = process.env.NETFLIX_AMOUNT;
  const promptpayId = process.env.PROMPTPAY_ID;
  const promptpayQr = process.env.PROMPTPAY_QR;

  const base = new Airtable(
    process.env.AIRTABLE_TOKEN,
    process.env.AIRTABLE_BASE_ID
  );

  await base.getServices();
  await base.getUsers();
  const serviceUsage = await base.getServiceUsage();

  const discord = new Discord(botToken);

  // Promise.all([
  //   serviceUsage.forEach((usage) => {
  //     const user = usage.user
  //     usage.services.forEach(async (service) => {
  //       console.log(`service ${user.discordId}`)
  //       const result = await discord.getDMChannel(user.discordId)
  //       console.log(`result: ` + result)
  //       // const result = await discord.alert(
  //       //   user.discordId,
  //       //   service.displayName,
  //       //   {
  //       //     name: 'Promptpay',
  //       //     value: '',
  //       //   },
  //       //   {
  //       //     name: 'Value',
  //       //     value: `${service.price}`,
  //       //   },
  //       //   service.description,
  //       //   ''
  //       // )
  //     })
  //   }),
  // ])
  res.status(200);
  res.send("ok");
};
