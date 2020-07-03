
const weatherForm=document.querySelector('form');
const search= document.querySelector('input')
const message1= document.querySelector('#message1')
const message2= document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const location= search.value;
        message1.innerHTML="Loading....";
        message2.innerHTML="";

    url= '/weather?address='+ location;

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message2.innerHTML=data.error;
            }else{
                message1.innerHTML=data.location;
                message2.innerHTML=data.forecast;
            }
        });
    });

})

