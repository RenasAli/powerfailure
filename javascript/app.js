
const charge = document.getElementById("charge"),
batteryPercentage = document.getElementById("battery-percentage"),
chargingStatus = document.getElementById("charging-status"),
chargeTime = document.getElementById("charging-time"),
dischargeTime = document.getElementById("discharging-time")

navigator.getBattery().then((battery) => {
    function updateAppInfo() {
        console.log(battery)
        chargingInfo();
        levelInfo();
    }

    updateAppInfo();

    battery.addEventListener('chargingchange', () => {
        updateAppInfo();
    });
    battery.addEventListener('levelchange', () => {
        updateAppInfo();
    });

    function chargingInfo() {
        if (battery.charging) {
            charge.classList.add("active")
            console.log("is charging");
            dischargeTime.innerText =""
            chargingStatus.innerText='Charging status: charging'
            if (battery.chargingTime !== Infinity) {
                let chargingHour = parseInt(battery.chargingTime / 3600);
                let chargingMinutes = parseInt(battery.chargingTime / 60 - chargingHour * 60);
                chargeTime.innerText = `Charging time: ${chargingHour} hour and ${chargingMinutes} minutes `;
              } else {
                chargeTime.innerText = `Charging time: Laoding...`
              }
        }else if (battery.dischargingTime) {
            console.log("not charging");
            console.log(battery.dischargingTime)
            charge.classList.remove("active");
            chargingStatus.innerText = 'Charging status: not charging';
            chargeTime.innerText =""
            if (battery.dischargingTime !== Infinity) {
                let disChargeHour = parseInt(battery.dischargingTime / 3600);
                let minutes = parseInt(battery.dischargingTime  /60 - disChargeHour * 60);
                dischargeTime.innerText = `Discharging time: ${disChargeHour} hour and ${minutes} minutes remaining`;
                
              } else {
                dischargeTime.innerText = `Discharging time: Laoding...`;
              }
            
            
          }
          
    }

    function levelInfo(){
        let batteryLevel = `${parseInt(battery.level * 100)}%`
        charge.style.width = batteryLevel;
        batteryPercentage.innerText = batteryLevel;
        if (parseInt(battery.level * 100) <= 20){
            charge.style.backgroundColor = "#F97484";
        }
    }
});

