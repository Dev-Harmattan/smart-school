$(function(){

  let prevButton =  document.getElementById('prevButton'); 
  let nextButton = document.getElementById('nextButton');
  
  prevButton.addEventListener('click', function(){
    nextPrev(-1)
  });

  nextButton.addEventListener('click', function(){
    nextPrev(1);
  })
 
  var currentTab = 0;
  showTab(currentTab);

  function showTab(n){
    var pages = document.getElementsByClassName('page');

    pages[n].style.display = 'block';
    

    if(n == 0){
      document.getElementById('prevButton').style.display= 'none';
    }else{
      document.getElementById('prevButton').style.display= 'inline';
    }

    if(n == (pages.length - 1)){
      document.getElementById('nextButton').innerHTML = 'Submit'
    }else{
      document.getElementById('nextButton').innerHTML = 'Next'
    }

    showSteps(n)
  }


  function nextPrev(n){

    var pages = document.getElementsByClassName('page');
    if(n == 1 && !validateForm()){
      return false;
    }

    pages[currentTab].style.display = 'none';
    currentTab = currentTab + n;

    if(currentTab > pages.length - 1){
      document.getElementById('regForm').submit();
      document.getElementById('prevNextButtonWrapper').style.display = 'none';
      document.getElementById('loader-wrapper').style.display = 'block';
      document.querySelector('.form-progress').style.display = 'none';

      return false;
    }
    showTab(currentTab);
  }


  function validateForm() {

    var pages, inputs, textarea, fileInput, select, valid = true;
    pages = document.getElementsByClassName('page');
    inputs = pages[currentTab].getElementsByTagName("input");
    select = pages[currentTab].getElementsByTagName('select');
    textarea = pages[currentTab].getElementsByTagName('textarea');
    fileInput = pages[currentTab].getElementsByTagName('file');

    for(let i = 0; i < inputs.length; i++){
      if(inputs[i].value == '' ){
        valid = false;
      }
    }

    if(select.length > 0){
      if(select[0].value == ''){
        valid = false;
      }
    }

    if(textarea.length > 0){
      if(textarea[0].value == ''){
        valid = false;
      }
    }

    if(fileInput.length > 0){
      var filePath =  fileInput.value;
      var allowExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if(!allowExtensions.exec(filePath)){
        fileInput.value = '';
        valid = false;
      }
    }

    return valid;

  }
})

function showSteps(n){
  let progressSteps = document.getElementsByClassName('bullet');
  for(let i = 0; i < progressSteps.length; i++){
    progressSteps[i].className =  progressSteps[i].className.replace(' active', '');
  }

  progressSteps[n].className += ' active';
}