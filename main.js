window.onload = function() {
  
  if(localStorage.getItem(localStorage.getItem('login'))=='true'){
    
    oplatil();
  } 
  else{
    
  }
  if(localStorage.getItem('redDone')=='true'){
      login();
      localStorage.setItem('redDone',false);
    }
    
   document.querySelector('.btn').value ='Pagare: '+localStorage.getItem('deneg')+'€' ;
   if(localStorage.getItem('zaplatil')=='true'){
    loader();
    localStorage.removeItem('zaplatil');
   }
   filterContent();
};
function clearAll() {
    document.querySelectorAll("input[type=checkbox]").forEach(function(checkbox) {
        checkbox.checked = false; 
    });
    year.value = "ALL";
    document.querySelectorAll('main>div').forEach(function(div){
        div.style.display = 'flex'
    })
    
  }

function filterContent() {
    
    var selectedTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(function(input) {
        return input.value;
    });
    var selectedYear = document.getElementById('year').value;

    
    document.querySelectorAll('.movie').forEach(function(element) {
        var elementType = element.getAttribute('data-type');
        var elementYear = element.getAttribute('data-year');

        if ((selectedTypes.length === 0 || selectedTypes.includes(elementType))&&
        (selectedYear === 'ALL' || elementYear === selectedYear)) {
            
            element.style.display = 'flex';
        } else {
            
            element.style.display = 'none';
        }
    });

    
    
}
var drop = document.getElementById("dropdownContent")
var modal = document.getElementById("modal");
var closeBtn = document.getElementsByClassName("close")[0];
var modalTitle = document.getElementById("modalTitle");
var form = document.getElementById("form");
var submitButton = document.getElementById("submitButton");



function openModal(title, action, buttonText,text) {
let pas = document.getElementById('password')
let log = document.getElementById('username')

pas.value = "";
log.value = "";

document.querySelector('.input-box').style.border = 'none'
log.style.borderColor = 'white'

modalTitle.textContent = title;
  form.action = action;
  submitButton.textContent = buttonText;
  modal.style.display = "block";
  let swit = document.getElementById('swit')
  let link = document.getElementById('link')
  link.removeEventListener('click', login);
  link.removeEventListener('click', regist);
  
  if(text=='accedi'){
    swit.textContent= "Se hai già un account";
    link.textContent = text;
    link.addEventListener('click',login);
  }
  else{
    swit.textContent= "Se non hai ancora un account";
    link.textContent = text;
    link.addEventListener('click',regist);
  }
}

function regist() {
  openModal("Registrati", "index.html", "Registrati","accedi");
  localStorage.setItem('reg',true);
  document.querySelector('.passvalid').style.display = 'block';
  
}

function login() {
  openModal("Accedi", "index.html", "Accedi","registrati");
  localStorage.setItem('reg',false);
  document.querySelector('.passvalid').style.display = 'none';
  
}

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if(event.target == drop){
    drop.style.display = 'none'
  }
}
document.addEventListener("DOMContentLoaded",function(){
  let loginName = localStorage.getItem('login');
  loginName = loginName.charAt(0).toUpperCase() + loginName.slice(1);
  if(loginName!==null){
      
      document.querySelector('.form').style.display = 'none'
      document.querySelector('.user').style.display = "block"
      document.getElementById('userna').textContent = loginName;
  }
})

