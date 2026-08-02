import { askQuestion } from "../api/chatApi";

const chatService = {
  askQuestion: (question, documentId) => {
    return askQuestion(question, documentId);
  },
};

export default chatService;