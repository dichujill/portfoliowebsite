const form= document.getElementById('form')
const name1=document.getElementById('name')
const email=document.getElementById('email')
const subject= document.getElementById('subject')
const message= document.querySelector('textarea[name="message"]')

form.addEventListener('submit',e => {
    e.preventDefault();
    validateInputs()
})

const setError= (element,message)=>{
    const inputControl=element.parentElement
    const errorDisplay=inputControl.querySelector('.error')

    errorDisplay.innerText=message
    inputControl.classList.add('error')
    inputControl.classList.remove('success')
}

const setSuccess=element=>{
    const inputControl=element.parentElement
    const errorDisplay=inputControl.querySelector('.error')

    errorDisplay.innerText=''
    inputControl.classList.add('success')
    inputControl.classList.remove('error')
}

const isValidEmail=email=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs=()=>{
    const nameValue=name1.value.trim()
    const emailValue=email.value.trim()
    const subjectValue=subject.value.trim()
    const messageValue=message.value.trim()

    let flag=false

    if (nameValue === '') {
        setError(name1, 'Username is required');
        flag = false;
    }else if(/\d/.test(nameValue)){
        setError(name1,'Cannot contain numbers')
        flag=false
    } else if (nameValue.startsWith(' ') || nameValue.endsWith(' ')) {
        setError(name1, 'Username cannot start or end with spaces');
        flag = false;
    } else {
        setSuccess(name1);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        flag = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Enter a valid email');
        flag = false;
    } else {
        setSuccess(email);
    }

    if (subjectValue.split(' ').length < 5) {
        setError(subject, 'subject must contain at least 5 words');
        flag = false;
    } else {
        setSuccess(subject);
    }

    if (messageValue.split(' ').length < 5) {
        setError({ name: 'message' }, 'Message must contain at least 5 words');
        flag = false;
    } else {
        setSuccess({ name: 'message' });
    }

    if(flag){
        form.submit()
    }

}