let aliveIds = new Set();
async function load(){
  const tabs = await chrome.tabs.query({});
  const list = document.getElementById('list');
  const {fc_lang} = await chrome.storage.local.get('fc_lang');
  if(fc_lang==='en') document.getElementById('title').innerText='Choose what STAYS ALIVE';
  
  tabs.forEach(tab=>{
    const div=document.createElement('div'); div.className='tab';
    div.innerHTML=`<span>${tab.title.slice(0,30)}</span><input type="checkbox" data-id="${tab.id}">`;
    const cb=div.querySelector('input');
    cb.onchange=()=> cb.checked?aliveIds.add(tab.id):aliveIds.delete(tab.id);
    list.appendChild(div);
  });
}
document.getElementById('apply').onclick=async()=>{
  const tabs=await chrome.tabs.query({});
  for(const tab of tabs){
    if(!aliveIds.has(tab.id)){
      chrome.tabs.discard(tab.id); // congelado profundo, luego tu lo mejoras a ligero
    }
  }
  window.close();
}
load();