from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from pydantic import BaseModel
from typing import List, Optional, Literal
from services.generator import generate_questions_from_text, generate_questions_from_file
from services.reviewer import review_exam_with_gemini
from services.extractor import extract_text_from_file

app = FastAPI(title="AI Agent for Exam System")

class Question(BaseModel):
    question: str
    answer: Optional[str]
    question_type: Literal["multiple_choice", "short_answer", "true_false", "essay"]
    difficulty: Literal["easy", "medium", "hard"]

class ExamRequest(BaseModel):
    exam_title: str
    subject: str
    questions: List[Question]

class ReviewExamRequest(BaseModel):
    exam: ExamRequest

class GenerateQuestionsRequest(BaseModel):
    text: str

class ExtractTextResponse(BaseModel):
    text: str
    file_type: str
    file_name: str

@app.post("/api/extract-file", response_model=ExtractTextResponse)
async def extract_file(file: UploadFile = File(...)):
    """
    Extract text from uploaded file (supports PDF and DOCX)
    """
    try:
        content = await file.read()
        text = extract_text_from_file(content)
        return {
            "text": text,
            "file_type": file.content_type,
            "file_name": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.post("/api/review-exam")
async def review_exam_endpoint(request: ReviewExamRequest):
    try:
        exam_data = request.exam.dict()
        feedback = await review_exam_with_gemini(exam_data)
        return feedback
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-questions-from-text")
async def generate_questions_endpoint_from_text(request: GenerateQuestionsRequest):
    try:
        questions = await generate_questions_from_text(text = request.text)
        return {"questions": questions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-questions-from-file")
async def generate_questions_endpoint_from_file(
    file: UploadFile = File(None), 
    ):
    print("hello")
    try:
        if file:
            return await generate_questions_from_file(file=file)
        else:
            raise HTTPException(status_code=400, detail="Vui lòng gửi file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



