
      var platform;
var repository;
var branch;
var node;
var repositoryId = 'e083f23fc5141afe5d22';
var branchId = 'fcf1c3fb882fd40ecf97';
var nodeId = '5b5019bc3683e8438699'; //counter node
var schemaSource;
var optionsSource;
var dataSource;
//var pageIdToLoad = "21f5c2a082ab59f6391b";
var pageIdToLoad;
var username;
var password;






//Switching from local developement to production will require switching config objects

function getPage(callback) {

    //            var config = {
    //            "username": username,
    //            "password": password,
    //            "baseURL": "/proxy"
    //                    }

    var config = {
        "clientKey": "106d6b42-46e7-4f54-9a52-7ceed8e682b4",
        "clientSecret": "It+QMtokAs7f8k5LB3hzgnNGnrR6n99/q3PpxkszdFNIVoU+BD6C7Y68s6S6fNiY2xgkSbBQlCpDJp98AWWPCap2MaNR+F6nk1H44gFAKCA=",
        "username": username,
        "password": password,
        "baseURL": "https://api.cloudcms.com",
        "application": "aab44469e1c69b575aad"
    }


    $("#dialog").dialog("close");

    Gitana.connect(config, function(err) {
        if (err) {
            console.log("Error: " + err + window.location.href);
            //$("#loading-image").css('display', 'none');

            $("#lblLoginLable").html("Username or password are incorrect. Please try again.");
            $("#dialog").dialog("open");
            return;

        }
    }).then(function() {
        platform = this;
        document.cookie = "username=" + username;
        document.cookie = "password=" + password;

        this.readRepository(repositoryId).then(function() {
            repository = this;


            this.readBranch(branchId).then(function() {
                branch = this;
                /*
                        node = this.readNode(pageIdToLoad).then(function () {
                            callback && callback();
  
                        });
                    
                    */

            });
        });
    });
}

var myData = {
    /*"0fb318d0041cb9bd0a13": "test",*/
    "5c5fb3b173fbb1185b4d": "medical",
    "1797d83ab34843aa7ab9": "medical-hmo",
    "52bbfd6e6174e9ca77f7": "credit-union",
    "a652ad09a0a4462255bb": "dental",
    "0db105fc906afd2a8494": "medical-consumer",
    "c2417312cad4bf36cce6": "gesop",
    "abc86af69ab6477794ab": "medical-hsa",
    "487777503a2025303fec": "medical-wellness",
    "f2566b4b4bd18f383249": "medical-ppo",
    "b883c2dca4f15f11019f": "life-accident",
    "ee95b728317147bb79d6": "employee-asst",
    "f5be44d832f9e77d6e85": "leave-absence",
    "7b5c1d7200327b2be55a": "index",
    "b073cb57ee6187722d75": "educational-asst",
    "614e4f07b7874ccb7a08": "maternity-resources",
    "b825e1ee2d42b2767c35": "adoption-asst",
    "e5a18ae298b211790f7e": "workflex",
   // "a3b3f7b9777c2b17d8fe": "open_enrollment",
    "a80289b42b88610a7651": "voluntary",
    "4b948eecd3345ced09bc": "vision",
    "252be9349d6efd0312d4": "new_hires",
    "89d455783efde8f39be7": "myResources",
    "21f5c2a082ab59f6391b": "401k-plan",
    "67a22456135d7668e21a": "fsa-hsa",
    "5c082fcd876af82531a0": "btfyl"
}

$("#myDropdown").alpaca({
    "options": {
        "label": "What page would you like to edit?",
        "type": "select",
        //"dataSource": { "5c5fb3b173fbb1185b4d": "medical.html" }
        "dataSource": myData
    }
});

$("#myDropdown").change(loadPage);

function loadPage() {

    pageIdToLoad = $("#alpaca1").val() || "21f5c2a082ab59f6391b";

    reShowForm();
}




var timer;

function setTimer() {
    timer = setTimeout(function() {
        location.reload();
    }, 900000);
}

function clearTimer() {
    clearTimeout(timer);
}


function reShowForm() {

    clearTimer();
    console.log("Timer Cleared");
    setTimer();
    console.log("Timer Set");

    node = branch.readNode(pageIdToLoad).then(function() {

        if (pageIdToLoad == "89d455783efde8f39be7") {
            showResourcesForm();
        } else if (pageIdToLoad == "a3b3f7b9777c2b17d8fe") {
            showEnrollmentForm();
        } else if (pageIdToLoad == "7b5c1d7200327b2be55a") {
            showHomepageForm();
        } else if (pageIdToLoad == "5c082fcd876af82531a0") {//MF
            showMFForm();
        }else {
            showForm();
        }

    });
}




