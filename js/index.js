// button
const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await res.json();
    displayCategories(data.categories);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((categories) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = categories.category;
    categoriesContainer.appendChild(button);
  });
};

// videos
const loadVideos = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    const data = await res.json();
    displayVideos(data.videos);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

// {
//     "category_id": "1001",
//     "video_id": "aaal",
//     "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
//     "title": "Enchanted Harmonies",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
//             "profile_name": "Sophia Williams",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "7.6K",
//         "posted_date": "16450"
//     },
//     "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
// }
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
    class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      <span class="absolute bottom-2 right-3 p-2 bg-black text-white rounded-lg">${video.others.posted_date}</span>
  </figure>
  <div class="py-2 flex gap-2">
    <div>
<img
    class="h-10 w-10 rounded-full object-cover"
      src=${video.authors[0].profile_picture}
      alt="Shoes" />    
      </div>
    <div>
    <h2>${video.title}</h2>
<div class="flex items-center gap-1">
    <p>${video.authors[0].profile_name}</p>
    ${video.authors[0].verified===true ? `<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-5"/>` : ""
}
<div/>
    <p></p>
    </div>
  </div>
        `;
    videoContainer.appendChild(card);
  });
};

loadCategories();
loadVideos();
