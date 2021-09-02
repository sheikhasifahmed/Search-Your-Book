const container = document.querySelector(".books-container");
const totalSearch = document.getElementById("total-search");
const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const errorMsg = document.getElementById("error-msg");
const loader = document.getElementById("loader");

/**************************************************
 **calling API on clicking the search button**
 ***************************************************/
btnSearch.addEventListener("click", function () {
  container.textContent = "";
  totalSearch.textContent = "";
  loader.style.display = "block";
  const search = inputSearch.value;
  if (search === "") {
    loader.style.display = "none";
    errorMsg.style.display = "block";
    errorMsg.innerText = "No input detected! Nothing to search.";
  } else {
    errorMsg.style.display = "none";
    fetch(`https://openlibrary.org/search.json?q=${search}`)
      .then((res) => res.json())
      .then((data) => showData(data))
      .catch((error) => {
        console.log(error);
        totalSearch.style.display = "none";
        errorMsg.style.display = "block";
        loader.style.display = "none";
      });
  }
});

/**************************************************
 **function declaring for showing the results**
 ***************************************************/

const showData = (data) => {
  console.log(data);
  const resultFound = data.numFound;
  const books = data.docs;
  console.log(data, books);

  // error handling for no result found

  if (resultFound !== 0)
    totalSearch.innerText = `Showing ${books.length} results of total ${resultFound} for "${inputSearch.value}"...`;
  else {
    errorMsg.style.display = "block";
    errorMsg.innerText = `Sorry! No book Found for "${inputSearch.value}"`;
  }
  /**********************************************************
   **Looping the array containing the books information**
                 using forEach method
   **********************************************************/

  books.forEach((book) => {
    const title = book.title;
    const authorName = book.author_name?.[0] || "Not found";
    const publisher = book.publisher?.[0] || "Not found";
    const firstPublish = book.first_publish_year || "Not found";
    const coverImage = book.cover_i;

    /*Determining the image Source.
    books those have no original image get the image from local source*/

    let imageSource;
    if (coverImage !== undefined)
      imageSource = `https://covers.openlibrary.org/b/id/${coverImage}-M.jpg`;
    else imageSource = "images/bookCover.png";

    /**************************************************
     **creating div to show every book found**
     ***************************************************/
    const div = document.createElement("div");
    div.innerHTML = `<img src=${imageSource} class="card-img-top" alt="..." />
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Title: <b>${title}</b></li>
        <li class="list-group-item">Author: <b>${authorName}</b></li>
        <li class="list-group-item">Publisher: <b>${publisher}</b></li>
        <li class="list-group-item">First Published: <b>${firstPublish}</b></li>
      </ul>
    </div>`;
    div.classList.add("card");
    div.setAttribute("style", "width: 18rem");
    container.appendChild(div);
  });
  loader.style.display = "none";
  inputSearch.value = "";
};
