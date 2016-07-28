

var repository;
var branch;
var node;
var bodyContent;

platform = Gitana.connect({
    "clientKey": "8d62dd52-986e-43fd-95de-28ecf6c16220",
    "clientSecret": "8x1R+NPOcM0aHnF5hdRdeDvdRKEcySCVApOYuKaispvTbgIZtU8FqnV2x+dgeP7XUPzy9wOoZsq1HtqenoAE/WLxWIggmk6NFEWvHKw3gCs=",
    "username": "4ebc658d-3b31-449e-b7f6-1795ffd6f645",
    "password": "eHDhg1hASrBwICaNJtkcCY341ujwYSPk5g06jiMZpio/lb8fnK1KjtdQ7YlGuIuPMybwNbfZdonLGuiBtRJKDvcDFnXgEySVE1/p51Yz/UI=",
    "baseURL": "https://api.cloudcms.com",
    "application": "e9f8bd45b14e7119d625"
}, function () {

    repository = platform.readRepository("e083f23fc5141afe5d22").then(function () {

        branch = repository.readBranch("fcf1c3fb882fd40ecf97").then(function () {

            node = branch.readNode(pageId).then(function () {
                bodyContent = this.body;

                fillImage();
                fillBody();
                fillIWantTo();
                fillLinks();
                showPage();

            });

        });
    });
});

function fillImage() {
    var img = 'http://aonhewitt.cloudcms.net/proxy/repositories/' + 'e083f23fc5141afe5d22' + '/branches/' + 'fcf1c3fb882fd40ecf97' + '/nodes/' + pageId + '/attachments/' + 'default' + '?GITANA_TICKET=' + encodeURIComponent(platform.getDriver().authInfo.ticket);
    
    $("#pageImage").attr("src", img);
   
}

function fillBody() {
    $("#indexContent").html(bodyContent);
}


function fillIWantTo() {


    try {
        if (node.iWantTo.length >= 1) {
            $("#section1Header").html(node.accordionSection1Header);
            $("#accordionSection1").css("display", "block");
            for (i = 0; i < node.iWantTo.length; i++) {
                if (node.iWantTo[i].link != undefined) {
                    $("#iWantTo").append('<li><a href="' + node.iWantTo[i].link + '" target="_blank">' + node.iWantTo[i].description + '</a></li>');
                    for (j = 0; j < node.iWantTo[i].bullets.length; j++) {
                        $("#iWantTo").append('&#8226;' + " " + node.iWantTo[i].bullets[j] + "<br/>");
                    }
                } else {
                    $("#iWantTo").append('<li>' + node.iWantTo[i].description + '</li>');
                }
            }
        }

        if (node.iWantTo2.length >= 1) {
            $("#section2Header").html(node.accordionSection2Header);
            $("#accordionSection2").css("display", "block");
            for (i = 0; i < node.iWantTo2.length; i++) {
                if (node.iWantTo2[i].link != undefined) {
                    $("#iWantTo2").append('<li><a href="' + node.iWantTo2[i].link + '" target="_blank">' + node.iWantTo2[i].description + '</a></li>');


                    //$("#iWantTo2").append("<ul>");
                    for (j = 0; j < node.iWantTo2[i].bullets.length; j++) {
                        //$("#iWantTo2").append('<li>' + node.iWantTo2[i].bullets[j] + '</li>');
                        $("#iWantTo2").append('&#8226;' + " " + node.iWantTo2[i].bullets[j] + "<br/>");
                    }
                    //$("#iWantTo2").append("</ul>");




                } else {
                    $("#iWantTo2").append('<li>' + node.iWantTo2[i].description + '</li>');
                }
            }
        }

    } //end of try
    catch (err) {

    }
    finally {

    }


}
function fillLinks() {
    for (i = 0; i < node.links.length; i++) {
        if (node.links[i].header != undefined) {

            $("#links").append('<li><a href="' + node.links[i].link + '" target="_blank">' + node.links[i].header + '<br />' + node.links[i].company + '<br />' + node.links[i].number + '</a></li>');

        } else {
            if (node.links[i].number != null) {
                var myUrl = 'https://aonhewitt.cloudcms.net/proxy/repositories/e083f23fc5141afe5d22/branches/fcf1c3fb882fd40ecf97/nodes/f2585ff41013540945ab/attachments/' + node.links[i].link + '?GITANA_TICKET=' + encodeURIComponent(platform.getDriver().authInfo.ticket);
    
                //$("#links").append('<li><a href="' + node.links[i].link + '" target="_blank">' + node.links[i].company + '<br />' + node.links[i].number + '</a></li>');
                $("#links").append('<li><a href="' + myUrl + '" target="_blank">' + node.links[i].company + '<br />' + node.links[i].number + '</a></li>');
            
            } else {

            
            $("#links").append('<li><a href="' + node.links[i].link + '" target="_blank">' + node.links[i].company + '<br />' +  '</a></li>');
           
            }

        }


    }
}




function showPage() {
    $("#myBody").css("display", "block");

}