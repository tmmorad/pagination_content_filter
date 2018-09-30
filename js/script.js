/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Tamer Morad
******************************************/

const thePage = document.querySelector('div.page');
const $allStudents = document.querySelectorAll('li.student-item');
const studentCount = $allStudents.length;
let $visibleStudents;
let currentPage = 0;
let searchResults = false;
let noResults = false;
let shownStudents;
const $pageNumbers = (theNum) => Math.ceil((theNum) / 10);//function calculates how many pages needed
const $hideStudents = () => $($allStudents).hide(); // function hides all the students

//Appends Search input field to the DOM
$('div.page-header').append(
  `<div class="student-search">
    <input placeholder="Search for students...">
    <button>Search</button>
  </div>`
);

//displays 10 students only from the list, based on the current pagination page
function $displayStudents(topRange, searchResults){
  if (searchResults === true) {//pagination if the user is entering a search
    let $range = (currentPage + 1) *10;//sets the end point of the slice
    let startRange = currentPage;
    startRange *= 10; //sets the start point of the slice
    if (startRange > topRange) {
      $range = topRange;
    }
    $hideStudents(); //hides all the students

    //displays only 10 students between the startpoint(currentPage) and the endpoint($range)
    $($visibleStudents).slice(startRange, $range).show();
    console.log("Displaying " + $('li.student-item:visible').length + " students."); //logs visible students

  } else {

    let $range = (currentPage + 1) *10;//sets the end point of the slice
    let startRange = currentPage;
    startRange *= 10; //sets the start point of the slice
    if (startRange > topRange) {
      $range = topRange;
    }
    $hideStudents(); //hides all the students

    //displays only 10 students between the startpoint(currentPage) and the endpoint($range)
    $($allStudents).slice(startRange, $range).show();
    console.log("Displaying " + $('li.student-item:visible').length + " students.");  //logs visible students
  }
}//end of $displayStudents

$displayStudents(studentCount, searchResults);//calls fn.$displayStudents for initial page load



function pagination(arr){

  if ((document.querySelector('.pagination')) !== null){
    let pagination = document.querySelector('div.pagination')
    thePage.removeChild(pagination);
  }
  //adds pagination to DOM
  $('.page').append(`<div class="pagination"><ul></ul></div>`);
  if (noResults === true) {
    $('.pagination').append('<h3>Sorry there are no Students that match your Search!</h3>');
  } else {
    for (let i = 0; i < $pageNumbers(arr); i+=1) {
      $('.pagination ul').append('<li><a href="#" value='+ i +'>' + (i+1) +'</a></li>');
    }
    $('.pagination li:first-child a').addClass("active");
  }
}//end of fn.pagination

pagination(studentCount);//calls fn.pagination on initial page load

//Event listner for search field
$('.student-search').on('click keyup', function(){
  let $entered = $('input').val();
  //on submit searchs for students names that match entered user query
  if($entered ==="" || $entered === 'reset'){
    searchResults = false;
    currentPage = 0;//Resets the page as to avoid weird outputs
    pagination(studentCount);
    $displayStudents(studentCount, searchResults)

  } else {
    $hideStudents();
    $('li.student-item h3').each(function (index, element){
      let $student = $(this).text();
      if($student.includes($entered)){
        $(this).parent().parent().show();
        searchResults = true;
        noResults = false;
      }
    });//end of .each() loop
    $visibleStudents = $('li.student-item:visible');
    shownStudents = $visibleStudents.length;
    if (shownStudents === 0) {
      noResults = true;
      pagination();
    }
    $displayStudents(shownStudents, searchResults);
    pagination(shownStudents);

  }//end of if $entered ELSE statement

//Event listner for fn.pagination for changing pages of search results
  $('.pagination ul').on("click","a",function (){
    $('.active').removeClass("active");
    $(this).addClass("active");
    currentPage = parseInt($(this).attr("value"), 10);
    //For testing and tracking purposes
    console.log('The current page selected value is:' + currentPage + ' The page number is: ' + (currentPage + 1));
    if (searchResults === true) {
      $displayStudents(shownStudents, searchResults);
    } else {
      $displayStudents(studentCount, searchResults);
    }
    return
  });
});//Parent Event Listener (.pagination ul) End

//Event listener on 'click' that sets the active page and returns the page number value
$('.pagination ul').on("click","a",function (){//added ul
  $('.active').removeClass("active");
  $(this).addClass("active");
  currentPage = parseInt($(this).attr("value"), 10);
  //For testing and tracking purposes
  console.log('The current page selected value is:' + currentPage + ' The page number is: ' + (currentPage + 1));
  if (searchResults === true) {
    $displayStudents(shownStudents, searchResults);
  } else {
    $displayStudents(studentCount, searchResults);
  }
  return
});
