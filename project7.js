// Project 7: jQuery Interactive Student Portal & Table Manipulation
$(document).ready(function(){

    $("#change,#hide,#show").mouseover(function(){
        $("#action").text("Your mouse is hovering.");
    });

    $("#change,#hide,#show").mouseout(function(){
        $("#action").text("Your mouse leaves the button.");
    });

    $("#change,#hide,#show").mousedown(function(){
        $(this).css("background","green");
        $(this).css("color","white");
    });

    $("#change,#hide,#show").mouseup(function(){
        $(this).css("background","blanchedalmond");
        $(this).css("color","black");
    });

    $("#change,#hide,#show").click(function(){
        $("#action").text("You clicked a button");
    });

    $("#change").dblclick(function(){
        $("#action").text("Your mouse double clicked a button.");
        $("#title").text("Welcome Student!");
    });

    $("#hide").click(function(){
        $(".studInfo").hide("slow");
        $("#action").text("You hide your student info");
        $("#subTitle").text("Profile: Hidden");
    });

    $("#show").click(function(){
        $(".studInfo").show("slow");
        $("#action").text("You are showing your student info");
        $("#subTitle").text("Welcome to my Interactive profile!");
    });

    $("#selectCourse").change(function(){
        $("#action").text("You chose a program.");
        $("#course").text($(this).val());
        $("#course").css("font-weight","bold");
        $("#courseOutput").text("Your course is: " + $(this).val());
    });

    $("#even").click(function(){
        $("#action").text("You change the color of even cells in the table.");
        $("tr:even").css("background","lightgreen");
        $("tr:even td").css("background","lightgreen");
        $("tr:odd").css("background","white");
        $("tr:odd td").css("background","white");
        $("#tableHeader").css("background","orange");
        $("#tableHeader th").css("background","orange");
        $("#tableAction").text("Even cells are highlighted.");
    });

    $("#odd").click(function(){
        $("#action").text("You change the color of odd cells in the table.");
        $("tr:odd").css("background","lightblue");
        $("tr:odd td").css("background","lightblue");
        $("tr:even").css("background","white");
        $("tr:even td").css("background","white");
        $("#tableHeader").css("background","orange");
        $("#tableHeader th").css("background","orange");
        $("#tableAction").text("Odd cells are highlighted.");
    });

    $("#hideTable").click(function(){
        $("#studTable").hide("slow");
        $("#action").text("You hide your student table.");
        $("#tableTitle").text("Registered Students: Hidden");
        $("#tableAction").text("You hide your table.");
    });

    $("#showTable").click(function(){
        $("#studTable").show("slow");
        $("#action").text("You opened your student table.");
        $("#tableAction").text("You are showing your table");
    });
});