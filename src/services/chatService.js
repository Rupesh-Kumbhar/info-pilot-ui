import { askQuestion,getQuestionCount } from "../api/chatApi";

const chatService = {
  askQuestion: (question, documentId) => {
    return askQuestion(question, documentId);
  },
  getQuestionCount: () => {
    return getQuestionCount();
  },
};

export default chatService;