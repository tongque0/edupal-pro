package handler

import (
	"encoding/json"
	"log"

	"agent/services/question"

	"github.com/streadway/amqp"
)

type QuestionHandler struct {
	UserID         int32 `json:"user_id"`
	Subject        string `json:"subject"`
	Grade          string `json:"grade"`
	Difficulty     string `json:"difficulty"`
	Type           string `json:"type"`
	KnowledgePoint string `json:"knowledge_point"`
	SourceID       string `json:"source_id"`
}

func (q *QuestionHandler) ToRequest() question.QuestionRequest {
	return question.QuestionRequest{
		UserID:         q.UserID,
		Subject:        q.Subject,
		Grade:          q.Grade,
		Difficulty:     q.Difficulty,
		Type:           q.Type,
		KnowledgePoint: q.KnowledgePoint,
		SourceID:       q.SourceID,
	}
}

func QuestionQueue(msg amqp.Delivery) {
	var q QuestionHandler
	if err := json.Unmarshal(msg.Body, &q); err != nil {
		log.Printf("[question_queue] JSON 解析失败: %s", err)
		msg.Nack(false, false)
		return
	}

	if err := question.GenQuestion(q.ToRequest()); err != nil {
		log.Printf("[question_queue] 生成题目失败: %s", err)
		msg.Nack(false, false)
		return
	}

	msg.Ack(false)
}
