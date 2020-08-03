import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";
// import qeneratePayload from 'promptpay-qr'
// import qrcode from '../modules/qrcode'

// const getUserDMId = async (botToken: string, userId: string) => {
//   console.log(`get dm ${userId}`)
//   const userdata = await axios.post(
//     'https://discordapp.com/api/v6/users/@me/channels',
//     { recipient_id: userId.trim() },
//     {
//       headers: {
//         Authorization: `Bot ${botToken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )
//   console.log(userdata)
//   return userdata
// }

// const sendDM = (dmId: string) =>
//   axios.post(
//     `https://discordapp.com/api/v6/channels/${dmId}/messages`,
//     {
//       content: 'Netflix monthly 100 Baht.',
//       embed: {
//         title: 'Netflix',
//         url: 'https://discordapp.com',
//         color: 9895936,
//         image: {
//           url: promptpayQr,
//         },
//         fields: [
//           {
//             name: 'Promptpay',
//             value: promptpayId,
//             inline: true,
//           },
//           {
//             name: 'Value (Baht)',
//             value: amount,
//             inline: true,
//           },
//         ],
//       },
//     },
//     {
//       headers: {
//         Authorization: `Bot ${botToken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   )

// export default async (req: NowRequest, res: NowResponse) => {
//   const botToken = process.env.DISCORD_BOT_TOKEN
//   const users = process.env.DISCORD_USERS.split(',').map((id) => id.trim())
//   const amount = process.env.NETFLIX_AMOUNT
//   const promptpayId = process.env.PROMPTPAY_ID
//   const promptpayQr = process.env.PROMPTPAY_QR

//   // const payload = qeneratePayload(promptpayId, { amount })
//   // const svg = await qrcode(payload)

//   await users.forEach(async (userId: string) => {
//     // Get user DM Id
//     const userdata = await getUserDMId(botToken, userId)

//     if (userdata.data && userdata.data.id) {
//       await sendDM(userdata.data.id)
//     }
//   })

//   res.status(200)
//   res.send('')
// }
