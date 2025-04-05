package question

import "fmt"

func selectPrompt(req QuestionRequest) string {
	return fmt.Sprintf(`
请为我生成一道 %s 学科的 %s 年级的 %s 难度的选择题，知识点为 %s。
题目必须包括：
- 题目内容（question）
- 选项（options：A, B, C, D）
- 正确答案（answer，值为 A~D 之一）
- 题目类型（type，固定为 "选择题"）

返回格式为扁平的 JSON，示例如下：
{
  "subject": "%s",
  "grade": "%s",
  "difficulty": "%s",
  "knowledge_point": "%s",
  "question": "题目内容",
  "options": {
    "A": "选项A",
    "B": "选项B",
    "C": "选项C",
    "D": "选项D"
  },
  "explanation": "题目解析",
  "answer": "正确答案的字母",
  "type": "选择题"
}`, req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint,
		req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint)
}

func fillPrompt(req QuestionRequest) string {
	return fmt.Sprintf(`
请为我生成一道 %s 学科的 %s 年级的 %s 难度的填空题，知识点为 %s。
题目必须包括：
- 题目内容（question），空白处请用 ____ 表示
- 正确答案（answer）
- 题目类型（type，固定为 "填空题"）

返回格式为扁平的 JSON，示例如下：
{
  "subject": "%s",
  "grade": "%s",
  "difficulty": "%s",
  "knowledge_point": "%s",
  "question": "题目内容，空白处用 ____ 表示",
  "explanation": "题目解析",
  "answer": "正确答案",
  "type": "填空题"
}`, req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint,
		req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint)
}

func trueFalsePrompt(req QuestionRequest) string {
	return fmt.Sprintf(`
请为我生成一道 %s 学科的 %s 年级的 %s 难度的判断题，知识点为 %s。
题目要求包括：
- 题目内容（question）
- 选项（options，A 表示 "对"，B 表示 "错"）
- 正确答案（answer，值为 A 或 B）
- 题目类型（type，固定为 "判断题"）

返回格式为扁平的 JSON，示例如下：
{
  "subject": "%s",
  "grade": "%s",
  "difficulty": "%s",
  "knowledge_point": "%s",
  "question": "题目内容",
  "options": {
    "A": "对",
    "B": "错"
  },
  "explanation": "题目解析",
  "answer": "A",
  "type": "判断题"
}`, req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint,
		req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint)
}

func calculationPrompt(req QuestionRequest) string {
	return fmt.Sprintf(`
请为我生成一道 %s 学科的 %s 年级的 %s 难度的计算题，知识点为 %s。
题目要求包括：
- 题目内容（question）
- 正确答案（answer，需要有明确的计算结果）
- 题目类型（type，固定为 "计算题"）

返回格式为扁平的 JSON，示例如下：
{
  "subject": "%s",
  "grade": "%s",
  "difficulty": "%s",
  "knowledge_point": "%s",
  "question": "题目内容",
  "explanation": "题目解析",
  "answer": "计算结果",
  "type": "计算题"
}`, req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint,
		req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint)
}

func defaultPrompt(req QuestionRequest) string {
	return fmt.Sprintf(`
请为我生成一道 %s 学科的 %s 年级的 %s 难度的题目，知识点为 %s。
题目要求包括：
- 题目内容（question）
- 正确答案（answer）
- 题目类型（type，固定为 "其他"）

请以扁平 JSON 格式返回结果，示例如下：
{
  "subject": "%s",
  "grade": "%s",
  "difficulty": "%s",
  "knowledge_point": "%s",
  "question": "题目内容",
  "explanation": "题目解析",
  "answer": "正确答案",
  "type": "其他"
}`, req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint,
		req.Subject, req.Grade, req.Difficulty, req.KnowledgePoint)
}
