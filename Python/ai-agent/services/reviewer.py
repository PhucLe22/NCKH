import os
import json
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def review_exam_with_gemini(exam_data: dict) -> dict:
    """
    Review an exam using Gemini AI and return structured JSON feedback.
    """
    prompt = f"""
        Bạn là chuyên gia giáo dục. Hãy đánh giá câu trả lời trong đề thi dưới đây.

        Exam title: {exam_data.get('exam_title')}
        Subject: {exam_data.get('subject')}
        Các câu hỏi: {exam_data.get('questions')}

        Yêu cầu:
        1. Đánh giá từng câu hỏi: đúng/sai, comments, suggestions, explanation
        2. Tổng số câu đạt yêu cầu
        3. Tính overall_score (0-100)
        4. Summary ngắn gọn

        Chỉ trả JSON hợp lệ, không thêm văn bản gì khác.
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Lọc JSON trong trường hợp Gemini trả thêm text khác
        match = re.search(r'\{.*\}', text, flags=re.DOTALL)
        if not match:
            raise ValueError("Gemini trả về không chứa JSON hợp lệ")

        review_result = json.loads(match.group())
        return review_result

    except json.JSONDecodeError:
        raise ValueError("Gemini trả về JSON nhưng không hợp lệ")
    except Exception as e:
        raise ValueError(f"Lỗi khi review bằng Gemini: {str(e)}")



# Sample body exam data
# exam_data = {
#     "exam_title": "Đề thi môn Toán",
#     "subject": "Toán",
#     "questions": [
#         {
#             "question": "Câu hỏi 1",
#             "answer": "Đáp án 1",
#             "question_type": "multiple_choice",
#             "difficulty": "easy"
#         },
#         {
#             "question": "Câu hỏi 2",
#             "answer": "Đáp án 2",
#             "question_type": "short_answer",
#             "difficulty": "medium"
#         },
#         {
#             "question": "Câu hỏi 3",
#             "answer": "Đáp án 3",
#             "question_type": "true_false",
#             "difficulty": "hard"
#         }
#     ]
# }
