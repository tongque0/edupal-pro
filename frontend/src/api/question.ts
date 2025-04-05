import request from "@/utils/request";

/**
 * 生成题目（异步发送到后台处理）
 * @param params - 生成参数对象
 * @param params.subjects - 学科列表，如 ["数学", "英语"]
 * @param params.grades - 年级列表，如 ["七年级", "八年级"]
 * @param params.difficulties - 难度列表，如 ["简单", "中等"]
 * @param params.types - 题型列表，如 ["单选题", "填空题"]
 * @param params.knowledge_points - 知识点列表，如 ["一次方程", "现在完成时"]
 * @param [params.source_id] - 可选，来源批次 ID（将通过 query 传递）
 */
export const genQuestions = async (params: {
  subjects: string[];
  grades: string[];
  difficulties: string[];
  types: string[];
  knowledge_points: string[];
  source_id?: string;
}) => {
  try {
    const { source_id, ...body } = params;
    const res = await request.post("/question/gen", body, {
      params: source_id ? { source_id } : {}, // ✅ 通过 query 传递 source_id（如果有）
    });
    return res.data;
  } catch (error) {
    console.error("题目生成失败:", error);
    throw error;
  }
};

/**
 * 获取题目列表（可根据多个条件筛选）
 * @param params - 查询参数
 * @param [params.user_id] - 用户 ID，用于获取某用户创建的题目
 * @param [params.subject] - 学科筛选，如 "数学"
 * @param [params.grade] - 年级筛选，如 "八年级"
 * @param [params.difficulty] - 难度筛选，如 "困难"
 * @param [params.type] - 题型筛选，如 "单选题"
 * @param [params.source_id] - 来源批次 ID，用于获取某次批量生成的题
 * @param [params.page] - 页码，从 1 开始；传 -1 表示不分页
 * @param [params.page_size] - 每页条数，默认 10，最大 100
 */
export const getQuestions = async (params: {
  user_id?: number;
  subject?: string;
  grade?: string;
  difficulty?: string;
  type?: string;
  source_id?: string;
  page?: number;
  page_size?: number;
}) => {
  try {
    const res = await request.get("/question/get", {
      params,
    });
    return res.data; // 题目列表
  } catch (error) {
    console.error("获取题目失败:", error);
    throw error;
  }
};

/**
 * 获取题目追踪记录
 * @param source_id - 来源批次 ID，后端会返回该批次生成的所有追踪记录
 */
export const getTrace = async (source_id: string) => {
  try {
    const res = await request.get(`/question/trace/${source_id}`);
    return res.data; // 追踪记录列表
  } catch (error) {
    console.error("获取追踪记录失败:", error);
    throw error;
  }
};

export const newQuestion = async (params: {
  content: string; // 题目内容
  type: string; // 题型，如 "单选题"
  subject: string;
  grade: string; // 年级，如 "八年级"
  difficulty: string; // 难度，如 "简单"
  options?: string; // 选项列表，如 ["A", "B", "C", "D"]
  answer?: string; // 答案
  explanation?: string; // 解析
  source_id?: string; // 来源批次 ID（可选）
}) => {
  try {
    const res = await request.post("/question/new", params);
    return res.data; // 新创建的题目
  } catch (error) {
    console.error("创建题目失败:", error);
    throw error;
  }
};

export const updateQuestion = async (params: {
  id: number; // 题目 ID
  content?: string; // 题目内容
  type?: string; // 题型，如 "单选题"
  subject?: string;
  grade?: string; // 年级，如 "八年级"
  difficulty?: string; // 难度，如 "简单"
  options?: string; // 选项列表，如 ["A", "B", "C", "D"]
  answer?: string; // 答案
  explanation?: string; // 解析
  source_id?: string; // 来源批次 ID（可选）
}) => {
  try {
    const res = await request.put(`/question/update/${params.id}`, params);
    return res.data; // 更新后的题目
  } catch (error) {
    console.error("更新题目失败:", error);
    throw error;
  }
}
