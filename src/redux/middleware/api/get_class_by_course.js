export async function get_class_by_course(courseId){
    var url = "http://118.69.123.51:5000/fis/api/edu/get_class_by_course?courseId="+`${courseId}`;
    var requestOptions ={
        method: 'GET',
        headers:{
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTZmNTFlMGNkMWExNmI2MGIyZjk0ZiIsImlhdCI6MTYwODc5ODg4NX0.3ayslg8vxg7QuLBnm1Tk55AgtQOrwdwb3zbxQMXB1G0',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        //body:'',
    }
    const response = await fetch( url,requestOptions)
                        .then(response=>response.json())
                        .then(result=>{
                            return result;
                        }).catch(error=>{
                            return error;
                        });
    return response;
}
