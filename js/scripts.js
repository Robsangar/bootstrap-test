$(document).ready(function () {
    $("#mycarousel").carousel({ interval: 2000 });
    $("#carouselButton").click(function () {
        if ($('#carouselButton').children('span').hasClass('fa-pause')) {
            $("#mycarousel").carousel('pause');
            $('#carouselButton').children('span').removeClass('fa-pause');
            $('#carouselButton').children('span').addClass('fa-play');
        } else if ($('#carouselButton').children('span').hasClass('fa-play')) {
            $("#mycarousel").carousel('cycle');
            $('#carouselButton').children('span').removeClass('fa-play');
            $('#carouselButton').children('span').addClass('fa-pause');
        }
    });
    $("#reserveButton").click(function () {
        $("#reserveModal").modal("show");
    });

    $("#loginButton").click(function () {
        $("#loginModal").modal("show");
    });

    $("#sendReview").click(function () {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var reviewText = $("#review").val();
        var name = firstname + " " + lastname.substr(0,1) + ".";
        var date = new Date().toLocaleDateString();

        var listClass = "list-group-item list-group-item-action flex-column align-items-start list-group-item-secondary";
        var listItem = `<li class= '` + listClass + `' > `;
        var divHeading = ` <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">` + name +`</h5>
                                <small>` + date + `</small>
                            </div>`;
        var review = `<p class="mb-1"> ` + reviewText + `</p>`; 
        
        var rating = 0;

        var rating = `<small class="text-muted"> ` + $("#ratingValue").val() + `/5</small>`; 


        $("#reviewList").prepend(listItem + divHeading + review + rating);

    }); 

    $("#rate1").click(function () {
        $("#ratingValue").val("1");
     });
     $("#rate2").click(function () {
        $("#ratingValue").val("2"); 
     });
     $("#rate3").click(function () {
        $("#ratingValue").val("3"); 
     });
     $("#rate4").click(function () {
        $("#ratingValue").val("4"); 
     });
     $("#rate5").click(function () {
        $("#ratingValue").val("5"); 
     });
});
