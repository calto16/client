import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form =document.querySelector('form');
const chatContainer =document.querySelector('#chat_Container');

let loadInterval;

// this function is for loading
function loader(element)
{
    element.textContent='';
    loadInterval=setInterval(()=>{element.textContent='.';
    if(element.textContent==='....'){
        element.textContent='';
    }
  },300)
}
// this function is for typing one by one letter
function typeText(element,text){
    let index = 0;

    let interval=setInterval(()=>{
        if(index <text.length){
            element.innerHTML+=text.charAt(index);
            index++;
        }
        else
        {
            clearInterval(interval);
        }
    },20)
}
//to generate unique id
function generateUniqueId()
{
    const timeStamp=Date.now();
    const randomNumber=Math.random();
    const hexadecimalString=randomNumber.toString(16);
    return 'id-${timeStamp}-${hexadecimalString}';
}
//AI speaking different 
function chatStripe(isAi,value,uniqueId)
{
   return (
    `
    <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
            <div class="profile">
                <img 
                  src=${isAi ? bot : user} 
                  alt="${isAi ? 'bot' : 'user'}" 
                />
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
        </div>
    </div>
    `
   )
}
//handle submit 
const handleSubmit=async(e)=>{
    e.prventDefault();  //prevent reloading of page
    const data=new FormData(form); 
    //user chatstripe
    chatContainer.innerHTML +=chatStripe(false,data.get('prompt'));

    form.reset();
    //bot chatstripe
    const uniqueId=generateUniqueId();
    chatContainer.innerHTML +=chatStripe(true," ",uniqueId);
    chatContainer.scrollTop= chatContainer.scrollHeight;
    const messageDiv =document.getElementById(uniqueId);
    loader(messageDiv);

}

form.addEventListener('submit',handleSubmit);
form.addEventListener('keyup',(e)=>{
    if(e.keyCode==13){
        handleSubmit(e);
    }
})