const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmI2MzU5MzlkZDc1M2JjNzBkYTYzNiIsImlhdCI6MTYwNjI3MzI2MH0.Jljok5QyWLYAIclkR-_TuPpsJBS1O7CNkeq652JqX8I';
const tokenDongBeo =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw';
export async function removeCourse(courseId) {
  const response = await fetch(
    'http://118.69.123.51:5000/fis/api/edu/delete_course?courseId=' +
      `${courseId}`,
    {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + tokenDongBeo},

      // body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      return data;
    })
    .catch((error) => {
      console.log('Error:', error);
    });

  return response;
}
// 'http://118.69.123.51:5000/fis/api/edu/get_all_course'
