package question

import (
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
	Options        map[string]string
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

	result := ExtractedQuestion{
		Subject:        extract(`"subject"\s*:\s*"([^"]+)"`),
		Grade:          extract(`"grade"\s*:\s*"([^"]+)"`),
		Difficulty:     extract(`"difficulty"\s*:\s*"([^"]+)"`),
		KnowledgePoint: extract(`"knowledge_point"\s*:\s*"([^"]+)"`),
		Question:       extract(`"question"\s*:\s*"([^"]+)"`),
		Answer:         extract(`"answer"\s*:\s*"([^"]+)"`),
		Type:           extract(`"type"\s*:\s*"([^"]+)"`),
		Options:        make(map[string]string),
	}

	// 提取 options 块
	optBlockRe := regexp.MustCompile(`"options"\s*:\s*\{([^}]+)\}`)
	if optBlockMatch := optBlockRe.FindStringSubmatch(text); len(optBlockMatch) > 1 {
		optionLineRe := regexp.MustCompile(`"([A-D])"\s*:\s*"([^"]+)"`)
		for _, match := range optionLineRe.FindAllStringSubmatch(optBlockMatch[1], -1) {
			result.Options[match[1]] = match[2]
		}
	}

	return result
}
