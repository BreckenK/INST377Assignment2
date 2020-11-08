
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const locs = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then( data => locs.push(...data))


function findMatches(strMatch, locs) {
    return locs.filter(place => {
        const regex = new RegExp(strMatch, 'gi');
        return place.category.match(regex) || place.name.match(regex)
    });
}


function displayMatches(){
    const node = document.getElementById('data');
    node.innerHTML = "";
    const matches = findMatches(this.value, locs);
    if (this.value == ''){
        node.innerHTML = '<p>Please enter a request<p>'
    }
    else if (matches.length >= 10){
        for (var i = 0; i < 10; i++) {
            let listitem = document.createElement('li');
            listitem.innerHTML = `${matches[i].name}`
            node.appendChild(listitem);
        }
    }
    else if (matches.length == 0){
        node.innerHTML = '<p>data not found<p>'
    }
    else{
        try{
            matches.foreach(appendMatch)
        }
        catch(err){
            node.innerHTML = '<p>data not found<p>';
        }
    }
}

const searchInput = document.querySelector('.search');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);