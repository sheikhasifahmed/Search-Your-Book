const container = document.getElementById("container");

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
    const firsPublish = book.first_publish_year;
    const coverImage = book.cover_i;

    console.log("Book Title:", title);
    console.log("Authors array:", authorName);
    //   authorName.forEach((author) => console.log("author:", author));
    console.log("Publishers array:", publisher);
    //   publisher.forEach((publisher) => console.log("publisher:", publisher));
    console.log("First Publsh:", firsPublish);
    console.log("cover code:", coverImage);

    const p = document.createElement("p");
    p.innerText = `Author: ${authorName}  Publisher: ${publisher}`;
    container.appendChild(p);
  });

  //   for (let i = 0; i < books.length; i++) {
  //     console.log(i + 1, books[i].publisher);
  //   }
}
