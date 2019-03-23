function set_path() {
    let body = document.querySelector('body');
    let div = document.querySelector('div');
    div.classList.add('path');
    body.insertBefore(div, body.firstChild);

    let path = document.querySelector('.path');
    let location_origin = window.location.origin.toString();
    let location_pathname = window.location.pathname.toString();
    let location_array = new Array();

    location_array.push(location_origin);
    location_array = location_array.concat(location_pathname.split('/').filter(function (el) { return el != "" }));
    for (var i = 0; i < location_array.length; i++) {
        let link = document.createElement('a');
        link.innerText = location_array[i]
        if (location_array[i] == location_array[0]) { }
        else if (location_array[i] == location_array[1]) {
            location_array[i] = location_array[i - 1] + location_array[i];
        }
        else {
            location_array[i] = location_array[i - 1] + "/" + location_array[i];
        }
        link.href = location_array[i]
        path.appendChild(link);
        if (i != (location_array.length - 1)) {
            let divider = document.createElement('span');
            divider.innerText = " > ";
            path.appendChild(divider);
        }
    }
}
