/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const allStudents = document.querySelectorAll('li.student-item');
const studentCount = allStudents.length;
let $pageNumbers = Math.ceil((studentCount) / 10);
let currentPage = 0;

const $hideStudents = () => $(allStudents).hide(); // function hides all the students

//displays 10 students only from the list, based on the current pagination page
function $displayStudents(){
  let $range = (currentPage + 1) *10;//sets the end point of the slice
  currentPage *= 10; //sets the start point of the slice
  if (currentPage > studentCount) {
    $range = studentCount;
  }
  $hideStudents(); //hides all the students
  //displays only 10 students between the startpoint(currentPage) and the endpoint($range)
  $(allStudents).slice(currentPage, $range).show();
}

$displayStudents();


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
// <div class="pagination">
//   <ul>
//     <li>
//       <a class="active" href="#">1</a>
//     </li>

function pagination(){
  $('.page').append(`<div class="pagination"><ul></ul></div>`);//append to div class=page
  for (let i = 0; i < $pageNumbers; i+=1) {
    $('.pagination ul').append('<li><a href="#" value='+ i +'>' + (i+1) +'</a></li>');
  }
  $('.pagination li:first-child a').addClass("active");
}

pagination();

//Event listener on 'click' that sets the active page and returns the page number value
$('.pagination').on("click","a",function (){
  $('.active').removeClass("active");
  $(this).addClass("active");
  currentPage = parseInt($(this).attr("value"), 10);
  console.log(currentPage);
  $displayStudents();
});
//ADDEvent listner  to parent .pagination ul that on click moves class+active to the target
//and sets the currentPage value to be the number clicked

// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
