package question

import (
	"agent/dal/model"
	"agent/dal/mysql"
	"agent/dal/query"
	"context"
	"fmt"
	"time"

	"github.com/cloudwego/eino-ext/components/model/openai"
	"github.com/cloudwego/eino/schema"
)

type QuestionRequest struct {
	UserID         int32
	Subject        string
	Grade          string
	Difficulty     string
	Type           string
	KnowledgePoint string
	SourceID       string
}

// 真正的业务处理函数
func GenQuestion(q QuestionRequest) error {
	// 打印队列命中信息
	fmt.Printf("队列命中🎯 生成题目: UserID: %s, Question: %+v\n", fmt.Sprintf("%d", q.UserID), q)

	// 初始化OpenAI客户端
	ctx := context.Background()
	client, err := openai.NewChatModel(ctx, &openai.ChatModelConfig{
		APIKey:  "sk-MlUCO1oxmEHjx0D6UDeqfQzK7kVd1KAccoc0N41pbvJw0lx4", // 考虑从环境变量中读取API密钥
		Timeout: 30 * time.Second,
		Model:   "gpt-4o",
		BaseURL: "https://api.zetatechs.com/v1", // 也可以配置成常量
	})
	if err != nil {
		return fmt.Errorf("模型初始化失败: %v", err)
	}

	// 生成问题的消息
	messages := []*schema.Message{
		schema.UserMessage(genPrompt(q)),
	}
	response, err := client.Generate(ctx, messages)
	if err != nil {
		return fmt.Errorf("模型生成失败: %v", err)
	}

	// 提取模型返回的题目信息
	question := ExtractFieldsFromJSON(response.Content)

	// 创建数据库连接
	u := query.Use(mysql.DB)
	qq := u.Question.WithContext(ctx)
	tq := u.Questiontrace.WithContext(ctx)

	// 创建新的题目记录
	newquestion := &model.Question{
		UserID:      q.UserID,
		Subject:     question.Subject,
		Grade:       question.Grade,
		Difficulty:  question.Difficulty,
		Content:     question.Question,
		Answer:      question.Answer,
		Type:        question.Type,
		Options:     question.OptionsJSON,
		SourceID:    q.SourceID,
		Explanation: question.Explanation,
		IsPublic:    true,
	}

	// 插入题目到数据库
	if err := qq.Create(newquestion); err != nil {
		return fmt.Errorf("数据库插入失败: %v", err)
	}

	// 追踪记录插入
	if err := tq.Create(&model.Questiontrace{
		QuestionID: newquestion.ID,
		UserID:     q.UserID,
		Source:     "agent",
		Model:      "gpt-4o",
		SourceID:   q.SourceID,
	}); err != nil {
		return fmt.Errorf("数据库插入追踪记录失败: %v", err)
	}

	fmt.Printf(`
	
	📘 题目内容 ：%s
	🧠 学科     ：%s
	🎓 年级     ：%s
	📈 难度     ：%s
	🧾 题型     ：%s
	🅰️ 选项     ：%s
	✅ 正确答案 ：%s
	🆔 来源批次 ：%s
	`,
		question.Question,
		question.Subject,
		question.Grade,
		question.Difficulty,
		question.Type,
		question.OptionsJSON,
		question.Answer,
		q.SourceID,
	)

	return nil
}

func genPrompt(q QuestionRequest) string {
	prompt := ""
	switch q.Type {
	case "选择题":
		prompt = selectPrompt(q)
	case "填空题":
		prompt = fillPrompt(q)
	case "判断题":
		prompt = trueFalsePrompt(q)
	case "计算题":
		prompt = calculationPrompt(q)
	default:
		prompt = defaultPrompt(q)
	}
	return prompt
}