function showHomepageForm() {

    console.log("show homepage form");
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "homePage",
            "description": "A data type to support the home page.",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name",
                    "readonly": false,
                    "disallow": []
                },
                "tile1": {
                    "type": "string",
                    "title": "tile1",
                    "readonly": false,
                    "disallow": []
                }
            },
            "_parent": "n:node",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function () {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                            //alert(JSON.stringify(value, null, "  "));
                            node.name = value.name;
                            node.tile1 = value.tile1;
                            node.update().then(function () {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "tile1": {
                    "type": "ckeditor"
                }
            }
        }
    });
}

//This function is ready to be implimented when we show modern family
function showMFForm() {

    console.log("show modern family form");
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
    "title": "newMF",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "title": "name"
        },
        "callout1": {
            "type": "string",
            "title": "callout1"
        },
        "callout2": {
            "type": "string",
            "title": "callout2"
        },
        "accordions": {
            "type": "array",
            "title": "accordions",
            "items": {
                "type": "object",
                "title": "accordionItem",
                "properties": {
                    "accordionName": {
                        "type": "string",
                        "title": "Name"
                    },
                    "headerText": {
                        "type": "string",
                        "title": "Header Text"
                    },
                    "items": {
                        "type": "array",
                        "title": "Upper Accordion Items",
                        "items": {
                            "type": "object",
                            "title": "Item",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "title": "Item Name"
                                },
                                "link": {
                                    "type": "string",
                                    "title": "item Link Url"
                                },
                                "description": {
                                    "type": "string",
                                    "title": "Item Description"
                                }
                            }
                        }
                    },
                    "subAccordions": {
                        "type": "array",
                        "title": "subaccordions",
                        "items": {
                            "type": "object",
                            "title": "subaccordion",
                            "properties": {
                                "subAccordionName": {
                                    "type": "string",
                                    "title": "Sub Accordion Name"
                                },
                                "items": {
                                    "type": "array",
                                    "title": "Sub Accordion Items",
                                    "items": {
                                        "type": "object",
                                        "title": "Item",
                                        "properties": {
                                            "name": {
                                                "type": "string",
                                                "title": "Item Name"
                                            },
                                            "link": {
                                                "type": "string",
                                                "title": "item Link Url"
                                            },
                                            "description": {
                                                "type": "string",
                                                "title": "Item Description"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "_parent": "n:node",
    "items": {},
    "description": "custom:newmf0",
    "$schema": "http://json-schema.org/draft-04/schema#"
},
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function () {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                            //alert(JSON.stringify(value, null, "  "));
                            node.name = value.name;
                            node.accordions = value.accordions;
                            node.update().then(function () {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "callout1": {
                    "type": "ckeditor"                     
                },
                "callout2": {
                    "type": "ckeditor"                    
                },
                "accordions": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });
}




function showForm() {
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "Edit Page",
            "type": "object",
            "properties": {
                "body": {
                    "type": "string",
                    "title": "Main Body"
                },
                "links": {
                    "type": "array",
                    "title": "Helpful Links",
                    "items": {
                        "properties": {
                            "company": {
                                "type": "string",
                                "title": "company"
                            },
                            "number": {
                                "type": "string",
                                "title": "number"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            }
                        },
                        "type": "object"
                    }
                },
                "iWantTo": {
                    "type": "array",
                    "title": "Accordion Section 1",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }



                        },
                        "type": "object"
                    }
                },
                "iWantTo2": {
                    "type": "array",
                    "title": "Accordion Section 2",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                            //alert(JSON.stringify(value, null, "  "));
                            node.name = value.name;
                            node.heading = value.heading;
                            node.body = value.body;
                            node.leftImage = value.leftImage;
                            //node.links = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.links)));
                            node.links = value.links;
                            node.accordionSection1Header = value.accordionSection1Header;
                            //node.iWantTo = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo)));                             
                            node.iWantTo = value.iWantTo;
                            node.accordionSection2Header = value.accordionSection2Header;
                            //node.iWantTo2 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo2)));
                            node.iWantTo2 = value.iWantTo2;
                            node.update().then(function() {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "image": {
                    "type": "text"
                },
                "links": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

} //alpaca   





function showResourcesForm() {
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "newResources",
            "type": "object",
            "properties": {
                "generalBenefits": {
                    "type": "array",
                    "title": "generalBenefits",
                    "items": {
                        "type": "object",
                        "title": "item",
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        }
                    }
                },
                "consumerism": {
                    "type": "array",
                    "title": "consumerism",
                    "items": {
                        "type": "object",
                        "title": "item",
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        }
                    }
                },
                /*
                        "communications": {
                            "type": "array",
                            "title": "communications",
                            "items": {
                                "type": "object",
                                "title": "item",
                                "properties": {
                                    "description": {
                                        "type": "string",
                                        "title": "description"
                                    },
                                    "link": {
                                        "type": "string",
                                        "title": "link"
                                    }
                                }
                            }
                        },
                        "enrollment": {
                            "type": "array",
                            "title": "enrollment",
                            "items": {
                                "type": "object",
                                "title": "item",
                                "properties": {
                                    "description": {
                                        "type": "string",
                                        "title": "description"
                                    },
                                    "link": {
                                        "type": "string",
                                        "title": "link"
                                    }
                                }
                            }
                        },*/
                "forms": {
                    "type": "array",
                    "title": "forms",
                    "items": {
                        "type": "object",
                        "title": "item",
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        }
                    }
                }
            },
            "_parent": "n:node",
            "items": {},
            "description": "custom:newresources0",
            "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();//Auto logout feature
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();


                            node.generalBenefits = value.generalBenefits;
                            node.consumerism = value.consumerism;
                            node.communications = value.communications;
                            node.enrollment = value.enrollment;
                            node.forms = value.forms;
                            node.update().then(function() {
                                alert("Resources Form Submitted")
                            });

                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "image": {
                    "type": "text"
                },
                "links": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

} //alpaca 

function showEnrollmentForm() {
    $("#myform").html("");
    $("#myform").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "newOpenEnrollment",
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name"
                },
                "heading": {
                    "type": "string",
                    "title": "heading"
                },
                "body": {
                    "type": "string",
                    "title": "body"
                },
                "leftImage": {
                    "type": "string",
                    "title": "image"
                },
                "links": {
                    "type": "array",
                    "title": "Helpful Links",
                    "maxItems": 30,
                    "items": {
                        "properties": {
                            "linkHeader": {
                                "type": "string",
                                "title": "linkHeader"
                            },
                            "company": {
                                "type": "string",
                                "title": "company"
                            },
                            "number": {
                                "type": "string",
                                "title": "number"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection1Header": {
                    "type": "string",
                    "title": "Accordion Section 1 Header"
                },
                "iWantTo": {
                    "type": "array",
                    "title": "Accordion Section 1",
                    "items": {
                        "properties": {
                            "bullet": {
                                "type": "string",
                                "title": "billetItem"
                            },
                            "description": {
                                "items": {
                                    "type": "string",
                                    "title": "descriptionItem"
                                },
                                "type": "array",
                                "title": "description"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection2Header": {
                    "type": "string",
                    "title": "Accordion Section 2 Header"
                },
                "iWantTo2": {
                    "type": "array",
                    "title": "Accordion Section 2",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection3Header": {
                    "type": "string",
                    "title": "Accordion Section 3 Header"
                },
                "iWantTo3": {
                    "type": "array",
                    "title": "Accordion Section 3",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection4Header": {
                    "type": "string",
                    "title": "Accordion Section 4 Header"
                },
                "iWantTo4": {
                    "type": "array",
                    "title": "Accordion Section 4",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                },
                "accordionSection5Header": {
                    "type": "string",
                    "title": "Accordion Section 5 Header"
                },
                "iWantTo5": {
                    "type": "array",
                    "title": "Accordion Section 5",
                    "items": {
                        "properties": {
                            "description": {
                                "type": "string",
                                "title": "description"
                            },
                            "link": {
                                "type": "string",
                                "title": "link"
                            },
                            "bullets": {
                                "items": {
                                    "type": "string",
                                    "title": "bulletItem"
                                },
                                "type": "array",
                                "title": "bullets"
                            }
                        },
                        "type": "object"
                    }
                }
            },
            "_parent": "n:node",
            "description": "custom:newopenenrollmen0",
            "$schema": "http://json-schema.org/draft-04/schema#"
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                    


                    
                            node.name = value.name;
                            node.heading = value.heading;
                            node.body = value.body;
                            node.leftImage = value.leftImage;

                            //node.links = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.links)));
                            node.links = value.links;

                            node.accordionSection1Header = value.accordionSection1Header;

                            //node.iWantTo = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo)));                             
                            node.iWantTo = value.iWantTo;

                            node.accordionSection2Header = value.accordionSection2Header;

                            //node.iWantTo2 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo2)));
                            node.iWantTo2 = value.iWantTo2;

                            node.accordionSection3Header = value.accordionSection3Header;

                            //node.iWantTo3 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo3)));
                            node.iWantTo3 = value.iWantTo3;

                            node.accordionSection4Header = value.accordionSection4Header;

                            //node.iWantTo4 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo4)));
                            node.iWantTo4 = value.iWantTo4;

                            node.accordionSection5Header = value.accordionSection5Header;

                            //node.iWantTo5 = JSON.parse($.encoder.encodeForHTML(JSON.stringify(value.iWantTo5)));
                            node.iWantTo5 = value.iWantTo5;







                            node.update().then(function() {
                                alert("Open enrollment Form submitted");
                            });

                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca1",
            "fields": {
                "name": {
                    "type": "text"
                },
                "body": {
                    "type": "ckeditor"
                },
                "image": {
                    "type": "text"
                },
                "links": {
                    "options": {
                        "actionBarType": "right"
                    }
                }
            }
        }
    });

} //alpaca   









//This is form upload scripting here--------------------------------------------
var pdfContainerId = 'f2585ff41013540945ab';

function submitForm() {
    var formData = new FormData($("#frmeditSubmitForm5")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmeditSubmitForm5");

    $.ajax({
        type: "POST",
        url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + pdfContainerId + "/attachments/" + ($("#uploadFilenameEdit5").val()).replace(" ", "_") + "/",
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            authorization: authorizationHeader
        },
        success: function (response) {
            //success process here
            var txt = $("#uploadFilenameEdit5").val();
            $("#lnk").html('https://f2472b6e-e1f1-4c52-9eed-f7797ff8e908-hosted.cloudcms.net/static/test.pdf?repository=e083f23fc5141afe5d22&branch=fcf1c3fb882fd40ecf97&node=f2585ff41013540945ab&attachment=' + txt);
            $("#cpy_element").css('display', 'block');

        }
    });
}

//This ends form upload scripting-----------------------------------------------


function checkCookie() {

    if (performance.navigation.type == 1) {
        console.log('page reloaded');
        Gitana.deleteCookie("password", "/secure-bsc-admin");
        Gitana.deleteCookie("username", "/secure-bsc-admin");
        Gitana.deleteCookie("password", "/localhost");
        Gitana.deleteCookie("username", "/localhost");
        Gitana.deleteCookie("password", "/");
        Gitana.deleteCookie("username", "/");

    }

    console.log('checking cookies');
    var user = getCookie("username");
    var pswd = getCookie("password");
    if (user != "" && pswd != "") {
        console.log("Welcome again " + user);
        username = user;
        password = pswd;
        loadPage();
    } else {
        $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><input id="submitButton" onclick="setCredentialsFromLogin()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');
        $("#dialog").dialog({
            modal: true,
            draggable: false,
            width: "auto",
            position: {
                my: "top",
                at: "center",
                of: window
            },
            create: function(event, ui) {
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

function setCredentialsFromLogin() {
    username = $("#txtUsername").val();
    password = $("#txtPassword").val();
    getPage(showForm);
}



function logout() {
    Gitana.deleteCookie("password", "/secure-bsc-admin");
    Gitana.deleteCookie("username", "/secure-bsc-admin");
    Gitana.deleteCookie("password", "/localhost");
    Gitana.deleteCookie("username", "/localhost");
    Gitana.deleteCookie("password", "/");
    Gitana.deleteCookie("username", "/");

    platform.logout();
    open("alpaca2.html", "_self");
}




var fl = document.getElementById('myFileUpload5');

fl.onchange = function(e) {
    var ext = this.value.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'pdf':
            console.log('pdf file type allowed');
            break;
        case 'xls':
            console.log('xls file type allowed');
            break;
        case 'xlsx':
            console.log('xlsx file type allowed');
            break;
        default:
            alert('Only pdf or xls/xlsx files may be uploaded');
            this.value = '';
    }
};


$("#uploadFilenameEdit5").on('change keyup paste mouseup', function() {
    $("#myFileName").html($("#uploadFilenameEdit5").val());
    var tx = "https://3e87873b-2f33-4a70-8478-8a480f81553e-hosted.cloudcms.net/static/test.pdf?repository=f2c3571d7a2955e7f8a1&branch=7935c19b649b9c399528&node=fd1f6aafd2b6e54d0c71&attachment=";
    $("#lnk1").html(tx + $("#uploadFilenameEdit5").val());
});


function copyToClipboard(element) {
    if ($("#uploadFilenameEdit5").val() !== "") {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
}
