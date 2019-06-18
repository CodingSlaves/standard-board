onload = function () {
    document.querySelector("#posting-image-upload").addEventListener("change", function() {
        var fileName = $(this).val();
        $(this).next('.custom-file-label').html(fileName);
    })
}
