////////////Handles side navigation interaction/////////////
let sideNavBtn = document.getElementById("side_navbtn");
let isSideNavOpen = false;

function openNav()
{
  if (isSideNavOpen === false)
  {
    document.getElementById("mySidenav").style.width = "250px";
    sideNavBtn.style.transform = `rotate(90deg)`;
    isSideNavOpen = true;
  }
  else
  {
    closeNav();
  }
}

function closeNav()
{
  document.getElementById("mySidenav").style.width = "0";
  sideNavBtn.style.transform = `rotate(0deg)`;
  isSideNavOpen = false;
}
//////////////////////////////////////////////////////////////


////////////Handles dark mode preferences////////////////////

const theme = window.localStorage.getItem("theme");
const themeSwitch = document.getElementById("themeSwitch");
if (theme === "dark")
{
  document.body.classList.add("dark");
  themeSwitch.checked = true;
}

themeSwitch.addEventListener("click", () => 
{
  document.body.classList.toggle("dark");
  if (theme === "dark") {
    window.localStorage.setItem("theme", "light");
  } 
  else {
    window.localStorage.setItem("theme", "dark");
  }
});
//////////////////////////////////////////////////////////////


////////////Closes modal pop up on works pages///////////////
function closeModal()
{
  let modal = document.getElementById("imgModal").style;
  modal.animation = "reduce 0.6s";
  setTimeout(function() {modal.display = "none"}, 500);
}


////////////////////////////Handles slideshow interactions///////////////////////////
function currentSlideshowIndex()
{
  return document.getElementById("mainImg").getAttribute("idx");
}

//Displayes current selected image as the main image
function changeImage(index)
{
  let images = document.querySelector(".thumbnails").querySelectorAll("img");
  const mainImage = document.getElementById("mainImg");
  images[parseInt(mainImage.getAttribute("idx"))].classList.remove("active");
  if (mainImage != null)
  {
    mainImage.src = images[index].src;
    mainImage.setAttribute("idx", index);
    images[index].classList.add("active");
  }
}

////////////Used for slideshow's navigation arrows///////////
//Determines which image in the thumbnail array is the current image when arrays are pressed
function nextImage()
{
  let images = document.querySelectorAll(".thumb");
  let currentIdx = parseInt(document.getElementById("mainImg").getAttribute("idx"));
  currentIdx = (currentIdx + 1) % images.length;
  changeImage(currentIdx);
}

function prevImage()
{
  let images = document.querySelectorAll(".thumb");
  let currentIdx = parseInt(document.getElementById("mainImg").getAttribute("idx"));
  currentIdx = (currentIdx - 1 + images.length) % images.length;
  changeImage(currentIdx);
}
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////





/////////////Handles search functionality of gallery images////////////////
function searchFilter(searchKeys, startDate, endDate)
{
  let containers = document.querySelectorAll(".container"); //Containers store an image + an overlay containing the image description
  let keys = searchKeys.split(" ");

  containers.forEach(image => 
  {
    let title = image.querySelector(".overlay").querySelector(".title").innerText.replace("Title: ", "");
    let description = image.querySelector(".overlay").querySelector(".description").innerText.replace("Description: ", "");

    let check = true;
    //Checks if there the image description or title contain one of the search keys users inputed
    check = keys.some(key => (title.toLowerCase().indexOf(key.toLowerCase()) > -1 || description.toLowerCase().indexOf(key.toLowerCase()) > -1)); //Want to do a case insenesitve search
    console.log(check);
    if (check === true)
    {
      //Checks if image fits within given time period
      const itemDate = new Date(image.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""));
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (startDate === "" && endDate === "")
      {
        image.style.display = "flex";
      }
      else if (itemDate >= start && endDate === "")
      {
        image.style.display = "flex";
      }
      else if (startDate === "" && itemDate <= end)
      {
        image.style.display = "flex";
        
      }
      else if (itemDate >= start && itemDate <= end)
      {
        image.style.display = "flex";
      }
      else
      {
        image.style.display = "none";
      }
    }
    else
    {
      image.style.display = "none";
    }
  });
}
/////////////////////////////////////////////////////////////////////////

