package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"sync"
)

type Channel struct {
	Id string
}

func Handler(w http.ResponseWriter, r *http.Request) {
	userIds := os.Getenv("DISCORD_USERS")

	var wg sync.WaitGroup

	usersList := strings.Split(userIds, ",")
	fmt.Println(usersList)
	for _, userId := range usersList {
		wg.Add(1)

		go notifyUser(&wg, userId)
	}

	wg.Wait()

	w.WriteHeader(http.StatusNoContent)
}

func notifyUser(wg *sync.WaitGroup, userId string) {
	defer wg.Done()

	channelId, err := getUserDMChannelId(userId)
	if err != nil {
		fmt.Printf("Can't get user DM channel(%s): %vn", userId, err)
		return
	}

	fmt.Printf("Send message to userId: %s(channel: %s)\n", userId, channelId)
	sendMessageToUser(channelId)
	fmt.Printf("Successfully sent message to userId: %s(channel: %s)\n", userId, channelId)
}

func getUserDMChannelId(userId string) (string, error) {
	botToken := os.Getenv("DISCORD_BOT_TOKEN")

	data := map[string]string{"recipient_id": strings.TrimSpace(userId)}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", "https://discordapp.com/api/v6/users/@me/channels", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bot %s", botToken))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode == http.StatusUnauthorized {
		return "", fmt.Errorf("Unauthorized")
	}

	var channel Channel
	err = json.Unmarshal(body, &channel)
	if err != nil {
		return "", err
	}

	return channel.Id, nil
}

func sendMessageToUser(channelId string) error {
	amount := os.Getenv("AMOUNT")
	currency := os.Getenv("CURRENCY")
	imageUrl := os.Getenv("IMAGE_URL")
	promptPayId := os.Getenv("PROMPTPAY_ID")

	data := map[string]interface{}{
		"content": fmt.Sprintf("Monthly bill %s %s", amount, currency),
		"embed": map[string]interface{}{
			"title": "Monthly bill",
			"color": 9895936,
			"image": map[string]interface{}{
				"url": imageUrl,
			},
			"fields": []map[string]interface{}{
				{
					"name":   "PromptPay",
					"value":  promptPayId,
					"inline": true,
				},
				{
					"name":   fmt.Sprintf("Value (%s)", currency),
					"value":  amount,
					"inline": true,
				},
			},
		},
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("can't marshal json data for sending message")
	}

	res, err := http.NewRequest("POST", fmt.Sprintf("https://discordapp.com/api/v6/channels/%s/messages", channelId), bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("can't create request for sending message")
	}

	res.Header.Set("Content-Type", "application/json")
	res.Header.Set("Authorization", fmt.Sprintf("Bot %s", os.Getenv("DISCORD_BOT_TOKEN")))

	client := &http.Client{}
	resp, err := client.Do(res)
	if err != nil {
		return fmt.Errorf("can't send message")
	}

	if resp.StatusCode == http.StatusUnauthorized {
		return fmt.Errorf("unauthorized. When sending message to user")
	}

	if resp.StatusCode == http.StatusOK {
		return nil
	}

	return fmt.Errorf("something error when sending message to user")
}
