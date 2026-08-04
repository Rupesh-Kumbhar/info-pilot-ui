import { askQuestion,getQuestionCount,getLastQuestion } from "../api/chatApi";

const chatService = {
  askQuestion: (question, documentId) => {
    return askQuestion(question, documentId);
  },
  getQuestionCount: () => {
    return getQuestionCount();
  },
  getLastQuestion: () => {
    return getLastQuestion();
  }
};

export default chatService;