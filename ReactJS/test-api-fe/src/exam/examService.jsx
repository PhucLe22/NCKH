const API_URL = 'http://localhost:3001';

export const getExams = async () => {
  try {
    console.log('Fetching exams from:', `${API_URL}/exam`);
    const response = await fetch(`${API_URL}/exam`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Không thể tải danh sách đề thi';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error('Error response:', errorData);
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Received exam data:', data);
    
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object') {
      const possibleArray = Object.values(data).find(Array.isArray);
      return possibleArray || [];
    }
    
    return [];
  } catch (error) {
    console.error('Lỗi khi tải danh sách đề thi:', error);
    throw error;
  }
};