let myLeads = []
let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let saveBtn = document.getElementById("save-btn")
let deleteOne = document.getElementById("delete-one")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

    if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage
        render(myLeads)
    }

saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!myLeads.includes(tabs[0].url)) {
            myLeads.unshift(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href="${leads[i]}"> ${leads[i]} </a></li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    if (!myLeads.includes(inputEl.value))
        myLeads.unshift(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})