/////////////Handles sort functionality of gallery images////////////////
function sortWorks(criteria, order, galleryImages)
{
  let images = Array.from(galleryImages); //Note: all images contain an overlay that holds its information like date, title, and description

  //Handles ascending mode
  if (order === "Ascending")
  {
    //Sort by title
    if(criteria === "Titles")
    {
      images.sort(function(a,b){return a.querySelector(".overlay").querySelector(".title").innerText.localeCompare(b.querySelector(".overlay").querySelector(".title").innerText);});
    }
    //Sort by title then date
    else if (criteria === "TitlesDate")
    {
      images.sort(function(a,b)
      {
        const firstComp = a.querySelector(".overlay").querySelector(".title").innerText.localeCompare(b.querySelector(".overlay").querySelector(".title").innerText); 
        if (firstComp != 0)
        {
          return firstComp;
        }
        return new Date(a.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", "")) - new Date(b.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""));
      });
    
    }
    //Sort by date
    else if (criteria === "Date") 
    {
      images.sort(function(a,b){return new Date(a.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", "")) - new Date(b.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""))});
    }
    //Sort by date then title
    else if (criteria === "DateTitles")
    {
      images.sort(function(a,b)
      {
        const firstComp = new Date(a.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", "")) - new Date(b.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""));
        if (firstComp != 0)
        {
          return firstComp;
        }
        return a.querySelector(".overlay").querySelector(".title").localeCompare(b.querySelector(".overlay").querySelector(".title"));
      });
    }
  }

  //Handles descending mode
  else if (order === "Descending")
  {
    //Sort by title
    if(criteria === "Titles")
    {
      images.sort(function(a,b){return b.querySelector(".overlay").querySelector(".title").innerText.localeCompare(a.querySelector(".overlay").querySelector(".title").innerText);});
    }
    //Sort by title then date
    else if (criteria === "TitlesDate")
    {
      images.sort(function(a,b)
      {
        const firstComp = b.querySelector(".overlay").querySelector(".title").innerText.localeCompare(a.querySelector(".overlay").querySelector(".title").innerText); 
        if (firstComp != 0)
        {
          return firstComp;
        }
        return new Date(b.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", "")) - new Date(a.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""));
      });
    }
    //Sort by date
    else if (criteria === "Date")
    {
      images.sort(function(a,b){return new Date(b.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", "")) - new Date(a.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""))});
    }
    //Sort by date then title
    else if (criteria === "DateTitles")
    {
      images.sort(function(a,b)
      {
        const firstComp = new Date(b.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", "")) - new Date(a.querySelector(".overlay").querySelector(".date").innerText.replace("Date: ", ""));
        if (firstComp != 0)
        {
          return firstComp;
        }
        return b.querySelector(".overlay").querySelector(".title").innerText.localeCompare(a.querySelector(".overlay").querySelector(".title").innerText);
      });
    }
  }

  //Will reinsert images back into page document, changing its order
  images.forEach(image => document.querySelector('.gallery').appendChild(image));
}
/////////////////////////////////////////////////////////////////////////


//////////////Validates contact submission form///////////////////////
//Pretty sure the API used handles it, but just in case....
//Javascript can still be disabled though so might do something else in the future
function validateForm(preventionCheck, name, email, subject, message)
{
  let check = true;

  //If honeypot gets filled, redirect to Not Found page
  if (preventionCheck && preventionCheck.value)
  {
    document.body.innerHTML = `
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>`;
    document.title = "404 - Not Found";
    return false;
  }

  //Check if all fields are provided by the user
  if (name.length === 0)
  {
    document.getElementById("username").placeholder = "Please provide a name\n";
    check = false;
  }
  if (email.length === 0)
  {
    document.getElementById("email").placeholder = "Please provide an email"; 
    check = false;
  }
  if(message.length === 0)
  {
    document.getElementById("message").placeholder = "Please provide a message";
    check = false;
  }
  if (subject.length === 0)
  {
    document.getElementById("subject").placeholder = "Please provide a subject line";
    check = false;
  }

  //Check that provided subject line isn't too long
  if (subject.length > 254)
  {
    document.getElementById("subject").placeholder = "Subject line is too long";
    return false;
  }

  //Check if provided name and email is valid
  if (isNameValid(name) === false || isEmailValid(email) === false)
  {
    return false;
  }

  return check;
}
////////////////////////////////////////////////////////////////////////

///////////////////////Validates email///////////////////////
function isEmailValid(email) 
{
   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    //Check if the email is not too long
    if (email.length > 254)
    {
      document.getElementById("email").placeholder = "Email is too long"; 
      return false;
    }

    //Use a single regex check for the standard email parts
    if (email.match(emailRegex) === null)
    {
      document.getElementById("email").placeholder = "Email is invalid";
      return false;
    }
    else
    {
      //Split once and perform length checks on the parts
      const parts = email.split("@");
      if (parts[0].length > 64)
      {
        document.getElementById("email").placeholder = "Email username is too long";
        return false
      }
      //Perform length checks on domain parts
      const domainParts = parts[1].split(".");
      if (domainParts.some(part => part.length > 63))
      {
        document.getElementById("email").placeholder = "Email domain name is too long";
        return false;
      }
    }

    return true;
}
//////////////////////////////////////////////////////


///////////////Validates name//////////////////////
function isNameValid(name) {
  const nameRegex = /^('?[a-zA-Z]+([-'][a-zA-Z]+)?'?)( '?[a-zA-Z]+([-'][a-zA-Z]+)?'?)?$/;
    
    //Check if the name is not too long
    if (name.length > 127)
    {
      document.getElementById("username").placeholder = "Provided name is too long\n";
      return false;
    }

    //Use a single regex check for the standard name parts
    if (name && name.match(nameRegex) === null)
    {
      document.getElementById("username").placeholder = "Provided name is not valid"; 
      return false;
    }

    return true;
}
/////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

if (window.location.href.endsWith("/index.html") || document.querySelector(".slideshow-container") != null)
{  
  //Fetch list of images mentioned in hightlights file to showcase in the highlight slideshow
  fetch("highlights.json")
    .then(response => response.json())
    .then(images => 
    {
      //Create the main image of the slideshow and initializes it to be the first image fetched from the file
      const mainImg = document.createElement("img");
      mainImg.src= `./images/${images[0].imgFile}`;
      mainImg.alt = `${images[0].imgTitle}`;
      mainImg.loading = "lazy";
      mainImg.setAttribute("idx", "0");
      mainImg.id = "mainImg";
      mainImg.classList.add("mainImg");
      
      document.querySelector(".slideshow-container").appendChild(mainImg);

      //Create the thumbnail images
      images.forEach((image, idx) => 
      {
        const img = document.createElement("img");
        img.classList.add("thumb");
        img.src = `./images/${image.imgFile}`;
        img.alt = image.imgTitle;
        img.loading = "lazy";
        img.setAttribute("idx", idx);
      
        document.querySelector(".thumbnails").appendChild(img);
      });
      
      //All thumbnail images to be clicked for fast view change
      document.querySelectorAll(".thumb").forEach((img, idx) => 
      {
        img.addEventListener("click", () => {changeImage(idx)});
      });

      //Make the first image to be the initial active image
      document.querySelectorAll(".thumb")[0].classList.add("active");
    })

  .catch(error => console.error("Error loading images:", error));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

if (document.URL.includes("works"))
{
  //Fetches list of images mentioned in images file to showcase in the image gallery
  fetch("images.json")
    .then(response => response.json())
    .then(images => 
    {

      //Create the image container
      const gallery = document.getElementById("gallery");
      images.forEach(image => 
      {
        const container = document.createElement("div");
        container.classList.add("container", "show")
        container.id = image.imgFile + "_" + image.imgTitle + "_" + image.imgDate;

        const img = document.createElement("img");
        img.src = `./images/${image.imgFile}`;
        img.alt = image.imgFile;
        img.loading = "lazy";

        //When images are clicked, show an image popup/modal for closer view
        container.addEventListener("click", () => 
        {
          document.getElementById("imgModal").style.display = "block";
          document.getElementById("imgModal").style.animation = "zoom 0.6s";
          document.getElementById("modalImage").src = img.src;
          document.getElementById("imgInfo").textContent = `Title: ${image.imgTitle}\nDate: ${image.imgDate}\nDescription: ${image.imgDescription}`;
        });

        //Create the image overlay and append it and image to image container
        const title = document.createElement("p");
        const date = document.createElement("p");
        const description = document.createElement("p");
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        title.textContent = `Title: ${image.imgTitle}`;
        date.textContent = `Date: ${image.imgDate}`;
        description.textContent = `Description: ${image.imgDescription}`;
        title.classList.add("title");
        date.classList.add("date");
        description.classList.add("description");
        overlay.appendChild(title);
        overlay.appendChild(date);
        overlay.appendChild(description);
        container.appendChild(img);
        container.appendChild(overlay);
        gallery.appendChild(container);
      });
    })
  .catch(error => console.error("Error loading images:", error));

  
  //Perform image search when search submit button is clicked
  const searchButton = document.getElementById("submit-search");
  searchButton.addEventListener("click", () => 
  {
    const searchKeys = document.getElementById("searchKey").value;
    const searchStart = document.getElementById("startDate").value;
    const searchEnd = document.getElementById("endDate").value;

    searchFilter(searchKeys, searchStart, searchEnd);
  })


  //Perform image sort when sort submit button is clicked
  const sortButton = document.getElementById("submit-sort");
  sortButton.addEventListener("click", () => 
  {
    const sortCriteria = document.querySelector('input[name="sortingCriteria"]:checked').value;
    const sortOrder = document.querySelector('input[name="sortingOrder"]:checked').value;
    let images = document.querySelectorAll(".container");
    sortWorks(sortCriteria, sortOrder, images);
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

if (document.URL.includes("contact"))
{
  let form = document.getElementById("contact-form");
  let result = document.getElementById("result");
  let submit = document.getElementById("submit-contact");
 
  submit.addEventListener("click", (e) =>
  {
    e.preventDefault();

    //Perform validation checks on submitted contact form data
    const contactForm = document.querySelector("contact-form");
    const preventionCheck = document.getElementById("preventionCheck").value;
    const name = String(document.getElementById("username").value).trim();
    const email = String(document.getElementById("email").value).trim();
    const subject = String(document.getElementById("subject").value).trim();
    const message = String(document.getElementById("message").value).trim();

    let check = validateForm(preventionCheck, name, email, subject, message);

    //Inform users if email is unable to be sent due to validation issue
    if (check != true)
    {
      result.innerHTML += " Unable to send email."
      form.reset();
      setTimeout(() => {result.style.display = "none";}, 3000);
    }
    else
    {
      //Send data over to web3forms to handle email creation and sending
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', 
        {
          method: 'POST',
          headers: 
          {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: json
        })
          .then(async (response) => 
          {
            let json = await response.json();
            if (response.status === 200)
            {
              result.innerHTML = json.message;
            } 
            else 
            {
              result.innerHTML = json.message;
            }
          })
          .catch(error => 
          {
            result.innerHTML = "Something went wrong!";
          })
          .then(function()
          {
              form.reset();
              setTimeout(() => {result.style.display = "none";}, 3000);
          });
      }
  });
}