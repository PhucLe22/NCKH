import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def extractor(text: str):
    prompt = f"""
    Hãy trích xuất các ý chính và kiến thức quan trọng từ đoạn văn sau:
    {text}
    """
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    return response.text

async def reviewer(key_points: str):
    prompt = f"""
    Dựa trên các ý chính sau, hãy tạo ra bộ câu hỏi:
    - 1 câu trắc nghiệm (MCQ) có 4 đáp án A, B, C, D và chỉ rõ đáp án đúng
    - 1 câu tự luận (Essay)
    - 1 câu Đúng/Sai (True/False)

    Ý chính:
    {key_points}
    """
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    return response.text

# Test thử
async def generate_questions(text: str):
    key_points = await extractor(text)
    questions = await reviewer(key_points)
    return {
        "key_points": key_points,
        "questions": questions
    }
