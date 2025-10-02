def review_exam(exam):
    return [{"question": q["question"], "comment": "OK"} for q in exam["questions"]]
