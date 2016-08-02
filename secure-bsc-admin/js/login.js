function checkCookie() {
    console.log('checking cookies');
    var user = getCookie("username");
    var pswd = getCookie("password");
    if (user != "" && pswd != "") {
        console.log("Welcome again " + user);
        username = user;
        password = pswd;
        begin();
    } else {
        $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><input id="submitButton" onclick="setCredentialsFromLogin()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');
        $("#dialog").dialog({
            modal: true,
            draggable: false,
            width: "auto",
            position: { my: "top", at: "center", of: window },
            create: function (event, ui) {
                $(this).css("maxWidth", "300px");
            }

        });


        $(".selector").dialog("open");
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}