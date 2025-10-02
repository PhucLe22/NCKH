from fastapi import FastAPI, UploadFile, File
from services.generator import generate_questions
from services.reviewer import review_exam
from services.extractor import extract_text_from_docx

app = FastAPI(title="AI Agent for Exam System")

@app.post("/api/extract-text")
async def extract(file: UploadFile = File(...)):
    content = await file.read()
    text = await extract_text_from_docx(content)
    return {"text": text}

@app.post("/api/generate-questions")
async def generate(input: dict):
    text = input["text"]
    questions = await generate_questions(text)
    return {"questions": questions}

@app.post("/api/review-exam")
async def review(input: dict):
    exam = input["exam"]
    feedback = await review_exam(exam)
    return {"feedback": feedback}
