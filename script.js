function each(coll, f) {
  if (Array.isArray(coll)) {
    for (var i = 0; i < coll.length; i++) {
      f(coll[i], i);
    }
  } else {
    for (var key in coll) {
      f(coll[key], key);
    }
  }
}

function filter(array, predicate) {
  var acc = [];
  each(array, function (element, i) {
    if (predicate(element, i)) {
      acc.push(element);
    }
  });
  return acc;
}

$(document).ready(function () {
  var characters = [];

  if (localStorage.getItem("characters")) {
    characters = JSON.parse(localStorage.getItem("characters"));
  }

  //display func
  function displayCharacters(characters) {
    var characterGrid = $(".characterGrid");
    characterGrid.empty();

    each(characters, function (character, index) {
      var characterCard = $("<div class='character-card'></div>");
      characterCard.append(
        "<img src='" + character.imageUrl + "' alt='Character Image'>"
      );
      characterCard.append("<h3>" + character.name + "</h3>");
      characterCard.append("<p>" + character.description + "</p>");

      //dbl click delete func
      characterCard.dblclick(function () {
        characters.splice(index, 1);
        localStorage.setItem("characters", JSON.stringify(characters));
        displayCharacters(characters);
      });
      
      characterGrid.append(characterCard);
    });
  }

  // Search func
  $("#searchButton").click(function () {
    var searchTerm = $("#search").val().toLowerCase();

    var filteredCharacters = characters.filter(function (character) {
      return character.name.toLowerCase().includes(searchTerm);
    });

    displayCharacters(filteredCharacters);
  });

  // Clear page function
  $("#clearStorageButton").click(function () {
    localStorage.removeItem("characters");
    characters = [];
    displayCharacters(characters);
  });

  //add charac function
  $("form").submit(function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var description = $("#description").val();
    var imageUrl = $("#image-url").val();

    var character = {
      name: name,
      description: description,
      imageUrl: imageUrl,
    };

    characters.push(character);

    localStorage.setItem("characters", JSON.stringify(characters));

    displayCharacters(characters);

    $("#name").val("");
    $("#description").val("");
    $("#image-url").val("");
  });

  displayCharacters(characters);
});
