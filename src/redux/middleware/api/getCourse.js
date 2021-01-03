const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYmI2MzU5MzlkZDc1M2JjNzBkYTYzNiIsImlhdCI6MTYwNjI3MzI2MH0.Jljok5QyWLYAIclkR-_TuPpsJBS1O7CNkeq652JqX8I';

export async function getCourse(){
    const response = await fetch('http://10.86.224.37:5001/api/edu/get_all_course',{
        method:'GET',
        headers:{Authorization:'Bearer '+ token},
    })
    .then((response)=>response.json())
    .then((data)=>{return data;})
    .catch((error)=> {console.log('Error:',error);});
    return response;
}