package gollama

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Gollama struct {
	Host string
}

type Config func(*Gollama)

func WithHost(h string) Config {
	return func(g *Gollama) {
		g.Host = h
	}
}

func New(c ...Config) *Gollama {
	g := &Gollama{
		Host: "http://localhost:11434",
	}
	for _, f := range c {
		f(g)
	}
	return g
}

func (g *Gollama) Chat(chatReq ChatRequest) (ChatResponse, error) {
	client := &http.Client{}
	chatRes := ChatResponse{}

	chatReq.Stream = false

	jsonReq, err := json.Marshal(chatReq)
	if err != nil {
		return chatRes, err
	}

	request, err := http.NewRequest("POST", g.Host+"/api/chat", bytes.NewBuffer(jsonReq))
	if err != nil {
		return chatRes, err
	}

	request.Header.Set("Content-Type", "application/json")

	response, err := client.Do(request)
	if err != nil {
		return chatRes, err
	}
	if response.StatusCode != http.StatusOK {
		return chatRes, fmt.Errorf("unexpected status code: %d", response.StatusCode)
	}
	defer response.Body.Close()

	if err := json.NewDecoder(response.Body).Decode(&chatRes); err != nil {
		return chatRes, err
	}

	return chatRes, nil
}

func (g *Gollama) ChatStream(chatReq ChatRequest) ([]ChatResponse, error) {
	client := &http.Client{}
	chatRes := []ChatResponse{}

	chatReq.Stream = true

	jsonReq, err := json.Marshal(chatReq)
	if err != nil {
		return chatRes, err
	}

	request, err := http.NewRequest("POST", g.Host+"/api/chat", bytes.NewBuffer(jsonReq))
	if err != nil {
		return chatRes, err
	}

	request.Header.Set("Content-Type", "application/json")

	response, err := client.Do(request)
	if err != nil {
		return chatRes, err
	}
	if response.StatusCode != http.StatusOK {
		return chatRes, fmt.Errorf("unexpected status code: %d", response.StatusCode)
	}
	defer response.Body.Close()

	decoder := json.NewDecoder(response.Body)
	for {
		chunk := ChatResponse{}
		err := decoder.Decode(&chunk)
		if err != nil {
			break
		}
		chatRes = append(chatRes, chunk)
	}

	return chatRes, nil
}
