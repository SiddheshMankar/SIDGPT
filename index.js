const API_KEY="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"
const submitbutton=document.querySelector("#sub");
const OutputElement=document.querySelector('#output');
const inputElement=document.querySelector('input');
const historyElement=document.querySelector('.history')
const btn=document.querySelector('button');
function changeInput(value){
  const inputElement = document.querySelector('input')
  inputElement.value=value;
}

async function getmessage(){
   console.log("ckicked");
   const options={
    method:'POST',
    headers:{
        'Authorization':`Bearer ${API_KEY}`,
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        model: "gpt-3.5-turbo",
    messages: [
     
      {
        role: "user",
        content: inputElement.value
      }
    ],
    max_tokens:100
    })
   }
   try{
     const response=   await fetch('https://api.openai.com/v1/chat/completions',options)
        const data=await response.json()
        console.log(data);
        OutputElement.textContent=data.choices[0].message.content;
        if(data.choices[0].message.content){
            const pElement=document.createElement('p');
            pElement.textContent=inputElement.value
            pElement.addEventListener('click',()=>changeInput( pElement.textContent))
            historyElement.append(pElement);
        }


    }
    catch(error){  
        console.error(error);
    }
}
submitbutton.addEventListener('click',getmessage)

function clearInput(){
    inputElement.value='';
}
btn.addEventListener('click',clearInput);