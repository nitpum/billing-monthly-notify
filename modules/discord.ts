import axios from 'axios'
import { IAlert, IAlertField } from './IAlert'

class Discord implements IAlert {
  botId: String

  constructor(_botId: String) {
    this.botId = _botId
  }

  alert(
    title: String,
    field1: IAlertField,
    field2: IAlertField,
    description: String,
    imageUrl: String,
    linkUrl?: String,
    primaryColor?: String
  ) {
    const endPoint = ''
    const header = {
      headers: {
        Authorization: 'Bot ' + this.botId,
        'Content-Type': 'application/json',
      },
    }
    const data = {
      content: description,
      embed: {
        title: title,
        url: linkUrl || 'https://discordapp.com',
        color: primaryColor || 9895936,
        image: {
          url: imageUrl,
        },
        fields: [
          {
            name: field1?.name || '',
            value: field1?.value || '',
            inline: true,
          },
          {
            name: field2?.name || '',
            value: field2?.value || '',
            inline: true,
          },
        ],
      },
    }
    axios.post(endPoint, data, header)
  }
}

export default Discord
