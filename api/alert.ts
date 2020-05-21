import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'
// import qeneratePayload from 'promptpay-qr'
// import qrcode from '../modules/qrcode'

export default async (req: NowRequest, res: NowResponse) => {
  const botToken = process.env.DISCORD_BOT_TOKEN
  const users = process.env.DISCORD_USERS.split(',')
  const amount = process.env.NETFLIX_AMOUNT
  const promptpayId = process.env.PROMPTPAY_ID
  const promptpayQr = process.env.PROMPTPAY_QR

  // const payload = qeneratePayload(promptpayId, { amount })
  // const svg = await qrcode(payload)

  users.forEach(async (userId) => {
    // Get user DM Id
    const res = await axios.post(
      'https://discordapp.com/api/v6/users/@me/channels',
      { recipient_id: userId.trim() },
      {
        headers: {
          Authorization: 'Bot ' + botToken,
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.data && res.data.id) {
      axios.post(
        'https://discordapp.com/api/v6/channels/' + res.data.id + '/messages',
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
                value: '100',
                inline: true,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: 'Bot ' + botToken,
            'Content-Type': 'application/json',
          },
        }
      )
    }
  })

  res.status(200)
}
