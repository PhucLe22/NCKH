import io
import magic
import docx
import pdfplumber
from fastapi import HTTPException

def get_file_type(content: bytes) -> str:
    """Detect file type using magic numbers"""
    file_type = magic.from_buffer(content, mime=True)
    return file_type

def extract_text_from_docx(content: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        doc = docx.Document(io.BytesIO(content))
        return '\n'.join([paragraph.text for paragraph in doc.paragraphs])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing DOCX file: {str(e)}")

def extract_text_from_pdf(content: bytes) -> str:
    """Extract text from PDF file"""
    try:
        text = []
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                text.append(page.extract_text() or '')
        return '\n'.join(text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing PDF file: {str(e)}")

def extract_text_from_file(content: bytes) -> str:
    """
    Extract text from a file (PDF or DOCX)
    
    Args:
        content: Binary content of the file
        
    Returns:
        str: Extracted text from the file
        
    Raises:
        HTTPException: If file type is not supported or there's an error processing the file
    """
    try:
        file_type = get_file_type(content)
        
        if file_type == 'application/pdf':
            return extract_text_from_pdf(content)
        elif file_type in ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                          'application/msword']:
            return extract_text_from_docx(content)
        else:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported file type: {file_type}. Only PDF and DOCX files are supported."
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error extracting text from file: {str(e)}"
        )
