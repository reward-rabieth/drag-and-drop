const draggable_list=document.getElementById('draggable-list');

const check=document.getElementById('check');

const richestPeople=[
    'Reward Rabieth',
    'bernard Arnault',
    'Jeff Bezos',
    'Bill Gates',
    'Gautam Adan',
    'Warren Buffet',
    'Larry Ellison',
    'Larry Page',
    'Sergey Brin',
    'Steve Ballmer'
];
//store list items
const listItems=[];
let dragStartIndex;
createList();

//insert list items into the Dom
function createList() {
    //loop through the array

    [...richestPeople]

        .map(a=>({value:a, sort:Math.random()}))
            .sort((a,b)=>a.sort-b.sort)
        .map(a=>a.value)
        .forEach((person, index) => {

            const listItem = document.createElement('li');


            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable='true'>
        
      <p class="person-name">${person}</p>
        <i class='fas fa-grip-lines'></i>
        
        </div>
        `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });

addEventListener();
}
function dragStart(){
    // console.log('Event:','dragstart');

    dragStartIndex=+this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
}
function dragEnter(){
    // console.log('Event:','dragenter');
    this.classList.add('over');

}
function dragLeave(){
    // console.log('Event:','dragleave');
    this.classList.remove('over');
}
function dragOver(){
    // console.log('Event:','dragover');
    event.preventDefault();
}
function dragDrop(){
    // console.log('Event:','drop');
    const dragEndIndex=+this.getAttribute('data-index');
   swapItems(dragStartIndex,dragEndIndex);
    this.classList.remove('over');
}
//swap list items that are drag and drop

function  swapItems(fromIndex,toIndex){
   const itemOne=listItems[fromIndex].querySelector('.draggable');
    const itemTwo=listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);



    console.log(itemOne,itemTwo);
}

//check the order of list items
function checkOrder(){
    listItems.forEach((listItem,index)=> {
        const personName = listItem.querySelector('.draggable')
            .innerText.trim();
if( personName !== richestPeople[index]){
    listItem.classList.add('wrong');

}
else{
    listItem.classList.remove('wrong');
    listItem.classList.add('right');
}


    });
}
function addEventListener(){
    const draggable=document.querySelectorAll('.draggable');
    const dragListItem=document.querySelectorAll('.draggable-list li');
    draggable.forEach(draggable=>
    {
        draggable.addEventListener('dragstart', dragStart)
    })
    dragListItem.forEach(item=>{
        item.addEventListener('dragover',dragOver);
    item.addEventListener('drop',dragDrop);
    item.addEventListener('dragenter',dragEnter);
    item.addEventListener('dragleave',dragLeave);

})
}
check.addEventListener('click',checkOrder);