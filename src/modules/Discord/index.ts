import axios, { AxiosPromise } from "axios";
import { IAlert, IAlertField } from "../../common/Alert/interfaces";

class Discord implements IAlert {
  botId: string;

  constructor(_botId: string) {
    this.botId = _botId;
  }

  getDMChannel(discordUserId: string) {
    return axios
      .post(
        "https://discordapp.com/api/v6/users/@me/channels",
        { recipient_id: discordUserId },
        {
          headers: {
            Authorization: "Bot " + this.botId,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  alert(
    discordUserId: string,
    title: string,
    field1: IAlertField,
    field2: IAlertField,
    description: string,
    imageUrl: string,
    linkUrl?: string,
    primaryColor?: string
  ): AxiosPromise<any> {
    this.getDMChannel(discordUserId);
    axios
      .post(
        "https://discordapp.com/api/v6/users/@me/channels",
        { recipient_id: discordUserId },
        {
          headers: {
            Authorization: "Bot " + this.botId,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("res");
        console.log(res);
        const endPoint = `https://discordapp.com/api/v6/channels/${res.data.id}/messages`;
        const header = {
          headers: {
            Authorization: "Bot " + this.botId,
            "Content-Type": "application/json",
          },
        };
        const data = {
          content: description,
          embed: {
            title: title,
            url: linkUrl || "https://discordapp.com",
            color: primaryColor || 9895936,
            image: {
              url: imageUrl,
            },
            fields: [
              {
                name: field1?.name || "",
                value: field1?.value || "",
                inline: true,
              },
              {
                name: field2?.name || "",
                value: field2?.value || "",
                inline: true,
              },
            ],
          },
        };
        return axios.post(endPoint, data, header);
      });
  }
}

export default Discord;
