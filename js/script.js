let trafficCount = 300;
const trafficRisk = document.getElementById('trafficRisk');
const trafficLess = document.getElementById('trafficLess');
const trafficMore = document.getElementById('trafficMore');

let isHacked = false;
let securVer = 1
const securRisk = document.getElementById('securRisk');
const securRef = document.getElementById('securRef');
const securAtt = document.getElementById('securAtt');

let equipCount = 1;
let isBreak = false;
const equipRisk = document.getElementById('equipRisk');
const equipBreak = document.getElementById('equipBreak');
const equipAdd = document.getElementById('equipAdd');

let techVer = 1
let isNew = false;
const techRisk = document.getElementById('techRisk')
const techRef = document.getElementById('techRef');
const techNew = document.getElementById('techNew');

const errMsgText = document.getElementById('errMsgText');

trafficLess.addEventListener('click', () => {
  if (trafficCount > 0) {
    trafficCount = trafficCount - 10;
  }
  upDateAll()
})

trafficMore.addEventListener('click', () => {
  if (trafficCount < (equipCount * 500)) {
    trafficCount = trafficCount + 10;
  }
  if (trafficCount >= 400){
    errMsgText.innerHTML = 'Кол-во клиентов превышает 80% пропускной способности оборудования. Рекомендуется добавить оборудования, чтобы избежать сбоев или недоступности услуг у пользователей.'
    errMsgWrapper.classList.remove('hide')
  }
  if (trafficCount >= 480){
    errMsgText.innerHTML = 'Кол-во клиентов превышает 95% пропускной способности оборудования. Возможны сбои или недоступность услуг у пользователей. Необходимо добавить оборудования.'
    errMsgWrapper.classList.remove('hide')
  }
  upDateAll()
})

equipAdd.addEventListener('click', () => {
  equipCount = equipCount + 1;
  isBreak = false
  upDateAll()
})

equipBreak.addEventListener('click', () => {
  if (equipCount > 0) {
    equipCount = equipCount - 1;
    isBreak = true;
    errMsgText.innerHTML = 'Произошла сбой оборудования. Пропускная способность снижена. Необходимо заменить оборудование'
    errMsgWrapper.classList.remove('hide')
  }
  upDateAll()
})

securRef.addEventListener('click', () => {
  securVer = securVer + 1;
  isHacked = false;
  upDateAll()
})

securAtt.addEventListener('click', () => {
  isHacked = true;
  errMsgText.innerHTML = 'Произошла кибератака. Выполняется резервное копирование данных. Обновите политику безопастности.'
  errMsgWrapper.classList.remove('hide')
  upDateAll()
})

techRef.addEventListener('click', () => {
  isNew = false;
  upDateAll()
})

techNew.addEventListener('click', () => {
  techVer = techVer + 1;
  isNew = true;
  errMsgText.innerHTML = 'Появилась новая технология. Рекомундуется обновить оборудование, для более стабильной работы'
  errMsgWrapper.classList.remove('hide')
  upDateAll()
})



function upDateAll() {
  upDateTraffic();
  upDateEquip();
  upDateSecur();
  upDateTech();
}

function upDateTech() {
  if (isNew) {
    techRisk.innerHTML = `Обновитесь до версии<br>V${techVer}`
    addRed(techRisk);
    if (isBreak){
      addRed(equipRisk)
    } else {
      addYellow(equipRisk)
    }
  } else {
    techRisk.innerHTML = `Используемая версия технологий:<br>V${techVer}`
    addGreen(techRisk)
  }
}

function upDateSecur() {
  if (isHacked) {
    securRisk.innerHTML = `Critical<br>Версия брандмауэра:<br>V${securVer}`
    addRed(securRisk)
  } else {
    securRisk.innerHTML = `Ok<br>Версия брандмауэра:<br>V${securVer}`
    addGreen(securRisk)
  }
}


function upDateEquip() {
  if (isBreak) {
    equipRisk.innerHTML = `Critical<br>Кол-во оборудования:<br>${equipCount}шт`
    addRed(equipRisk)
  } else {
    equipRisk.innerHTML = `Ok<br>Кол-во оборудования:<br>${equipCount}шт`
    addGreen(equipRisk)
  }
}


function upDateTraffic() {
  if (trafficCount < (equipCount * 400)) {
    trafficRisk.innerHTML = `Ok<br>Кол-во пользоваталей:<br>${trafficCount}/${equipCount * 500}`
    addGreen(trafficRisk)
  }
  if ((trafficCount >= (equipCount * 400)) && (trafficCount < (equipCount * 480))) {
    trafficRisk.innerHTML = `Warning<br>Кол-во пользоваталей:<br>${trafficCount}/${equipCount * 500}`
    addYellow(trafficRisk)
  }
  if (trafficCount >= (equipCount * 480)) {
    trafficRisk.innerHTML = `Critical<br>Кол-во пользоваталей:<br>${trafficCount}/${equipCount * 500}`
    addRed(trafficRisk)
  }
}

function addGreen(className) {
  className.parentElement.classList.remove('red');
  className.parentElement.classList.remove('yellow');
  className.parentElement.classList.add('green');
}

function addYellow(className) {
  className.parentElement.classList.remove('red');
  className.parentElement.classList.add('yellow');
  className.parentElement.classList.remove('green');
}

function addRed(className) {
  className.parentElement.classList.add('red');
  className.parentElement.classList.remove('yellow');
  className.parentElement.classList.remove('green');
}


const errMsgWrapper = document.querySelector('.errMsgWrapper');

errMsgWrapper.addEventListener('click', ()=>{
  errMsgWrapper.classList.add('hide')
})
