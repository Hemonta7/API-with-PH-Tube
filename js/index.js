// time function
function timeFormat(time){
    const day = parseInt(time/86400);
    let remaining = time%86400;
    const hour=parseInt(time/3600);
    remaining=remaining%3600;
    const minute=parseInt(remaining/60)
    remaining=remaining%60;
    return `${day} day ${hour} hr ${minute} min ${remaining} sec ago`
}

// remove class 
const removeClass=()=>{
  const buttons = document.getElementsByClassName("active-btn");
  for(const button of buttons){
    button.classList.remove("active")
  }
}

// load details
const loadDetails= async(videoId)=>{
try {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json();
  displayDetails(data.video);
} catch (err) {
  console.log("ERROR:", err);
}
}

const displayDetails=(video)=>{
console.log(video)
const detailsContainer = document.getElementById("modal-content");
detailsContainer.innerHTML = `
<img src=${video.thumbnail} />
<p>${video.description}</p>                       
`;
document.getElementById("customModal").showModal();
}

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

const loadCategoriesVideo=async(id)=>{
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    );
    const data = await res.json();
    removeClass();
    const activebtn=document.getElementById(`${id}`)
    activebtn.classList.add("active")
    console.log(activebtn,id);
    displayVideos(data.category);
  } catch (err) {
    console.log("ERROR:", err);
  }
}

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((categories) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="${categories.category_id}" onclick="loadCategoriesVideo(${categories.category_id})" class="btn active-btn">${categories.category}</button>
    `;
    categoriesContainer.appendChild(buttonContainer);
  });
};

// videos
const loadVideos = async (searchText = "") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
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
  videoContainer.innerHTML="";
  if(videos.length==0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML=`
    <div class="flex flex-col min-h-screen w-full items-center mt-32 gap-5">
    <img src="./assets/icon.png"/>
    <h2 class="text-center text-xl font-bold">No content here in this category</h2>
    </div>
    `;
  }else{
    videoContainer.classList.add("grid");
  }
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
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute bottom-2 right-3 p-2 bg-black text-white rounded-lg text-[8px] lg:text-[10px]">${timeFormat(
              video.others.posted_date
            )}</span>`
      }
      
  </figure>
  <div class="py-2 flex gap-2">
    <div>
<img
    class="h-10 w-10 rounded-full object-cover"
      src=${video.authors[0].profile_picture}
      alt="Shoes" />    
      </div>
    <div>
    <h2 class="font-bold text-base">${video.title}</h2>
<div class="flex items-center gap-1">
    <p>${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified === true
        ? `<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-5"/>`
        : ""
    }
<div/>
</div>
</div>
<p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm bg-[#FF1F3D] text-white">Details</button></p>
        `;
    videoContainer.appendChild(card);
  });
};

document.getElementById("search-input").addEventListener("keyup",(e)=>{
 loadVideos(e.target.value);
});

loadCategories();
loadVideos();
