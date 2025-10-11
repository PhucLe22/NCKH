from fastapi import UploadFile, File, Body, HTTPException
from typing import Optional
import io
import os
import magic
import docx
import pdfplumber
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_file_type(content: bytes) -> str:
    return magic.from_buffer(content, mime=True)

def extract_text_from_docx(content: bytes) -> str:
    doc = docx.Document(io.BytesIO(content))
    return '\n'.join([p.text for p in doc.paragraphs])

def extract_text_from_pdf(content: bytes) -> str:
    text = []
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        for page in pdf.pages:
            text.append(page.extract_text() or '')
    return '\n'.join(text)

def extract_text_from_file(content: bytes) -> str:
    file_type = get_file_type(content)
    if file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return extract_text_from_docx(content)
    elif file_type == 'application/pdf':
        return extract_text_from_pdf(content)
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file_type}")

async def extractor(text: str):
    prompt = f"Hãy trích xuất các ý chính và kiến thức quan trọng từ đoạn văn sau:\n{text}"
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    return response.text

import json

import json

async def reviewer(key_points: str, questions: str):
    """
    Trả về JSON với cấu trúc chuẩn để tạo Question, Option, Answer.
    key_points: ý chính tổng thể
    questions: nội dung câu hỏi tóm tắt / yêu cầu AI làm chi tiết
    """
    # Đơn giản hóa prompt và làm rõ yêu cầu
    prompt = f"""
Hãy tạo câu hỏi dựa trên nội dung sau đây. 
Yêu cầu: Tạo 3 câu hỏi gồm:
1. 1 câu trắc nghiệm (type: "mcq") với 4 lựa chọn A, B, C, D
2. 1 câu tự luận (type: "essay")
3. 1 câu đúng/sai (type: "true_false")

Nội dung:
{key_points}

Hãy trả về kết quả dưới dạng JSON với cấu trúc:
{{
  "key_points": "tóm tắt ngắn gọn các ý chính",
  "questions": [
    {{
      "content": "Câu hỏi trắc nghiệm",
      "type": "mcq",
      "options": [
        {{"content": "Lựa chọn A", "is_correct": true}},
        {{"content": "Lựa chọn B", "is_correct": false}},
        {{"content": "Lựa chọn C", "is_correct": false}},
        {{"content": "Lựa chọn D", "is_correct": false}}
      ],
      "sampleAnswer": "Giải thích đáp án đúng"
    }},
    {{
      "content": "Câu hỏi tự luận",
      "type": "essay",
      "options": [],
      "sampleAnswer": "Bài làm mẫu ngắn gọn"
    }},
    {{
      "content": "Câu hỏi đúng/sai",
      "type": "true_false",
      "options": [
        {{"content": "Đúng", "is_correct": true}},
        {{"content": "Sai", "is_correct": false}}
      ],
      "sampleAnswer": "Giải thích ngắn gọn"
    }}
  ]
}}

Chỉ trả về JSON, không thêm bất kỳ văn bản nào khác.
    """

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        
        # Debug: In ra phản hồi thô để kiểm tra
        print("Raw response from Gemini:", response.text)
        
        # Thử phân tích JSON
        try:
            # Tìm vị trí bắt đầu và kết thúc của JSON
            json_start = response.text.find('{')
            json_end = response.text.rfind('}') + 1
            json_str = response.text[json_start:json_end]
            
            data = json.loads(json_str)
            
            # Đảm bảo cấu trúc trả về đúng
            if not isinstance(data, dict):
                raise ValueError("Response is not a JSON object")
                
            if "questions" not in data:
                data["questions"] = []
                
            # Lọc bỏ các câu hỏi không hợp lệ
            valid_questions = []
            for q in data.get("questions", []):
                if not isinstance(q, dict):
                    continue
                if "content" not in q or "type" not in q:
                    continue
                if q["type"] == "mcq" and ("options" not in q or len(q["options"]) != 4):
                    continue
                valid_questions.append(q)
                
            return {
                "key_points": data.get("key_points", key_points),
                "questions": valid_questions
            }
            
        except json.JSONDecodeError as e:
            print("Lỗi phân tích JSON từ Gemini:", str(e))
            print("Nội dung lỗi:", response.text)
            return {"key_points": key_points, "questions": []}
            
    except Exception as e:
        print("Lỗi khi gọi Gemini API:", str(e))
        return {"key_points": key_points, "questions": []}


async def generate_questions_from_text(text: str):
    key_points = await extractor(text)
    # Default question prompt if not provided
    question_prompt = """
    Tạo 3 câu hỏi với các dạng sau:
    1. Một câu hỏi trắc nghiệm (MCQ) với 4 lựa chọn A, B, C, D
    2. Một câu hỏi tự luận (essay)
    3. Một câu hỏi đúng/sai (true/false)
    """
    questions = await reviewer(key_points, question_prompt)
    return {
        "key_points": questions.get('key_points', key_points),  # Use the one from reviewer if available
        "questions": questions.get('questions', [])  # Ensure we return the questions array
    }
# Test json:
#{
#  "text": "Haaland is the best striker in the world"
#}
async def generate_questions_from_file(file: Optional[UploadFile] = File(None)):    
    if not file:
        raise HTTPException(status_code=400, detail="Provide a file")

    content = await file.read()
    text_content = extract_text_from_file(content)

    result = await generate_questions_from_text(text_content)
    return result

async def generate_questions_from_text(text: str):    
    if not text:
        raise HTTPException(status_code=400, detail="Provide a text")

    key_points = await extractor(text)
    # Default question prompt if not provided
    question_prompt = """
    Tạo 3 câu hỏi với các dạng sau:
    1. Một câu hỏi trắc nghiệm (MCQ) với 4 lựa chọn A, B, C, D
    2. Một câu hỏi tự luận (essay)
    3. Một câu hỏi đúng/sai (true/false)
    """
    questions = await reviewer(key_points, question_prompt)
    
    return {
        "key_points": questions.get('key_points', key_points),  # Use the one from reviewer if available
        "questions": questions.get('questions', [])  # Ensure we return the questions array
    }


