// console.log("tube script are added");

//Created loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) =>
      displayCategories(data.categories).catch((err) => console.log(Error))
    );
};

const removeBtnClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  // console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("btn-color");
  }
};

const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      console.log(activeBtn);
      activeBtn.classList.add("btn-color");
      displayVideos(data.category);
    })
    .catch((err) => console.log(Error));
};

const loadDetails = (videoID) => {
  const uri = ``
};

//Created displayCategories
const categoriesContainer = document.getElementById("categories-btn");
const displayCategories = (categories) => {
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" onclick="loadCategoryVideos(${item.category_id})" class= "btn btn-category">
    ${item.category}
    </button>
    `;
    categoriesContainer.append(buttonContainer);
  });
};

loadCategories();

//Created loadVideos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) =>
      displayVideos(data.videos).catch((err) => console.log(Error))
    );
};

function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

// DisplayVideos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="h-screen flex flex-col gap-5 justify-center items-center ">
    <img src="assets/Icon.png"/>
    <h2 class="text-xl font-bold text-center"> No Content Here This Category
    </h2>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <figure class="relative">
    <img
      src=${video.thumbnail}
      class = "h-full w-full object-cover"
      alt="cards" />

      ${
        video.others.posted_date?.length == 0
          ? ""
          : `
      <span class="absolute text-white p-1 bg-black right-2 bottom-2 text-xs rounded">${getTimeString(
        video.others.posted_date
      )}</span>
        `
      }
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
    <p>
    <button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-sm btn-success" >Details</button>
    </p>
    </div>
  </div>
    `;
    videosContainer.append(card);
  });
};

loadVideos();
