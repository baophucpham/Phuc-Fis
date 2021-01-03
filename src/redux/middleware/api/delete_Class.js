const tokenDongBeo =   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYTNiMzY0ZTY1OTVhM2JkM2JiOTFmMCIsImlhdCI6MTYwNjM3NDM1OH0.B8tk_Ua9s1sh0Y3pdszUZ_CFS7r175csNyaH7aUFTrw';
export async function deleteClass(classId){
    const response = await fetch(
        'http://10.86.224.37:5001/api/edu/delete_class?classId=' + `${classId}`,
        {
            method:'GET',
            headers:{Authorization:'Bearer ' + tokenDongBeo},
        },
    )
    .then((response)=>response.json())
    .then((data)=>{
        console.log('Success:',data);
        return data;
    })
    .catch((error)=>{
        console.log('Error:', error);
    });
    return response;
}