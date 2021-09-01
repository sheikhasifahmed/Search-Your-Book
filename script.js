const container = document.querySelector(".container");

fetch("http://openlibrary.org/search.json?q=javascript")
  .then((res) => res.json())
  .then((data) => showData(data));

function showData(data) {
  const resultFound = data.numFound;
  const books = data.docs;

  console.log("result found:", resultFound);
  console.log(books);
  console.log(books[0].publisher[0]);

  books.forEach((book) => {
    const title = book.title;
    const authorName = book.author_name?.[0];
    const publisher = book.publisher?.[0];
    const firstPublish = book.first_publish_year;
    const coverImage = book.cover_i;

    console.log("Book Title:", title);
    if (authorName !== undefined) console.log("Author:", authorName);
    //   authorName.forEach((author) => console.log("author:", author));
    if (publisher !== undefined) console.log("Publisher:", publisher);
    //   publisher.forEach((publisher) => console.log("publisher:", publisher));
    if (coverImage !== undefined) console.log("First Publsh:", firstPublish);
    if (coverImage !== undefined) console.log("cover code:", coverImage);

    const div = document.createElement("div");
    div.innerHTML = `<img src="https://covers.openlibrary.org/b/id/${coverImage}-M.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${title}</li>
        <li class="list-group-item">${authorName}</li>
        <li class="list-group-item">${publisher}</li>
        <li class="list-group-item">${firstPublish}</li>
      </ul>
    </div>`;
    div.classList.add("card");

    div.setAttribute("style", "width: 18rem");
    container.appendChild(div);
  });

  //   for (let i = 0; i < books.length; i++) {
  //     console.log(i + 1, books[i].publisher);
  //   }
}
