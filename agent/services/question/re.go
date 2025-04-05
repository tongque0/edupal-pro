package question

import (
	"encoding/json"
	"regexp"
)

type ExtractedQuestion struct {
	Subject        string
	Grade          string
	Difficulty     string
	KnowledgePoint string
	Question       string
	Answer         string
	Type           string
	OptionsJSON    string // 修改为 string 类型，表示完整 JSON 字符串
	Explanation    string
}

func ExtractFieldsFromJSON(text string) ExtractedQuestion {
	extract := func(pattern string) string {
		re := regexp.MustCompile(pattern)
		matches := re.FindStringSubmatch(text)
		if len(matches) > 1 {
			return matches[1]
		}
		return ""
	}

	optionsMap := make(map[string]string)

	// 提取 options 块
	optBlockRe := regexp.MustCompile(`"options"\s*:\s*\{([^}]+)\}`)
	if optBlockMatch := optBlockRe.FindStringSubmatch(text); len(optBlockMatch) > 1 {
		optionLineRe := regexp.MustCompile(`"([A-D])"\s*:\s*"([^"]+)"`)
		for _, match := range optionLineRe.FindAllStringSubmatch(optBlockMatch[1], -1) {
			optionsMap[match[1]] = match[2]
		}
	}

	// 序列化为 JSON 字符串
	optionsJSONBytes, _ := json.Marshal(optionsMap)
	optionsJSONString := string(optionsJSONBytes)

	result := ExtractedQuestion{
		Subject:        extract(`"subject"\s*:\s*"([^"]+)"`),
		Grade:          extract(`"grade"\s*:\s*"([^"]+)"`),
		Difficulty:     extract(`"difficulty"\s*:\s*"([^"]+)"`),
		KnowledgePoint: extract(`"knowledge_point"\s*:\s*"([^"]+)"`),
		Question:       extract(`"question"\s*:\s*"([^"]+)"`),
		Answer:         extract(`"answer"\s*:\s*"([^"]+)"`),
		Type:           extract(`"type"\s*:\s*"([^"]+)"`),
		Explanation:    extract(`"explanation"\s*:\s*"([^"]+)"`),
		OptionsJSON:    optionsJSONString,
	}

	return result
}
