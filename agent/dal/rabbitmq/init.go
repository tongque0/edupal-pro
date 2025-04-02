package rabbitmq

import (
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/streadway/amqp"
)

type Consumer struct {
	QueueName     string
	Handler       func(amqp.Delivery)
	MaxConcurrent int // 新增：每个队列最大并发数
}

func StartConsumers(consumers []Consumer) {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	var dsn string
	dsn = os.Getenv("RABBITMQ_URL")
	if dsn == "" {
		dsn = "amqp://user:password@127.0.0.1:5672/"
		log.Println("未设置环境变量 DATABASE_URL，使用默认本地连接字符串")
	}
	conn, err := amqp.Dial(dsn)
	if err != nil {
		log.Fatalf("无法连接 RabbitMQ: %s", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("无法打开 channel: %s", err)
	}
	defer ch.Close()
	log.Printf("RabbitMQ 连接成功: %s", dsn)
	for _, c := range consumers {
		_, err := ch.QueueDeclare(
			c.QueueName,
			true, false, false, false, nil,
		)
		if err != nil {
			log.Fatalf("声明队列 %s 失败: %s", c.QueueName, err)
		}

		msgs, err := ch.Consume(
			c.QueueName,
			"",
			false, false, false, false, nil,
		)
		if err != nil {
			log.Fatalf("队列 %s 消费者注册失败: %s", c.QueueName, err)
		}

		// 每个队列一个固定大小的并发池
		go func(handler func(amqp.Delivery), queueName string, maxConcurrent int) {
			if maxConcurrent <= 0 {
				maxConcurrent = 1
			}
			log.Printf("开始监听队列: %s（最大并发 %d）", queueName, maxConcurrent)
			sem := make(chan struct{}, maxConcurrent)
			var wg sync.WaitGroup

			for msg := range msgs {
				sem <- struct{}{} // 占一个位置
				wg.Add(1)
				go func(m amqp.Delivery) {
					defer func() {
						<-sem // 释放
						wg.Done()
					}()
					handler(m)
				}(msg)
			}

			wg.Wait()
		}(c.Handler, c.QueueName, c.MaxConcurrent)
	}

	// 等待退出信号
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("接收到退出信号，正在关闭消费者...")
}
