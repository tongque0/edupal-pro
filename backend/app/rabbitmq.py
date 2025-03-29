import pika
import json
from contextlib import contextmanager

# RabbitMQ 连接配置
RABBITMQ_HOST = 'edupal_rabbitmq_dev'
RABBITMQ_PORT = 5672
RABBITMQ_USER = 'user'
RABBITMQ_PASSWORD = 'password'
DEFAULT_QUEUE = 'question_queue'


@contextmanager
def rabbitmq_channel(queue_name=DEFAULT_QUEUE):
    """上下文管理 RabbitMQ channel"""
    connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=RABBITMQ_HOST,
        port=RABBITMQ_PORT,
        virtual_host='/',
        credentials=pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)
    ))

    channel = connection.channel()
    try:
        channel.queue_declare(queue=queue_name, durable=True)
        yield channel
    finally:
        channel.close()
        connection.close()


def send_to_queue(message: dict, queue_name=DEFAULT_QUEUE):
    try:
        with rabbitmq_channel(queue_name) as channel:
            channel.basic_publish(
                exchange='',
                routing_key=queue_name,
                body=json.dumps(message),
                properties=pika.BasicProperties(
                    delivery_mode=2,  # 消息持久化
                )
            )
            print(f" [x] Sent to '{queue_name}': {message}")
    except Exception as e:
        print(f"[!] 发送消息失败: {e}")


def send_question(userid,subject, grade, difficulty, type_, knowledge_point, source_id=None):
    """构造题目信息并发送"""
    message = {
        "user_id": userid,
        "subject": subject,
        "grade": grade,
        "difficulty": difficulty,
        "type": type_,
        "knowledge_point": knowledge_point,
        "source_id":source_id
    }
    send_to_queue(message, queue_name=DEFAULT_QUEUE)
