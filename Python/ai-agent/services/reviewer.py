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
# {
#   "exam": {
#     "exam_title": "Đề kiểm tra chương 1 - Kiểm thử phần mềm",
#     "subject": "Kiểm thử phần mềm",
#     "questions": [
#       {
#         "question": "Mục tiêu chính của kiểm thử phần mềm là gì?",
#         "answer": "Phát hiện càng nhiều lỗi càng tốt trong thời gian kiểm thử xác định trước.",
#         "question_type": "multiple_choice",
#         "difficulty": "easy"
#       },
#       {
#         "question": "Kiểm thử hộp trắng (White Box Testing) tập trung vào điều gì?",
#         "answer": "Phủ các lệnh, nhánh và điều kiện bên trong mã nguồn.",
#         "question_type": "multiple_choice",
#         "difficulty": "medium"
#       },
#       {
#         "question": "Trong mô hình RUP, công đoạn nào liên quan đến việc hiện thực và kiểm thử phần mềm?",
#         "answer": "Construction (xây dựng).",
#         "question_type": "multiple_choice",
#         "difficulty": "medium"
#       },
#       {
#         "question": "Kiểm thử hồi qui (Regression Testing) được thực hiện khi nào?",
#         "answer": "Khi phần mềm có sự hiệu chỉnh hoặc nâng cấp để đảm bảo các chức năng cũ vẫn hoạt động đúng.",
#         "question_type": "multiple_choice",
#         "difficulty": "hard"
#       },
#       {
#         "question": "Vì sao cần tự động hóa kiểm thử phần mềm?",
#         "answer": "Để giảm chi phí, hạn chế lỗi do con người và tăng tốc độ kiểm thử.",
#         "question_type": "multiple_choice",
#         "difficulty": "medium"
#       }
#     ]
#   }
# }