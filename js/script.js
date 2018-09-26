/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
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

//displays 10 students only from the list, based on the current pagination page
function $displayStudents(topRange, searchResults){
  if (searchResults === true) {
    let $range = (currentPage + 1) *10;//sets the end point of the slice
    currentPage *= 10; //sets the start point of the slice
    if (currentPage > topRange) {
      $range = topRange;
    }
    $hideStudents(); //hides all the students
    //displays only 10 students between the startpoint(currentPage) and the endpoint($range)
    $($visibleStudents).slice(currentPage, $range).show();
  } else {
    let $range = (currentPage + 1) *10;//sets the end point of the slice
    currentPage *= 10; //sets the start point of the slice
    if (currentPage > topRange) {
      $range = topRange;
    }
    $hideStudents(); //hides all the students
    //displays only 10 students between the startpoint(currentPage) and the endpoint($range)
    $($allStudents).slice(currentPage, $range).show();
  }
}//end of $displayStudents

$displayStudents(studentCount, searchResults);


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
// <div class="pagination">
//   <ul>
//     <li>
//       <a class="active" href="#">1</a>
//     </li>

//pass argument studentCount or
function pagination(arr){

  if ((document.querySelector('.pagination')) !== null){
    let pagination = document.querySelector('div.pagination')
    thePage.removeChild(pagination);
    console.log('removeChild triggered');//for testing
  }
  //adds pagination to DOM
  $('.page').append(`<div class="pagination"><ul></ul></div>`);
  if (noResults === true) {
    alert("No results match your search! Append this to the HTML")
  } else {
    for (let i = 0; i < $pageNumbers(arr); i+=1) {
      $('.pagination ul').append('<li><a href="#" value='+ i +'>' + (i+1) +'</a></li>');
    }
    $('.pagination li:first-child a').addClass("active");
  }
}//end of fn.pagination

pagination(studentCount);

//Insert Search input field to the DOM
$('div.page-header').append(
  `<div class="student-search">
    <input placeholder="Search for students...">
    <button>Search</button>
  </div>`
);

//Event listner for search field
$('.student-search').on('click keyup', function(){
  let $entered = $('input').val();
  //on submit searchs for students names that match entered user query
  if($entered ==="" || $entered === false){
    searchResults = false;
    $displayStudents(studentCount, searchResults);
    pagination(studentCount);
  } else {
    $hideStudents();
    $('li.student-item h3').each(function (index, element){
      let $student = $(this).text();
      if($student.includes($entered)){
        $(this).parent().parent().show();
        searchResults = true;
      }
    });//end of .each() loop
    console.log('exited loop');
    $visibleStudents = $('li.student-item:visible');
    shownStudents = $visibleStudents.length;
    if (shownStudents === 0) {
      noResults = true;
      pagination();
      return noResults = false;
    }
    $displayStudents(shownStudents, searchResults);
    pagination(shownStudents);

  }//end of if $entered ESLE statement

  $('.pagination').on("click","a",function (){
    $('.active').removeClass("active");
    $(this).addClass("active");
    currentPage = parseInt($(this).attr("value"), 10);
    console.log(currentPage);
    if (searchResults === true) {
      $displayStudents(shownStudents, searchResults);
    } else {
      $displayStudents(studentCount, searchResults);
    }
  });
});//Event End

//Event listener on 'click' that sets the active page and returns the page number value
$('.pagination').on("click","a",function (){
  $('.active').removeClass("active");
  $(this).addClass("active");
  currentPage = parseInt($(this).attr("value"), 10);
  console.log(currentPage);
  if (searchResults === true) {
    $displayStudents(shownStudents, searchResults);
  } else {
    $displayStudents(studentCount, searchResults);
  }
});
//ADDEvent listner  to parent .pagination ul that on click moves class+active to the target
//and sets the currentPage value to be the number clicked

// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
