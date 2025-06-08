const showalertbtn = document.getElementById('showalert');
const customalert = document.getElementById('customalert');
const confirmbtn = document.getElementById('confirmbtn');

showalertbtn.addEventListener('click',function(){
    customalert.style.display = 'flex';
});

confirmbtn.addEventListener('click',function(){
    customalert.style.display = 'none';
});