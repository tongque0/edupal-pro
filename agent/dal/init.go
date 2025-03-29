package dal

import (
	"agent/dal/mysql"
	"agent/dal/rabbitmq"
	"agent/handler"
)

func Init() {
	// 初始化 MySQL 数据库
	mysql.Init()

	// 初始化 RabbitMQ 消息队列
	rabbitmq.StartConsumers([]rabbitmq.Consumer{
		{
			QueueName:     "question_queue",
			Handler:       handler.QuestionQueue,
			MaxConcurrent: 10,
		},
		{
			QueueName: "log_queue",
			Handler:   handler.LogQueue,
		},
	})
}
