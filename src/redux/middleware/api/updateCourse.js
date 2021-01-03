const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmI2MzU5MzlkZDc1M2JjNzBkYTYzNiIsImlhdCI6MTYwNjI3MzI2MH0.Jljok5QyWLYAIclkR-_TuPpsJBS1O7CNkeq652JqX8I';
const tokenDongBeo =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw';
export async function updateCourse(token, courseOj) {
  const urlApi = 'http://118.69.123.51:5000/fis/api/edu/edit_course';
  let _courseOj = {
    courseName: 'BE A BEST REACT NATIVE DEV',
    trainer: 'KHOAVIPP',
    startedDate: '2020-11-16T00:00:00.000Z',
    endedDate: '2020-12-26T00:00:00.000Z',
    buildingId: '5dde35040fdb380da04d1e7a',
    roomId: '5dde356a30791013bce3f13d',
  };

  const response = await fetch(urlApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenDongBeo,
    },
    body: JSON.stringify(courseOj),
  })
    .then((response) => response.json())
    .then((result) => {
      //console.log('Success:', result);
      return result;
    })
    .catch((error) => {
      console.log('Error:', error);
    });

  return response;
}
