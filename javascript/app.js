
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
            let chargingHour = Math.floor(battery.chargingTime / 3600);

            let chargingMinutes = Math.floor((battery.chargingTime % 3600) / 60);
            chargeTime.innerText = `Charging time: ${chargingHour} hour and ${chargingMinutes} minutes `;
        }else if (battery.dischargingTime) {
            console.log("not charging");
            console.log(battery.dischargingTime)
            charge.classList.remove("active");
            chargingStatus.innerText = 'Charging status: not charging';
            chargeTime.innerText =""
            let hour = Math.floor(battery.dischargingTime / 3600);
            let minutes = Math.floor((battery.dischargingTime % 3600) / 60);
            dischargeTime.innerText = `Discharging time: ${hour} hour and ${minutes} minutes remaining`;
          }
          
    }

    function levelInfo(){
        let batteryLevel = `${parseInt(battery.level * 100)}%`
        charge.style.width = batteryLevel;
        batteryPercentage.innerText = batteryLevel;
    }
});

