$("document").ready(function () {
    $("input[type=checkbox]").removeAttr("checked");
    $("#learningInsititutions").tabs();
    $("ul").sortable({axis:"x", containment:"#learningInsititutions"})
    $("ol").sortable({ axis: "y", containment: "#learningInsititutions" })

    //to remove or delete the content with the checkbox
    $("#learningInsititutions").on("click","input[type=checkbox]",function () {
        $(this).closest("li").slideUp(function () {
            $(this).remove();
        })
    })
    //add school level button
    $("#btnAddSchoolLevel").button().click(function () {
        $("#level-dialog").dialog({
            width: 400, resizable: false, modal: true,
            buttons: {
                //add button of school level
                "Add new Level": function () {
                    var projectName = $("#new-level").val();
                    var replaceSpaces=projectName.split(" ").join("_")
                    $("<li><a href='#" + replaceSpaces + "'>" + projectName + "</a></li>").appendTo("#main");
                    $("<ol id='" + replaceSpaces + "'></ol>").appendTo("#learningInsititutions")
                    $("#learningInsititutions").tabs("refresh");
                    var tabCount = $("#learningInsititutions .ui-tabs-nv li").length;
                    $("#learningInsititutions").tabs("option", "active", tabCount - 1);
                    $("#new-level").val("");
                    $(this).dialog("close");
                },
                //cancel button of school level 
                "Cancel": function () {
                    $("#new-level").val("");
                    $(this).dialog("close");
                }
            }
        });
    });

    //add shool button
    $("#btnAddSchool").button().click(function () {
        $("#school-dialog").dialog({
            width: 400, resizable: false, modal: true,
            buttons: {
                "Add a School": function () { 
                    $("#learningInsititutions").tabs("refresh");
                    var activeTab = $("#learningInsititutions").tabs("option", "active");
                    var title = $("#main>li:nth-child(" + (activeTab + 1) + ")>a").attr("href");
                    var popup = $("#learningInsititutions " + title).append("<li><input type='checkbox'>" + $("#new-school").val() + "</li>").sortable();
                    $("#new-school").val("");
                    $(this).dialog("close");
                },
                "cancel": function () {
                    $("#new-school").val("");
                    $(this).dialog("close");
                }
            }
        }
        )
    })
})