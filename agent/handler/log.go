package handler

import (
	"log"

	"github.com/streadway/amqp"
)

func LogQueue(msg amqp.Delivery) {
	log.Printf("[log_queue] 收到日志消息: %s", string(msg.Body))
	msg.Ack(false)
}
