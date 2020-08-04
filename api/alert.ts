import { NowRequest, NowResponse } from '@vercel/node'
import axios from 'axios'

const sendUserAlert = (userId: string): Promise<any> => {
  const botToken = process.env.DISCORD_BOT_TOKEN
  const promptpayId = process.env.PROMPTPAY_ID
  const promptpayQr = process.env.PROMPTPAY_QR
  const amount = process.env.NETFLIX_AMOUNT

  return new Promise(async (resolve, reject) => {
    console.log(`requesting DM: ${userid}`)
    try {
      const {
        data: { id },
      } = await axios.post(
        'https://discordapp.com/api/v6/users/@me/channels',
        { recipient_id: userId.trim() },
        {
          headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
          },
        },
      )

      await axios.post(
        `https://discordapp.com/api/v6/channels/${id}/messages`,
        {
          content: 'Netflix monthly 100 Baht.',
          embed: {
            title: 'Netflix',
            url: 'https://discordapp.com',
            color: 9895936,
            image: {
              url: promptpayQr,
            },
            fields: [
              {
                name: 'Promptpay',
                value: promptpayId,
                inline: true,
              },
              {
                name: 'Value (Baht)',
                value: amount,
                inline: true,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

export default async (_: NowRequest, res: NowResponse) => {
  const users = process.env.DISCORD_USERS.split(',')
  console.log(`users: ${users}`)
  await Promise.all(users.map((userId) => sendUserAlert(userId)))
  console.log(`Finish sending`)
  res.status(200)
  res.send('')
}
