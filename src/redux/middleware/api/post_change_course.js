export default async function post_change_course(
  courseId,
  courseName,
  trainer,
  startedDate,
  endedDate,
  buildingId,
  roomId,
) {
  let data = {
    courseId,
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  };
  console.log(data);
  var url = `http://118.69.123.51:5000/fis/api/edu/edit_course`;
  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return {result};
    })
    .catch((error) => {
      return error;
    });
  console.log(response);
  return response;
}
