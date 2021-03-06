  (function() {
    //'use strict';
    // var dialogButton = document.querySelector('.dialog-button');
    var dialog = document.querySelector('#dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    // dialogButton.addEventListener('click', function() {
    //    dialog.showModal();
    // });
   dialog.querySelector("#close-button").addEventListener("click", function() {
    $("#save-button").off("click");
  dialog.close();
});
   $(".recipe-modal").on("click", function () {
      $("#save-button").prop( "disabled", false);
     $("#recipe-title").text($(this).attr("data-title"));
     $("#img-id").attr("src", $(this).attr("data-img"))
     $("#modal-ingredients").text($(this).attr("data-ingredients"));
     $("#link-id").attr("href", $(this).attr("data-link"))
     let recipeObj ={
          title:$(this).attr("data-title"),
          img_url:$(this).attr("data-img"),
          source_url:$(this).attr("data-link"),
          ingredients:$(this).attr("data-ingredients"),
          token:Cookies.get("userToken"),
          user_id: Cookies.get("user_id")
        }
     $("#save-button").on("click", ()=>{
      console.log(recipeObj)
      if(Cookies.get("userToken")===undefined){
        alert("must be signed in to save recipes")
      } else {
        $.post("/api/addStar", recipeObj, (results)=>{
          if(results.success){
            alert("Recipe Saved")
            $("#save-button").prop( "disabled", true );
          }
        })
      }
     })
      dialog.showModal();
   })

  })();