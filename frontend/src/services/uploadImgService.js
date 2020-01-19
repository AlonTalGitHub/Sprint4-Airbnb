
export function uploadImg(file) {
    const CLOUD_NAME = 'dnb7d7utg'
    const PRESET_NAME = 'hvwwwh5p'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`


    // for(key in ev.target.files){

        
    // }
    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => {            
            console.log('catch',err)
            return err
        })
}
     

