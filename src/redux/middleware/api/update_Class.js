const tokenDongBeo =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw';

export async function updateClass(
  classId,
  className,
  trainer,
  date,
  startedTime,
  endedTime,
  buildingId,
  roomId,
) {
  let data = {
    classId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  };

  const classCccc =  {
    classId: '5fec235139dd753bc70dad44',
    className: 'Buoi fefefeffefedededef1',
    trainer: 'Dương Văn Thủy',
    date: '2019-12-26T00:00:00.000Z',
    startedTime: '10:15',
    endedTime: '10:20',
    buildingId: '5dde35040fdb380da04d1e7a',
    roomId: '5de76fe149e9370938f39ebf',
  };
  console.log('data api: ', data);
  var url = `http://118.69.123.51:5000/fis/api/edu/edit_class`;
  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw',
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return {result};
    })
    .catch((error) => {
      return error;
    });
  console.log(response);
  return response;
}
