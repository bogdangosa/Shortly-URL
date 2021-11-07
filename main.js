const ShortenBtn = document.getElementById("shorten-btn");
const LinkInput = document.getElementById("link-input");
const NoLinkMsg = document.getElementById("no-link-msg");


ShortenBtn.addEventListener('click',()=>{
    AddLink(LinkInput.value);
})


const AddLink =  async (link_value)=>{
    const result = await Getdata(link_value);
    console.log(result);
    LinkInput.value="";

    if(!result.ok){
        LinkInput.classList.add("link-input-error");
        
        NoLinkMsg.classList.remove("hide");
        return;
    }

    NoLinkMsg.classList.add("hide");
    LinkInput.classList.remove("link-input-error");
    let link_container = document.createElement('div');
    link_container.classList.add("shortened-link-container");

    let original_link = document.createElement('p');
    original_link.innerText=link_value;
    original_link.classList.add("original-link");
    link_container.appendChild(original_link);

    let div = document.createElement('div');
    div.classList.add("new-link-container")

    let new_link = document.createElement('a');
    new_link.setAttribute("href",result.result.full_short_link2);
    new_link.innerHTML=result.result.full_short_link2;
    new_link.target="_blank";
    new_link.classList.add("new-link");
    div.appendChild(new_link);

    let CopyBtn = document.createElement('p');
    CopyBtn.classList.add("copy-btn");
    CopyBtn.classList.add("btn");
    CopyBtn.innerText="Copy"
    CopyBtn.addEventListener('click',()=>{
        navigator.clipboard.writeText(original_link.innerText);
    })

    div.appendChild(CopyBtn);
    link_container.appendChild(div);

    const LinksContainer = document.getElementById("shortened-links");
    LinksContainer.appendChild(link_container);
}


const Getdata = async (link_value)=>{
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${link_value}`);
    const result = await response.json();
    return result;
}