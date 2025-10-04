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

async def reviewer(key_points: str):
    prompt = f"""
    Dựa trên các ý chính sau, hãy tạo ra bộ câu hỏi:
    - Đặt lại tiêu đề phù hợp với nội dung đầu vào
    - 1 câu trắc nghiệm (MCQ) có 4 đáp án A, B, C, D và chỉ rõ đáp án đúng
    - 1 câu tự luận (Essay)
    - 1 câu Đúng/Sai (True/False)

    Ý chính:
    {key_points}
    """
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)
    return response.text

async def generate_questions_from_text(text: str):
    key_points = await extractor(text)
    questions = await reviewer(key_points)
    return {
        "key_points": key_points,
        "questions": questions
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

    # Call the actual question generation function
    key_points = await extractor(text)
    questions = await reviewer(key_points)
    
    return {
        "key_points": key_points,
        "questions": questions
    }


