export async function post_change_class(
  courseId,
  className,
  trainer,
  date,
  startedTime,
  endedTime,
  buildingId,
  roomId,
) {
  let data = {
    courseId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  };
  console.log(data);
  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    'http://10.86.224.37:5001/api/edu/create_new_class',
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      return error;
    });
  return response;
}
