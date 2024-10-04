// console.log("tube script are added");

//Created loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) =>
      displayCategories(data.categories).catch((err) => console.log(Error))
    );
};

//Created displayCategories
const categoriesContainer = document.getElementById("categories-btn");
const displayCategories = (categories) => {
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoriesContainer.append(button);
  });
};

// {
// category_id: "1001",
// video_id: "aaad",
// thumbnail: "https://i.ibb.co/f9FBQwz/smells.jpg",
// title: "Smells Like Teen Spirit",
// authors: [
// {
// profile_picture: "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
// profile_name: "Oliver Harris",
// verified: true
// }
// ],
// others: {
// views: "5.4K",
// posted_date: "1672656000"
// },
// description: "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// },

//Created loadVideos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) =>
      displayVideos(data.videos).catch((err) => console.log(Error))
    );
};

// DisplayVideos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <figure class="relative">
    <img
      src=${video.thumbnail}
      class = "h-full w-full object-cover"
      alt="cards" />
      <span class="absolute text-white p-1 bg-black right-2 bottom-2 text-xs rounded">${video.others.posted_date}</span>
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class= "h-10 w-10 rounded-full object-cover" src=${
      video.authors[0].profile_picture
    } />
    </div>
    <div>
    <h2 class= "font-bold"> ${video.title}</h2>
    <div class= "flex gap-2 items-center">
    <p class= " text-gray-400">${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified == true
        ? `<img class= "w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`
        : ""
    }
    </div>
    <p></p>
    </div>
  </div>
    `;
    videosContainer.append(card);
  });
};

loadCategories();
loadVideos();
