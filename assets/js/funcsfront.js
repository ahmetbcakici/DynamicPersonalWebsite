function turkishto(string) {
    string = string.toLowerCase();
    var letters = {
        "ı": "i",
        "ü": "u",
        "ö": "o",
        "ğ": "g",
        "ş": "s",
        "ç": "c"
    };
    return string.replace(/(([İIŞĞÜÇÖıüöğşç]))/g, function(letter) {
        return letters[letter];
    });
}

function ToSeoUrl(url) {
    let new_url = turkishto(url);

    // make the url lowercase         
    var encodedUrl = new_url.toString().toLowerCase();

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-');

    if (encodedUrl.charAt(encodedUrl.length - 1) == "-") {
        encodedUrl = encodedUrl.substring(0, encodedUrl.length - 1);
    }

    $(".seourl").val(encodedUrl);
}