let linkArray = [];
let saveInput = document.getElementById("save-input");
let saveTab = document.getElementById("save-tab");
let deleteAll = document.getElementById("delete-all");
let linkSection = document.querySelector(".link-section");

function onScriptLoad() {
  const savedTabs = localStorage.getItem("tabsArray");
  if (!savedTabs) return;
  else {
    linkArray=JSON.parse(savedTabs)
    linkArray.forEach(function (link) {
      console.log(link)
      let anchorEl=document.createElement('a')
      anchorEl.href=link
      anchorEl.textContent=link
      anchorEl.target="_blank"
      linkSection.appendChild(anchorEl);
    });
  }
}
onScriptLoad();
function saveToLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}
function delFromLocalStorage() {
  localStorage.clear();
}
deleteAll.addEventListener("click", function () {
  linkSection.innerHTML=''
  linkArray.splice(0, linkArray.length);
  delFromLocalStorage();
});

saveInput.addEventListener("click", function () {
  let input = document.getElementById("input-el").value;
  if (input === "") {
    return;
  }
  let link = document.createElement("a");
  link.href = input;
  link.textContent = input;
  linkArray.push(input);
  linkSection.appendChild(link);
  document.getElementById("input-el").value = "";
  console.log(linkArray)
  saveToLocalStorage("tabsArray", JSON.stringify(linkArray));
});
saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let linkHref = tabs[0].url;
    let link = document.createElement("a"); 
    link.href = linkHref; 
    link.target = "_blank";
    link.textContent = linkHref; 
    linkArray.push(linkHref);
    linkSection.appendChild(link);
  });
  saveToLocalStorage("tabsArray", JSON.stringify(linkArray));
});
