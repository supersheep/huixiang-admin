$(function(){

$(".delete").on("click",function(){
    if(!confirm("are you sure?")){
        return;
    }
    var tr = $(this).closest("tr");
    var id = tr.attr("data-id");
    $.ajax({
        url:"/ajax/piece/" + id,
        method:"delete"
    }).success(function(){
        tr.remove();
    }).error(function(){
        console.log("oops!");
    });
});


});