function getMotion(){
    if (typeof(DeviceOrientationEvent) !== 'undefined' && 
    typeof(DeviceOrientationEvent.requestPermission) === 'function'){
    DeviceOrientationEvent.requestPermission().catch(()=>{
        let button = document.createElement('button');
        button.innerHTML = "allow g-sensor";
        document.getElementsByTagName("body")[0].appendChild(button);
        button.addEventListener("click",requestAccess);
        throw error;
    }).then(()=>{
        permissionGranted = true;
    })
}
}

function requestAccess(){
    DeviceOrientationEvent.requestPermission().then(
      response => {if(response == 'granted'){
        permissionGranted = true;
      }else{
        permissionGranted = false;
      }}
    ).catch(console.error);
    this.remove();
}