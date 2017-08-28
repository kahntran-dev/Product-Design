////////////////////////// Google font
// font-family default  : Times New Roman
// font-size            : 16px

function SetFonts(fonts) {
    $('#styleFont').append($("<option></option>"));
    for (var i = 0; i < fonts.items.length; i++) {
        $('#styleFont')
            .append($("<option></option>")
                .attr("value", fonts.items[i].family)
                .attr("data-font", fonts.items[i].family)
                .text(fonts.items[i].family));
    }
}

var script = document.createElement('script');
script.src = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDp5VuTDesPe2aVcVnjosFPWIzvj8eEVmk&callback=SetFonts';
document.head.appendChild(script);

$(document).ready(function() {
    console.log($('#testFont').css('font-family'));
    console.log($('#testFont').css('font-size'));
    $("#styleFont").select2({
        placeholder: 'Choose your font'
    });

    $("#styleFont").change(function () {
        // Load a Google font by name.
        var loadFont = function(font) {
            WebFont.load({
                google: {
                    families: [font]
                }
            });
        };
        // Add an event listener for each button.
        // When a button is clicked, get the font name, load the font, and set the new font family.
        var font = $("#styleFont").val();
        loadFont(font);
        $("#testFont").css('font-family',font);
    });
});
