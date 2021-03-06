window.onload =  function(){
    tinymce.init({
        selector:'#tiny-mce-post-body',
        plugins:["a11ychecker advcode advlist lists link checklist autolink autosave code",
            'preview','wordcount','media table emoticons image imagetools'],
        toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent | link image media | forecolor backcolor emoticons | code preview',
        height: 350,
        automatic_uploads: true,
        images_upload_url: '/uploads/postimage',
        images_upload_handler: function(blobInfo,success,failure){
            let headers = new Headers()
            headers.append('Accept','Application/JSON')

            let formData = new FormData()
            formData.append('post-image',blobInfo.blob(),blobInfo.filename())

            let req = new Request('/uploads/postimage',{
                method:"POST",
                headers,
                medo:'cors',
                body:formData
            })

            fetch(req)
                .then(res => res.json())
                .then(data => success(data.imgUrl))
                .catch(() => failure('HTTP Error'))
        }
    })
}