function toggleDropdown() {
  var dropdown = document.getElementById("dropdownContent");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

function logOut(){
  document.querySelector('.user').style.display = "none"
  document.querySelector('.form').style.display = 'block'
  localStorage.removeItem('login');
  localStorage.removeItem('loginEst');
  window.location.reload();
}

let est = document.querySelector('.est');
let net = document.querySelector('.net');

function validLogin(event) {
  fetch('/login.php', {
      method: 'POST',
      body: JSON.stringify({ 
          pepsi: event.target.value,
          start: 1
      }), 
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
   
    if(localStorage.getItem('reg')=='true'){
      
      if (data.loginValid === true) {
          
          document.getElementById('username').style.borderColor = 'rgb(126, 1, 1)';
          est.style.display = 'block';
          net.style.display = 'none';
          localStorage.setItem('zach',false);
      } else {
          
          document.getElementById('username').style.borderColor = '#2ed573';
          est.style.display = 'none';
          net.style.display = 'block';
          localStorage.setItem('zach',true);
      }
  }
})
  .catch(error => console.error('Errore:', error));
  
} 
function validPass(event){
  let ar = [false,false,false,false];

  if(document.querySelector('.passvalid').style.display == 'none'){
    return;
  }

  if((event.target.value).length>8){
    document.getElementById("dacar").style.display = 'inline';
    document.getElementById("netcar").style.display = 'none';
    if(ar[0]==false){
      ar[0]=true;
    }

  }
  else{
    document.getElementById("netcar").style.display = 'inline';
    document.getElementById("dacar").style.display = 'none';
    if(ar[0]==true){
      ar[0]=false;
    }
  }
  if(/\d/.test(event.target.value)){
    document.getElementById("danum").style.display = 'inline';
    document.getElementById("netnum").style.display = 'none';
    if(ar[1]==false){
      ar[1]=true;
    }
  }
  else{
    document.getElementById("netnum").style.display = 'inline';
    document.getElementById("danum").style.display = 'none';
    if(ar[1]==true){
      ar[1]=false;
    }
  }
  if(/[a-z]/.test(event.target.value)&&/[A-Z]/.test(event.target.value)){
    document.getElementById("damai").style.display = 'inline';
    document.getElementById("netmai").style.display = 'none';
    if(ar[2]==false){
      ar[2]=true;
    }
   
  }
  else{
    document.getElementById("netmai").style.display = 'inline';
    document.getElementById("damai").style.display = 'none';
    if(ar[2]==true){
      ar[2]=false;
    }
  }
  if(/\s/.test(event.target.value)) {
    document.getElementById("netspa").style.display = 'inline';
    document.getElementById("daspa").style.display = 'none';
    
    if(ar[3]==true){
      ar[3]=false;
    }
  } 
  else {
    document.getElementById("daspa").style.display = 'inline';
    document.getElementById("netspa").style.display = 'none';
    if(ar[3]==false){
      ar[3]=true;
    }
  }

  if(ar.every(element => element === true)) {
    
    document.querySelector('.input-box').style.border = '2px solid #2ed573';
  } else {
    
    document.querySelector('.input-box').style.border = '2px solid rgb(126, 1, 1)';
  }
}
function validatePassword() {
 
  if(document.getElementById('modalTitle').textContent=='Registrati'){
    
  var password = document.getElementById("password").value;
 
  if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)|| localStorage.getItem('zach')=='false') {

      
      return false; 
  }
  localStorage.setItem("redDone",true);
  return true;
} 
else{
  
  return true;
}
}

let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = function(){
        if(password.type == "password"){
            password.type = "text";
            eyeicon.src = "eye-open.png";
        }else{
            password.type = "password";
            eyeicon.src = "eye-close.png"
        }
}




function addSlash(input) {
  var value = input.value.replace(/\D/g, '');
  var formattedValue = '';
  if (value.length > 2) {
    formattedValue += value.substr(0, 2) + '/';
    if (value.length >= 3) {
      formattedValue += value.substr(2, 2);
    }
  } else {
    formattedValue = value;
  }
  input.value = formattedValue;
}

function zaplatil(){
localStorage.setItem('zaplatil',true);
}

function xz(n){
  if(localStorage.getItem('loginEst')=='true'||true){
    localStorage.setItem('deneg',n);
    window.location.href = "bank.html";
  }
  else{
    regist();
  }
}

function loader(event){
  
  document.getElementById("loading-overlay").style.display = "flex";
  setTimeout(function() {
    document.querySelector(".lds-dual-ring").style.display = "none";
    document.getElementById("checkmark").style.display = "block";
    document.getElementById("completion-text").style.display = "block";
    document.getElementById("loading-text").style.display = "none";
    document.addEventListener("click", closeLoadingScreen);
  }, 3000);
  localStorage.setItem(localStorage.getItem('login'),true);
  
}

function closeLoadingScreen() {
  document.getElementById("loading-overlay").style.display = "none";
  document.removeEventListener("click", closeLoadingScreen);
  window.location.href = "indexhtml";
}

function oplatil(){
  document.getElementById('list').style.display = 'none';
  document.querySelectorAll('.onwatch').forEach(function(e){
    e.style.display = 'none'
  })
  document.querySelectorAll('.watch').forEach(function(e){
    e.style.display = 'block'
  })
}